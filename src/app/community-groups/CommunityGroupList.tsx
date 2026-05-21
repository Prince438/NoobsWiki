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
      <div className="flex flex-col gap-4 rounded-2xl border border-panel-border bg-white p-5 shadow-sm md:flex-row md:items-center">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            placeholder="Search communities by name, topic, URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-panel-border bg-cream/30 py-3 pr-4 pl-11 font-sans text-sm outline-none transition-colors focus:border-gold focus:bg-white"
          />
        </div>

        {/* Clear Filters Button (Only shows when filters are active) */}
        {(searchQuery || selectedCategory) && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-panel-border bg-white px-4 py-3 font-mono text-xs text-charcoal/70 hover:bg-cream/40"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Search</span>
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 font-mono text-xs text-charcoal/40">
          <Filter className="h-3 w-3" />
          <span>FILTER BY CATEGORY:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* "All" Tag */}
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-lg px-3 py-1.5 font-sans text-xs font-semibold tracking-tight transition-all ${
              selectedCategory === null
                ? "bg-forest text-cream shadow-sm shadow-forest/10"
                : "border border-panel-border bg-white text-charcoal/60 hover:border-gold hover:text-charcoal"
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
                className={`rounded-lg px-3 py-1.5 font-sans text-xs font-semibold tracking-tight transition-all ${
                  isSelected
                    ? "bg-forest text-cream shadow-sm shadow-forest/10"
                    : "border border-panel-border bg-white text-charcoal/60 hover:border-gold hover:text-charcoal"
                }`}
              >
                {cat.categoryName} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Info */}
      <div className="flex items-center justify-between border-b border-panel-border pb-3 font-mono text-[10px] text-charcoal/40">
        <span>[ECOSYSTEM_QUERY: RUNNING]</span>
        <span className="font-semibold">{totalMatches} MATCHING COMMUNITIES</span>
      </div>

      {/* Grouped Renderings */}
      {filteredCategories.length > 0 ? (
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <section key={category.categoryName} className="space-y-5">
              
              {/* Category Subheading */}
              <div className="flex items-center gap-4">
                <h3 className="font-sans text-md font-extrabold uppercase tracking-wider text-forest">
                  {category.categoryName}
                </h3>
                <div className="h-[1px] flex-1 bg-gradient-to-right from-panel-border to-transparent" />
                <span className="font-mono text-xs text-charcoal/40">
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
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-panel-border bg-white py-16 text-center">
          <p className="mb-2 font-mono text-sm text-charcoal/50">NO MATCHES FOUND FOR YOUR SEARCH</p>
          <p className="font-sans text-xs text-charcoal/40">Try resetting the query or selecting another category filter.</p>
          <button
            onClick={resetFilters}
            className="mt-6 rounded-lg bg-forest px-4 py-2 font-sans text-xs font-semibold text-cream hover:bg-forest-hover"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
