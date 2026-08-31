<template>
  <div id="galaxy3d" ref="root" aria-hidden="true"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as THREE from "three";

const root = ref(null);
let renderer, scene, camera, clock, geometry, material, galaxy;
let positions, originalPositions, colors;
let mouseX = 0, mouseY = 0, cameraDistance = 300;
let rafId = 0, reduced = false;

function makeCircleTexture() {
  const size = 64;
  const cv = document.createElement("canvas");
  cv.width = cv.height = size;
  const c = cv.getContext("2d");
  const g = c.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.9)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  c.fillStyle = g;
  c.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(cv);
}

function build() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 2000);
  const baseAzimuth = 0;
  const basePitch = Math.atan2(300, 130);
  camera.position.set(0, 300, 130);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  root.value.appendChild(renderer.domElement);

  clock = new THREE.Clock();
  const particleCount = 50000;
  geometry = new THREE.BufferGeometry();
  positions = new Float32Array(particleCount * 3);
  originalPositions = new Float32Array(particleCount * 3);
  colors = new Float32Array(particleCount * 3);
  const colorInside = new THREE.Color("#ff6030");
  const colorOutside = new THREE.Color("#1b3984");

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 300;
    const spinAngle = radius * 0.05;
    const branchAngle = ((i % 3) / 3) * Math.PI * 2;
    const randomX = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 12;
    const randomY = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 12;
    const randomZ = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 12;
    const x = Math.cos(branchAngle + spinAngle) * radius + randomX;
    const y = randomY;
    const z = Math.sin(branchAngle + spinAngle) * radius + randomZ;
    originalPositions[i3] = x;
    originalPositions[i3 + 1] = y;
    originalPositions[i3 + 2] = z;
    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;
    const mixedColor = colorInside.clone().lerp(colorOutside, Math.min(radius / 200, 1.0));
    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  material = new THREE.PointsMaterial({
    size: 2.6,
    map: makeCircleTexture(),
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    vertexColors: true,
    opacity: 0.8,
  });

  galaxy = new THREE.Points(geometry, material);
  scene.add(galaxy);

  const onMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  };
  const onWheel = (e) => {
    cameraDistance += e.deltaY * 0.15;
    cameraDistance = Math.max(160, Math.min(700, cameraDistance));
  };
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("wheel", onWheel);
  window.addEventListener("resize", onResize);
  renderer._listeners = { onMouseMove, onWheel, onResize };

  let smX = 0, smY = 0;

  function animate() {
    rafId = requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    const count = positions.length / 3;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = originalPositions[i3] + Math.sin(elapsedTime + i) * 3;
      positions[i3 + 1] = originalPositions[i3 + 1] + Math.cos(elapsedTime + i * 0.5) * 1.5;
      positions[i3 + 2] = originalPositions[i3 + 2] + Math.sin(elapsedTime + i * 0.3) * 1.5;
    }
    geometry.attributes.position.needsUpdate = true;
    material.opacity = Math.sin(elapsedTime * 2.0) * 0.3 + 0.7;
    galaxy.rotation.y = elapsedTime * 0.1;
    smX += (mouseX - smX) * 0.06;
    smY += (mouseY - smY) * 0.06;
    const azimuth = baseAzimuth + smX * 0.7;
    const pitch = Math.max(0.35, Math.min(1.45, basePitch - smY * 0.5));
    const cp = Math.cos(pitch);
    const sp = Math.sin(pitch);
    camera.position.set(
      Math.sin(azimuth) * cp * cameraDistance,
      sp * cameraDistance,
      Math.cos(azimuth) * cp * cameraDistance
    );
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }

  if (reduced) renderer.render(scene, camera);
  else animate();
}

onMounted(() => {
  if (typeof window === "undefined" || !root.value) return;
  reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  build();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
  if (renderer) {
    const l = renderer._listeners || {};
    if (l.onMouseMove) window.removeEventListener("mousemove", l.onMouseMove);
    if (l.onWheel) window.removeEventListener("wheel", l.onWheel);
    if (l.onResize) window.removeEventListener("resize", l.onResize);
    renderer.dispose();
  }
});
</script>
