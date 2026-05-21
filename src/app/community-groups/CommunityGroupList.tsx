"use client";

import { useState, useMemo } from "react";
import { Search, Filter, RotateCcw } from "lucide-react";
import GroupCard, { type GroupEntry } from "@/components/GroupCard";

const CATEGORY_LABELS: Record<string, string> = {
  "career/jobs/related resources": "Career & Jobs",
  "city/campus/local chapters": "Local Chapters",
  "cloud/devops/infrastructure": "Cloud & DevOps",
  "data/ai/databases": "Data & AI",
  "general/ecosystem": "General Ecosystem",
  "mobile/hardware/platform": "Mobile & Hardware",
  "open source/linux/maker": "Open Source",
  "security/fintech/blockchain": "Security & Fintech",
  "startup/founder/coworking": "Startup & Founders",
  "web/frontend/language": "Web & Frontend",
};

interface Props {
  groups: GroupEntry[];
}

export default function CommunityGroupList({ groups }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Ordered unique categories in the order they first appear
  const categories = useMemo(
    () => Array.from(new Set(groups.map((g) => g.category))),
    [groups]
  );

  const filtered = useMemo(() => {
    return groups.filter((g) => {
      if (selectedCategory && g.category !== selectedCategory) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        g.name.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.links.some((l) => l.url.toLowerCase().includes(q))
      );
    });
  }, [groups, searchQuery, selectedCategory]);

  // Group filtered entries by category for section display
  const groupedCategories = useMemo(() => {
    const map = new Map<string, GroupEntry[]>();
    for (const entry of filtered) {
      if (!map.has(entry.category)) map.set(entry.category, []);
      map.get(entry.category)!.push(entry);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const reset = () => {
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
            placeholder="Search communities by name, topic, URL..."
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
          <span>FILTER BY CATEGORY</span>
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
            All ({groups.length})
          </button>
          {categories.map((cat) => {
            const count = groups.filter((g) => g.category === cat).length;
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
        <span>[ECOSYSTEM_QUERY: SUCCESS]</span>
        <span className="font-bold text-charcoal/40">{filtered.length} COMMUNITIES</span>
      </div>

      {/* Grouped results */}
      {groupedCategories.length > 0 ? (
        <div className="space-y-12">
          {groupedCategories.map(([cat, entries]) => (
            <section key={cat} className="space-y-5">

              {/* Category section header */}
              <div className="flex items-center gap-4">
                <h3 className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-forest/65 whitespace-nowrap">
                  // {CATEGORY_LABELS[cat] ?? cat}
                </h3>
                <div className="h-px flex-1 bg-panel-border/20" />
                <span className="font-mono text-[9px] text-charcoal/28">
                  {entries.length} {entries.length === 1 ? "group" : "groups"}
                </span>
              </div>

              {/* Card grid */}
              <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry, idx) => (
                  <GroupCard
                    key={entry.name}
                    name={entry.name}
                    description={entry.description}
                    links={entry.links}
                    category={entry.category}
                    index={idx + 1}
                  />
                ))}
              </div>

            </section>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded border border-dashed border-panel-border/35 bg-panel py-16 text-center">
          <p className="mb-1.5 font-mono text-[11px] text-charcoal/38">NO MATCHES FOUND</p>
          <p className="font-sans text-[11px] text-charcoal/28">Try resetting the query or selecting another category.</p>
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
