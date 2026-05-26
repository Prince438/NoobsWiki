"use client";

import { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";

interface Props {
  embedId: string;
  title: string;
  link: string;
  source?: string;
  onClose: () => void;
}

export default function VideoModal({ embedId, title, link, source = "Tutorial", onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-charcoal/65 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded border border-panel-border bg-panel shadow-[0_12px_80px_rgba(0,0,0,0.85)] overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/60 pointer-events-none z-10" />

        {/* Corner marks */}
        <span className="absolute top-[7px] left-[7px] h-[8px] w-[8px] border-t border-l border-gold/20 pointer-events-none z-10" />
        <span className="absolute top-[7px] right-[7px] h-[8px] w-[8px] border-t border-r border-gold/20 pointer-events-none z-10" />
        <span className="absolute bottom-[7px] left-[7px] h-[8px] w-[8px] border-b border-l border-gold/20 pointer-events-none z-10" />
        <span className="absolute bottom-[7px] right-[7px] h-[8px] w-[8px] border-b border-r border-gold/20 pointer-events-none z-10" />

        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-panel-border/40">
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-1.5 w-1.5 rounded-full bg-forest flex-shrink-0" />
            <span className="font-mono text-[8px] tracking-[0.2em] text-gold/55 uppercase flex-shrink-0">
              Now Playing
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close video"
            className="flex items-center justify-center h-6 w-6 rounded border border-panel-border/50 text-charcoal/38 hover:text-gold hover:border-gold/30 transition-colors flex-shrink-0"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Title */}
        <div className="px-4 py-3 border-b border-panel-border/20">
          <p className="font-sans text-[13px] font-bold leading-snug text-charcoal line-clamp-2">
            {title}
          </p>
        </div>

        {/* Embed */}
        <div className="aspect-video w-full bg-panel-raised">
          <iframe
            src={`https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-panel-border/20">
          <span className="font-mono text-[7.5px] uppercase tracking-widest text-charcoal/22">
            {source} Tutorial
          </span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-wider text-gold/45 hover:text-gold transition-colors"
          >
            <ExternalLink className="h-2.5 w-2.5" />
            <span>Open in YouTube</span>
          </a>
        </div>
      </div>
    </div>
  );
}
