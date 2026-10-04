import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon } from "./icons";
import { profile } from "../data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="text-center sm:text-left">
          <a
            href={profile.site}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm text-ink transition-colors hover:text-accent"
          >
            {profile.englishName}
            <span className="text-faint">.github.io</span>
          </a>
          <p className="mt-1 font-mono text-xs text-faint">
            © {year} {profile.name} · [ SYS.OK ] built with React
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-accent/50 hover:text-ink"
          >
            <GithubIcon size={17} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-accent/50 hover:text-ink"
          >
            <Mail size={17} />
          </a>
          <a
            href="#home"
            aria-label="回到顶部"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-accent/50 hover:text-ink"
          >
            <ArrowUp size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
