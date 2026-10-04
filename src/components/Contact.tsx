import { useState } from "react";
import { Check, Copy, Mail, Send } from "lucide-react";
import { GithubIcon } from "./icons";
import { profile, socials } from "../data";
import Section, { Reveal } from "./Section";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <Section
      id="contact"
      index="04"
      eyebrow="Uplink"
      title="联系方式"
      description="有合作、招聘或技术交流的想法？欢迎随时联系我，我会尽快回复。"
    >
      <Reveal>
        <div className="panel relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-[120px]" />

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="font-mono text-sm text-accent">$ contact --me</p>
              <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">
                让我们一起做点有意思的事
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted">
                {profile.bio}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
                >
                  <Send size={16} /> 发邮件
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-5 py-3 font-mono text-sm text-ink transition-colors hover:border-accent/50"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-accent-3" /> 已复制
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> 复制邮箱
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-4 rounded-xl border border-line bg-panel-2 p-4 transition-colors hover:border-accent/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Mail size={19} />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-xs text-faint">
                    Email
                  </span>
                  <span className="block truncate font-mono text-sm text-ink group-hover:text-accent">
                    {profile.email}
                  </span>
                </span>
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-line bg-panel-2 p-4 transition-colors hover:border-accent/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-2/10 text-accent-2">
                  <GithubIcon size={19} />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-xs text-faint">
                    GitHub
                  </span>
                  <span className="block truncate font-mono text-sm text-ink group-hover:text-accent">
                    {profile.github.replace(/^https?:\/\//, "")}
                  </span>
                </span>
              </a>

              {socials
                .filter((s) => s.label !== "GitHub" && s.label !== "Email")
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 rounded-xl border border-line bg-panel-2 p-4 transition-colors hover:border-accent/50"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-panel text-muted">
                      {s.label.slice(0, 1)}
                    </span>
                    <span className="font-mono text-sm text-ink">{s.handle}</span>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
