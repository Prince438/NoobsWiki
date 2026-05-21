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
  // Format index as [01], [02], etc.
  const formattedIndex = String(index).padStart(2, "0");

  // Format display URL (clean domain name)
  let displayUrl = url;
  try {
    const urlObj = new URL(url);
    displayUrl = urlObj.hostname + (urlObj.pathname.length > 1 ? urlObj.pathname : "");
    if (displayUrl.length > 32) {
      displayUrl = urlObj.hostname;
    }
  } catch (e) {
    // Keep as is if invalid
  }

  return (
    <div className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-5 transition-all duration-300 hover:border-gold/40">
      
      {/* Subtle corner tech border grid intersection accent */}
      <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="flex flex-col gap-2">
        {/* Top Meta info */}
        <div className="flex items-center justify-between font-mono text-[9px] text-charcoal/30 tracking-wider">
          <span>{label ? `// ${label.toUpperCase()}` : `// DIRECTORY`}</span>
          <span className="font-semibold text-gold/60">[{formattedIndex}]</span>
        </div>

        {/* Title Headline */}
        <h3 className="font-sans text-[15px] font-bold tracking-tight text-charcoal transition-colors group-hover:text-gold">
          {name}
        </h3>

        {/* Description Body */}
        <p className="font-sans text-xs leading-relaxed text-charcoal/60 line-clamp-3">
          {description}
        </p>
      </div>

      {/* Visible Link Styled as CTA */}
      <div className="mt-4 pt-3 border-t border-panel-border/20">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-medium text-gold/70 transition-colors group-hover:text-gold"
        >
          <span className="underline underline-offset-4 decoration-panel-border/40 transition-colors group-hover:decoration-gold/50">
            {displayUrl}
          </span>
          <ExternalLink className="h-2.5 w-2.5 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
        </a>
      </div>

    </div>
  );
}
