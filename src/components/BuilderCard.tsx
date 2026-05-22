"use client";

import { ExternalLink } from "lucide-react";
import BookmarkButton, { type BookmarkItem } from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";

export interface BuilderLink {
  label: string;
  url: string;
}

export interface BuilderEntry {
  name: string;
  description: string;
  links: BuilderLink[];
  category: string;
}

interface BuilderCardProps extends BuilderEntry {
  index: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  builder: "Community Builder",
  organizer: "Organizer",
  speaker: "Speaker",
  volunteer: "Volunteer",
  microsponsor: "Microsponsor",
  attendee: "Attendee",
};

export default function BuilderCard({ name, description, links, category, index }: BuilderCardProps) {
  const formattedIndex = String(index).padStart(2, "0");
  const categoryLabel = CATEGORY_LABELS[category] ?? category;

  const bookmarkItem: BookmarkItem = {
    id: `builder-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name,
    type: "builder",
    description,
    externalUrl: links[0]?.url,
    pageUrl: "/community-builders",
  };

  return (
    <div className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel transition-all duration-300 hover:border-forest/45 hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)] overflow-hidden">

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 pointer-events-none" />

      {/* Corner tech marks */}
      <div className="absolute inset-0 pointer-events-none tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Body */}
      <div className="flex flex-col gap-2.5 p-5">

        {/* Top meta row */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] tracking-widest text-charcoal/38 uppercase">
            // {categoryLabel}
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

      {/* Links footer */}
      <div className="mx-5 mb-4 pt-3 border-t border-panel-border/30 flex items-end justify-between gap-2">
        {links.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded border border-panel-border/60 bg-cream/30 px-2 py-0.5 font-mono text-[9px] text-charcoal/42 hover:text-gold hover:border-gold/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-[9px] w-[9px] flex-shrink-0" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        ) : (
          <span className="font-mono text-[9px] text-charcoal/22 flex-1">No public links</span>
        )}
        <div className="flex items-center gap-2 flex-shrink-0 mb-0.5">
          <ShareButton url={links[0]?.url} />
          <BookmarkButton item={bookmarkItem} />
        </div>
      </div>

    </div>
  );
}
