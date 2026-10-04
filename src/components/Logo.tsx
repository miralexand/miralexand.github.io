const MODULES = Array.from({ length: 12 }, (_, i) => {
  const a = (Math.PI / 6) * i;
  return { x: 12 + 8 * Math.cos(a), y: 12 + 8 * Math.sin(a) };
});

export default function Logo({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.3" />
      <line
        x1="12"
        y1="4"
        x2="12"
        y2="9.8"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.7"
      />
      <line
        x1="12"
        y1="14.2"
        x2="12"
        y2="20"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.7"
      />
      <line
        x1="4"
        y1="12"
        x2="9.8"
        y2="12"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.7"
      />
      <line
        x1="14.2"
        y1="12"
        x2="20"
        y2="12"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.7"
      />
      {MODULES.map((m, i) => (
        <circle key={i} cx={m.x} cy={m.y} r="1.15" fill="currentColor" />
      ))}
      <circle cx="12" cy="12" r="2.4" fill="currentColor" />
    </svg>
  );
}
