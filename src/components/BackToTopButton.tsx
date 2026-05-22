"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-14 z-40 flex items-center gap-2 rounded border border-panel-border bg-panel/90 px-4 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-charcoal/50 backdrop-blur-sm transition-all duration-200 hover:border-forest/45 hover:text-gold shadow-[0_4px_20px_rgba(0,0,0,0.5)] animate-fade-in"
    >
      <ArrowUp className="h-3 w-3" />
      <span>Back to Top</span>
    </button>
  );
}
