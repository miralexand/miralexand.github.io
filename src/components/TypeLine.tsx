import { useEffect, useState } from "react";

export default function TypeLine({
  phrases,
  typingSpeed = 58,
  deletingSpeed = 30,
  pause = 1700,
  className = "",
}: {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
}) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[index % phrases.length];
    let timer: number | undefined;

    if (!deleting) {
      if (text.length < phrase.length) {
        timer = window.setTimeout(
          () => setText(phrase.slice(0, text.length + 1)),
          typingSpeed,
        );
      } else {
        timer = window.setTimeout(() => setDeleting(true), pause);
      }
    } else if (text.length > 0) {
      timer = window.setTimeout(
        () => setText(phrase.slice(0, text.length - 1)),
        deletingSpeed,
      );
    } else {
      setDeleting(false);
      setIndex((i) => i + 1);
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [text, deleting, index, phrases, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="cursor-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-accent align-middle" />
    </span>
  );
}
