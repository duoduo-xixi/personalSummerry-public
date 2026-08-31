/* =========================================================================
   ★ Three.js 银河螺旋星云粒子特效
   原理与源码参考：CSDN《Three.js实现银河螺旋星云粒子特效——原理、实现》
   生成 50000 个粒子，沿 3 条螺旋臂分布（中心橙 → 外缘深蓝渐变），
   加性混合 + 圆形贴图，随时间做正弦抖动与整体闪烁，星系自转，
   鼠标移动产生视差、滚轮缩放，自动适配窗口尺寸与 reduced-motion。
   ========================================================================= */
(function () {
  if (typeof THREE === "undefined") return; // three.js 未加载则跳过
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const container = document.createElement("div");
  container.id = "galaxy3d";
  document.body.insertBefore(container, document.body.firstChild);

  // 场景 / 相机 / 渲染器
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 2000);
  // 3/4 斜视角并拉近，让螺旋臂更清晰立体
  // 相机略偏向「正上方」——视线基本沿星系自转轴向下，中心恒定投影在画面中央
  camera.position.set(0, 300, 130);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // 透明背景，透出页面暗色
  container.appendChild(renderer.domElement);

  const clock = new THREE.Clock();

  // ---- 1) 用 canvas 生成圆点贴图（软边圆点，加性混合更柔和）----
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

  // ---- 2) 生成粒子（遵循文章源码）----
  const particleCount = 50000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const originalPositions = new Float32Array(particleCount * 3);

  const colorInside = new THREE.Color("#ff6030");
  const colorOutside = new THREE.Color("#1b3984");

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 300;
    const spinAngle = radius * 0.05;
    const branchAngle = (i % 3) / 3 * Math.PI * 2;
    // 随机扰动（平方权重，更集中）
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

    // 颜色渐变：内橙 → 外深蓝
    const mixedColor = colorInside.clone().lerp(colorOutside, Math.min(radius / 200, 1.0));
    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // ---- 3) 材质（遵循文章源码）----
  const material = new THREE.PointsMaterial({
    size: 2.6,
    map: makeCircleTexture(),
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    vertexColors: true,
    opacity: 0.8,
  });

  const galaxy = new THREE.Points(geometry, material);
  scene.add(galaxy);

  // ---- 4) 鼠标视差 + 滚轮缩放（遵循文章源码）----
  let mouseX = 0, mouseY = 0;
  let smoothedMouseX = 0, smoothedMouseY = 0; // 用于平滑视角切换的缓动目标
  // 默认相机的基准方位角 / 俯仰角（对应初始位置 (0, 300, 130) 的方向）
  const baseAzimuth = 0;
  const basePitch = Math.atan2(300, 130);
  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX / window.innerWidth * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  let cameraDistance = 300;
  const minDistance = 160;
  const maxDistance = 700;
  document.addEventListener("wheel", (event) => {
    cameraDistance += event.deltaY * 0.15;
    cameraDistance = Math.max(minDistance, Math.min(maxDistance, cameraDistance));
  });

  // ---- 5) 动画循环（遵循文章源码）----
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // 每个粒子的轻微抖动
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = originalPositions[i3] + Math.sin(elapsedTime + i) * 3;
      positions[i3 + 1] = originalPositions[i3 + 1] + Math.cos(elapsedTime + i * 0.5) * 1.5;
      positions[i3 + 2] = originalPositions[i3 + 2] + Math.sin(elapsedTime + i * 0.3) * 1.5;
    }
    geometry.attributes.position.needsUpdate = true;

    // 闪烁 + 星系自转 + 鼠标视差
    material.opacity = Math.sin(elapsedTime * 2.0) * 0.3 + 0.7;
    // 自转 + 小幅视差：整体中心保持固定，仅轻微摆动
    // 自转 + 鼠标做平滑的环绕视角切换（鼠标偏离中心时，星云随之转动视角）
    galaxy.rotation.y = elapsedTime * 0.1;

    // 缓动：让视角变化跟随鼠标但又平滑自然
    smoothedMouseX += (mouseX - smoothedMouseX) * 0.06;
    smoothedMouseY += (mouseY - smoothedMouseY) * 0.06;

    // 鼠标左右控制环绕方位角，上下控制俯仰角
    const azimuth = baseAzimuth + smoothedMouseX * 0.7;
    // 钳制俯仰角，避免越过正上方导致翻转
    const pitch = Math.max(0.35, Math.min(1.45, basePitch - smoothedMouseY * 0.5));
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

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", onResize);

  if (reduced) {
    renderer.render(scene, camera); // 静态一帧
  } else {
    animate();
  }
})();
