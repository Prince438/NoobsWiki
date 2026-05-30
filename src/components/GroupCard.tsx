"use client";

import { ExternalLink } from "lucide-react";
import BookmarkButton, { type BookmarkItem } from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";

export interface GroupLink {
  label: string;
  url: string;
}

export interface GroupEntry {
  name: string;
  description: string;
  links: GroupLink[];
  category: string;
  pinned?: boolean;
}

interface GroupCardProps extends GroupEntry {
  index: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  "career/jobs/related resources": "Career & Jobs",
  "city/campus/local chapters": "Local Chapters",
  "cloud/devops/infrastructure": "Cloud & DevOps",
  "data/ai/databases": "Data & AI",
  "general/ecosystem": "General Ecosystem",
  "mobile/hardware/platform": "Mobile & Hardware",
  "open source/linux/maker": "Open Source",
  "security/fintech/blockchain": "Security & Fintech",
  "startup/founder/coworking": "Startup & Founders",
  "web/frontend/language": "Web & Frontend",
};

export default function GroupCard({ name, description, links, category, index }: GroupCardProps) {
  const formattedIndex = String(index).padStart(2, "0");
  const categoryLabel = CATEGORY_LABELS[category] ?? category;

  const bookmarkItem: BookmarkItem = {
    id: `group-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name,
    type: "group",
    description,
    externalUrl: links[0]?.url,
    pageUrl: "/community-groups",
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
          <span className="font-mono text-[10px] tracking-widest text-charcoal/52 uppercase">
            // {categoryLabel}
          </span>
          <span className="font-mono text-[10px] text-gold/55 font-semibold tabular-nums">[{formattedIndex}]</span>
        </div>

        {/* Name */}
        <h3 className="font-sans text-[15px] font-bold tracking-tight text-charcoal leading-snug transition-colors group-hover:text-gold/90">
          {name}
        </h3>

        {/* Description */}
        <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/65 line-clamp-3">
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
                className="inline-flex items-center gap-1 rounded border border-panel-border/60 bg-cream/30 px-2 py-1 font-mono text-[10px] text-charcoal/55 hover:text-gold hover:border-gold/30 transition-colors touch-manipulation"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-2.5 w-2.5 flex-shrink-0" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        ) : (
          <span className="font-mono text-[10px] text-charcoal/38 flex-1">No public links</span>
        )}
        <div className="flex items-center gap-2 flex-shrink-0">
          <ShareButton url={links[0]?.url} />
          <BookmarkButton item={bookmarkItem} />
        </div>
      </div>

    </div>
  );
}
