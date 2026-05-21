"use client";

import { useState } from "react";
import { Search, Filter, RotateCcw } from "lucide-react";
import { DirectoryCategory } from "@/lib/parser";
import DirectoryCard from "@/components/DirectoryCard";

interface GovernmentAgenciesListProps {
  initialCategories: DirectoryCategory[];
}

export default function GovernmentAgenciesList({ initialCategories }: GovernmentAgenciesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = initialCategories
    .map((cat) => {
      if (selectedCategory && cat.categoryName !== selectedCategory) {
        return { ...cat, items: [] };
      }
      const filteredItems = cat.items.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.url.toLowerCase().includes(query)
        );
      });
      return { ...cat, items: filteredItems };
    })
    .filter((cat) => cat.items.length > 0);

  const totalMatches = filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-10 animate-fade-in">

      {/* Search & filter bar */}
      <div className="flex flex-col gap-3 rounded border border-panel-border bg-panel p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/28 pointer-events-none" />
          <input
            type="text"
            placeholder="Search agencies by name, initiative, acronym..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded border border-panel-border/50 bg-cream py-2.5 pr-4 pl-10 font-mono text-[11.5px] text-charcoal placeholder:text-charcoal/28 outline-none transition-colors focus:border-gold/40"
          />
        </div>
        {(searchQuery || selectedCategory) && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center justify-center gap-2 rounded border border-panel-border bg-cream px-4 py-2.5 font-mono text-[9.5px] uppercase font-bold tracking-wider text-charcoal/50 hover:text-gold transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category filter chips */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 font-mono text-[9px] tracking-widest text-charcoal/28">
          <Filter className="h-3 w-3 text-gold/45" />
          <span>FILTER BY TYPE</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded border px-3 py-1.5 font-mono text-[9.5px] uppercase font-bold tracking-wider transition-all duration-200 ${
              selectedCategory === null
                ? "bg-forest/12 border-forest/45 text-gold"
                : "border-panel-border bg-panel text-charcoal/42 hover:border-panel-border/80 hover:text-charcoal/65"
            }`}
          >
            All ({initialCategories.reduce((sum, c) => sum + c.items.length, 0)})
          </button>
          {initialCategories.map((cat) => {
            const isSelected = selectedCategory === cat.categoryName;
            return (
              <button
                key={cat.categoryName}
                onClick={() => setSelectedCategory(isSelected ? null : cat.categoryName)}
                className={`rounded border px-3 py-1.5 font-mono text-[9.5px] uppercase font-bold tracking-wider transition-all duration-200 ${
                  isSelected
                    ? "bg-forest/12 border-forest/45 text-gold"
                    : "border-panel-border bg-panel text-charcoal/42 hover:border-panel-border/80 hover:text-charcoal/65"
                }`}
              >
                {cat.categoryName} ({cat.items.length})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between border-b border-panel-border/25 pb-3 font-mono text-[9px] text-charcoal/28">
        <span>[GOV_ECOSYSTEM_QUERY: SUCCESS]</span>
        <span className="font-bold text-charcoal/40">{totalMatches} INSTITUTIONS</span>
      </div>

      {/* Results */}
      {filteredCategories.length > 0 ? (
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <section key={category.categoryName} className="space-y-5">
              <div className="flex items-center gap-4">
                <h3 className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-forest/65">
                  // {category.categoryName}
                </h3>
                <div className="h-px flex-1 bg-panel-border/20" />
                <span className="font-mono text-[9px] text-charcoal/28">
                  {category.items.length} {category.items.length === 1 ? "agency" : "agencies"}
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="flex flex-col items-center justify-center rounded border border-dashed border-panel-border/35 bg-panel py-16 text-center">
          <p className="mb-1.5 font-mono text-[11px] text-charcoal/38">NO MATCHES FOUND</p>
          <p className="font-sans text-[11px] text-charcoal/28">Try resetting the query or selecting another type.</p>
          <button
            onClick={resetFilters}
            className="mt-6 rounded border border-panel-border bg-panel px-4 py-2 font-mono text-[9.5px] uppercase font-bold tracking-wider text-gold/70 hover:text-gold transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
