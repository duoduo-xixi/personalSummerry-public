# xxx · 个人主页

一个带银河系星云动效、整页翻页的个人主页。项目包含 **两个版本**：

- **静态版**（根目录）：纯原生 HTML / CSS / JavaScript + THREE.js，无需构建、双击即可打开。
- **Vue 3 版**（`vue-app/`）：基于 **Vite + Vue 3** 重写的版本，组件化、数据驱动、含作品视频轮播等新特性。

> 当前推荐使用 Vue 3 版（功能最完整，正在持续维护）。

---

## ✨ 功能特性

### 通用

- **银河系星云背景**：基于 THREE.js 实时渲染的螺旋星云粒子，支持鼠标视角切换与滚轮缩放；动效尊重 `prefers-reduced-motion`。
- **整页翻页（全屏切换）**：每个区块占满一屏，切换时带**弹性滑动**动画（过冲后回弹），像翻动整页一样。
- **多样的切换方式**：鼠标滚轮、触摸上下滑动、键盘（方向键 / 空格 / PageUp/PageDown / Home / End）、顶部导航、底部 SCROLL 提示。
- **进场动画**：滚动进入各区块时内容淡入上移（IntersectionObserver）。
- **光标光晕**：跟随鼠标的柔和光晕。
- **加载动画**：全屏 Loading 过渡。
- **自适应**：移动端自动切换为上下排列、可滚动。

### 首页（Hero）

- 大字号渐变姓名 `xxx`
- 头像（占位图）置于姓名上方
- 右侧展示基础信息：生日、院校、电话、外语（CET-4/6）、邮箱、籍贯
- 一句话简介 + 「查看作品 / 与我联系」按钮

### 内容区块

页面顺序：**首页 → 技能 → 经历 → 作品 → 关于 → 联系 → 页脚**。

- **技能矩阵**：技能卡片 + 掌握度进度条
- **航行轨迹**：教育背景 + 实习经历的纵向时间线
- **代表作品**：**全屏轮播**，一次展示一个作品视频，视频近乎占满整屏；左右 › ‹ 箭头 + 底部圆点可手动切换（圆点数量 = 视频数量）
- **关于我**：头像字徽 + 资料卡 + 个人介绍
- **建立连接**：邮箱 + 社交链接

---

## 📁 目录结构

### 根目录（静态版）

```
.
├─ index.html          # 页面结构
├─ css/style.css       # 样式 + 动效
├─ js/main.js          # 交互逻辑 + CONFIG 个人配置
├─ js/galaxy3d.js      # THREE.js 银河螺旋星云粒子特效
├─ js/vendor/three.min.js  # THREE.js 本地引用（无需联网）
├─ images/avatar.svg   # 头像占位图
└─ README.md
```

### vue-app/（Vue 3 版）

```
vue-app/
├─ index.html              # 入口（挂载 #app，引入 Google Fonts）
├─ vite.config.js          # Vite + @vitejs/plugin-vue
├─ package.json            # vue 3 + three 依赖
├─ public/
│  ├─ avatar.svg           # 头像占位图
│  └─ videos/             # 作品视频目录（含海报占位与上传说明）
│     ├─ work-1.mp4        # ← 你上传的第一个作品视频
│     ├─ work-2.mp4        # ← 你上传的第二个作品视频
│     ├─ work-1.svg / work-2.svg   # 视频海报占位图
│     └─ README.txt        # 视频上传说明
└─ src/
   ├─ main.js              # createApp + v-reveal 进场指令
   ├─ App.vue              # 整页翻页容器 + 页面编排
   ├─ style.css            # 全局样式（复用静态版）
   ├─ data/site.js         # 站点数据（名字/角色/技能/经历/作品/视频/联系方式）
   ├─ composables/
   │  ├─ useFullpage.js    # 整页翻页逻辑（滚轮/触摸/键盘/哈希）
   │  └─ useEditor.js      # 编辑模式 + 简历生成
   └─ components/
      ├─ GalaxyBackground.vue   # THREE.js 银河
      ├─ CursorGlow.vue         # 光标光晕
      ├─ Loader.vue             # 加载动画
      ├─ AppNav.vue             # 顶部导航（含移动端菜单）
      ├─ EditorButton.vue       # 右上角「编辑」浮动按钮
      ├─ EditBar.vue            # 底部提交栏（生成简历 / 重置）
      ├─ ResumeOverlay.vue      # 简历预览/下载/打印弹窗
      ├─ HeroSection.vue        # 首页
      ├─ SkillsSection.vue      # 技能矩阵
      ├─ TimelineSection.vue    # 经历（航行轨迹）
      ├─ ProjectsSection.vue    # 作品（全屏视频轮播）
      ├─ AboutSection.vue       # 关于我
      ├─ ContactSection.vue     # 联系
      └─ FooterSection.vue      # 页脚
```

---

## 🚀 快速开始

### Vue 3 版（推荐）

```bash
cd vue-app
npm install      # 首次安装依赖（已装好可跳过）
npm run dev      # 开发模式：http://localhost:5173
npm run build    # 打包到 dist/
npm run preview  # 本地预览打包产物
```

> 如果你的环境不允许执行 `npm.ps1`（PowerShell 执行策略），请使用 `npm.cmd` 代替 `npm`。

### 静态版

直接用浏览器打开根目录的 `index.html` 即可（无需任何依赖/构建）。背景星云使用本地 `three.min.js`，可离线运行。

---

## 🌐 部署为静态站点（无需数据库）

本项目是**纯静态前端**（Vue 打包后只有 HTML / CSS / JS），没有任何后端接口、也不存储用户数据，所以**不需要数据库或服务器**。你只需把打包产物 `dist/` 发布到任意静态托管平台即可。

### 发布前：把内容固化进源码

编辑模式里的修改只在**当前浏览器**里生效，刷新会回到默认模板；要让别人看到你定好的内容，请把最终内容**写入 `vue-app/src/data/site.js`**（或对照编辑模式里的值手动填进去），再重新构建。

```bash
cd vue-app
npm install        # 首次
npm run build      # 生成 dist/
```

> 若你的 PowerShell 禁止执行 `npm.ps1`，请改用 `npm.cmd`。
> 构建产物 `dist/`、依赖 `node_modules/`、npm 缓存 `.npm-cache/` 都已加入 `.gitignore`，请勿提交。

### 方式一：GitHub Pages（推荐，仓库通常已公开）

1. 在仓库根目录添加 GitHub Actions 工作流 `.github/workflows/deploy.yml`，在 `main` 分支 push 时自动构建并发布 Pages（模板见下）；
2. 或手动把 `vue-app/dist/` 的内容推到 `gh-pages` 分支；
3. 在仓库 **Settings → Pages** 中把 Source 设为 **GitHub Actions**（或 `gh-pages` 分支）；
4. 访问：`https://<用户名>.github.io/<仓库名>/`。

> 若部署在子路径，记得把 `vue-app/vite.config.js` 里的 `base` 设为 `/<仓库名>/`。

**GitHub Actions 模板：**

```yaml
name: Deploy to GitHub Pages
on: { push: { branches: [main] } }
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions: { pages: write, id-token: write }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
        working-directory: vue-app
      - run: npm run build
        working-directory: vue-app
      - uses: actions/upload-pages-artifact@v3
        with: { path: vue-app/dist }
      - uses: actions/deploy-pages@v4
```

### 方式二：Netlify / Vercel（免配置）

连接仓库后按如下设置即可：

- **Build command**：`npm run build`（在 `vue-app` 目录）
- **Publish directory**：`dist`

流程其实都一样：**构建静态文件 → 放到静态托管 → 别人就能看**，全程不涉及数据库。

---

## 🎛️ 数据与内容定制

### Vue 3 版

所有内容集中在 **`src/data/site.js`**，按需修改后保存即可（开发模式热更新）。

| 字段 | 说明 |
| --- | --- |
| `name` / `initial` / `brandName` | 姓名、头像字徽、品牌名 |
| `roles` | 首页角色轮播（用于打包等；当前首页改为信息行，可保留） |
| `desc` | 首页一句话简介 |
| `email` / `birthday` / `phone` | 联系方式与基本信息 |
| `aboutIntro` / `aboutText` / `aboutExtra` | 「关于我」文案（开场称呼 / 正文 / 补充段） |
| `facts` | 「关于我」资料卡（`k` 键 / `v` 值） |
| `skills` | 技能卡片（图标、名称、标签、掌握度 `0–100`） |
| `timeline` | 经历节点（时间 / 职位 / 机构 / 描述） |
| `projects` | 作品卡片（emoji 图标、标题、标签 `tags`、描述） |
| `videos` | **作品轮播视频**：`title`、`src`（视频路径）、`poster`（封面） |
| `socials` | 社交链接 |

### ✏️ 编辑模式与简历生成

点击页面右上角的 **✎ 编辑** 进入编辑模式：

- 页面上几乎所有文本都能**就地点击修改**（姓名、简介、基础信息、关于文案、页脚等）。
- 编辑模式下各区块会出现**增删控件**：角色标题、资料卡、技能、经历、作品、作品视频（可改视频地址/封面/标题）、社交链接均可增删改。
- 底部出现**提交栏**，点 **「提交 · 生成个人简历」** 会生成一份个人简历，可下载 `.html` 或用浏览器打印/存为 PDF。

> ⚠️ 编辑模式修改的是**浏览器内存**，刷新即恢复默认；若要持久化并发布给他人，请把修改后的内容写回 `vue-app/src/data/site.js` 后重新构建。

### 作品视频上传

把作品的 **MP4** 放入 `vue-app/public/videos/`：

- `work-1.mp4` → 第一个作品
- `work-2.mp4` → 第二个作品

放好后刷新页面即可播放；若要在 `videos` 数据里新增视频，追加一项即可，底部圆点会自动变多：

```js
{
  title: "第三个作品",
  src: "/videos/work-3.mp4",
  poster: "/videos/work-3.svg",
}
```

建议视频为 **16:9**（如 1920×1080），播放器效果最好。

### 静态版

打开 `js/main.js`，编辑顶部 **`CONFIG`** 配置对象即可修改姓名、简介、技能、经历、作品、社交等（字段含义与上表一致，作品为 `projects` 卡片数据）。

> 须知：静态版使用在线 Google Fonts，离线时回退为系统字体；作品卡片默认链接为 `#`，可替换为真实项目地址。

---


## 🧱 技术栈

- **前端**：Vue 3（`<script setup>` / 组合式 API）、Vite 5
- **3D 背景**：three.js（Vue 版以 `import * as THREE from "three"` 引入，静态版用本地 `three.min.js`）
- **样式**：原生 CSS + CSS 变量（Glasmorphism / 霓虹光效）
- **动效**：CSS transition（弹性 `cubic-bezier`）+ IntersectionObserver + requestAnimationFrame
- **字体**：Orbitron（标题）、Space Grotesk（正文）、JetBrains Mono（代码/标签）

---

## 📝 说明 / 注意

- **包体积**：Vue 版打包后 JS 约 530 KB（主要来自 three.js），构建会提示 chunk 超过 500 KB 的警告，不影响功能；后续可将 galaxy 改为动态 `import()` 做代码分割。
- **整页翻页策略**：首页始终整页切换；其它区块在大内容（超过一屏）时允许先页内滚动、滚到顶部/底部再翻页。
- **可访问性**：尊重 `prefers-reduced-motion`（减少动效时退化为即时切换/静态星云）。
- **移动端**：整页翻页保留触摸滑动；作品轮播支持圆点/箭头手动切换。

---

## 🪐 粒子特效来源

背景螺旋星云粒子基于 CSDN 文章《Three.js实现银河螺旋星云粒子特效——原理、实现》（[原文链接](https://blog.csdn.net/lenovo96166/article/details/149757220)）。核心参数在 `js/galaxy3d.js`（静态版）与 `vue-app/src/components/GalaxyBackground.vue`（Vue 版）顶部：

- `particleCount`：粒子数量（默认约 50000）
- `spinAngle`：螺旋扭转
- 随机扰动幅度
- `colorInside` / `colorOutside`：内橙 / 外深蓝渐变色

> 提示：追求更流畅可调低粒子数（如 `20000`）。

---

## 📄 License

个人主页项目，供学习与展示使用。
