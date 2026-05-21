"use client";

import { ExternalLink } from "lucide-react";

interface DirectoryCardProps {
  name: string;
  url: string;
  description: string;
  index: number;
  label?: string;
}

export default function DirectoryCard({ name, url, description, index, label }: DirectoryCardProps) {
  const formattedIndex = String(index).padStart(2, "0");

  let displayUrl = url;
  try {
    const urlObj = new URL(url);
    displayUrl = urlObj.hostname.replace("www.", "");
    if (displayUrl.length > 30) displayUrl = urlObj.hostname.split(".").slice(-2).join(".");
  } catch {
    // keep as-is
  }

  return (
    <div className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel transition-all duration-300 hover:border-forest/45 hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)] overflow-hidden">

      {/* Top accent line — reveals on hover */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 pointer-events-none"></div>

      {/* Corner tech marks */}
      <div className="absolute inset-0 pointer-events-none tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Body */}
      <div className="flex flex-col gap-2.5 p-5">

        {/* Top meta row */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] tracking-widest text-charcoal/38 uppercase">
            {label ? `// ${label}` : "// ENTRY"}
          </span>
          <span className="font-mono text-[9px] text-gold/40 font-semibold tabular-nums">[{formattedIndex}]</span>
        </div>

        {/* Name */}
        <h3 className="font-sans text-[14px] font-bold tracking-tight text-charcoal leading-snug transition-colors group-hover:text-gold/90">
          {name}
        </h3>

        {/* Description */}
        <p className="font-sans text-[11.5px] leading-relaxed text-charcoal/52 line-clamp-3">
          {description}
        </p>

      </div>

      {/* Footer link */}
      <div className="mx-5 mb-4 pt-3 border-t border-panel-border/30">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] text-gold/50 transition-colors hover:text-gold group-hover:text-gold/80"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-2.5 w-2.5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <span className="truncate max-w-[200px]">{displayUrl}</span>
        </a>
      </div>

    </div>
  );
}
