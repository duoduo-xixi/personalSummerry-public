/* =========================================================
   ★ 在这里修改你的个人信息 —— 改完刷新即可生效 ★
   ========================================================= */
const CONFIG = {
  name: "xxx",                 // 你的名字 / 昵称
  initial: "xxx",                 // 头像圆环里显示的字符（推荐用名字首字）
  brandName: "xxx",               // 左上角 logo 文字
  roles: [                      // Hero 区的打字机轮流显示的角色
    "AI Agent 全栈开发",
    "前端开发工程师",
    "RAG 应用探索者",
    "xxx",
  ],
  desc: "xxx · xxx。专注 AI 应用与全栈开发，把好奇心打磨成一个个能落地的产品。",
  email: "xxx",    // 你的邮箱
  birthday: "xxx",      // 生日
  phone: "xxx",          // 联系电话
  facts: [
    { k: "院校", v: "xxx" },
    { k: "专业", v: "xxx" },
    { k: "籍贯", v: "xxx" },
    { k: "外语", v: "xxx" },
    { k: "荣誉", v: "xxx" },
  ],
  skills: [
    { icon: "🧩", name: "C / C++ 程序设计", tag: "C / C++", level: 85 },
    { icon: "🌊", name: "JavaScript / Vue / React", tag: "WEB_FULLSTACK", level: 88 },
    { icon: "🚀", name: "Spring Boot / Java 后端", tag: "BACKEND", level: 82 },
    { icon: "🗄️", name: "数据库 / 网络协议", tag: "SQL / HTTP-TCP", level: 78 },
    { icon: "🛠️", name: "Linux / Git 工具链", tag: "DEVOPS_TOOLS", level: 80 },
    { icon: "🤖", name: "AI 编程 / RAG / Prompt", tag: "AI & RAG", level: 86 },
  ],
  timeline: [
    { date: "2023.09 — 2027.07", role: "xxx", org: "xxx", desc: "系统学习计算机基础与软件开发，持续探索 AI 应用与全栈工程实践。" },
    { date: "2026.04 — 2026.06", role: "AI 创客项目实习", org: "xxx", desc: "基于 Tauri 2 + React 开发 CPMS Desktop，完成业务 API 逆向与自动化，并负责 AI 端到端平台测试。" },
    { date: "2026.06 — 2026.09", role: "AI Agent 全栈开发实习", org: "xxx", desc: "基于 Vue 3 / Electron 开发实时联机应用，封装 WebSocket 与 HTTP 层，并参与 RAG 智能客服官网开发。" },
  ],
  projects: [
    { emoji: "🤖", title: "学院管理智能聊天助手", tags: ["Dify", "RAG", "Flask"], desc: "基于 Dify + RAG 知识库与版式感知多模态解析，实现学院智能问答，检索命中率提升 30%+，复杂表格问答准确率提升至 85%+。", link: "#" },
    { emoji: "🎮", title: "像素填图小程序", tags: ["WXML", "OpenCV", "云开发"], desc: "基于微信云开发与 OpenCV 图像处理，实现多人联机实时对战，毫秒级同步，对战延迟 <150ms，图纸生成成功率 95%+。", link: "#" },
  ],
  socials: [
    { name: "邮箱", icon: "&#9993;", href: "mailto:xxx" },
  ],
};
/* ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- 载入遮罩 ---------- */
function hideLoader() {
  const loader = $("#loader");
  if (!loader || loader.dataset.done) return;
  loader.dataset.done = "1";
  loader.classList.add("hidden");
  // 过渡结束后彻底移出渲染树，确保任何环境下都不遮挡内容
  setTimeout(() => { loader.style.display = "none"; }, 900);
}

/* ---------- 填充内容 ---------- */
function renderContent() {
  const c = CONFIG;
  document.title = c.name + " · 个人主页";
  $("#hero-name").innerHTML = c.name + "<span class=\"cursor\">_</span>";
  $("#hero-desc").textContent = c.desc;
  $("#contact-mail").textContent = c.email;
  $("#contact-mail").href = "mailto:" + c.email;
  $("#footer-name").textContent = c.name;
  $("#year").textContent = new Date().getFullYear();
  $("#avatar-initial").textContent = c.initial;

  // facts
  $("#about-facts").innerHTML = c.facts
    .map((f) => '<li><span class="k">' + f.k + '</span><span class="v">' + f.v + "</span></li>")
    .join("");

  // 姓名下方基础信息（沿用 hero-role 字体）
  const fact = (k) => (c.facts.find((f) => f.k === k) || {}).v || "";
  const factsEl = $("#hero-facts");
  if (factsEl) {
    const infoItems = [
      ["生日", c.birthday],
      ["院校", fact("院校")],
      ["电话", c.phone],
      ["外语", "xxx"],
      ["邮箱", c.email],
      ["籍贯", fact("籍贯")],
    ];
    factsEl.innerHTML = infoItems
      .map(
        (item) =>
          '<span class="facts-item"><b>' + item[0] + "：</b>" +
          (item[0] === "邮箱"
            ? '<a href="mailto:' + item[1] + '">' + item[1] + "</a>"
            : item[1]) +
          "</span>"
      )
      .join("");
  }

  // skills
  $("#skills-grid").innerHTML = c.skills
    .map(
      (s, i) =>
        '<div class="skill-card reveal" style="transition-delay:' + i * 60 + 'ms">' +
        '<div class="skill-icon">' + s.icon + "</div>" +
        '<div class="skill-name">' + s.name + "</div>" +
        '<div class="skill-tag">' + s.tag + "</div>" +
        '<div class="skill-bar"><div class="skill-bar-fill" data-level="' + s.level + '"></div></div>' +
        '<div class="skill-level">' + s.level + "%</div>" +
        "</div>"
    )
    .join("");

  // timeline
  $("#timeline-list").innerHTML = c.timeline
    .map(
      (e) =>
        '<div class="timeline-item reveal">' +
        '<div class="timeline-date">' + e.date + "</div>" +
        '<div class="timeline-role">' + e.role + "</div>" +
        '<div class="timeline-org">' + e.org + "</div>" +
        '<div class="timeline-desc">' + e.desc + "</div>" +
        "</div>"
    )
    .join("");

  // projects
  $("#projects-grid").innerHTML = c.projects
    .map(
      (p, i) =>
        '<a class="project-card reveal" href="' + p.link + '" ' +
        (p.link === "#" ? 'onclick="return false"' : "") + ">" +
        '<div class="project-cover">' + p.emoji + "</div>" +
        '<div class="project-body">' +
        '<div class="project-tags">' + p.tags.map((t) => '<span class="project-tag">' + t + "</span>").join("") + "</div>" +
        '<div class="project-title">' + p.title + "</div>" +
        '<div class="project-desc">' + p.desc + "</div>" +
        '<span class="project-link">查看详情 →</span>' +
        "</div></a>"
    )
    .join("");

  // socials
  $("#socials").innerHTML = c.socials
    .map((s) => '<a class="social" href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.name + '">' + s.icon + "</a>")
    .join("");

  // hero meta
  $("#hero-meta").innerHTML =
    "<span>【 位置 】<b>" + (c.facts[0] ? c.facts[0].v : "") + "</b></span>" +
    "<span>【 技能栈 】<b>" + c.skills.length + "</b> 项</span>" +
    "<span>【 作品 】<b>" + c.projects.length + "</b> 个</span>";
}

/* ---------- 打字机 ---------- */
function startTyping() {
  const el = $("#type-text");
  const roles = CONFIG.roles;
  let i = 0, j = 0, deleting = false;
  function tick() {
    const word = roles[i];
    if (!deleting) {
      el.textContent = word.slice(0, ++j);
      if (j === word.length) { deleting = true; setTimeout(tick, 1600); return; }
    } else {
      el.textContent = word.slice(0, --j);
      if (j === 0) { deleting = false; i = (i + 1) % roles.length; }
    }
    setTimeout(tick, deleting ? 45 : 100);
  }
  tick();
}

/* ---------- 滚动揭示 ---------- */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // 触发技能条填充
          $$(".skill-bar-fill", entry.target).forEach((bar) => {
            bar.style.width = bar.dataset.level + "%";
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  $$(".reveal").forEach((el) => observer.observe(el));
}

/* ---------- 导航：滚动高亮 + 偏移固顶 + 移动端菜单 ---------- */
/* ---------- 整页翻页：每个区块一屏，弹动划入下一页 ---------- */
let scrollAnimId = 0;

function initFullpage() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = $("#nav");
  const track = $("#track");
  const navLinks = $$(".nav-link");
  const pages = track ? [...track.children] : [];
  const idxByHash = {};
  pages.forEach((el, i) => { if (el.id) idxByHash[el.id] = i; });
  let current = 0;
  let currentY = 0;
  let lock = false;
  let animId = 0;
  let wheelAt = 0;

  function setActive(i) {
    const id = pages[i] && pages[i].id ? "#" + pages[i].id : "";
    navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === id));
    nav.classList.toggle("scrolled", i > 0);
  }

  function setY(y) { track.style.transform = "translate3d(0," + y + "px,0)"; }

  function animateTo(targetY, done) {
    if (reduced) {
      setY(targetY);
      currentY = targetY;
      if (done) done();
      return;
    }
    cancelAnimationFrame(animId);
    const startY = currentY;
    const delta = targetY - startY;
    const duration = Math.min(1300, Math.max(480, Math.abs(delta) * 0.35));
    const t0 = performance.now();
    function easeOutBack(x) {
      const c1 = 1.70158, c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }
    function step(now) {
      const p = Math.min(1, (now - t0) / duration);
      // 弹性缓动：接近目标时轻微冲出、再回弹，形成"弹动划入"
      setY(startY + delta * easeOutBack(p));
      if (p < 1) animId = requestAnimationFrame(step);
      else { animId = 0; currentY = targetY; if (done) done(); }
    }
    animId = requestAnimationFrame(step);
  }

  function goTo(index) {
    index = Math.max(0, Math.min(index, pages.length - 1));
    if (index === current) return;
    current = index;
    setActive(index);
    lock = true;
    animateTo(-index * window.innerHeight, () => { lock = false; });
    const mt = $("#menu-toggle"); if (mt) mt.classList.remove("open");
    const nl = $(".nav-links"); if (nl) nl.classList.remove("open");
  }

  // 滚轮：向下/向上切换整页（有限流，避免连跳）
  window.addEventListener("wheel", (e) => {
    if (lock) return;
    const dy = e.deltaY;
    if (Math.abs(dy) < 24) return;
    // 当前页内容超高时，先允许在页内滚动，滚到边界后再翻页
    const page = pages[current];
    if (page && page.scrollHeight > page.clientHeight + 1) {
      const atStart = page.scrollTop <= 0;
      const atEnd = page.scrollTop + page.clientHeight >= page.scrollHeight - 1;
      if ((dy > 0 && !atEnd) || (dy < 0 && !atStart)) return;
    }
    e.preventDefault();
    const now = performance.now();
    if (now - wheelAt < 560) return;
    wheelAt = now;
    goTo(current + (dy > 0 ? 1 : -1));
  }, { passive: false });

  // 触摸滑动
  let touchY = 0;
  window.addEventListener("touchstart", (e) => { touchY = e.touches[0].clientY; }, { passive: true });
  window.addEventListener("touchend", (e) => {
    const dy = touchY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 60) goTo(current + (dy > 0 ? 1 : -1));
  }, { passive: true });

  // 键盘：方向键 / 空格 / 翻页键
  window.addEventListener("keydown", (e) => {
    const k = e.key;
    if (k === "ArrowDown" || k === "PageDown") goTo(current + 1);
    else if (k === "ArrowUp" || k === "PageUp") goTo(current - 1);
    else if (k === " ") { e.preventDefault(); goTo(current + 1); }
    else if (k === "Home") goTo(0);
    else if (k === "End") goTo(pages.length - 1);
  });

  // 导航 / SCROLL 提示 → 跳到对应页
  $$("[data-scroll]").forEach((a) => {
    a.addEventListener("click", (ev) => {
      const hash = a.getAttribute("href");
      if (!hash || !hash.startsWith("#")) return;
      const idx = idxByHash[hash.slice(1)];
      if (idx === undefined) return;
      ev.preventDefault();
      goTo(idx);
    });
  });

  if (window.location.hash) {
    const idx = idxByHash[window.location.hash.slice(1)];
    if (idx !== undefined) {
      current = idx;
      currentY = -idx * window.innerHeight;
      setY(currentY);
    }
  }
  setActive(current);

  // 尺寸变化时校正
  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      currentY = -current * window.innerHeight;
      setY(currentY);
    }, 200);
  });
}

function initNav() {
  const toggle = $("#menu-toggle");
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    $(".nav-links").classList.toggle("open");
    toggle.setAttribute("aria-expanded", toggle.classList.contains("open"));
  });
}

/* ---------- 光标光晕 ---------- */
function initCursor() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const glow = $("#cursor-glow");
  document.body.classList.add("has-cursor");
  let x = 0, y = 0, tx = 0, ty = 0;
  window.addEventListener("mousemove", (e) => {
    tx = e.clientX; ty = e.clientY;
    glow.style.opacity = "1";
  });
  (function move() {
    x += (tx - x) * 0.12;
    y += (ty - y) * 0.12;
    glow.style.transform = "translate(" + (x - 130) + "px," + (y - 130) + "px)";
    requestAnimationFrame(move);
  })();
}

/* ---------- 启动 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderContent();
  initReveal();
  initNav();
  initFullpage();
  initCursor();
  // 不依赖外部资源即可隐藏加载器，并保留兜底，避免字体/资源阻塞页面
  setTimeout(hideLoader, 400);
  window.addEventListener("load", () => setTimeout(hideLoader, 200));
});
