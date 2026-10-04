import { motion } from "motion/react";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
};

export default function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className="relative mx-auto w-full max-w-5xl px-5 py-14 sm:px-8 sm:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 max-w-2xl"
      >
        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-accent uppercase">
          <span className="text-faint">[{index}]</span>
          <span className="h-px w-8 bg-accent/50" />
          <span>[ {eyebrow} ]</span>
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 leading-relaxed text-muted">{description}</p>
        ) : null}
      </motion.div>
      {children}
    </section>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
