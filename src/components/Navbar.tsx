import { useEffect, useState } from "react";
import { Bot, Menu, Search, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { GithubIcon } from "./icons";
import { nav, profile } from "../data";

const ids = nav.map((n) => n.href.replace("#", ""));

function useActive(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const onScroll = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

export default function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActive(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-bg/70 backdrop-blur-xl" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-panel text-accent">
            <Bot size={16} />
          </span>
          <span className="font-mono text-sm font-medium">
            miralexand<span className="text-faint">.dev</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden items-center gap-2 rounded-lg border border-line bg-panel px-3 py-2 text-xs text-faint transition-colors hover:border-accent-2/50 hover:text-ink sm:flex"
          >
            <Search size={13} />
            <span>搜索</span>
            <kbd className="rounded border border-line bg-panel-2 px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>
          </button>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent-2/50 hover:text-ink sm:flex"
          >
            <GithubIcon size={16} />
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="菜单"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink md:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-line bg-bg/95 backdrop-blur-xl md:hidden">
          <ul className="mx-auto max-w-6xl px-6 py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-muted transition-colors hover:bg-panel hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
