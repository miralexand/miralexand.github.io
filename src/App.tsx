import { useEffect, useState } from "react";
import Background from "./components/Background";
import CyberFX from "./components/CyberFX";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Quote from "./components/Quote";
import Marquee from "./components/Marquee";
import Bento from "./components/Bento";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="app-enter relative min-h-screen">
        <Background />
        <CyberFX />
        <Navbar onOpenPalette={() => setPaletteOpen(true)} />
        <main>
          <Hero />
          <Quote />
          <Marquee />
          <Bento />
          <Projects />
          <Timeline />
          <Contact />
        </main>
        <Footer />
        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
        />
      </div>
      <Intro />
    </>
  );
}
