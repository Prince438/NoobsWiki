"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Play, ExternalLink } from "lucide-react";
import VideoModal from "@/components/VideoModal";

export interface HermesEntry {
  title: string;
  category: string;
  format: string;
  beginnerFriendly: "Yes" | "Somewhat" | "No";
  searchTags: string[];
  recommendationTags: string[];
  os: string | null;
  link: string;
  embedId: string;
  description: string | null;
}

interface Props {
  entry: HermesEntry;
}

const beginnerColors: Record<string, string> = {
  Yes: "border-forest/50 text-forest/80 bg-forest/8",
  Somewhat: "border-gold/40 text-gold/75 bg-gold/8",
  No: "border-panel-border/60 text-charcoal/35 bg-panel-border/10",
};

const beginnerLabel: Record<string, string> = {
  Yes: "Beginner",
  Somewhat: "Intermediate",
  No: "Advanced",
};

export default function VideoCard({ entry }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const thumbUrl = `https://img.youtube.com/vi/${entry.embedId}/hqdefault.jpg`;
  const tags = entry.searchTags.filter((t) => t !== "hermes-agent").slice(0, 3);

  return (
    <>
      <div className="group relative flex flex-col rounded border border-panel-border bg-panel overflow-hidden transition-all duration-300 hover:border-forest/50">
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 pointer-events-none z-10" />

        {/* Thumbnail — opens modal */}
        <button
          onClick={() => setModalOpen(true)}
          aria-label={`Play: ${entry.title}`}
          className="relative block w-full aspect-video bg-panel-raised overflow-hidden flex-shrink-0 cursor-pointer"
        >
          <img
            src={thumbUrl}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex h-11 w-11 items-center justify-center rounded-full bg-panel/90 border border-panel-border/60 text-gold shadow-lg">
              <Play className="h-4 w-4 fill-current translate-x-[1px]" />
            </div>
          </div>
        </button>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2 p-3.5">

          {/* Beginner badge */}
          <div className="flex items-center gap-1.5">
            <span className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[7.5px] font-bold uppercase tracking-widest ${beginnerColors[entry.beginnerFriendly] ?? beginnerColors.No}`}>
              {beginnerLabel[entry.beginnerFriendly] ?? entry.beginnerFriendly}
            </span>
          </div>

          {/* Title — also opens modal */}
          <button
            onClick={() => setModalOpen(true)}
            className="font-sans text-[12.5px] font-bold leading-snug text-charcoal text-left transition-colors group-hover:text-gold/90 line-clamp-2 hover:text-gold/80"
          >
            {entry.title}
          </button>

          {/* Description */}
          {entry.description && (
            <p className="font-sans text-[11px] leading-relaxed text-charcoal/45 line-clamp-2 flex-1">
              {entry.description}
            </p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto pt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-panel-border/40 bg-panel-raised px-1.5 py-0.5 font-mono text-[7px] text-charcoal/30 uppercase tracking-wide"
                >
                  {tag.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          )}

          {/* External link */}
          <a
            href={entry.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 font-mono text-[8px] font-bold uppercase tracking-wider text-gold/45 hover:text-gold transition-colors"
          >
            <ExternalLink className="h-2.5 w-2.5" />
            <span>Watch on YouTube</span>
          </a>

        </div>
      </div>

      {/* Modal rendered via portal at document.body */}
      {modalOpen && mounted && createPortal(
        <VideoModal
          embedId={entry.embedId}
          title={entry.title}
          link={entry.link}
          onClose={() => setModalOpen(false)}
        />,
        document.body
      )}
    </>
  );
}
