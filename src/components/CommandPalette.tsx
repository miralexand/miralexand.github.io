import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Briefcase,
  CornerDownLeft,
  FolderGit2,
  Home,
  Mail,
  Moon,
  Search,
  Sun,
  User,
} from "lucide-react";
import { GithubIcon } from "./icons";
import { nav, profile } from "../data";
import { useTheme } from "../hooks/useTheme";

type Cmd = {
  id: string;
  label: string;
  hint: string;
  icon: ReactNode;
  run: () => void;
};

const sectionIcon: Record<string, ReactNode> = {
  home: <Home size={16} />,
  about: <User size={16} />,
  projects: <FolderGit2 size={16} />,
  timeline: <Briefcase size={16} />,
  contact: <Mail size={16} />,
};

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { theme, toggle } = useTheme();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = (id: string) => {
    onClose();
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
    );
  };

  const commands = useMemo<Cmd[]>(() => {
    const navCommands = nav.map((item) => {
      const id = item.href.replace("#", "");
      return {
        id: `nav-${id}`,
        label: `跳转到「${item.label}」`,
        hint: item.href,
        icon: sectionIcon[id] ?? <Search size={16} />,
        run: () => go(id),
      };
    });
    return [
      ...navCommands,
      {
        id: "github",
        label: "打开 GitHub 主页",
        hint: "@miralexand",
        icon: <GithubIcon size={16} />,
        run: () => {
          onClose();
          window.open(profile.github, "_blank");
        },
      },
      {
        id: "email",
        label: "发送邮件",
        hint: profile.email,
        icon: <Mail size={16} />,
        run: () => {
          onClose();
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "blog",
        label: "访问个人博客",
        hint: "miralexand.github.io/lingxuanxuan",
        icon: <FolderGit2 size={16} />,
        run: () => {
          onClose();
          window.open("https://miralexand.github.io/lingxuanxuan", "_blank");
        },
      },
      {
        id: "theme",
        label: `切换到${theme === "dark" ? "明亮" : "暗色"}主题`,
        hint: "theme",
        icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
        run: () => toggle(),
      },
    ];
  }, [theme, onClose]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(
    () =>
      commands.filter((c) =>
        c.label.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [commands, query],
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      const t = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[index]?.run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, index, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[14vh]"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="panel relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl shadow-black/40">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={16} className="text-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索页面、链接或命令…"
            className="w-full bg-transparent py-4 text-sm text-ink outline-none placeholder:text-faint"
          />
          <kbd className="rounded border border-line bg-panel-2 px-1.5 py-0.5 font-mono text-[10px] text-faint">
            ESC
          </kbd>
        </div>

        <ul className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-faint">
              没有匹配的结果
            </li>
          ) : (
            filtered.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  onMouseEnter={() => setIndex(i)}
                  onClick={c.run}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                    i === index ? "bg-accent-2/15 text-ink" : "text-muted"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      i === index
                        ? "bg-accent-2/20 text-accent-2"
                        : "bg-panel-2 text-faint"
                    }`}
                  >
                    {c.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm">{c.label}</span>
                    <span className="block truncate font-mono text-[11px] text-faint">
                      {c.hint}
                    </span>
                  </span>
                  {i === index ? (
                    <CornerDownLeft size={14} className="text-faint" />
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
