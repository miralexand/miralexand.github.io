# miralexand · Portfolio

个人作品集网站 —— 机器人 / 具身智能风格 + 性冷淡调性，带昼夜主题与赛博朋克彩蛋。

- 在线地址：<https://miralexand.github.io/>
- 作者：miralexand
- 邮箱：dalingaixidelu@163.com

---

## ✨ 特性

- **机器人 / 机械风视觉**：蓝图网格、星空、黑洞（Gargantua）、HUD 四角边框与遥测读数
- **性冷淡调性**：低饱和哑光金属配色、克制动画、大留白
- **昼夜主题**：按时间自动切换明 / 暗，右上角 iOS 风格开关手动切换并记忆
- **苹果风进站动画**：整站淡入 + 轻微缩放 + 去模糊，自然的「开机」揭示
- **赛博朋克彩蛋**：一键切换 2077 + 蒸汽波风格，附过渡音效与炫酷切换动画
- **命令面板**：`⌘K` / `Ctrl+K` 快速导航与执行命令
- **GitHub Pages 自动部署**：`git push` 即发布

## 🧱 技术栈

| 类别 | 选型 |
| --- | --- |
| 构建 | Vite 8 |
| 框架 | React 19 + TypeScript |
| 样式 | Tailwind CSS 4（CSS 变量主题） |
| 动画 | Motion |
| 图标 | lucide-react |
| 音效 | Web Audio API（程序合成，无音频文件） |

---

## 🚀 本地开发

```bash
npm install
npm run dev      # 开发服务器 http://localhost:5173
npm run build    # 构建到 dist/
npm run preview  # 预览生产构建
```

---

## ✏️ 个性化配置

所有个人内容集中在 [`src/data.ts`](src/data.ts)：

- `profile`：姓名、职位、简介、**邮箱**、GitHub、站点地址、头像首字母、状态
- `nav`：导航项
- `socials`：社交链接
- `skillGroups`：技能栈
- `projects`：作品集（`featured: true` 的会展示在首页）
- `timeline`：工作 / 学习经历

---

## 🎨 主题系统

- 使用 CSS 变量定义在两处：`:root / [data-theme="dark"]` 与 `[data-theme="light"]`，见 [`src/index.css`](src/index.css)
- 首次加载由 [`index.html`](index.html) 的内联脚本按时间（6:00–18:00 为明亮）决定，并读取 `localStorage`
- 右上角 iOS 风格开关：`src/components/ThemeToggle.tsx` + `src/hooks/useTheme.ts`

自定义配色只需修改 `src/index.css` 里的 `--bg / --panel / --ink / --accent` 等变量。

---

## 🌆 赛博朋克彩蛋

导航栏主题开关左侧的 **⚡ 药丸按钮** 触发（`src/components/Navbar.tsx`）。

开启后：
1. **配色**切换为霓虹（品红 `#ff2d95` / 青 `#00e5ff` / 荧光黄 / 荧光绿），见 `html[data-cyber="on"]`（`src/index.css`）
2. **蒸汽波背景层**：落日条纹圆盘 + 透视霓虹网格 + 霓虹辉光 + CRT 扫描线（`src/components/CyberFX.tsx`）
3. 首屏名字出现霓虹 glitch
4. **过渡动画**：CRT 通电下扫光带 + 品红径向闪光（`.cyber-wipe` / `.cyber-flash`）
5. **过渡音效 BGM**：播放一次并**渐弱到静音**

### 🎵 BGM 参数（[`src/lib/cyberAudio.ts`](src/lib/cyberAudio.ts)）

| 常量 | 默认值 | 说明 |
| --- | --- | --- |
| `BPM` | `112` | 速度 |
| `BARS` | `8` | 渲染的小节数（循环素材长度） |
| `LOOP_SECONDS` | `STEP*16*BARS` | 自动计算，约 17s |
| `PROG` | `Am – F – C – G` | 和弦进行（MIDI 音高） |
| `TARGET_GAIN` | `0.7` | 最大音量 |
| `FADE_IN` | `0.6s` | 淡入时长 |
| `HOLD` | `3.5s` | 保持最大音量的时长 |
| `FADE_OUT` | `9s` | 渐弱到静音时长 |

> 总时长 ≈ `FADE_IN + HOLD + FADE_OUT` ≈ **13s**，之后静音。关闭彩蛋时以 `0.6s` 快速淡出。

**工作原理**：为摆脱定时器调度带来的不确定衰减，BGM 用 `OfflineAudioContext` **离线一次性渲染**成一段 8 小节的 `AudioBuffer`，再用**单个 `loop = true` 音源**播放，通过 `master` 增益节点做淡入 → 保持 → 淡出到静音。上下文若被浏览器挂起，由看门狗（每 1.5s）、`visibilitychange` 与用户手势三重重启兜底。

### 调整建议

- 想更短/更长：改 `HOLD` 与 `FADE_OUT`
- 想更轻/更响：改 `TARGET_GAIN`
- 想换风格：改 `BPM`、`PROG`

---

## 🍎 进站动画（「思考中」加载）

- 全屏遮罩 `.intro-overlay`：品牌字 `miralexand` + 旋转加载环 + **「思考中」** + 三个跳动小点
- 时间轴：
  | 时间 | 动作 |
  | --- | --- |
  | `0 – 2.2s` | 显示加载动画（思考中） |
  | `2.2 – 3.0s` | 遮罩淡出（`.intro-overlay` 的 `introOut`） |
  | `2.2 – 3.3s` | 整站淡入揭示：`opacity 0→1` + `scale 1.012→1` + `blur 7px→0`（`.app-enter`） |
  | `3.2s` | 卸载遮罩（`src/components/Intro.tsx` 的 `3200`） |
- 相关样式在 `src/index.css`：`.intro-overlay / .intro-spinner / .intro-text / .intro-dot / .app-enter`
- 首次加载**不会**播放赛博朋克切换动画（`CyberFX` 内部用 `first` 标记跳过首帧）
- 尊重 `prefers-reduced-motion`：减少动效时直接显示内容

---

## 🛰️ 首屏 HUD 读数说明

首屏中央有**四个遥测数据**（定义在 [`src/components/Hero.tsx`](src/components/Hero.tsx) 的 `telemetry` 数组），灵感来自飞船 / Endurance 的仪表盘，纯装饰性：

| 字段 | 默认值 | 含义 |
| --- | --- | --- |
| `O2` | `98.0%` | 氧气含量 / 生命维持 |
| `FUEL` | `76.4%` | 燃料余量 |
| `SPIN` | `0.86g` | 自旋产生的**人工重力**（《星际穿越》中 Endurance 靠旋转模拟重力） |
| `TEMP` | `36.6°` | 体温 / 舱温 |

想换成其它指标，直接改这个数组即可，例如：

```ts
const telemetry = [
  { k: "CPU", v: "12%" },
  { k: "MEM", v: "6.2G" },
  { k: "NET", v: "1.2Gb" },
  { k: "PING", v: "8ms" },
];
```

此外首屏**四角**还有边缘读数（同一文件内，仅大屏显示）：左上 `ENDURANCE // UNIT-01` 与赤经/赤纬坐标，右上 `LINK STABLE / PWR / ROT`，左下 `NAV / BUILD`，右下**实时时钟**与地区。

---

## 🌐 部署到 GitHub Pages

仓库为 `<用户名>.github.io` 时会发布到根路径 `https://<用户名>.github.io/`。

1. 推送代码到 `main` 分支
2. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**
3. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 会自动构建并发布

> `vite.config.ts` 使用 `base: "./"`，根路径与子路径均可正常访问。

---

## 📁 目录结构

```
src/
├─ components/      # 页面与 UI 组件
│  ├─ Hero.tsx          首屏（黑洞 + HUD 遥测）
│  ├─ Bento.tsx         关于我（Bento 网格）
│  ├─ Projects.tsx      精选项目
│  ├─ Timeline.tsx      经历时间线
│  ├─ Contact.tsx       联系方式
│  ├─ Navbar.tsx        导航 + 主题开关 + 彩蛋按钮
│  ├─ ThemeToggle.tsx   iOS 风格昼夜开关
│  ├─ CyberFX.tsx       赛博朋克背景层 + 切换动画
│  ├─ Intro.tsx         进站加载动画（「思考中」）
│  ├─ Background.tsx    网格 / 星空 / 雷达
│  └─ Gargantua.tsx     黑洞矢量图
├─ hooks/
│  ├─ useTheme.ts       昼夜主题（全局 store）
│  └─ useCyber.ts       赛博朋克状态（全局 store）
├─ lib/
│  └─ cyberAudio.ts     过渡 BGM 合成器
├─ data.ts              所有个人数据
├─ index.css            主题变量与工具类
└─ App.tsx
```

---

## 📄 License

个人项目，仅供学习参考。
