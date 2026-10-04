export type Social = {
  label: string;
  href: string;
  handle: string;
};

export type SkillGroup = {
  title: string;
  icon: string;
  items: string[];
};

export type Project = {
  name: string;
  summary: string;
  description: string;
  tags: string[];
  year: string;
  featured?: boolean;
  repo?: string;
  demo?: string;
};

export type TimelineItem = {
  type: "work" | "education";
  period: string;
  title: string;
  org: string;
  location?: string;
  description: string;
  highlights: string[];
  tags: string[];
};

export type NavItem = { label: string; href: string };

export const profile = {
  name: "miralexand",
  englishName: "miralexand",
  role: "医院信息科 · 全栈开发者",
  tagline: "把重复的事交给代码，把创意留给自己。",
  bio: "一名医院信息科工程师，日常工作围绕医疗信息系统运维与内部工具开发，业余专注 Web 全栈、内网运维与 AI 应用自动化，喜欢把想法快速做成能跑的产品并沉淀为开源项目。",
  location: "中国 · 贵州",
  email: "dalingaixidelu@163.com",
  github: "https://github.com/miralexand",
  avatarInitials: "M",
  resumeUrl: "",
  status: "ONLINE · 开放合作",
};

export const nav: NavItem[] = [
  { label: "首页", href: "#home" },
  { label: "关于", href: "#about" },
  { label: "项目", href: "#projects" },
  { label: "经历", href: "#timeline" },
  { label: "联系", href: "#contact" },
];

export const socials: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/miralexand",
    handle: "@miralexand",
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    handle: profile.email,
  },
];

/** 技能栈：按分类展示 */
export const skillGroups: SkillGroup[] = [
  {
    title: "前端",
    icon: "Monitor",
    items: [
      "TypeScript",
      "React",
      "Vue 3",
      "Vite",
      "Tailwind CSS",
      "HTML / CSS",
      "响应式设计",
    ],
  },
  {
    title: "后端",
    icon: "Server",
    items: [
      "Node.js",
      "Python",
      "REST API",
      "WebSocket",
      "Oracle",
      "MySQL",
      "SQLite",
    ],
  },
  {
    title: "AI 与自动化",
    icon: "Cloud",
    items: [
      "LLM 应用",
      "文生图 / 图生视频",
      "TTS 语音合成",
      "FFmpeg",
      "Prompt 工程",
      "流程自动化",
    ],
  },
  {
    title: "工程与运维",
    icon: "Wrench",
    items: [
      "Docker",
      "Cloudflare Tunnel",
      "GitHub Actions",
      "Linux",
      "Nginx",
      "自托管部署",
    ],
  },
];

/** 项目作品集：来自 github.com/miralexand */
export const projects: Project[] = [
  {
    name: "WebPrint 打印助手",
    summary: "可自托管的网页打印系统，一个 exe 搞定打印服务。",
    description:
      "一体化 Windows 桌面应用，同时内置网页打印服务、本地打印与 Cloudflare Tunnel，无需公网 IP 即可远程提交打印任务，配置简单、开箱即用。",
    tags: ["JavaScript", "Windows", "Cloudflare Tunnel", "自托管"],
    year: "2026",
    featured: true,
    repo: "https://github.com/miralexand/web-print",
    demo: "https://github.com/miralexand/web-print/releases",
  },
  {
    name: "MediLink 医联",
    summary: "面向医院信息科的内网远程协助系统。",
    description:
      "Docker 自托管的被控端 Agent 与信息科控制端，复用 RustDesk 的屏幕采集、P2P 直连与中继能力。数据不出内网，支持批量静默部署、设备台账、会话审计，对等保合规友好。",
    tags: ["TypeScript", "RustDesk", "Docker", "内网运维"],
    year: "2026",
    featured: true,
    repo: "https://github.com/miralexand/MediLink",
  },
  {
    name: "AI 漫剧自动化流水线",
    summary: "把 AI 漫剧制作中重复耗时的环节交给 Python 自动完成。",
    description:
      "输入一个故事梗概，自动输出结构化分镜、角色画面、动态视频、配音与最终成片。将 LLM、文生图、图生视频、TTS、FFmpeg 串联成可并行、可复用、有容错的流水线，并可打包为 Windows 可执行程序分发。",
    tags: ["Python", "PySide6", "LLM", "TTS", "FFmpeg"],
    year: "2026",
    featured: true,
    repo: "https://github.com/miralexand/ai-manga-pipeline",
  },
  {
    name: "医院工单管理系统",
    summary: "专为医疗机构设计的现代化工单系统。",
    description:
      "基于 Vue 3 + TypeScript + Vite 构建，覆盖工单创建、查看、编辑到状态闭环的全流程，支持 WebSocket 实时通知、强大的搜索筛选与状态跟踪，优化医院内部工作流程。",
    tags: ["Vue 3", "TypeScript", "Vite", "WebSocket"],
    year: "2026",
    featured: true,
    repo: "https://github.com/miralexand/dataticket",
  },
  {
    name: "Oracle 数据库监控告警",
    summary: "轻量级、跨平台的 Oracle 健康监测工具。",
    description:
      "定时轮询数据库状态，异常时写入日志并通过 SMTP 邮件通知管理员。部署简单、资源占用低，适合生产环境的日常巡检与告警。",
    tags: ["Python", "Oracle", "SMTP", "监控告警"],
    year: "2026",
    repo: "https://github.com/miralexand/oracle-monitor",
  },
  {
    name: "局域网代理网关",
    summary: "把宿主机变成整个局域网的代理网关。",
    description:
      "使用 Docker 部署 mihomo 内核，内网设备只需把系统或浏览器代理设置为「宿主机 IP:7890」即可访问外网。另提供桌面版：一个 exe，打开即用，内置开关、日志、流量与连接统计。",
    tags: ["JavaScript", "Docker", "mihomo", "网络"],
    year: "2026",
    repo: "https://github.com/miralexand/mihomo-lan-gateway",
  },
  {
    name: "GPT-panel 聊天界面",
    summary: "现代化、优雅的 GPT 聊天界面。",
    description:
      "基于 React 18 + TypeScript + Vite + Tailwind CSS 构建，支持多种 GPT 模型、消息本地持久化、自定义 API 端点与实时 API 日志面板，内置代码高亮与 Markdown 渲染。",
    tags: ["React", "TypeScript", "Tailwind CSS", "OpenAI"],
    year: "2024",
    repo: "https://github.com/miralexand/GPT-panel",
  },
  {
    name: "林轩轩的博客",
    summary: "基于 Gmeek 的个人博客站点。",
    description:
      "使用 Gmeek 生成并托管在 GitHub Pages 的个人博客，用于记录学习笔记与技术实践，持续更新。",
    tags: ["Gmeek", "GitHub Pages", "博客"],
    year: "2024",
    repo: "https://github.com/miralexand/lingxuanxuan",
    demo: "https://miralexand.github.io/lingxuanxuan",
  },
  {
    name: "飞机大战",
    summary: "移动端网页小游戏。",
    description:
      "用滑动操作战机的移动端网页游戏，节奏紧张、无尽挑战，考验反应速度，浏览器打开即玩。",
    tags: ["JavaScript", "Canvas", "Game"],
    year: "2023",
    repo: "https://github.com/miralexand/Airplane-war",
    demo: "http://8.130.45.221/",
  },
];

/** 工作与学习经历时间线 */
export const timeline: TimelineItem[] = [
  {
    type: "work",
    period: "2025.07 — 至今",
    title: "信息科科员",
    org: "某二甲医院",
    location: "贵州",
    description:
      "负责医院信息系统的日常运维与内部工具开发，保障业务系统稳定运行。",
    highlights: [
      "维护医院核心业务系统的稳定运行，处理日常故障与需求",
      "面向科室开发内部工具，把重复的运维与报表工作自动化",
      "负责内网设备、网络与权限管理，提升信息科响应效率",
    ],
    tags: ["医疗信息化", "系统运维", "内部工具"],
  },
  {
    type: "education",
    period: "2021 — 2025",
    title: "计算机类专业 · 本科",
    org: "贵州中医药大学",
    location: "贵州",
    description: "本科在读，主修计算机类专业，系统学习软件开发与计算机基础。",
    highlights: [
      "在校期间持续参与技术实践与开源项目开发",
      "将医学场景与软件开发结合，沉淀多个实用工具",
    ],
    tags: ["计算机科学", "本科", "开源实践"],
  },
];
