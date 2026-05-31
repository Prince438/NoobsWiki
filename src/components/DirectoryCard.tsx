"use client";

import { ExternalLink } from "lucide-react";
import BookmarkButton, { type BookmarkItem } from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";

interface DirectoryCardProps {
  name: string;
  url: string;
  description: string;
  index: number;
  label?: string;
  onCardClick?: () => void;
}

export default function DirectoryCard({ name, url, description, index, label, onCardClick }: DirectoryCardProps) {
  const formattedIndex = String(index).padStart(2, "0");

  let displayUrl = url;
  try {
    const urlObj = new URL(url);
    displayUrl = urlObj.hostname.replace("www.", "");
    if (displayUrl.length > 30) displayUrl = urlObj.hostname.split(".").slice(-2).join(".");
  } catch {
    // keep as-is
  }

  const bookmarkItem: BookmarkItem = {
    id: `agency-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name,
    type: "agency",
    description,
    externalUrl: url,
    pageUrl: "/government-agencies",
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded border border-panel-border bg-panel transition-all duration-300 hover:border-forest/45 hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)] overflow-hidden${onCardClick ? " cursor-pointer" : ""}`}
      onClick={onCardClick}
    >

      {/* Top accent line — reveals on hover */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 pointer-events-none"></div>

      {/* Corner tech marks */}
      <div className="absolute inset-0 pointer-events-none tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Body */}
      <div className="flex flex-col gap-2.5 p-5">

        {/* Top meta row */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-widest text-charcoal/55 uppercase">
            {label ? `// ${label}` : "// ENTRY"}
          </span>
          <span className="font-mono text-[10px] text-gold/58 font-semibold tabular-nums">[{formattedIndex}]</span>
        </div>

        {/* Name */}
        <h3 className="font-sans text-[16px] font-bold tracking-tight text-gold/80 leading-snug transition-colors group-hover:text-gold">
          {name}
        </h3>

        {/* Description */}
        <p className="font-sans text-[14px] leading-[1.65] text-charcoal/68 line-clamp-3">
          {description}
        </p>

      </div>

      {/* Footer link */}
      <div className="mx-5 mb-4 pt-3 border-t border-panel-border/30 flex items-center justify-between gap-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-gold/65 transition-colors hover:text-gold group-hover:text-gold/85"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-2.5 w-2.5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <span className="truncate max-w-[160px]">{displayUrl}</span>
        </a>
        <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <ShareButton url={url} />
          <BookmarkButton item={bookmarkItem} />
        </div>
      </div>

    </div>
  );
}
