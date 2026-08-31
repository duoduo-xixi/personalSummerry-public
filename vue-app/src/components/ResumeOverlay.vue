<template>
  <div v-if="resumeOpen" class="resume-overlay" @click.self="closeResume">
    <div class="resume-modal">
      <header class="resume-head">
        <h3>个人简历预览</h3>
        <p class="resume-sub">你可以下载为 HTML 文件，或用浏览器打印/另存为 PDF。</p>
      </header>
      <div class="resume-frame-wrap">
        <iframe class="resume-frame" :title="'简历'" :srcdoc="html"></iframe>
      </div>
      <footer class="resume-foot">
        <button class="edit-btn" type="button" @click="closeResume">关闭</button>
        <button class="edit-btn" type="button" @click="download">下载简历 (.html)</button>
        <button class="edit-btn primary" type="button" @click="printResume">打印 / 存为 PDF</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { resumeOpen, closeResume, resumeData, buildResumeHtml } from "../composables/useEditor";

const html = computed(() => (resumeData.value ? buildResumeHtml(resumeData.value) : ""));

function download() {
  const blob = new Blob([html.value], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = (resumeData.value?.name || "个人") + "个人简历.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function printResume() {
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.open();
  win.document.write(html.value);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 250);
}
</script>
