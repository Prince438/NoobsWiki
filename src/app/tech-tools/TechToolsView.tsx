"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Search, RotateCcw, Loader2, Shuffle } from "lucide-react";
import type { ToolCategorySummary, ToolCategoryData } from "@/lib/techToolsParser";
import ToolCard, { type ToolEntry } from "@/components/ToolCard";
import FeaturedSpotlight from "@/components/FeaturedSpotlight";

interface Props {
  categories: ToolCategorySummary[];
  initialCategoryId: string;
}

export default function TechToolsView({ categories, initialCategoryId }: Props) {
  const [selectedId, setSelectedId] = useState(initialCategoryId);
  const [categoryData, setCategoryData] = useState<ToolCategoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadCategory = useCallback((id: string) => {
    setLoading(true);
    setSearchQuery("");

    fetch(`/api/tech-tools/${id}`)
      .then((r) => r.json())
      .then((data: ToolCategoryData) => {
        setCategoryData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadCategory(selectedId);
  }, [selectedId, loadCategory]);

  const selectCategory = (id: string) => {
    if (id === selectedId) return;
    setSelectedId(id);
  };

  const filteredTools: ToolEntry[] = useMemo(() => {
    if (!categoryData) return [];
    if (!searchQuery) return categoryData.tools;
    const q = searchQuery.toLowerCase();
    return categoryData.tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.links.some((l) => l.label.toLowerCase().includes(q))
    );
  }, [categoryData, searchQuery]);

  const groupedTools = useMemo(() => {
    const map = new Map<string, ToolEntry[]>();
    for (const tool of filteredTools) {
      if (!map.has(tool.subcategory)) map.set(tool.subcategory, []);
      map.get(tool.subcategory)!.push(tool);
    }
    return Array.from(map.entries());
  }, [filteredTools]);

  const selectedCat = categories.find((c) => c.id === selectedId);

  const surpriseMe = () => {
    if (groupedTools.length === 0) return;
    const idx = Math.floor(Math.random() * groupedTools.length);
    const [subcategory] = groupedTools[idx];
    const id = subcategory.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("jump-active");
    setTimeout(() => el.classList.remove("jump-active"), 2000);
  };

  return (
    <div className="flex min-h-screen animate-fade-in">

      {/* ── Desktop category rail ── */}
      <aside
        aria-label="Tool categories"
        className="hidden lg:flex flex-col sticky top-0 h-screen w-[210px] flex-shrink-0 overflow-y-auto border-r border-panel-border/50 bg-panel/70 backdrop-blur-sm"
      >
        <div className="px-4 pt-5 pb-2.5 border-b border-panel-border/30">
          <span className="font-mono text-[8px] tracking-[0.25em] text-charcoal/25 uppercase">
            Category
          </span>
        </div>

        <nav className="flex flex-col gap-0 py-1">
          {categories.map((cat) => {
            const isActive = cat.id === selectedId;
            return (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat.id)}
                aria-pressed={isActive}
                className={`flex items-center justify-between gap-2 px-4 py-2.5 text-left border-l-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40 ${
                  isActive
                    ? "border-gold/55 bg-forest/10 text-gold"
                    : "border-transparent text-charcoal/45 hover:bg-panel-raised hover:text-charcoal/72"
                }`}
              >
                <span className="font-mono text-[8.5px] font-bold uppercase tracking-wide leading-snug">
                  {cat.name}
                </span>
                <span className="font-mono text-[8px] text-charcoal/25 tabular-nums flex-shrink-0">
                  {cat.toolCount}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 px-5 pr-12 py-8 md:px-8 md:pr-14">

        {/* Tool of the Hour */}
        <FeaturedSpotlight />

        {/* Mobile category chips */}
        <div
          role="tablist"
          aria-label="Tool categories"
          className="flex gap-1.5 overflow-x-auto pb-3 mb-6 lg:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((cat) => {
            const isActive = cat.id === selectedId;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => selectCategory(cat.id)}
                className={`flex-shrink-0 rounded border px-3 py-1.5 font-mono text-[8.5px] font-bold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40 ${
                  isActive
                    ? "border-forest/45 bg-forest/10 text-gold"
                    : "border-panel-border bg-panel text-charcoal/42 hover:border-panel-border/80 hover:text-charcoal/65"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Section header */}
        <div className="mb-6 space-y-2">
          <div className="font-mono text-[9px] tracking-[0.25em] text-gold/70 uppercase">
            [ TECH TOOLS // {selectedCat?.name.toUpperCase()} ]
          </div>
          {selectedCat?.description && (
            <p className="font-sans text-[12px] text-charcoal/50 max-w-2xl leading-relaxed">
              {selectedCat.description}
            </p>
          )}
        </div>

        {/* Search bar */}
        <div className="mb-6 flex flex-col gap-3 rounded border border-panel-border bg-panel p-3.5 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/28 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tools by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-panel-border/50 bg-cream py-2 pr-4 pl-10 font-mono text-[11px] text-charcoal placeholder:text-charcoal/28 outline-none transition-colors focus:border-gold/40"
              aria-label="Search tools"
            />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center justify-center gap-1.5 rounded border border-panel-border bg-cream px-3 py-2 font-mono text-[9px] uppercase font-bold tracking-wider text-charcoal/50 hover:text-gold transition-colors"
                aria-label="Clear search"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}
            <button
              onClick={surpriseMe}
              disabled={loading || filteredTools.length === 0}
              title="Jump to a random tool category"
              className="inline-flex items-center justify-center gap-1.5 rounded border border-panel-border bg-cream px-3 py-2 font-mono text-[9px] uppercase font-bold tracking-wider text-charcoal/50 hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Shuffle className="h-3 w-3" />
              <span className="hidden sm:inline">Surprise</span>
            </button>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-charcoal/30">
            <Loader2 className="h-5 w-5 animate-spin mb-3" />
            <span className="font-mono text-[9px] tracking-widest uppercase">Loading tools...</span>
          </div>
        )}

        {/* Results */}
        {!loading && (
          <>
            {/* Count bar */}
            <div className="mb-5 flex items-center justify-between border-b border-panel-border/25 pb-3 font-mono text-[9px] text-charcoal/28">
              <span>[TOOLS_QUERY: SUCCESS]</span>
              <span className="font-bold text-charcoal/40">
                {filteredTools.length} TOOLS
                {searchQuery && ` MATCHING "${searchQuery.toUpperCase()}"`}
              </span>
            </div>

            {/* Grouped sections */}
            {groupedTools.length > 0 ? (
              <div className="space-y-10">
                {groupedTools.map(([subcategory, tools]) => (
                  <section key={subcategory} className="space-y-4">

                    {/* Subcategory header */}
                    <div className="flex items-center gap-3">
                      <h3
                        id={subcategory.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                        data-jump-target=""
                        className="font-display text-[22px] font-bold uppercase tracking-[0.06em] text-charcoal leading-none min-w-0 break-words transition-colors"
                      >
                        {subcategory}
                      </h3>
                      <div className="h-px flex-1 bg-panel-border/20" />
                      <span className="font-mono text-[8.5px] text-charcoal/28">
                        {tools.length} {tools.length === 1 ? "tool" : "tools"}
                      </span>
                    </div>

                    {/* Tool cards grid */}
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {tools.map((tool, idx) => (
                        <ToolCard
                          key={`${tool.name}-${idx}`}
                          name={tool.name}
                          description={tool.description}
                          summary={tool.summary}
                          links={tool.links}
                          subcategory={tool.subcategory}
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
                <p className="font-sans text-[11px] text-charcoal/28">
                  Try resetting the search query.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-6 rounded border border-panel-border bg-panel px-4 py-2 font-mono text-[9.5px] uppercase font-bold tracking-wider text-gold/70 hover:text-gold transition-colors"
                >
                  Reset Search
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
