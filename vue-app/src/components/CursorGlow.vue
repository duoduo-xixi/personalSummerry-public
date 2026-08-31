<template>
  <div id="cursor-glow" ref="glow"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

const glow = ref(null);
let x = 0, y = 0, tx = 0, ty = 0, rafId = 0;

function move() {
  if (!glow.value) return;
  x += (tx - x) * 0.12;
  y += (ty - y) * 0.12;
  glow.value.style.transform = "translate(" + (x - 130) + "px," + (y - 130) + "px)";
  rafId = requestAnimationFrame(move);
}

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.body.classList.add("has-cursor");
  const onMove = (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (glow.value) glow.value.style.opacity = "1";
  };
  window.addEventListener("mousemove", onMove);
  glow._onMove = onMove;
  move();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
  if (glow._onMove) window.removeEventListener("mousemove", glow._onMove);
  document.body.classList.remove("has-cursor");
});
</script>
