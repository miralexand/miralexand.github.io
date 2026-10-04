import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

type Phase = "idle" | "entering" | "hanging" | "fleeing" | "gone";

const REST_Y = 150;
const START_Y = -70;
const GONE_Y = -90;
const MIN_X = 24;
const RIGHT_MARGIN = 64;

const clampX = (x: number, vw: number) =>
  Math.max(MIN_X, Math.min(x, Math.max(MIN_X, vw - RIGHT_MARGIN)));

function SpiderSvg({ pupilsRef }: { pupilsRef: RefObject<SVGGElement | null> }) {
  return (
    <svg width="46" height="46" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <g
        stroke="#15151b"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.95"
      >
        <g className="legs-left">
          <path d="M18 24 C 10 20, 6 16, 4 10" />
          <path d="M17 28 C 8 27, 4 24, 2 20" />
          <path d="M17 32 C 8 34, 3 33, 0 30" />
          <path d="M19 35 C 11 40, 7 42, 5 46" />
        </g>
        <g className="legs-right">
          <path d="M30 24 C 38 20, 42 16, 44 10" />
          <path d="M31 28 C 40 27, 44 24, 46 20" />
          <path d="M31 32 C 40 34, 45 33, 48 30" />
          <path d="M29 35 C 37 40, 41 42, 43 46" />
        </g>
      </g>

      <ellipse
        cx="24"
        cy="30"
        rx="9"
        ry="10"
        fill="#1c1c22"
        stroke="var(--accent)"
        strokeWidth="1.2"
      />
      <circle
        cx="24"
        cy="18"
        r="7"
        fill="#23232b"
        stroke="var(--accent)"
        strokeWidth="1.2"
      />

      <circle cx="21.2" cy="17.6" r="3" fill="#ffffff" />
      <circle cx="26.8" cy="17.6" r="3" fill="#ffffff" />
      <g ref={pupilsRef} className="spider-pupils">
        <circle cx="21.6" cy="18.1" r="1.5" fill="#111111" />
        <circle cx="27.2" cy="18.1" r="1.5" fill="#111111" />
      </g>
      <circle cx="20.7" cy="16.6" r="0.8" fill="#ffffff" />
      <circle cx="26.3" cy="16.6" r="0.8" fill="#ffffff" />
      <path
        d="M22.5 21.4 Q 24 22.8 25.5 21.4"
        stroke="#8a8a92"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SpiderEgg() {
  const [phase, setPhase] = useState<Phase>("idle");

  const spiderRef = useRef<HTMLDivElement | null>(null);
  const threadRef = useRef<HTMLDivElement | null>(null);
  const pupilsRef = useRef<SVGGElement | null>(null);
  const bobRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef({ x: 400, y: REST_Y });
  const phaseRef = useRef<Phase>("idle");
  const lastActivityRef = useRef(Date.now());
  const lastYRef = useRef(0);
  const anchorRef = useRef({ x: 400, restY: REST_Y, startY: START_Y });

  phaseRef.current = phase;

  const apply = useCallback((x: number, y: number) => {
    posRef.current = { x, y };
    if (spiderRef.current) {
      spiderRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
    if (threadRef.current) {
      threadRef.current.style.left = `${x + 22}px`;
      threadRef.current.style.height = `${Math.max(0, y + 18)}px`;
    }
  }, []);

  const setTransition = useCallback((v: string) => {
    if (spiderRef.current) spiderRef.current.style.transition = v;
    if (threadRef.current) {
      threadRef.current.style.transition = v ? "height 1.3s ease" : "none";
    }
  }, []);

  const attachSpider = useCallback((el: HTMLDivElement | null) => {
    spiderRef.current = el;
    if (el) {
      el.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
    }
  }, []);

  const attachThread = useCallback((el: HTMLDivElement | null) => {
    threadRef.current = el;
    if (el) {
      el.style.left = `${posRef.current.x + 22}px`;
      el.style.height = `${Math.max(0, posRef.current.y + 18)}px`;
    }
  }, []);

  useEffect(() => {
    const onResize = () => {
      const p = phaseRef.current;
      if (p === "hanging" || p === "entering" || p === "fleeing") {
        const x = clampX(posRef.current.x, window.innerWidth);
        apply(x, posRef.current.y);
      }
    };
    lastYRef.current = window.scrollY;
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [apply]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fast = new URLSearchParams(window.location.search).has("spider");
    const delay = fast ? 1500 : 25000;
    lastActivityRef.current = Date.now();
    const iv = window.setInterval(() => {
      const p = phaseRef.current;
      if (p !== "idle" && p !== "gone") return;
      if (Date.now() - lastActivityRef.current >= delay) {
        const maxX = Math.max(MIN_X, window.innerWidth - RIGHT_MARGIN);
        const x = Math.round(MIN_X + Math.random() * (maxX - MIN_X));
        anchorRef.current = { x, restY: REST_Y, startY: START_Y };
        posRef.current = { x, y: START_Y };
        setPhase("entering");
      }
    }, 400);
    return () => window.clearInterval(iv);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      lastYRef.current = window.scrollY;
      lastActivityRef.current = Date.now();
      if (
        phaseRef.current === "entering" ||
        phaseRef.current === "hanging"
      ) {
        setPhase("fleeing");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mark = () => {
      lastActivityRef.current = Date.now();
    };
    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "keydown",
      "wheel",
      "touchstart",
    ];
    events.forEach((e) => window.addEventListener(e, mark, { passive: true }));
    return () =>
      events.forEach((e) => window.removeEventListener(e, mark));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const p = phaseRef.current;
      if (p !== "hanging" && p !== "entering") return;
      const cx = posRef.current.x + 23;
      const cy = posRef.current.y + 25;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const len = Math.hypot(dx, dy) || 1;
      const mag = Math.min(1.9, len * 0.02);
      const ox = (dx / len) * mag;
      const oy = (dy / len) * mag;
      if (pupilsRef.current) {
        pupilsRef.current.style.transform = `translate(${ox.toFixed(2)}px, ${oy.toFixed(2)}px)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (phase === "entering") {
      const { x, restY } = anchorRef.current;
      const t1 = window.setTimeout(() => {
        setTransition("transform 1.3s cubic-bezier(0.33, 1, 0.68, 1)");
        apply(x, restY);
      }, 30);
      const t2 = window.setTimeout(() => setPhase("hanging"), 1450);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }
    if (phase === "hanging") {
      setTransition("");
      return;
    }
    if (phase === "fleeing") {
      const { x } = anchorRef.current;
      setTransition("transform 0.75s cubic-bezier(0.4, 0, 1, 1)");
      apply(x, GONE_Y);
      const t = window.setTimeout(() => setPhase("gone"), 820);
      return () => window.clearTimeout(t);
    }
  }, [phase, apply, setTransition]);

  const hop = useCallback(() => {
    if (phaseRef.current !== "hanging") return;
    const el = bobRef.current;
    if (el) {
      el.classList.remove("spider-bob");
      void el.offsetWidth;
      el.classList.add("spider-bob");
    }
  }, []);

  if (phase === "idle" || phase === "gone") return null;

  const moving = phase === "entering" || phase === "fleeing";
  const clickable = phase === "hanging" || phase === "entering";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      <div
        ref={attachThread}
        className="absolute top-0 w-px"
        style={{ background: "color-mix(in srgb, var(--ink) 25%, transparent)" }}
      />

      <div
        ref={attachSpider}
        onClick={hop}
        className={`absolute top-0 left-0 ${
          clickable ? "pointer-events-auto cursor-pointer" : ""
        }`}
      >
        <div ref={bobRef} className={moving ? "spider-moving" : ""}>
          <SpiderSvg pupilsRef={pupilsRef} />
        </div>
      </div>
    </div>
  );
}
