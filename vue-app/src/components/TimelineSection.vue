<template>
  <section id="timeline" class="section page">
    <div class="container">
      <div class="section-head reveal" v-reveal>
        <span class="section-index">02</span>
        <h2 class="section-title">航行轨迹</h2>
        <span class="section-line"></span>
      </div>
      <div class="timeline" v-reveal>
        <div v-for="(t, i) in site.timeline" :key="i" class="timeline-item">
          <div class="timeline-date" v-editable="t => (t.date = t)">{{ t.date }}</div>
          <div class="timeline-role" v-editable="t => (t.role = t)">{{ t.role }}</div>
          <div class="timeline-org" v-editable="t => (t.org = t)">{{ t.org }}</div>
          <div class="timeline-desc" v-editable.multiline="t => (t.desc = t)">{{ t.desc }}</div>
          <button v-if="editing" class="edit-ctl" type="button" @click="removeTimeline(i)">删除</button>
        </div>
        <button v-if="editing" class="edit-ctl add" type="button" @click="addTimeline">＋ 添加经历</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { site } from "../data/site";
import { editing } from "../composables/useEditor";

function addTimeline() {
  site.timeline.push({ date: "2026.01 — 2026.06", role: "岗位", org: "单位", desc: "描述" });
}
function removeTimeline(i) {
  site.timeline.splice(i, 1);
}
</script>
