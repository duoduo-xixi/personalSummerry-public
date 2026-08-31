<template>
  <GalaxyBackground />
  <CursorGlow />
  <Loader />
  <AppNav :active-id="activeId" @navigate="navigate" />
  <EditorButton />

  <div id="pages">
    <main id="track" class="track" :style="trackStyle">
      <HeroSection @go="go" />
      <SkillsSection />
      <TimelineSection />
      <ProjectsSection @go="go" />
      <AboutSection @go="go" />
      <ContactSection />
      <FooterSection />
    </main>
  </div>

  <EditBar />
  <ResumeOverlay />
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useFullpage } from "./composables/useFullpage";
import GalaxyBackground from "./components/GalaxyBackground.vue";
import CursorGlow from "./components/CursorGlow.vue";
import Loader from "./components/Loader.vue";
import AppNav from "./components/AppNav.vue";
import HeroSection from "./components/HeroSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import TimelineSection from "./components/TimelineSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import AboutSection from "./components/AboutSection.vue";
import ContactSection from "./components/ContactSection.vue";
import FooterSection from "./components/FooterSection.vue";
import EditorButton from "./components/EditorButton.vue";
import EditBar from "./components/EditBar.vue";
import ResumeOverlay from "./components/ResumeOverlay.vue";

const pageIds = ["hero", "skills", "timeline", "projects", "about", "contact", "footer"];
const { current, trackStyle, goTo } = useFullpage(pageIds.length);
const activeId = computed(() => pageIds[current.value]);

function go(id) {
  const idx = pageIds.indexOf(id);
  if (idx >= 0) goTo(idx);
}
function navigate(id) {
  go(id);
}

onMounted(() => {
  const h = window.location.hash.slice(1);
  const idx = pageIds.indexOf(h);
  if (idx > 0) goTo(idx);
});

watch(current, (v) => {
  window.history.replaceState(null, "", "#" + pageIds[v]);
});
</script>
