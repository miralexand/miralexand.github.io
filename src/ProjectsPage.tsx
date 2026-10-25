import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarClock,
  FolderGit2,
  GitFork,
  Search,
  Star,
  X,
} from "lucide-react";
import Background from "./components/Background";
import CyberFX from "./components/CyberFX";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SpiderEgg from "./components/SpiderEgg";
import { GithubIcon } from "./components/icons";
import { profile } from "./data";
import {
  githubProjects,
  projectsSyncedAt,
  type ProjectRepo,
} from "./generated/projects.generated";

const languageColor: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Vue: "#41b883",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00add8",
  Rust: "#dea584",
  Shell: "#89e051",
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replace(/\//g, ".");
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(date)
    .replace(/\//g, ".");
}

function matches(project: ProjectRepo, query: string) {
  const haystack = [
    project.name,
    project.description,
    project.language,
    ...project.topics,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="flex flex-col gap-1 bg-bg-soft/70 px-4 py-3 backdrop-blur">
      <span className="font-mono text-[10px] tracking-widest text-faint">
        {label}
      </span>
      <span className="font-mono text-lg text-ink">{value}</span>
      <span className="font-mono text-[10px] text-faint">{hint}</span>
    </div>
  );
}

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("ALL");

  const languages = useMemo(() => {
    const set = new Set(
      githubProjects.map((project) => project.language).filter(Boolean),
    );
    return ["ALL", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return githubProjects.filter(
      (project) =>
        (language === "ALL" || project.language === language) &&
        (q ? matches(project, q) : true),
    );
  }, [query, language]);

  const totalStars = githubProjects.reduce(
    (sum, project) => sum + project.stars,
    0,
  );
  const totalForks = githubProjects.reduce(
    (sum, project) => sum + project.forks,
    0,
  );

  return (
    <div id="top" className="relative min-h-screen">
      <Background />
      <CyberFX />
      <Navbar homeHref="./index.html" />

      <main className="relative pt-28 pb-16 sm:pt-32">
        <section className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href="./index.html"
              className="inline-flex items-center gap-2 font-mono text-xs text-faint transition-colors hover:text-ink"
            >
              <ArrowLeft size={14} />
              返回首页
            </a>

            <div className="mt-8 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-accent uppercase">
              <span className="text-faint">[ INDEX ]</span>
              <span className="h-px w-8 bg-accent/50" />
              <span>[ PROJECT ARCHIVE ]</span>
            </div>

            <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                  全部项目
                </h1>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                  GitHub 公开仓库的自动快照。每天凌晨 02:00
                  同步一次，记录正在做的事，也保留走过的路。
                </p>
              </div>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-line bg-panel px-4 py-2.5 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-ink"
              >
                <GithubIcon size={15} />@{profile.name}
                <ArrowUpRight size={13} />
              </a>
            </div>

            <div className="mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-line bg-panel/60 px-4 py-2.5 font-mono text-[11px] text-faint">
              <span className="flex items-center gap-1.5 text-accent-4">
                <span className="led h-1.5 w-1.5 rounded-full bg-accent-4" />
                AUTO-SYNC · 02:00
              </span>
              <span className="hidden h-3 w-px bg-line sm:block" />
              <span className="flex items-center gap-1.5">
                <CalendarClock size={12} />
                快照 {formatDateTime(projectsSyncedAt)}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4"
          >
            <Stat
              label="REPOS"
              value={String(githubProjects.length)}
              hint="公开仓库"
            />
            <Stat
              label="LANG"
              value={String(languages.length - 1)}
              hint="技术语言"
            />
            <Stat label="STARS" value={String(totalStars)} hint="累计收藏" />
            <Stat label="FORKS" value={String(totalForks)} hint="累计派生" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="relative w-full lg:max-w-xs">
              <Search
                size={15}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-faint"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索项目、语言或标签…"
                className="w-full rounded-lg border border-line bg-panel py-2.5 pr-9 pl-9 font-mono text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent/50"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="清空搜索"
                  className="absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-faint transition-colors hover:bg-panel-2 hover:text-ink"
                >
                  <X size={13} />
                </button>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {languages.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className={`rounded-md border px-2.5 py-1.5 font-mono text-[11px] transition-colors ${
                    language === item
                      ? "border-accent/50 bg-accent/10 text-accent"
                      : "border-line text-faint hover:border-accent/30 hover:text-ink"
                  }`}
                >
                  {item === "ALL" ? "全部" : item}
                </button>
              ))}
            </div>
          </motion.div>

          {filtered.length === 0 ? (
            <div className="panel mt-8 rounded-2xl px-6 py-16 text-center">
              <p className="font-mono text-sm text-faint">
                没有匹配的项目 · 换个关键词试试
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {filtered.map((project, i) => (
                <motion.article
                  key={project.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(i * 0.035, 0.35),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="panel panel-hover group flex h-full flex-col rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-panel-2 text-accent transition-colors group-hover:border-accent/50">
                        <FolderGit2 size={18} />
                      </span>
                      <a
                        href={project.htmlUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate font-mono text-base font-medium text-ink transition-colors hover:text-accent"
                      >
                        {project.name}
                      </a>
                    </div>
                    <a
                      href={project.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} 源码`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-faint transition-colors hover:bg-panel-2 hover:text-ink"
                    >
                      <ArrowUpRight size={15} />
                    </a>
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted">
                    {project.description || "暂无简介，前往 GitHub 查看详情。"}
                  </p>

                  {project.topics.length > 0 ? (
                    <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
                      {project.topics.map((topic) => (
                        <li
                          key={topic}
                          className="font-mono text-[11px] text-faint"
                        >
                          #{topic}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 font-mono text-[11px] text-faint">
                    {project.language ? (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              languageColor[project.language] ?? "var(--accent)",
                          }}
                        />
                        {project.language}
                      </span>
                    ) : null}
                    <span className="flex items-center gap-1">
                      <Star size={12} />
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} />
                      {project.forks}
                    </span>
                    <span className="ml-auto">
                      更新于 {formatDate(project.updatedAt)}
                    </span>
                  </div>

                  {project.homepage ? (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex w-fit items-center gap-1 font-mono text-[11px] text-accent transition-colors hover:text-ink"
                    >
                      在线演示 <ArrowUpRight size={11} />
                    </a>
                  ) : null}
                </motion.article>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
            <p className="font-mono text-[11px] text-faint">
              共 {filtered.length} / {githubProjects.length} 个项目
            </p>
            <a
              href="./index.html#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-4 py-2.5 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-ink"
            >
              <ArrowLeft size={13} />
              返回精选项目
            </a>
          </div>
        </section>
      </main>

      <Footer homeHref="./index.html" />
      <SpiderEgg />
    </div>
  );
}
