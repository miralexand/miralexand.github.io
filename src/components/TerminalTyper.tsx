import { useEffect, useState } from "react";

export type Tone =
  | "dim"
  | "ok"
  | "warn"
  | "err"
  | "info"
  | "accent"
  | "hex"
  | "plain";

export type Segment =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; tone?: Tone }
  | { kind: "blank" };

const toneClass: Record<Tone, string> = {
  dim: "text-faint",
  ok: "text-accent-3",
  warn: "text-yellow-400",
  err: "text-red-400",
  info: "text-accent",
  accent: "text-accent-2",
  hex: "text-accent-3/70",
  plain: "text-muted",
};

const ROW = 22;
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function Prompt() {
  return (
    <span className="flex shrink-0 items-center gap-1.5">
      <span className="text-accent-3">➜</span>
      <span className="text-accent">~</span>
    </span>
  );
}

export default function TerminalTyper({
  script,
  typingSpeed = 15,
  outputDelay = 110,
  startDelay = 300,
  rows = 15,
  loop = true,
}: {
  script: Segment[];
  typingSpeed?: number;
  outputDelay?: number;
  startDelay?: number;
  rows?: number;
  loop?: boolean;
}) {
  const [done, setDone] = useState<Segment[]>([]);
  const [typed, setTyped] = useState("");
  const [current, setCurrent] = useState<Segment | null>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      await sleep(startDelay);
      let i = 0;
      while (!cancelled) {
        const seg = script[i % script.length];
        setCurrent(seg);
        setTyped("");

        if (seg.kind === "cmd") {
          for (let c = 1; c <= seg.text.length && !cancelled; c++) {
            setTyped(seg.text.slice(0, c));
            await sleep(typingSpeed + Math.random() * 28);
          }
          await sleep(outputDelay);
        } else {
          await sleep(seg.kind === "blank" ? 60 : outputDelay);
        }

        if (cancelled) return;
        setDone((prev) => {
          const next = [...prev, seg];
          return next.length > 80 ? next.slice(-40) : next;
        });
        setCurrent(null);
        i++;

        if (!loop && i >= script.length) break;
      }
      if (!cancelled && !loop) setFinished(true);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [script, typingSpeed, outputDelay, startDelay, loop]);

  const extra = finished ? 1 : 0;
  const visible = done.slice(-(rows - 1 - extra));
  const all: (Segment | null)[] = current ? [...visible, current] : visible;

  return (
    <div
      className="relative overflow-hidden font-mono text-[12px] sm:text-[13px]"
      style={{ height: rows * ROW }}
    >
      {all.map((seg, i) => (
        <Row
          key={i}
          seg={seg}
          typed={typed}
          isCurrent={current !== null && i === all.length - 1}
        />
      ))}

      {finished ? (
        <p
          className="flex items-center gap-2 text-faint"
          style={{ height: ROW }}
        >
          <Prompt />
          <span className="cursor-blink inline-block h-3.5 w-2 translate-y-0.5 bg-accent" />
        </p>
      ) : null}

      {all.length === 0 && !finished ? (
        <p
          className="flex items-center gap-2 text-faint"
          style={{ height: ROW }}
        >
          <Prompt />
          <span className="cursor-blink inline-block h-3.5 w-2 translate-y-0.5 bg-accent" />
        </p>
      ) : null}
    </div>
  );
}

function Row({
  seg,
  typed,
  isCurrent,
}: {
  seg: Segment | null;
  typed: string;
  isCurrent: boolean;
}) {
  if (!seg) return <div style={{ height: ROW }} />;

  if (seg.kind === "blank") return <div style={{ height: ROW }} />;

  if (seg.kind === "cmd") {
    return (
      <p
        className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-faint"
        style={{ height: ROW }}
      >
        <Prompt />
        <span className="text-ink">{isCurrent ? typed : seg.text}</span>
        {isCurrent ? (
          <span className="cursor-blink inline-block h-3.5 w-2 shrink-0 translate-y-0.5 bg-accent" />
        ) : null}
      </p>
    );
  }

  return (
    <p
      className={`overflow-hidden whitespace-nowrap pl-5 ${toneClass[seg.tone ?? "plain"]} ${
        isCurrent ? "animate-[fadeUp_.25s_ease-out]" : ""
      }`}
      style={{ height: ROW }}
    >
      {seg.text}
    </p>
  );
}
