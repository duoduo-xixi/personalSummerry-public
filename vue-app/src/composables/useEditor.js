import { ref } from "vue";
import { site, siteDefaults } from "../data/site";

// 是否处于编辑模式
export const editing = ref(false);

// 简历弹窗状态
export const resumeOpen = ref(false);
export const resumeData = ref(null);

export function enterEdit() {
  editing.value = true;
}

export function exitEdit() {
  editing.value = false;
}

export function toggleEdit() {
  editing.value = !editing.value;
}

// 恢复为默认模板数据
export function resetSite() {
  const d = siteDefaults();
  for (const k of Object.keys(site)) delete site[k];
  Object.assign(site, d);
}

// 返回当前数据的纯对象快照（用于生成简历）
export function getSiteData() {
  return JSON.parse(JSON.stringify(site));
}

export function openResume() {
  resumeData.value = getSiteData();
  resumeOpen.value = true;
}

export function closeResume() {
  resumeOpen.value = false;
}

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// 依据站点数据生成一份可打印的 HTML 简历
export function buildResumeHtml(d) {
  const lines = [];
  lines.push(`<!DOCTYPE html>`);
  lines.push(`<html lang="zh-CN"><head><meta charset="utf-8" />`);
  lines.push(`<title>${esc(d.name)} · 个人简历</title>`);
  lines.push(`<style>
    * { box-sizing: border-box; }
    body { font-family: "Microsoft YaHei", "PingFang SC", -apple-system, sans-serif; color: #1a1a1a; margin: 0; padding: 0; background: #f4f5f7; }
    .sheet { max-width: 820px; margin: 24px auto; background: #fff; padding: 40px 48px; box-shadow: 0 6px 24px rgba(0,0,0,.08); border-radius: 12px; }
    h1 { margin: 0 0 4px; font-size: 30px; }
    .role { color: #555; margin: 0 0 6px; font-size: 15px; }
    .contact { color: #666; font-size: 13px; margin: 0 0 18px; }
    .contact span { margin-right: 12px; }
    h2 { font-size: 17px; border-bottom: 2px solid #333; padding-bottom: 6px; margin: 26px 0 12px; }
    ul { margin: 0; padding-left: 20px; }
    li { margin-bottom: 8px; line-height: 1.6; }
    .muted { color: #666; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; }
    @media print { body { background: #fff; } .sheet { box-shadow: none; margin: 0; border-radius: 0; } }
  </style></head><body>`);
  lines.push(`<div class="sheet">`);
  lines.push(`<h1>${esc(d.name)}</h1>`);
  if (d.roles && d.roles.length) {
    lines.push(`<p class="role">${esc(d.roles.join(" · "))}</p>`);
  }
  lines.push(
    `<p class="contact"><span>邮箱：${esc(d.email)}</span><span>电话：${esc(d.phone)}</span><span>生日：${esc(d.birthday)}</span></p>`
  );
  if (d.desc) lines.push(`<p>${esc(d.desc)}</p>`);
  if (d.aboutText) lines.push(`<p>${esc(d.aboutIntro || "你好，我是")}${esc(d.name)}${esc(d.aboutText)}</p>`);

  if (d.facts && d.facts.length) {
    lines.push(`<h2>基本信息</h2><div class="grid-2">`);
    d.facts.forEach((f) => lines.push(`<div><b>${esc(f.k)}：</b>${esc(f.v)}</div>`));
    lines.push(`</div>`);
  }

  if (d.skills && d.skills.length) {
    lines.push(`<h2>技能</h2><ul>`);
    d.skills.forEach((s) =>
      lines.push(`<li><b>${esc(s.name)}</b> <span class="muted">（${esc(s.tag)}，掌握度 ${esc(s.level)}%）</span></li>`)
    );
    lines.push(`</ul>`);
  }

  if (d.timeline && d.timeline.length) {
    lines.push(`<h2>经历</h2><ul>`);
    d.timeline.forEach((t) =>
      lines.push(
        `<li><b>${esc(t.date)}</b> — ${esc(t.role)}${t.org ? " @ " + esc(t.org) : ""}<br>${esc(t.desc)}</li>`
      )
    );
    lines.push(`</ul>`);
  }

  if (d.projects && d.projects.length) {
    lines.push(`<h2>代表作品</h2><ul>`);
    d.projects.forEach((p) =>
      lines.push(
        `<li><b>${esc(p.title)}</b>${
          p.tags && p.tags.length ? " <span class=\"muted\">[" + esc(p.tags.join("、")) + "]</span>" : ""
        }<br>${esc(p.desc)}</li>`
      )
    );
    lines.push(`</ul>`);
  }

  if (d.videos && d.videos.length) {
    lines.push(`<h2>作品视频</h2><ul>`);
    d.videos.forEach((v) => lines.push(`<li>${esc(v.title)}${v.src ? "（" + esc(v.src) + "）" : ""}</li>`));
    lines.push(`</ul>`);
  }

  if (d.socials && d.socials.length) {
    lines.push(`<h2>联系方式</h2><ul>`);
    d.socials.forEach((s) => lines.push(`<li>${esc(s.name)}：${esc(s.href)}</li>`));
    lines.push(`</ul>`);
  }

  lines.push(`</div></body></html>`);
  return lines.join("\n");
}
