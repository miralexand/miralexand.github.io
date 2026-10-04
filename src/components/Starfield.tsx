import { useMemo, type CSSProperties } from "react";

export default function Starfield({
  count = 160,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const stars = useMemo(() => {
    const rand = (seed: number) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: count }, (_, i) => ({
      x: rand(i + 1) * 100,
      y: rand(i + 101) * 100,
      size: rand(i + 201) * 1.6 + 0.4,
      opacity: rand(i + 301) * 0.7 + 0.15,
      delay: rand(i + 401) * 6,
    }));
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="twinkle absolute rounded-full bg-ink"
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              "--o": s.opacity,
              animationDelay: `${s.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
