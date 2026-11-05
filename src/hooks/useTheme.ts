import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

/** 白天时段：[06:00, 18:00)，其余为夜间 */
const DAY_START_HOUR = 6;
const NIGHT_START_HOUR = 18;
const AUTO_CHECK_MS = 60_000;

/** 按用户设备本地时间判断此刻应该用哪个主题 */
export function autoTheme(date = new Date()): Theme {
  const hour = date.getHours();
  return hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR ? "light" : "dark";
}

function readDomTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

let current: Theme = readDomTheme();
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function emit() {
  listeners.forEach((l) => l());
}

/** 用户手动选过主题则返回该值，否则 null（= 自动跟随时间） */
function storedPreference(): Theme | null {
  try {
    const saved = localStorage.getItem("theme");
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

function setTheme(theme: Theme, persist: boolean) {
  current = theme;
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
  if (persist) {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }
  emit();
}

/** 手动切换：记住选择，并停止自动跟随 */
function toggleTheme() {
  setTheme(current === "dark" ? "light" : "dark", true);
}

/** 恢复自动：清除手动偏好，立即按本地时间应用 */
function followTime() {
  try {
    localStorage.removeItem("theme");
  } catch {
    /* ignore */
  }
  setTheme(autoTheme(), false);
}

/** 无手动偏好时，跟随时间自动切换（每分钟检查一次，跨过 6:00/18:00 时生效） */
function syncWithTime() {
  if (storedPreference()) return;
  const next = autoTheme();
  if (next !== current) setTheme(next, false);
}

if (typeof window !== "undefined") {
  syncWithTime();
  window.setInterval(syncWithTime, AUTO_CHECK_MS);
  // 手机切回页面时立即校正，避免后台计时器被节流
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) syncWithTime();
  });
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    () => current,
    () => "dark" as Theme,
  );

  const toggle = useCallback(() => toggleTheme(), []);
  const follow = useCallback(() => followTime(), []);

  return { theme, toggle, follow };
}
