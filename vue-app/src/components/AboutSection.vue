<template>
  <section id="about" class="section page">
    <div class="container">
      <div class="section-head reveal" v-reveal>
        <span class="section-index">04</span>
        <h2 class="section-title">关于我</h2>
        <span class="section-line"></span>
      </div>
      <div class="about-grid">
        <div class="about-card reveal" v-reveal>
          <div class="avatar">
            <span>{{ site.initial }}</span>
          </div>
          <ul class="facts">
            <li v-for="(f, i) in site.facts" :key="i">
              <span class="k" v-editable="t => (f.k = t)">{{ f.k }}</span>
              <span class="v" v-editable="t => (f.v = t)">{{ f.v }}</span>
              <button v-if="editing" class="edit-ctl" type="button" @click="removeFact(i)">删除</button>
            </li>
            <li v-if="editing">
              <button class="edit-ctl add" type="button" @click="addFact">＋ 添加资料</button>
            </li>
          </ul>
        </div>
        <div class="about-text reveal" v-reveal>
          <p>
            <span v-editable="t => (site.aboutIntro = t)">{{ site.aboutIntro }}</span><strong class="accent" v-editable="t => (site.name = t)">{{ site.name }}</strong><span v-editable="t => (site.aboutText = t)">{{ site.aboutText }}</span>
          </p>
          <p v-editable="t => (site.aboutExtra = t)">{{ site.aboutExtra }}</p>
          <a href="#contact" class="text-link" @click.prevent="emit('go', 'contact')">一起聊聊 →</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { site } from "../data/site";
import { editing } from "../composables/useEditor";
const emit = defineEmits(["go"]);

function addFact() {
  site.facts.push({ k: "标签", v: "内容" });
}
function removeFact(i) {
  site.facts.splice(i, 1);
}
</script>
