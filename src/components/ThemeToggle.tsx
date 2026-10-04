import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "切换到明亮主题" : "切换到暗色主题"}
      title={isDark ? "切换到明亮主题" : "切换到暗色主题"}
      onClick={toggle}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-line transition-colors duration-300 ${
        isDark ? "bg-panel-2" : "bg-accent/85"
      } ${className}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 flex h-5 w-5 items-center justify-center rounded-full shadow-md transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isDark
            ? "translate-x-0 bg-panel text-accent"
            : "translate-x-5 bg-white text-amber-500"
        }`}
      >
        {isDark ? <Moon size={11} /> : <Sun size={11} />}
      </span>
    </button>
  );
}
