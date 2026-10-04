import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

let current: Theme =
  typeof document !== "undefined" &&
  document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";

const listeners = new Set<() => void>();

function apply(theme: Theme) {
  current = theme;
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    () => current,
    () => "dark" as Theme,
  );

  const toggle = useCallback(() => {
    apply(current === "dark" ? "light" : "dark");
  }, []);

  return { theme, toggle };
}
