import type { ReactNode } from "react";
import {
  Binary,
  Bot,
  CircuitBoard,
  Cog,
  Gauge,
  Mail,
  MapPin,
  Waypoints,
} from "lucide-react";
import { GithubIcon } from "./icons";
import TerminalTyper, { type Segment } from "./TerminalTyper";
import CornerFrame from "./CornerFrame";
import Section, { Reveal } from "./Section";
import { profile, projects, skillGroups, socials } from "../data";

const codeScript: Segment[] = [
  { kind: "cmd", text: "cat unit-01.spec" },
  { kind: "out", tone: "info", text: 'lang   = ["TypeScript", "Python", "Go"]' },
  { kind: "out", tone: "info", text: 'infra  = ["Docker", "Tunnel", "CI/CD"]' },
  { kind: "out", tone: "info", text: 'core   = ["LLM", "TTS", "Vision"]' },
  { kind: "cmd", text: "echo $DIRECTIVE" },
  { kind: "out", tone: "accent", text: profile.tagline },
];

const specs = [
  { value: "17", label: "公开仓库" },
  { value: String(projects.length), label: "开源项目" },
  { value: "2025", label: "入职信息科" },
  { value: "4y", label: "计算机本科" },
];

const subsystems = [
  "LLM 应用",
  "Prompt 工程",
  "视觉 / 生成",
  "TTS 语音",
  "Agent 工作流",
  "流程自动化",
];

function Tile({
  children,
  className = "",
  corners = false,
}: {
  children: ReactNode;
  className?: string;
  corners?: boolean;
}) {
  return (
    <div
      className={`panel panel-hover relative flex flex-col rounded-2xl p-6 ${className}`}
    >
      {corners ? <CornerFrame /> : null}
      {children}
    </div>
  );
}

function TileLabel({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-2 font-mono text-xs tracking-widest text-faint uppercase">
      <span className="text-accent">{icon}</span>
      [ {children} ]
    </div>
  );
}

export default function Bento() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="Unit-01"
      title="关于我"
      description="医院信息科工程师，业余把重复的事交给代码，把想法做成能跑的产品。"
    >
      <div className="grid auto-rows-auto gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal className="sm:col-span-2 lg:row-span-2">
          <Tile className="h-full" corners>
            <TileLabel icon={<Bot size={14} />}>Identity</TileLabel>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-accent/20 to-accent-3/10 text-accent">
                <Bot size={26} />
              </div>
              <div>
                <div className="font-mono text-lg font-semibold">
                  {profile.name}
                </div>
                <div className="font-mono text-sm text-muted">
                  {profile.role}
                </div>
              </div>
            </div>
            <p className="mt-5 leading-relaxed text-muted">{profile.bio}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-faint">
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} /> {profile.location}
              </span>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  {s.label === "GitHub" ? (
                    <GithubIcon size={15} />
                  ) : (
                    <Mail size={15} />
                  )}
                  {s.handle}
                </a>
              ))}
            </div>
          </Tile>
        </Reveal>

        <Reveal delay={0.05}>
          <Tile className="h-full">
            <TileLabel icon={<Gauge size={14} />}>Telemetry</TileLabel>
            <TerminalTyper
              script={codeScript}
              rows={6}
              loop={false}
              typingSpeed={50}
              outputDelay={420}
              startDelay={500}
            />
          </Tile>
        </Reveal>

        <Reveal delay={0.1}>
          <Tile className="h-full">
            <TileLabel icon={<CircuitBoard size={14} />}>Modules</TileLabel>
            <div className="space-y-3">
              {skillGroups.map((g) => (
                <div key={g.title} className="flex gap-3">
                  <span className="w-12 shrink-0 font-mono text-xs text-accent">
                    {g.title}
                  </span>
                  <span className="text-xs leading-relaxed text-muted">
                    {g.items.join(" · ")}
                  </span>
                </div>
              ))}
            </div>
          </Tile>
        </Reveal>

        <Reveal delay={0.05}>
          <Tile className="h-full">
            <TileLabel icon={<Cog size={14} />}>Subsystems</TileLabel>
            <ul className="flex flex-wrap gap-2">
              {subsystems.map((t) => (
                <li
                  key={t}
                  className="rounded-lg border border-line bg-panel-2 px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-ink"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Tile>
        </Reveal>

        <Reveal delay={0.1}>
          <Tile className="h-full">
            <TileLabel icon={<Waypoints size={14} />}>Specs</TileLabel>
            <div className="grid grid-cols-2 gap-4">
              {specs.map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-2xl font-semibold text-ink">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-faint">{s.label}</div>
                </div>
              ))}
            </div>
          </Tile>
        </Reveal>

        <Reveal delay={0.15} className="sm:col-span-2 lg:col-span-1">
          <Tile className="h-full">
            <TileLabel icon={<Binary size={14} />}>Directive</TileLabel>
            <p className="leading-relaxed text-muted">
              把 AI 能力带进医疗信息化场景：用自动化流水线处理重复工作，用
              Web 工具提升科室效率，持续探索「医学 + 工程」的交叉点。
            </p>
          </Tile>
        </Reveal>
      </div>
    </Section>
  );
}
