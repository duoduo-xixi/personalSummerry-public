<template>
  <section id="skills" class="section page">
    <div class="container">
      <div class="section-head reveal" v-reveal>
        <span class="section-index">01</span>
        <h2 class="section-title">技能矩阵</h2>
        <span class="section-line"></span>
      </div>
      <div class="skills-grid">
        <div
          v-for="(s, i) in site.skills"
          :key="i"
          class="skill-card reveal"
          v-reveal
          :style="{ transitionDelay: i * 60 + 'ms' }"
        >
          <div class="skill-icon" v-editable="t => (s.icon = t)">{{ s.icon }}</div>
          <div class="skill-name" v-editable="t => (s.name = t)">{{ s.name }}</div>
          <div class="skill-tag" v-editable="t => (s.tag = t)">{{ s.tag }}</div>
          <div class="skill-bar">
            <div class="skill-bar-fill" :style="{ width: s.level + '%' }"></div>
          </div>
          <div class="skill-level" v-editable="t => (s.level = Math.max(0, Math.min(100, parseInt(t) || 0)))">{{ s.level }}%</div>
          <button v-if="editing" class="edit-ctl" type="button" @click="removeSkill(i)">删除</button>
        </div>
        <button v-if="editing" class="edit-ctl add" type="button" @click="addSkill">＋ 添加技能</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { site } from "../data/site";
import { editing } from "../composables/useEditor";

function addSkill() {
  site.skills.push({ icon: "⭐", name: "新技能", tag: "TAG", level: 75 });
}
function removeSkill(i) {
  site.skills.splice(i, 1);
}
</script>
