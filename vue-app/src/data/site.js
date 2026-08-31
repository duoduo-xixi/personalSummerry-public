import { reactive } from "vue";

// 默认/模板数据（用于“重置”）
const defaultData = {
  name: "xxx",
  initial: "xxx",
  brandName: "xxx",
  roles: [
    "AI Agent 全栈开发",
    "前端开发工程师",
    "RAG 应用探索者",
    "xxx",
  ],
  desc: "xxx · xxx。专注 AI 应用与全栈开发，把好奇心打磨成一个个能落地的产品。",
  email: "xxx",
  birthday: "xxx",
  phone: "xxx",
  aboutIntro: "你好，我是",
  aboutText:
    "。xxx · xxx在读，热衷于用技术把想法点亮——从一行代码到一个完整产品，专注 AI 应用与全栈开发，享受探索、拆解与重构的过程。",
  aboutExtra:
    "我相信优秀的产品来自对细节的执着与对用户的理解。不设限，是让我持续前进的燃料。",
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
    {
      date: "2023.09 — 2027.07",
      role: "xxx",
      org: "xxx",
      desc: "系统学习计算机基础与软件开发，持续探索 AI 应用与全栈工程实践。",
    },
    {
      date: "2026.04 — 2026.06",
      role: "AI 创客项目实习",
      org: "xxx",
      desc: "基于 Tauri 2 + React 开发 CPMS Desktop，完成业务 API 逆向与自动化，并负责 AI 端到端平台测试。",
    },
    {
      date: "2026.06 — 2026.09",
      role: "AI Agent 全栈开发实习",
      org: "xxx",
      desc: "基于 Vue 3 / Electron 开发实时联机应用，封装 WebSocket 与 HTTP 层，并参与 RAG 智能客服官网开发。",
    },
  ],
  projects: [
    {
      emoji: "🤖",
      title: "学院管理智能聊天助手",
      tags: ["Dify", "RAG", "Flask"],
      desc: "基于 Dify + RAG 知识库与版式感知多模态解析，实现学院智能问答，检索命中率提升 30%+，复杂表格问答准确率提升至 85%+。",
    },
    {
      emoji: "🎮",
      title: "像素填图小程序",
      tags: ["WXML", "OpenCV", "云开发"],
      desc: "基于微信云开发与 OpenCV 图像处理，实现多人联机实时对战，毫秒级同步，对战延迟 <150ms，图纸生成成功率 95%+。",
    },
  ],
  videos: [
    {
      title: "学院管理智能聊天助手",
      src: "/videos/work-1.mp4",
      poster: "/videos/work-1.svg",
    },
    {
      title: "像素填图小程序",
      src: "/videos/work-2.mp4",
      poster: "/videos/work-2.svg",
    },
  ],
  socials: [{ name: "邮箱", icon: "✉", href: "mailto:xxx" }],
};

// 可编辑的响应式站点数据：编辑后页面实时更新
export const site = reactive(JSON.parse(JSON.stringify(defaultData)));

// 返回一份未受编辑影响的默认数据（用于“重置”）
export function siteDefaults() {
  return JSON.parse(JSON.stringify(defaultData));
}
