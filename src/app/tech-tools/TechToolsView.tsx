"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Search, RotateCcw, Shuffle, Filter, Star } from "lucide-react";
import type { ToolCategorySummary, ToolCategoryData } from "@/lib/techToolsParser";
import ToolCard, { type ToolEntry } from "@/components/ToolCard";
import FeaturedSpotlight from "@/components/FeaturedSpotlight";

type SortOrder = "default" | "az" | "za";

interface Props {
  categories: ToolCategorySummary[];
  initialCategoryId: string;
}

// ── Skeleton cards ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded border border-panel-border bg-panel p-4 animate-pulse space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="h-3.5 bg-panel-raised rounded w-2/3" />
        <div className="h-2.5 bg-panel-raised rounded w-7 flex-shrink-0" />
      </div>
      <div className="space-y-1.5">
        <div className="h-2.5 bg-panel-raised rounded w-full" />
        <div className="h-2.5 bg-panel-raised rounded w-4/5" />
      </div>
      <div className="flex gap-1.5 pt-0.5">
        <div className="h-4 bg-panel-raised rounded w-14" />
        <div className="h-4 bg-panel-raised rounded w-10" />
      </div>
    </div>
  );
}

function LoadingSkeleton({ name }: { name?: string }) {
  return (
    <div className="space-y-8">
      {name && (
        <div className="space-y-1">
          <div className="h-3 bg-panel-raised/60 rounded w-48 animate-pulse" />
          <div className="h-[1px] bg-panel-border/20 w-full mt-3" />
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function TechToolsView({ categories, initialCategoryId }: Props) {
  const [selectedId, setSelectedId]             = useState(initialCategoryId);
  const [categoryData, setCategoryData]         = useState<ToolCategoryData | null>(null);
  const [loading, setLoading]                   = useState(true);
  const [searchQuery, setSearchQuery]           = useState("");
  const [filterSubcategory, setFilterSubcategory] = useState<string | null>(null);
  const [filterCurated, setFilterCurated]       = useState(false);
  const [sort, setSort]                         = useState<SortOrder>("default");
  const [filtersOpen, setFiltersOpen]           = useState(false);

  const loadCategory = useCallback((id: string) => {
    setLoading(true);
    setSearchQuery("");
    setFilterSubcategory(null);
    setFilterCurated(false);
    setSort("default");

    fetch(`/api/tech-tools/${id}`)
      .then((r) => r.json())
      .then((data: ToolCategoryData) => { setCategoryData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { loadCategory(selectedId); }, [selectedId, loadCategory]);

  // Unique subcategories in source order
  const subcategories = useMemo(() => {
    if (!categoryData) return [];
    const seen = new Set<string>();
    return categoryData.tools.map((t) => t.subcategory).filter((s) => {
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });
  }, [categoryData]);

  // Filtered + sorted flat list
  const filteredTools: ToolEntry[] = useMemo(() => {
    if (!categoryData) return [];
    let tools = [...categoryData.tools] as ToolEntry[];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      tools = tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          (t.summary ?? "").toLowerCase().includes(q) ||
          t.links.some((l) => l.label.toLowerCase().includes(q))
      );
    }
    if (filterSubcategory) tools = tools.filter((t) => t.subcategory === filterSubcategory);
    if (filterCurated)     tools = tools.filter((t) => !!t.summary);

    if (sort === "az") tools = [...tools].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") tools = [...tools].sort((a, b) => b.name.localeCompare(a.name));

    return tools;
  }, [categoryData, searchQuery, filterSubcategory, filterCurated, sort]);

  // Grouped by subcategory (order reflects sort)
  const groupedTools = useMemo(() => {
    const map = new Map<string, ToolEntry[]>();
    for (const tool of filteredTools) {
      if (!map.has(tool.subcategory)) map.set(tool.subcategory, []);
      map.get(tool.subcategory)!.push(tool);
    }
    let entries = Array.from(map.entries());
    if (sort === "az") entries = entries.sort(([a], [b]) => a.localeCompare(b));
    if (sort === "za") entries = entries.sort(([a], [b]) => b.localeCompare(a));
    return entries;
  }, [filteredTools, sort]);

  // Curated picks: tools that have a written summary (from tool-descriptions.json)
  const curatedTools: ToolEntry[] = useMemo(() => {
    if (!categoryData) return [];
    return (categoryData.tools as ToolEntry[]).filter((t) => !!t.summary).slice(0, 6);
  }, [categoryData]);

  const selectedCat      = categories.find((c) => c.id === selectedId);
  const activeFilterCount = (filterSubcategory ? 1 : 0) + (filterCurated ? 1 : 0) + (sort !== "default" ? 1 : 0);
  const isFiltered        = !!searchQuery || activeFilterCount > 0;
  const showCurated       = curatedTools.length > 0 && !isFiltered;

  const surpriseMe = () => {
    if (groupedTools.length === 0) return;
    const idx = Math.floor(Math.random() * groupedTools.length);
    const [sub] = groupedTools[idx];
    const el = document.getElementById(sub.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("jump-active");
    setTimeout(() => el.classList.remove("jump-active"), 2000);
  };

  const resetAll = () => {
    setSearchQuery("");
    setFilterSubcategory(null);
    setFilterCurated(false);
    setSort("default");
  };

  return (
    <div className="flex min-h-screen animate-fade-in">

      {/* ── Desktop category rail ── */}
      <aside
        aria-label="Tool categories"
        className="hidden lg:flex flex-col sticky top-0 h-screen w-[220px] flex-shrink-0 overflow-y-auto border-r border-panel-border/50 bg-panel/70 backdrop-blur-sm"
      >
        <div className="px-4 pt-5 pb-3 border-b border-panel-border/30">
          <span className="font-mono text-[10px] tracking-[0.2em] text-charcoal/40 uppercase">Categories</span>
        </div>

        <nav className="flex flex-col py-1">
          {categories.map((cat) => {
            const isActive = cat.id === selectedId;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedId(cat.id)}
                aria-pressed={isActive}
                className={`flex items-center justify-between gap-2 px-4 py-2.5 text-left border-l-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40 ${
                  isActive
                    ? "border-gold/55 bg-forest/10 text-gold"
                    : "border-transparent text-charcoal/52 hover:bg-panel-raised hover:text-charcoal/80"
                }`}
              >
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-wide leading-snug">
                  {cat.name}
                </span>
                <span className={`font-mono text-[8.5px] tabular-nums flex-shrink-0 ${isActive ? "text-gold/55" : "text-charcoal/30"}`}>
                  {cat.toolCount}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 px-5 pr-12 py-8 md:px-8 md:pr-14">

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
                onClick={() => setSelectedId(cat.id)}
                className={`flex-shrink-0 rounded border px-3 py-1.5 font-mono text-[9.5px] font-bold uppercase tracking-wide transition-all duration-200 ${
                  isActive
                    ? "border-forest/45 bg-forest/10 text-gold"
                    : "border-panel-border bg-panel text-charcoal/52 hover:text-charcoal/75"
                }`}
              >
                {cat.name}
                <span className={`ml-1.5 ${isActive ? "text-gold/55" : "text-charcoal/30"}`}>{cat.toolCount}</span>
              </button>
            );
          })}
        </div>

        {/* Section header */}
        <div className="mb-5 space-y-1">
          <div className="font-mono text-[10px] tracking-[0.2em] text-gold/80 uppercase">
            [ TECH TOOLS // {selectedCat?.name.toUpperCase()} ]
          </div>
          {selectedCat?.description && (
            <p className="font-sans text-[13.5px] leading-relaxed text-charcoal/62 max-w-2xl">
              {selectedCat.description}
            </p>
          )}
        </div>

        {/* ── Search + controls row ── */}
        <div className="mb-4 space-y-2">
          <div className="flex gap-2">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/45 pointer-events-none" />
              <input
                type="text"
                placeholder={`Search ${selectedCat?.name ?? "tools"} by name or description…`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded border border-panel-border/60 bg-panel/80 py-2.5 pr-4 pl-10 font-sans text-[13px] text-charcoal placeholder:text-charcoal/38 outline-none transition-colors focus:border-gold/45 backdrop-blur-sm"
                aria-label="Search tools"
              />
            </div>

            {/* Filters toggle */}
            <button
              onClick={() => setFiltersOpen((o) => !o)}
              aria-pressed={filtersOpen}
              className={`flex items-center gap-1.5 rounded border px-3 py-2.5 font-mono text-[9.5px] font-bold uppercase tracking-wider transition-all duration-200 ${
                filtersOpen || activeFilterCount > 0
                  ? "border-forest/50 bg-forest/10 text-gold"
                  : "border-panel-border/60 bg-panel/80 text-charcoal/55 hover:text-charcoal/80"
              }`}
            >
              <Filter className="h-3 w-3" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gold text-panel font-mono text-[8px] leading-none font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Surprise me */}
            <button
              onClick={surpriseMe}
              disabled={loading || filteredTools.length === 0}
              title="Jump to a random group"
              className="flex items-center gap-1.5 rounded border border-panel-border/60 bg-panel/80 px-3 py-2.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-charcoal/55 hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Shuffle className="h-3 w-3" />
              <span className="hidden sm:inline">Surprise</span>
            </button>

            {/* Reset — only when something is active */}
            {isFiltered && (
              <button
                onClick={resetAll}
                className="flex items-center gap-1.5 rounded border border-panel-border/60 bg-panel/80 px-3 py-2.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-charcoal/55 hover:text-gold transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>

          {/* ── Filter panel ── */}
          {filtersOpen && (
            <div className="rounded border border-panel-border/50 bg-panel/90 p-4 space-y-4 backdrop-blur-sm">

              {/* Subcategory chips */}
              {subcategories.length > 1 && !loading && (
                <div className="space-y-2">
                  <span className="font-mono text-[9px] tracking-widest text-charcoal/35 uppercase">
                    Subcategory
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setFilterSubcategory(null)}
                      className={`rounded border px-2.5 py-1 font-mono text-[9.5px] uppercase font-bold tracking-wide transition-all duration-150 ${
                        filterSubcategory === null
                          ? "border-forest/50 bg-forest/12 text-gold"
                          : "border-panel-border text-charcoal/50 hover:text-charcoal/75"
                      }`}
                    >
                      All
                    </button>
                    {subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setFilterSubcategory(filterSubcategory === sub ? null : sub)}
                        className={`rounded border px-2.5 py-1 font-mono text-[9.5px] uppercase font-bold tracking-wide transition-all duration-150 ${
                          filterSubcategory === sub
                            ? "border-forest/50 bg-forest/12 text-gold"
                            : "border-panel-border text-charcoal/50 hover:text-charcoal/75"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sort + Curated-only */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Sort segmented control */}
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[9px] tracking-widest text-charcoal/35 uppercase">Sort</span>
                  <div className="flex rounded border border-panel-border overflow-hidden">
                    {(["default", "az", "za"] as const).map((key, i) => (
                      <button
                        key={key}
                        onClick={() => setSort(key)}
                        className={`px-2.5 py-1 font-mono text-[9px] uppercase font-bold tracking-wide transition-all duration-150 ${
                          sort === key ? "bg-forest/12 text-gold" : "bg-panel text-charcoal/50 hover:text-charcoal/75"
                        } ${i > 0 ? "border-l border-panel-border" : ""}`}
                      >
                        {key === "default" ? "Default" : key === "az" ? "A → Z" : "Z → A"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Curated-only toggle */}
                <button
                  onClick={() => setFilterCurated((v) => !v)}
                  className={`flex items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-[9.5px] uppercase font-bold tracking-wide transition-all duration-150 ${
                    filterCurated
                      ? "border-gold/45 bg-gold/10 text-gold"
                      : "border-panel-border text-charcoal/50 hover:text-charcoal/75"
                  }`}
                >
                  <Star className={`h-3 w-3 ${filterCurated ? "fill-gold/50" : ""}`} />
                  Curated only
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Loading skeleton ── */}
        {loading && <LoadingSkeleton name={selectedCat?.name} />}

        {/* ── Results ── */}
        {!loading && (
          <>
            {/* Results count bar */}
            <div className="mb-5 flex items-center justify-between border-b border-panel-border/25 pb-2.5 font-mono text-[10px] text-charcoal/40">
              <span>[TOOLS_QUERY: SUCCESS]</span>
              <span className="font-bold text-charcoal/52">
                {filteredTools.length.toLocaleString()} TOOLS
                {searchQuery && <span className="text-charcoal/35"> · &ldquo;{searchQuery}&rdquo;</span>}
                {filterSubcategory && <span className="text-charcoal/35"> · {filterSubcategory}</span>}
              </span>
            </div>

            {/* Curated picks — shown only when no active filters */}
            {showCurated && (
              <div className="mb-12">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-gold/65 fill-gold/30" />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-charcoal/45 uppercase">
                      Curated Picks
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-panel-border/20" />
                  <button
                    onClick={() => { setFilterCurated(true); setFiltersOpen(false); }}
                    className="font-mono text-[9px] text-charcoal/30 hover:text-gold/70 transition-colors uppercase tracking-wide"
                  >
                    View all →
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {curatedTools.map((tool, idx) => (
                    <ToolCard key={`curated-${tool.name}`} {...tool} index={idx + 1} />
                  ))}
                </div>

                {/* Divider before full listing */}
                <div className="mt-10 flex items-center gap-3">
                  <div className="h-px flex-1 bg-panel-border/20" />
                  <span className="font-mono text-[9px] tracking-widest text-charcoal/25 uppercase">All Tools</span>
                  <div className="h-px flex-1 bg-panel-border/20" />
                </div>
              </div>
            )}

            {/* Grouped tool sections */}
            {groupedTools.length > 0 ? (
              <div className="space-y-10">
                {groupedTools.map(([subcategory, tools]) => (
                  <section key={subcategory} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h3
                        id={subcategory.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                        data-jump-target=""
                        className="font-display text-[22px] font-bold uppercase tracking-[0.06em] text-charcoal leading-none min-w-0 break-words"
                      >
                        {subcategory}
                      </h3>
                      <div className="h-px flex-1 bg-panel-border/20" />
                      <span className="font-mono text-[9.5px] text-charcoal/38">
                        {tools.length} {tools.length === 1 ? "tool" : "tools"}
                      </span>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {tools.map((tool, idx) => (
                        <ToolCard key={`${tool.name}-${idx}`} {...tool} index={idx + 1} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center rounded border border-dashed border-panel-border/40 bg-panel/60 py-16 text-center">
                <p className="mb-1 font-mono text-[11px] tracking-widest text-charcoal/40 uppercase">
                  No matches found
                </p>
                <p className="mb-6 font-sans text-[13px] text-charcoal/32 max-w-xs">
                  {searchQuery
                    ? `No tools match "${searchQuery}" in ${selectedCat?.name ?? "this category"}.`
                    : "No tools match the current filters."}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {isFiltered && (
                    <button
                      onClick={resetAll}
                      className="rounded border border-panel-border bg-panel px-4 py-2 font-mono text-[10px] uppercase font-bold tracking-wider text-gold/70 hover:text-gold transition-colors"
                    >
                      Reset All Filters
                    </button>
                  )}
                  <button
                    onClick={() => { setSelectedId("ai"); resetAll(); }}
                    className="rounded border border-panel-border bg-panel px-4 py-2 font-mono text-[10px] uppercase font-bold tracking-wider text-charcoal/50 hover:text-gold transition-colors"
                  >
                    Browse AI Tools
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
