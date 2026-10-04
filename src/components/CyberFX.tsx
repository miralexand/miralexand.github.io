import { useEffect, useRef, useState } from "react";
import { useCyber } from "../hooks/useCyber";
import { startCyberAudio, stopCyberAudio } from "../lib/cyberAudio";

function CyberLayer() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute bottom-[14%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-60"
        style={{
          background:
            "linear-gradient(180deg,#ffe600 0%,#ff8a00 45%,#ff2d95 100%)",
          maskImage:
            "repeating-linear-gradient(180deg,#000 0 9px,transparent 9px 15px)",
          WebkitMaskImage:
            "repeating-linear-gradient(180deg,#000 0 9px,transparent 9px 15px)",
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-[42vh]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,149,0.45) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          transform: "perspective(300px) rotateX(64deg)",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(to top, #000 10%, transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(to top, #000 10%, transparent 85%)",
        }}
      />

      <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#ff2d95]/20 blur-[160px]" />
      <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-[#00e5ff]/20 blur-[160px]" />

      <div className="scanlines absolute inset-0 opacity-40" />
    </div>
  );
}

export default function CyberFX() {
  const { cyber } = useCyber();
  const [wipe, setWipe] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setWipe(true);
    const t = window.setTimeout(() => setWipe(false), 1000);
    return () => window.clearTimeout(t);
  }, [cyber]);

  useEffect(() => {
    if (cyber) void startCyberAudio();
    else stopCyberAudio();
  }, [cyber]);

  return (
    <>
      {cyber ? <CyberLayer /> : null}
      {wipe ? (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
          <div className="cyber-wipe absolute inset-0" />
          <div className="cyber-flash absolute inset-0" />
        </div>
      ) : null}
    </>
  );
}
