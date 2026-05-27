"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft } from "lucide-react";

interface Heading {
  id: string;
  text: string;
}

export default function JumpNav() {
  const [open, setOpen] = useState(false);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  // Scan DOM for [data-jump-target] elements — debounced so mutations don't spam
  const scan = useCallback(() => {
    const found = Array.from(document.querySelectorAll("[data-jump-target]"))
      .map((el) => ({ id: el.id, text: el.textContent?.trim() ?? "" }))
      .filter((h) => h.id && h.text);
    setHeadings(found);
  }, []);

  useEffect(() => {
    scan();
    let timer: ReturnType<typeof setTimeout>;
    const mo = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(scan, 200);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); clearTimeout(timer); };
  }, [scan]);

  // Track which heading is in the viewport and apply styles to the actual page element
  useEffect(() => {
    if (headings.length === 0) return;

    const activate = (id: string) => {
      setActiveId(id);
      document.querySelectorAll("[data-jump-target]").forEach((el) => {
        el.classList.toggle("jump-active", el.id === id);
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) activate(visible[0].target.id);
      },
      { rootMargin: "-5% 0px -75% 0px", threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [headings]);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
    if (window.innerWidth < 768) setOpen(false);
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* Backdrop on mobile when open */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 flex h-screen transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-[calc(100%-2rem)]"
        }`}
      >
        {/* Pull tab — always visible */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close jump navigation" : "Open jump navigation"}
          className="flex w-8 flex-shrink-0 flex-col items-center justify-center gap-2 border-l border-panel-border/55 bg-panel/92 text-charcoal/38 backdrop-blur-sm transition-colors duration-200 hover:text-gold"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <span className="font-mono text-[7px] font-bold uppercase tracking-[0.18em] [writing-mode:vertical-rl]">
            Jump
          </span>
          <ChevronLeft
            className={`h-2.5 w-2.5 transition-transform duration-300 ${open ? "" : "rotate-180"}`}
          />
        </button>

        {/* Panel body */}
        <div
          className="flex w-[200px] flex-col border-l border-panel-border/55 bg-panel/95 backdrop-blur-md"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >

          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-panel-border/35 px-4 py-3">
            <span className="font-mono text-[8px] tracking-[0.22em] text-charcoal/30 uppercase">
              On This Page
            </span>
            <button
              onClick={() => setOpen(false)}
              className="font-mono text-[8px] text-charcoal/25 hover:text-gold transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Heading list */}
          <nav className="flex flex-1 flex-col overflow-y-auto py-2" aria-label="Jump to section">
            {headings.map((h) => {
              const isActive = h.id === activeId;
              return (
                <button
                  key={h.id}
                  onClick={() => jumpTo(h.id)}
                  className={`px-4 py-2 text-left font-mono text-[8.5px] uppercase tracking-wide transition-all duration-200 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40 ${
                    isActive
                      ? "italic underline decoration-gold/45 underline-offset-2 text-charcoal"
                      : "text-charcoal/38"
                  }`}
                >
                  {h.text}
                </button>
              );
            })}
          </nav>

        </div>
      </div>
    </>
  );
}
