<template>
  <div v-if="editing" class="edit-bar">
    <div class="edit-bar-inner">
      <p class="edit-bar-hint">编辑模式：点击任意文本即可修改，可增删技能/经历/作品/视频等。</p>
      <div class="edit-bar-actions">
        <button class="edit-btn reset" type="button" @click="onReset">重置</button>
        <button class="edit-btn primary" type="button" @click="onSubmit">提交 · 生成个人简历</button>
        <button class="edit-btn" type="button" @click="exitEdit">退出编辑</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { editing, exitEdit, resetSite, openResume } from "../composables/useEditor";

function onReset() {
  if (confirm("确定要放弃所有修改，恢复为默认模板内容吗？")) {
    resetSite();
  }
}
function onSubmit() {
  openResume();
}
</script>
