export default function CornerFrame({
  className = "",
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  const base =
    size === "lg"
      ? "absolute h-6 w-6 border-accent/70"
      : "absolute h-3 w-3 border-accent/70";
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <span className={`${base} top-0 left-0 border-t-2 border-l-2`} />
      <span className={`${base} top-0 right-0 border-t-2 border-r-2`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} />
    </span>
  );
}
