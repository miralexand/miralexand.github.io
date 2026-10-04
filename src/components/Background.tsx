export default function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg" />

      <div className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[170px]" />

      <div className="absolute -right-40 -bottom-40 h-[26rem] w-[26rem] opacity-50">
        <div
          className="radar-sweep h-full w-full rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, color-mix(in srgb, var(--accent) 30%, transparent) 55deg, transparent 90deg)",
          }}
        />
        <div className="absolute inset-8 rounded-full border border-line" />
        <div className="absolute inset-20 rounded-full border border-line" />
        <div className="absolute inset-32 rounded-full border border-line" />
        <div className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/70" />
      </div>

      <div className="scanline-move absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-b from-bg/10 via-bg/55 to-bg" />
      <div className="grain absolute inset-0 opacity-[0.035]" />
    </div>
  );
}
