"use client";

import { useState, useMemo } from "react";
import { Search, Filter, RotateCcw, Shuffle } from "lucide-react";
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

  const pinnedEntries = useMemo(
    () => filtered.filter((g) => g.pinned),
    [filtered]
  );

  const groupedCategories = useMemo(() => {
    const map = new Map<string, GroupEntry[]>();
    for (const entry of filtered.filter((g) => !g.pinned)) {
      if (!map.has(entry.category)) map.set(entry.category, []);
      map.get(entry.category)!.push(entry);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const reset = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const surpriseMe = () => {
    if (groupedCategories.length === 0) return;
    const idx = Math.floor(Math.random() * groupedCategories.length);
    const [cat] = groupedCategories[idx];
    const id = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("jump-active");
    setTimeout(() => el.classList.remove("jump-active"), 2000);
  };

  return (
    <div className="space-y-10 animate-fade-in">

      {/* Search & filter bar */}
      <div className="flex flex-col gap-3 rounded border border-panel-border bg-panel p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/45 pointer-events-none" />
          <input
            type="text"
            placeholder="Search communities by name, topic, URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded border border-panel-border/50 bg-cream py-2.5 pr-4 pl-10 font-sans text-[13px] text-charcoal placeholder:text-charcoal/42 outline-none transition-colors focus:border-gold/40"
          />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {(searchQuery || selectedCategory) && (
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-1.5 rounded border border-panel-border bg-cream px-3 py-2.5 font-mono text-[10.5px] uppercase font-bold tracking-wider text-charcoal/62 hover:text-gold transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
          <button
            onClick={surpriseMe}
            disabled={filtered.length === 0}
            title="Jump to a random community category"
            className="inline-flex items-center justify-center gap-1.5 rounded border border-panel-border bg-cream px-3 py-2.5 font-mono text-[9.5px] uppercase font-bold tracking-wider text-charcoal/50 hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Shuffle className="h-3 w-3" />
            <span className="hidden sm:inline">Surprise</span>
          </button>
        </div>
      </div>

      {/* Category filter chips */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-charcoal/42">
          <Filter className="h-3 w-3 text-gold/55" />
          <span>FILTER BY CATEGORY</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded border px-3 py-1.5 font-mono text-[10.5px] uppercase font-bold tracking-wider transition-all duration-200 ${
              !selectedCategory
                ? "bg-forest/12 border-forest/45 text-gold"
                : "border-panel-border bg-panel text-charcoal/52 hover:border-panel-border/80 hover:text-charcoal/75"
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
                className={`rounded border px-3 py-1.5 font-mono text-[10.5px] uppercase font-bold tracking-wider transition-all duration-200 ${
                  isSelected
                    ? "bg-forest/12 border-forest/45 text-gold"
                    : "border-panel-border bg-panel text-charcoal/52 hover:border-panel-border/80 hover:text-charcoal/75"
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

      {/* Pinned / featured entries */}
      {pinnedEntries.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <h3
              id="featured"
              data-jump-target=""
              className="font-display text-[22px] font-bold uppercase tracking-[0.06em] text-gold/80 leading-none min-w-0 break-words"
            >
              Featured
            </h3>
            <div className="h-px flex-1 bg-gold/15" />
            <span className="font-mono text-[9px] text-charcoal/28">
              {pinnedEntries.length} {pinnedEntries.length === 1 ? "group" : "groups"}
            </span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pinnedEntries.map((entry, idx) => (
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
      )}

      {/* Grouped results */}
      {groupedCategories.length > 0 ? (
        <div className="space-y-12">
          {groupedCategories.map(([cat, entries]) => (
            <section key={cat} className="space-y-5">

              {/* Category section header */}
              <div className="flex items-center gap-4">
                <h3
                  id={cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  data-jump-target=""
                  className="font-display text-[22px] font-bold uppercase tracking-[0.06em] text-charcoal leading-none min-w-0 break-words"
                >
                  {CATEGORY_LABELS[cat] ?? cat}
                </h3>
                <div className="h-px flex-1 bg-panel-border/20" />
                <span className="font-mono text-[9px] text-charcoal/28">
                  {entries.length} {entries.length === 1 ? "group" : "groups"}
                </span>
              </div>

              {/* Card grid */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
