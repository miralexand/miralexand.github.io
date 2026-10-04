import { useEffect, useState } from "react";

export default function Intro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setShow(false);
      return;
    }
    const t = window.setTimeout(() => setShow(false), 3200);
    return () => window.clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="intro-overlay" aria-hidden="true">
      <div className="flex flex-col items-center gap-6">
        <span className="intro-mark">miralexand</span>
        <span className="intro-spinner" />
        <span className="flex items-baseline">
          <span className="intro-text">思考中</span>
          <span className="flex items-baseline">
            <i className="intro-dot" />
            <i className="intro-dot" />
            <i className="intro-dot" />
          </span>
        </span>
      </div>
    </div>
  );
}
