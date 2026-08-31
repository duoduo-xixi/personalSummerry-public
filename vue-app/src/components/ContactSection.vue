<template>
  <section id="contact" class="section contact-section page">
    <div class="container">
      <div class="section-head reveal" v-reveal>
        <span class="section-index">05</span>
        <h2 class="section-title">建立连接</h2>
        <span class="section-line"></span>
      </div>
      <div class="contact-card reveal" v-reveal>
        <p class="contact-lead">有没有想一起做的事？</p>
        <a class="contact-mail" :href="'mailto:' + site.email"><span v-editable="t => (site.email = t)">{{ site.email }}</span></a>
        <div class="socials">
          <a
            v-for="s in site.socials"
            :key="s.name"
            class="social"
            :href="s.href"
            target="_blank"
            rel="noopener"
            :aria-label="s.name"
          >{{ s.icon }}</a>
        </div>
        <div v-if="editing" class="edit-block">
          <div class="edit-hint">社交链接</div>
          <div v-for="(s, i) in site.socials" :key="i" class="edit-panel-item">
            <input v-model="s.name" placeholder="名称" />
            <input v-model="s.icon" placeholder="图标" />
            <input v-model="s.href" placeholder="链接" />
            <button class="edit-ctl" type="button" @click="removeSocial(i)">删除</button>
          </div>
          <button class="edit-ctl add" type="button" @click="addSocial">＋ 添加链接</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { site } from "../data/site";
import { editing } from "../composables/useEditor";

function addSocial() {
  site.socials.push({ name: "名称", icon: "🔗", href: "#" });
}
function removeSocial(i) {
  site.socials.splice(i, 1);
}
</script>
