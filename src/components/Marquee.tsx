import { skillGroups } from "../data";

const items = skillGroups.flatMap((g) => g.items);

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="mask-fade-y relative overflow-hidden border-y border-line bg-panel/30 py-4">
      <div className="flex w-max animate-marquee gap-6">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-6 font-mono text-sm whitespace-nowrap text-faint"
          >
            {item}
            <span className="text-accent/50">//</span>
          </span>
        ))}
      </div>
    </div>
  );
}
