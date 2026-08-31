<template>
  <header id="nav" :class="{ scrolled: activeId !== 'hero' }">
    <nav class="nav-inner">
      <a href="#hero" class="brand" @click.prevent="go('hero')">
        <span class="brand-mark">◇</span>
      </a>
      <ul class="nav-links" :class="{ open: menuOpen }">
        <li v-for="l in links" :key="l.id">
          <a
            :href="'#' + l.id"
            class="nav-link"
            :class="{ active: activeId === l.id, 'nav-cta': l.id === 'contact' }"
            @click.prevent="go(l.id)"
          >{{ l.label }}</a>
        </li>
      </ul>
      <button
        id="menu-toggle"
        :class="{ open: menuOpen }"
        aria-label="切换菜单"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
defineProps({ activeId: { type: String, default: "hero" } });
const emit = defineEmits(["navigate"]);
const links = [
  { label: "关于", id: "about" },
  { label: "技能", id: "skills" },
  { label: "经历", id: "timeline" },
  { label: "作品", id: "projects" },
  { label: "联系", id: "contact" },
];
const menuOpen = ref(false);
function go(id) {
  emit("navigate", id);
  menuOpen.value = false;
}
</script>
