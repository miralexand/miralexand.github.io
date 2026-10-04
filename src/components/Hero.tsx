import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Mail } from "lucide-react";
import TypeLine from "./TypeLine";
import CornerFrame from "./CornerFrame";
import Gargantua from "./Gargantua";
import Logo from "./Logo";
import { GithubIcon } from "./icons";
import { profile } from "../data";

const phrases = [
  "> SYS.BOOT .......... OK",
  "> OPERATOR .......... miralexand",
  "> ROLE .............. 医院信息科 / 全栈开发者",
  "> VECTOR ............ GARGANTUA // 0.86g",
];

const telemetry = [
  { k: "O2", v: "98.0%" },
  { k: "FUEL", v: "76.4%" },
  { k: "SPIN", v: "0.86g" },
  { k: "TEMP", v: "36.6°" },
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function EdgeReadout({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`pointer-events-none absolute hidden font-mono text-[10px] leading-relaxed tracking-wider text-faint lg:block ${className}`}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 pb-20"
    >
      <Gargantua className="pointer-events-none absolute top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 opacity-30" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[55vmin] w-[55vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[140px]" />

      <CornerFrame size="lg" className="pointer-events-none absolute inset-4 sm:inset-6" />

      <EdgeReadout className="top-16 left-8">
        <div className="text-accent">ENDURANCE // UNIT-01</div>
        <div>RA 05h 34m 31s</div>
        <div>DEC +22° 00′ 52″</div>
      </EdgeReadout>

      <EdgeReadout className="top-16 right-8 text-right">
        <div className="flex items-center justify-end gap-1.5 text-accent-4">
          <span className="led h-1.5 w-1.5 rounded-full bg-accent-4" />
          LINK STABLE
        </div>
        <div>PWR 98.0%</div>
        <div>ROT 5.6 RPM</div>
      </EdgeReadout>

      <EdgeReadout className="bottom-12 left-8">
        <div>NAV 2.4.0</div>
        <div>BUILD 2026.10</div>
      </EdgeReadout>

      <EdgeReadout className="right-8 bottom-12 text-right">
        <div className="text-ink">
          {now.toLocaleTimeString("zh-CN", { hour12: false })}
        </div>
        <div>CN · GUIZHOU</div>
      </EdgeReadout>

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-3 rounded-md border border-line bg-panel/70 px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-muted uppercase backdrop-blur"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded border border-line text-accent">
            <Logo size={13} />
          </span>
          [ UNIT-01 · {profile.status} ]
        </motion.div>

        <motion.h1
          variants={fade}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-8 font-mono text-5xl leading-none font-medium tracking-[-0.03em] text-balance sm:text-7xl lg:text-8xl"
        >
          <span className="cyber-name text-ink">miralexand</span>
        </motion.h1>

        <div className="mx-auto mt-6 h-0.5 w-28 hazard-soft opacity-70" />

        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 h-6 font-mono text-sm text-accent sm:text-base"
        >
          <TypeLine phrases={phrases} />
        </motion.p>

        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          custom={3}
          className="mx-auto mt-6 max-w-2xl text-balance leading-relaxed text-muted"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          custom={4}
          className="mx-auto mt-9 grid w-full max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4"
        >
          {telemetry.map((t) => (
            <div
              key={t.k}
              className="flex flex-col items-center gap-1 bg-bg-soft/70 px-4 py-3 backdrop-blur"
            >
              <span className="font-mono text-[10px] tracking-widest text-faint">
                {t.k}
              </span>
              <span className="font-mono text-sm text-ink">{t.v}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          custom={5}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            查看项目
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-5 py-2.5 font-mono text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
          >
            <GithubIcon size={15} /> GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-5 py-2.5 font-mono text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
          >
            <Mail size={15} /> 邮箱
          </a>
        </motion.div>

        <p className="mt-7 font-mono text-[11px] text-faint">
          按{" "}
          <kbd className="rounded border border-line bg-panel px-1.5 py-0.5">
            ⌘K
          </kbd>{" "}
          打开命令面板
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-faint uppercase sm:flex">
        scroll
        <span className="h-8 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
