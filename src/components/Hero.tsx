import { motion } from "motion/react";
import { Bot, Mail } from "lucide-react";
import TypeLine from "./TypeLine";
import CornerFrame from "./CornerFrame";
import { GithubIcon } from "./icons";
import { profile } from "../data";

const phrases = [
  "> SYS.BOOT .......... OK",
  "> OPERATOR .......... miralexand",
  "> ROLE .............. 医院信息科 / 全栈开发者",
  "> MODE .............. EMBODIED // BUILD",
];

const telemetry = [
  { k: "PWR", v: "98%" },
  { k: "LINK", v: "STABLE" },
  { k: "SERVO", v: "6/6" },
  { k: "TEMP", v: "36.6°" },
];

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.09,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[92vh] w-full max-w-5xl flex-col items-center justify-center px-6 pt-28 pb-20 text-center"
    >
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        custom={0}
        className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-accent/20 to-accent-3/10 text-accent"
      >
        <CornerFrame />
        <Bot size={30} />
      </motion.div>

      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        custom={1}
        className="mt-6 inline-flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-1.5 font-mono text-xs tracking-widest text-muted uppercase"
      >
        <span className="led h-2 w-2 rounded-full bg-accent-4" />
        [ UNIT-01 · {profile.status} ]
      </motion.div>

      <motion.h1
        variants={fade}
        initial="hidden"
        animate="show"
        custom={2}
        className="mt-7 font-mono text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
      >
        <span className="text-gradient glow">miralexand</span>
      </motion.h1>

      <motion.p
        variants={fade}
        initial="hidden"
        animate="show"
        custom={3}
        className="mt-5 h-6 font-mono text-sm text-accent sm:text-base"
      >
        <TypeLine phrases={phrases} />
      </motion.p>

      <motion.p
        variants={fade}
        initial="hidden"
        animate="show"
        custom={4}
        className="mt-6 max-w-2xl text-balance leading-relaxed text-muted"
      >
        {profile.bio}
      </motion.p>

      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        custom={5}
        className="mt-9 grid w-full max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4"
      >
        {telemetry.map((t) => (
          <div
            key={t.k}
            className="flex flex-col items-center gap-1 bg-bg-soft/60 px-4 py-3 backdrop-blur"
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
        custom={6}
        className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm"
      >
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-mono text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
        >
          查看项目
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-5 py-2.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
        >
          <GithubIcon size={15} /> GitHub
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-5 py-2.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
        >
          <Mail size={15} /> 邮箱
        </a>
      </motion.div>

      <p className="mt-6 font-mono text-[11px] text-faint">
        按{" "}
        <kbd className="rounded border border-line bg-panel px-1.5 py-0.5">
          ⌘K
        </kbd>{" "}
        打开命令面板
      </p>
    </section>
  );
}
