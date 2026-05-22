"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import featuredData from "@/data/featured.json";

interface FeaturedEntry {
  type: string;
  name: string;
  category: string;
  description: string;
  link: string;
}

const featured: FeaturedEntry[] = featuredData;

export default function FeaturedSpotlight() {
  const [entry, setEntry] = useState<FeaturedEntry | null>(null);

  useEffect(() => {
    const hourIndex = Math.floor(Date.now() / 3600000) % featured.length;
    setEntry(featured[hourIndex]);
  }, []);

  if (!entry) return null;

  return (
    <div className="w-full mb-7 animate-fade-in">

      {/* Label */}
      <div className="flex items-center gap-2 mb-2.5 font-mono text-[8.5px] tracking-[0.25em] text-charcoal/28 uppercase">
        <Sparkles className="h-3 w-3 text-gold/45" />
        <span>Tool of the Hour</span>
      </div>

      {/* Card */}
      <div className="group relative rounded border border-panel-border bg-panel overflow-hidden transition-all duration-300 hover:border-forest/50">
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="flex items-center gap-5 px-5 py-4">

          {/* Left: meta + name + description */}
          <div className="flex-1 min-w-0">
            <div className="mb-1 font-mono text-[8.5px] tracking-widest text-charcoal/30 uppercase">
              // {entry.category}
            </div>
            <h3 className="mb-1.5 font-sans text-[15px] font-bold tracking-tight text-charcoal leading-snug transition-colors group-hover:text-gold/90">
              {entry.name}
            </h3>
            <p className="font-sans text-[11.5px] leading-relaxed text-charcoal/48">
              {entry.description}
            </p>
          </div>

          {/* Right: visit button */}
          <a
            href={entry.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1.5 rounded border border-panel-border/60 bg-cream/20 px-3 py-1.5 font-mono text-[9px] uppercase font-bold tracking-wider text-gold/55 hover:text-gold hover:border-gold/30 transition-colors self-center"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-3 w-3" />
            <span>Visit</span>
          </a>

        </div>
      </div>

    </div>
  );
}
