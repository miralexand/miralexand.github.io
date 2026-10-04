export default function CornerFrame({
  className = "",
}: {
  className?: string;
}) {
  const base = "absolute h-3 w-3 border-accent/70";
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <span className={`${base} top-0 left-0 border-t border-l`} />
      <span className={`${base} top-0 right-0 border-t border-r`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}
