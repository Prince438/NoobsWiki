"use client";

import { ExternalLink } from "lucide-react";

export interface ToolEntry {
  name: string;
  description: string;
  summary?: string;
  links: { label: string; url: string }[];
  subcategory: string;
}

interface ToolCardProps extends ToolEntry {
  index: number;
}

export default function ToolCard({ name, description, summary, links, index }: ToolCardProps) {
  const formattedIndex = String(index).padStart(2, "0");
  const primaryLink = links.find((l) => l.label === "Website") ?? links[0];
  const extraLinks = links.filter((l) => l !== primaryLink);

  return (
    <div className="group relative flex flex-col rounded border border-panel-border bg-panel transition-all duration-300 hover:border-forest/45 hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)] overflow-hidden">

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 pointer-events-none" />

      {/* Corner marks */}
      <div className="absolute inset-0 pointer-events-none tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Name row — always pinned to top */}
      <div className="flex items-start justify-between gap-2 p-4 pb-2">
        {primaryLink ? (
          <a
            href={primaryLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[13px] font-bold tracking-tight text-charcoal leading-snug transition-colors group-hover:text-gold/90 hover:underline decoration-gold/40 flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            {name}
          </a>
        ) : (
          <h3 className="flex-1 font-sans text-[13px] font-bold tracking-tight text-charcoal leading-snug transition-colors group-hover:text-gold/90">
            {name}
          </h3>
        )}
        <span className="font-mono text-[8.5px] text-gold/35 font-semibold tabular-nums flex-shrink-0 pt-0.5">
          [{formattedIndex}]
        </span>
      </div>

      {/* Summary — always directly below name */}
      {summary && (
        <p className="px-4 pb-2 font-sans text-[11px] leading-relaxed text-charcoal/58 line-clamp-2">
          {summary}
        </p>
      )}

      {/* Flex spacer — pushes footer to bottom of card */}
      <div className="flex-1" />

      {/* Footer: feature tags + links — always at bottom */}
      {(description || extraLinks.length > 0) && (
        <div className="flex flex-col gap-2 px-4 pb-3">
          {description && (
            <p className="font-sans text-[11px] leading-relaxed text-charcoal/45 line-clamp-2">
              {description}
            </p>
          )}
          {extraLinks.length > 0 && (
            <div className={`flex flex-wrap gap-1 ${description ? "pt-2 border-t border-panel-border/25" : ""}`}>
              {extraLinks.slice(0, 5).map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded border border-panel-border/55 bg-cream/20 px-1.5 py-0.5 font-mono text-[8px] text-charcoal/38 hover:text-gold hover:border-gold/30 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-[8px] w-[8px] flex-shrink-0" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
