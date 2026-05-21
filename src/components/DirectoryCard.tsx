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
    <div className="group relative flex flex-col justify-between rounded-xl border border-panel-border bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_12px_24px_-8px_rgba(197,168,128,0.15)]">
      
      {/* Subtle corner tech border grid intersection accent */}
      <div className="absolute inset-0 pointer-events-none rounded-xl tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div>
        {/* Top Meta info */}
        <div className="mb-4 flex items-center justify-between font-mono text-[10px] text-charcoal/40">
          <span>{label ? `// ${label.toUpperCase()}` : `// DIRECTORY`}</span>
          <span className="font-semibold text-gold">[{formattedIndex}]</span>
        </div>

        {/* Title Headline */}
        <h3 className="mb-2 font-sans text-lg font-bold text-charcoal transition-colors group-hover:text-forest">
          {name}
        </h3>

        {/* Description Body */}
        <p className="mb-6 font-sans text-sm leading-relaxed text-charcoal/70">
          {description}
        </p>
      </div>

      {/* Visible Link Styled as CTA */}
      <div className="pt-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-forest/70 transition-colors group-hover:text-forest"
        >
          <span className="underline underline-offset-4 decoration-panel-border transition-colors group-hover:decoration-forest">
            {displayUrl}
          </span>
          <ExternalLink className="h-3 w-3 opacity-50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
        </a>
      </div>

    </div>
  );
}
