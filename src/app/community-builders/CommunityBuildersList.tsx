"use client";

import { useState } from "react";
import { Search, RotateCcw } from "lucide-react";
import DirectoryCard from "@/components/DirectoryCard";

interface Builder {
  name: string;
  role: string;
  url: string;
  description: string;
}

interface CommunityBuildersListProps {
  builders: Builder[];
}

export default function CommunityBuildersList({ builders }: CommunityBuildersListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter builders based on search query
  const filteredBuilders = builders.filter((builder) => {
    const query = searchQuery.toLowerCase();
    return (
      builder.name.toLowerCase().includes(query) ||
      builder.role.toLowerCase().includes(query) ||
      builder.description.toLowerCase().includes(query) ||
      builder.url.toLowerCase().includes(query)
    );
  });

  const resetSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Search Bar */}
      <div className="flex flex-col gap-4 rounded border border-panel-border bg-panel p-4 md:flex-row md:items-center">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/30" />
          <input
            type="text"
            placeholder="Search builders by name, community, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded border border-panel-border/60 bg-cream py-3 pr-4 pl-11 font-sans text-xs text-charcoal outline-none transition-colors focus:border-gold/50"
          />
        </div>

        {/* Reset Button */}
        {searchQuery && (
          <button
            onClick={resetSearch}
            className="inline-flex items-center justify-center gap-2 rounded border border-panel-border bg-panel px-4 py-3 font-mono text-[10px] uppercase font-bold text-charcoal/60 hover:text-gold"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Search</span>
          </button>
        )}
      </div>

      {/* Results Header Info */}
      <div className="flex items-center justify-between border-b border-panel-border/30 pb-3 font-mono text-[9px] text-charcoal/30">
        <span>[BUILDERS_QUERY: SUCCESS]</span>
        <span className="font-bold">{filteredBuilders.length} MATCHING BUILDERS</span>
      </div>

      {/* Builders Grid */}
      {filteredBuilders.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredBuilders.map((builder, idx) => (
            <DirectoryCard
              key={builder.name}
              name={builder.name}
              url={builder.url}
              description={builder.description}
              index={idx + 1}
              label={builder.role}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded border border-dashed border-panel-border/40 bg-panel py-16 text-center">
          <p className="mb-2 font-mono text-xs text-charcoal/40">NO MATCHES FOUND FOR YOUR SEARCH</p>
          <p className="font-sans text-[11px] text-charcoal/30">Try resetting the search query.</p>
          <button
            onClick={resetSearch}
            className="mt-6 rounded border border-panel-border bg-panel px-4 py-2 font-mono text-[10px] uppercase font-bold text-gold hover:border-gold/30"
          >
            Reset Search
          </button>
        </div>
      )}

    </div>
  );
}
