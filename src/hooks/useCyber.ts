import { useCallback, useSyncExternalStore } from "react";

const isOn = () =>
  typeof document !== "undefined" &&
  document.documentElement.getAttribute("data-cyber") === "on";

let current = isOn();

const listeners = new Set<() => void>();

function apply(on: boolean) {
  current = on;
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-cyber", on ? "on" : "off");
  }
  try {
    localStorage.setItem("cyber", on ? "on" : "off");
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useCyber() {
  const cyber = useSyncExternalStore(
    subscribe,
    () => current,
    () => false,
  );

  const toggle = useCallback(() => {
    apply(!current);
  }, []);

  return { cyber, toggle };
}
