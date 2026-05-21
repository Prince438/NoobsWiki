"use client";

import { useState } from "react";
import { Search, Filter, RotateCcw } from "lucide-react";
import { DirectoryCategory } from "@/lib/parser";
import DirectoryCard from "@/components/DirectoryCard";

interface CommunityGroupListProps {
  initialCategories: DirectoryCategory[];
}

export default function CommunityGroupList({ initialCategories }: CommunityGroupListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract all categories for filter chips
  const allCategoryNames = initialCategories.map((c) => c.categoryName);

  // Filter items based on category and search query
  const filteredCategories = initialCategories
    .map((cat) => {
      // If a category filter is active, only process that category
      if (selectedCategory && cat.categoryName !== selectedCategory) {
        return { ...cat, items: [] };
      }

      // Filter items within the category
      const filteredItems = cat.items.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.url.toLowerCase().includes(query)
        );
      });

      return {
        ...cat,
        items: filteredItems,
      };
    })
    .filter((cat) => cat.items.length > 0); // Only show categories that have items matching search

  // Total count of matching items
  const totalMatches = filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-4 rounded border border-panel-border bg-panel p-4 md:flex-row md:items-center">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/30" />
          <input
            type="text"
            placeholder="Search communities by name, topic, URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded border border-panel-border/60 bg-cream py-3 pr-4 pl-11 font-sans text-xs text-charcoal outline-none transition-colors focus:border-gold/50"
          />
        </div>

        {/* Clear Filters Button (Only shows when filters are active) */}
        {(searchQuery || selectedCategory) && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center justify-center gap-2 rounded border border-panel-border bg-panel px-4 py-3 font-mono text-[10px] uppercase font-bold text-charcoal/60 hover:text-gold"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Search</span>
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 font-mono text-[10px] text-charcoal/30 tracking-wider">
          <Filter className="h-3 w-3 text-gold/60" />
          <span>FILTER BY CATEGORY:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* "All" Tag */}
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded border px-3 py-1.5 font-mono text-[10px] uppercase font-bold tracking-wider transition-all duration-300 ${
              selectedCategory === null
                ? "bg-forest/15 border-forest text-gold shadow-sm"
                : "border border-panel-border bg-panel text-charcoal/50 hover:border-gold/30 hover:text-charcoal"
            }`}
          >
            All Categories ({initialCategories.reduce((sum, c) => sum + c.items.length, 0)})
          </button>

          {/* Individual Category Tags */}
          {initialCategories.map((cat) => {
            const count = cat.items.length;
            const isSelected = selectedCategory === cat.categoryName;
            return (
              <button
                key={cat.categoryName}
                onClick={() => setSelectedCategory(isSelected ? null : cat.categoryName)}
                className={`rounded border px-3 py-1.5 font-mono text-[10px] uppercase font-bold tracking-wider transition-all duration-300 ${
                  isSelected
                    ? "bg-forest/15 border-forest text-gold shadow-sm"
                    : "border border-panel-border bg-panel text-charcoal/50 hover:border-gold/30 hover:text-charcoal"
                }`}
              >
                {cat.categoryName} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Info */}
      <div className="flex items-center justify-between border-b border-panel-border/30 pb-3 font-mono text-[9px] text-charcoal/30">
        <span>[ECOSYSTEM_QUERY: SUCCESS]</span>
        <span className="font-bold">{totalMatches} MATCHING COMMUNITIES</span>
      </div>

      {/* Grouped Renderings */}
      {filteredCategories.length > 0 ? (
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <section key={category.categoryName} className="space-y-5">
              
              {/* Category Subheading */}
              <div className="flex items-center gap-4">
                <h3 className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-gold/80">
                  // {category.categoryName}
                </h3>
                <div className="h-[1px] flex-1 bg-panel-border/20" />
                <span className="font-mono text-[10px] text-charcoal/30">
                  {category.items.length} {category.items.length === 1 ? "group" : "groups"}
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item, idx) => (
                  <DirectoryCard
                    key={item.name}
                    name={item.name}
                    url={item.url}
                    description={item.description}
                    index={idx + 1}
                    label={category.categoryName}
                  />
                ))}
              </div>

            </section>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded border border-dashed border-panel-border/40 bg-panel py-16 text-center">
          <p className="mb-2 font-mono text-xs text-charcoal/40">NO MATCHES FOUND FOR YOUR SEARCH</p>
          <p className="font-sans text-[11px] text-charcoal/30">Try resetting the query or selecting another category filter.</p>
          <button
            onClick={resetFilters}
            className="mt-6 rounded border border-panel-border bg-panel px-4 py-2 font-mono text-[10px] uppercase font-bold text-gold hover:border-gold/30"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
