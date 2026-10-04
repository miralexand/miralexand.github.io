import { Briefcase, GraduationCap } from "lucide-react";
import { timeline } from "../data";
import Section, { Reveal } from "./Section";

export default function Timeline() {
  return (
    <Section
      id="timeline"
      index="03"
      eyebrow="Runtime"
      title="工作与学习经历"
      description="一路走来的关键节点，以及每段经历中沉淀下的成果。"
    >
      <div className="relative pl-8 sm:pl-10">
        <span className="absolute top-1 bottom-1 left-[11px] w-px bg-gradient-to-b from-accent/60 via-line to-transparent sm:left-[15px]" />

        <div className="space-y-8">
          {timeline.map((item, i) => {
            const isWork = item.type === "work";
            const Icon = isWork ? Briefcase : GraduationCap;
            return (
              <Reveal key={item.title + item.period} delay={i * 0.06}>
                <div className="relative">
                  <span
                    className={`absolute top-1.5 -left-8 flex h-6 w-6 items-center justify-center rounded-full border sm:-left-10 ${
                      isWork
                        ? "border-accent/50 bg-accent/10 text-accent"
                        : "border-accent-2/50 bg-accent-2/10 text-accent-2"
                    }`}
                  >
                    <Icon size={13} />
                  </span>

                  <div className="panel panel-hover rounded-2xl p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-accent">
                        {item.period}
                      </span>
                      <span className="rounded-full border border-line bg-panel-2 px-2 py-0.5 font-mono text-[10px] text-faint uppercase">
                        {isWork ? "Work" : "Education"}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {item.org}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-faint">
                      {item.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex gap-2 text-sm text-muted"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-md border border-line bg-panel-2 px-2.5 py-1 font-mono text-xs text-faint"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
