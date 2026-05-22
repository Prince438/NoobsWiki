"use client";

import { useState } from "react";
import { Search, Filter, RotateCcw } from "lucide-react";
import BuilderCard, { type BuilderEntry } from "@/components/BuilderCard";

const CATEGORY_LABELS: Record<string, string> = {
  builder: "Community Builder",
  organizer: "Organizer",
  speaker: "Speaker",
  volunteer: "Volunteer",
  microsponsor: "Microsponsor",
  attendee: "Attendee",
};

interface Props {
  builders: BuilderEntry[];
}

export default function CommunityBuildersList({ builders }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Ordered unique categories in the order they first appear
  const categories = Array.from(new Set(builders.map((b) => b.category)));

  const filtered = builders.filter((b) => {
    if (selectedCategory && b.category !== selectedCategory) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.links.some((l) => l.label.toLowerCase().includes(q))
    );
  });

  const reset = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-10 animate-fade-in">

      {/* Search bar */}
      <div className="flex flex-col gap-3 rounded border border-panel-border bg-panel p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/28 pointer-events-none" />
          <input
            type="text"
            placeholder="Search builders by name, role, community..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded border border-panel-border/50 bg-cream py-2.5 pr-4 pl-10 font-mono text-[11.5px] text-charcoal placeholder:text-charcoal/28 outline-none transition-colors focus:border-gold/40"
          />
        </div>
        {(searchQuery || selectedCategory) && (
          <button
            onClick={reset}
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
          <span>FILTER BY ROLE</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded border px-3 py-1.5 font-mono text-[9.5px] uppercase font-bold tracking-wider transition-all duration-200 ${
              !selectedCategory
                ? "bg-forest/12 border-forest/45 text-gold"
                : "border-panel-border bg-panel text-charcoal/42 hover:border-panel-border/80 hover:text-charcoal/65"
            }`}
          >
            All ({builders.length})
          </button>
          {categories.map((cat) => {
            const count = builders.filter((b) => b.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(isSelected ? null : cat)}
                className={`rounded border px-3 py-1.5 font-mono text-[9.5px] uppercase font-bold tracking-wider transition-all duration-200 ${
                  isSelected
                    ? "bg-forest/12 border-forest/45 text-gold"
                    : "border-panel-border bg-panel text-charcoal/42 hover:border-panel-border/80 hover:text-charcoal/65"
                }`}
              >
                {CATEGORY_LABELS[cat] ?? cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between border-b border-panel-border/25 pb-3 font-mono text-[9px] text-charcoal/28">
        <span>[BUILDERS_QUERY: SUCCESS]</span>
        <span className="font-bold text-charcoal/40">{filtered.length} BUILDERS</span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((builder, idx) => (
            <BuilderCard
              key={`${builder.name}-${idx}`}
              name={builder.name}
              description={builder.description}
              links={builder.links}
              category={builder.category}
              index={idx + 1}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded border border-dashed border-panel-border/35 bg-panel py-16 text-center">
          <p className="mb-1.5 font-mono text-[11px] text-charcoal/38">NO MATCHES FOUND</p>
          <p className="font-sans text-[11px] text-charcoal/28">Try resetting the search query or selecting another role.</p>
          <button
            onClick={reset}
            className="mt-6 rounded border border-panel-border bg-panel px-4 py-2 font-mono text-[9.5px] uppercase font-bold tracking-wider text-gold/70 hover:text-gold transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
