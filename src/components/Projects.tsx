import { ExternalLink, FolderGit2, Star } from "lucide-react";
import { GithubIcon } from "./icons";
import { projects, profile } from "../data";
import Section, { Reveal } from "./Section";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  return (
    <Section
      id="projects"
      index="02"
      eyebrow="Deployed"
      title="核心项目"
      description="精选最具含金量的几个项目，涵盖 AI 自动化、内网运维与企业级 Web 系统。"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {featured.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.05}>
            <article className="panel panel-hover group flex h-full flex-col rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-panel-2 text-accent transition-colors group-hover:border-accent/50">
                  <FolderGit2 size={20} />
                </span>
                <div className="flex items-center gap-1">
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} 源码`}
                      className="flex h-9 w-9 items-center justify-center rounded-md text-faint transition-colors hover:bg-panel-2 hover:text-ink"
                    >
                      <GithubIcon size={17} />
                    </a>
                  ) : null}
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} 演示`}
                      className="flex h-9 w-9 items-center justify-center rounded-md text-faint transition-colors hover:bg-panel-2 hover:text-ink"
                    >
                      <ExternalLink size={17} />
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <h3 className="font-mono text-lg font-medium">{project.name}</h3>
                {project.featured ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-accent uppercase">
                    <Star size={10} /> Featured
                  </span>
                ) : null}
              </div>

              <p className="mt-2 text-sm font-medium text-muted">
                {project.summary}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-faint">
                {project.description}
              </p>

              <div className="mt-auto pt-6">
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="font-mono text-xs text-faint"
                    >
                      #{tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-line pt-4 font-mono text-xs text-faint">
                  {project.year}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-8 flex justify-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-5 py-3 font-mono text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
          >
            <GithubIcon size={16} />
            在 GitHub 查看全部仓库
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
