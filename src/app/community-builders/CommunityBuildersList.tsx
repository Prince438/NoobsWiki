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
      <div className="flex flex-col gap-4 rounded-2xl border border-panel-border bg-white p-5 shadow-sm md:flex-row md:items-center">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            placeholder="Search builders by name, community, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-panel-border bg-cream/30 py-3 pr-4 pl-11 font-sans text-sm outline-none transition-colors focus:border-gold focus:bg-white"
          />
        </div>

        {/* Reset Button */}
        {searchQuery && (
          <button
            onClick={resetSearch}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-panel-border bg-white px-4 py-3 font-mono text-xs text-charcoal/70 hover:bg-cream/40"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Search</span>
          </button>
        )}
      </div>

      {/* Results Header Info */}
      <div className="flex items-center justify-between border-b border-panel-border pb-3 font-mono text-[10px] text-charcoal/40">
        <span>[BUILDERS_QUERY: RUNNING]</span>
        <span className="font-semibold">{filteredBuilders.length} MATCHING BUILDERS</span>
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
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-panel-border bg-white py-16 text-center">
          <p className="mb-2 font-mono text-sm text-charcoal/50">NO MATCHES FOUND FOR YOUR SEARCH</p>
          <p className="font-sans text-xs text-charcoal/40">Try resetting the search query.</p>
          <button
            onClick={resetSearch}
            className="mt-6 rounded-lg bg-forest px-4 py-2 font-sans text-xs font-semibold text-cream hover:bg-forest-hover"
          >
            Reset Search
          </button>
        </div>
      )}

    </div>
  );
}
