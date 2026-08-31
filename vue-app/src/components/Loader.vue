<template>
  <div id="loader" ref="loader" aria-hidden="true">
    <div class="loader-ring"></div>
    <div class="loader-text">SIGNAL_//_ESTABLISHING</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const loader = ref(null);
onMounted(() => {
  if (!loader.value) return;
  if (loader.value.dataset.done) return;
  loader.value.dataset.done = "1";
  setTimeout(() => loader.value.classList.add("hidden"), 400);
  setTimeout(() => { if (loader.value) loader.value.style.display = "none"; }, 1300);
});
</script>
