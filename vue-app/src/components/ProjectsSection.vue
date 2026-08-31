<template>
  <section id="projects" class="section page works-section">
    <div class="works-wrap">
      <div class="section-head reveal" v-reveal>
        <span class="section-index">03</span>
        <h2 class="section-title">代表作品</h2>
        <span class="section-line"></span>
      </div>

      <div class="carousel">
        <button class="carousel-arrow prev" aria-label="上一个视频" @click="prev()">‹</button>

        <div class="carousel-stage">
          <div class="carousel-track" :style="trackStyle">
            <figure v-for="(v, i) in site.videos" :key="i" class="carousel-slide">
              <video controls preload="metadata" :poster="v.poster" :aria-label="v.title">
                <source :src="v.src" type="video/mp4" />
                您的浏览器不支持视频播放。
              </video>
              <figcaption class="carousel-caption">{{ v.title }}</figcaption>
              <div v-if="editing" class="edit-video">
                <label>标题 <input v-model="v.title" /></label>
                <label>视频地址 <input v-model="v.src" /></label>
                <label>封面 <input v-model="v.poster" /></label>
                <button class="edit-ctl" type="button" @click="removeVideo(i)">删除视频</button>
              </div>
            </figure>
          </div>
        </div>

        <button class="carousel-arrow next" aria-label="下一个视频" @click="next()">›</button>
      </div>

      <div class="carousel-dots">
        <button
          v-for="(v, i) in site.videos"
          :key="i"
          class="dot"
          :class="{ active: current === i }"
          @click="go(i)"
          :aria-label="'第 ' + (i + 1) + ' 个视频'"
        ></button>
      </div>

      <div v-if="editing" class="edit-block">
        <div class="edit-hint">视频管理</div>
        <button class="edit-ctl add" type="button" @click="addVideo">＋ 添加视频</button>
      </div>

      <div v-if="editing" class="edit-block">
        <div class="edit-hint">作品卡片</div>
        <div v-for="(p, i) in site.projects" :key="i" class="edit-panel-item">
          <input v-model="p.emoji" placeholder="图标 emoji" />
          <input v-model="p.title" placeholder="标题" />
          <input
            :value="p.tags.join(', ')"
            placeholder="标签（用逗号分隔）"
            @input="(e) => (p.tags = e.target.value.split(',').map((s) => s.trim()).filter(Boolean))"
          />
          <textarea v-model="p.desc" placeholder="描述"></textarea>
          <button class="edit-ctl" type="button" @click="removeProject(i)">删除</button>
        </div>
        <button class="edit-ctl add" type="button" @click="addProject">＋ 添加作品</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { site } from "../data/site";
import { editing } from "../composables/useEditor";

const current = ref(0);
const count = computed(() => site.videos.length);
const trackStyle = computed(() => ({
  transform: `translateX(${-current.value * 100}%)`,
  transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
}));

const go = (i) => {
  current.value = Math.max(0, Math.min(i, count.value - 1));
};
const next = () => go(current.value + 1);
const prev = () => go(current.value - 1);

function addVideo() {
  site.videos.push({ title: "新视频", src: "/videos/work-3.mp4", poster: "/videos/work-3.svg" });
}
function removeVideo(i) {
  site.videos.splice(i, 1);
  if (current.value >= site.videos.length) current.value = Math.max(0, site.videos.length - 1);
}
function addProject() {
  site.projects.push({ emoji: "⭐", title: "新作品", tags: ["TAG"], desc: "描述" });
}
function removeProject(i) {
  site.projects.splice(i, 1);
}
</script>

<style scoped>
.works-section {
  display: flex;
  flex-direction: column;
  padding-top: var(--nav-h);
  padding-bottom: 18px;
}
.works-wrap {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.works-wrap .section-head {
  margin-bottom: 16px;
}

.carousel {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  align-items: center;
  width: 100%;
}
.carousel-stage {
  flex: 1 1 auto;
  height: 100%;
  min-width: 0;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid var(--panel-line);
  background: #000;
}
.carousel-track {
  display: flex;
  height: 100%;
}
.carousel-slide {
  flex: 0 0 100%;
  height: 100%;
  margin: 0;
  position: relative;
}
.carousel-slide video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
.carousel-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 20px;
  color: var(--text);
  font-size: 15px;
  letter-spacing: 0.5px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.78));
  pointer-events: none;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(139, 107, 255, 0.4);
  background: rgba(6, 10, 22, 0.55);
  color: var(--text);
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: background 0.3s ease, border-color 0.3s ease;
}
.carousel-arrow:hover {
  background: rgba(139, 107, 255, 0.25);
  border-color: rgba(139, 107, 255, 0.9);
}
.carousel-arrow.prev { left: 16px; }
.carousel-arrow.next { right: 16px; }

.carousel-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 18px 0 6px;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 0;
  background: rgba(255, 255, 255, 0.25);
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}
.dot:hover { background: rgba(255, 255, 255, 0.5); }
.dot.active {
  background: var(--cyan);
  box-shadow: 0 0 12px var(--glow-cyan);
  transform: scale(1.25);
}

@media (max-width: 860px) {
  .carousel-arrow {
    width: 38px;
    height: 38px;
    font-size: 20px;
  }
  .carousel-arrow.prev { left: 8px; }
  .carousel-arrow.next { right: 8px; }
  .carousel-caption { font-size: 13px; }
}
</style>
