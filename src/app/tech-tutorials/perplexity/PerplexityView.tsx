"use client";

import { useState, useMemo } from "react";
import { Search, RotateCcw, Shuffle } from "lucide-react";
import VideoCard, { type HermesEntry } from "@/components/VideoCard";

interface Props {
  entries: HermesEntry[];
}

const ALL = "All";
const START_HERE_CATEGORY = "Beginner / Start Here";

const CATEGORIES = [
  ALL,
  "Beginner / Start Here",
  "Search, Research & Citations",
  "Pro Search, Pages & Collections",
  "Study, Writing & Productivity",
  "Mobile, Browser & Daily Use",
  "Comparisons, Reviews & Updates",
];

type LevelFilter = "All" | "Yes" | "Somewhat" | "No";
type FormatFilter = "All" | "Full video" | "Short";

export default function PerplexityView({ entries }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("All");
  const [formatFilter, setFormatFilter] = useState<FormatFilter>("All");

  const filtered = useMemo(() => {
    let result = entries;
    if (selectedCategory !== ALL) result = result.filter((e) => e.category === selectedCategory);
    if (levelFilter !== "All") result = result.filter((e) => e.beginnerFriendly === levelFilter);
    if (formatFilter !== "All") result = result.filter((e) => e.format === formatFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.description?.toLowerCase().includes(q) ?? false) ||
          e.searchTags.some((t) => t.includes(q)) ||
          e.recommendationTags.some((t) => t.includes(q))
      );
    }
    return result;
  }, [entries, selectedCategory, searchQuery, levelFilter, formatFilter]);

  const startHereVideos = useMemo(() => {
    if (selectedCategory !== ALL || levelFilter !== "All" || formatFilter !== "All" || searchQuery) return [];
    return entries.filter((e) => e.category === START_HERE_CATEGORY);
  }, [entries, selectedCategory, levelFilter, formatFilter, searchQuery]);

  const startHereIds = useMemo(() => new Set(startHereVideos.map((e) => e.link)), [startHereVideos]);

  const mainFiltered = useMemo(() => {
    if (startHereVideos.length === 0) return filtered;
    return filtered.filter((e) => !startHereIds.has(e.link));
  }, [filtered, startHereVideos, startHereIds]);

  const groupedEntries = useMemo(() => {
    const map = new Map<string, HermesEntry[]>();
    for (const e of mainFiltered) {
      if (!map.has(e.category)) map.set(e.category, []);
      map.get(e.category)!.push(e);
    }
    return Array.from(map.entries());
  }, [mainFiltered]);

  const hasFormats = useMemo(() => entries.some((e) => e.format === "Short"), [entries]);

  const resetAll = () => { setSearchQuery(""); setLevelFilter("All"); setFormatFilter("All"); setSelectedCategory(ALL); };

  const surpriseMe = () => {
    if (filtered.length === 0) return;
    const entry = filtered[Math.floor(Math.random() * filtered.length)];
    const sectionId = `section-${entry.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("jump-active");
      setTimeout(() => el.classList.remove("jump-active"), 2000);
    }
  };

  return (
    <div className="flex min-h-screen animate-fade-in">

      {/* ── Desktop category rail ── */}
      <aside
        aria-label="Tutorial categories"
        className="hidden lg:flex flex-col sticky top-0 h-screen w-[210px] flex-shrink-0 overflow-y-auto border-r border-panel-border/50 bg-panel/70 backdrop-blur-sm"
      >
        <div className="px-4 pt-5 pb-2.5 border-b border-panel-border/30">
          <span className="font-mono text-[8px] tracking-[0.25em] text-charcoal/25 uppercase">Category</span>
        </div>
        <nav className="flex flex-col gap-0 py-1">
          {CATEGORIES.map((cat) => {
            const isActive = cat === selectedCategory;
            const count = cat === ALL ? entries.length : entries.filter((e) => e.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSearchQuery(""); }}
                aria-pressed={isActive}
                className={`flex items-center justify-between gap-2 px-4 py-2.5 text-left border-l-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40 ${
                  isActive
                    ? "border-gold/55 bg-forest/10 text-gold"
                    : "border-transparent text-charcoal/45 hover:bg-panel-raised hover:text-charcoal/72"
                }`}
              >
                <span className="font-mono text-[8.5px] font-bold uppercase tracking-wide leading-snug">
                  {cat === ALL ? "All Videos" : cat}
                </span>
                <span className="font-mono text-[8px] text-charcoal/25 tabular-nums flex-shrink-0">{count}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 px-5 pr-12 py-8 md:px-8 md:pr-14">

        {/* Page header */}
        <div className="mb-6 space-y-1.5">
          <div className="font-mono text-[9px] tracking-[0.25em] text-gold/70 uppercase">
            [ TECH TUTORIALS // PERPLEXITY ]
          </div>
          <p className="font-sans text-[12px] text-charcoal/50 max-w-2xl leading-relaxed">
            54 community tutorials covering Perplexity basics, AI search, research workflows, Pro Search, Pages, and daily productivity use cases.
          </p>
        </div>

        {/* Mobile category chips */}
        <div
          role="tablist"
          aria-label="Tutorial categories"
          className="flex gap-1.5 overflow-x-auto pb-3 mb-5 lg:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat === selectedCategory;
            const shortLabel = cat === ALL ? "All" : cat.split(/[,&\/]/)[0].trim().split(" ").slice(0, 2).join(" ");
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => { setSelectedCategory(cat); setSearchQuery(""); }}
                className={`flex-shrink-0 rounded border px-3 py-1.5 font-mono text-[8.5px] font-bold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40 ${
                  isActive
                    ? "border-forest/45 bg-forest/10 text-gold"
                    : "border-panel-border bg-panel text-charcoal/42 hover:border-panel-border/80 hover:text-charcoal/65"
                }`}
              >
                {shortLabel}
              </button>
            );
          })}
        </div>

        {/* Search + filter bar */}
        <div className="mb-6 flex flex-col gap-3 rounded border border-panel-border bg-panel p-3.5">
          <div className="relative">
            <Search className="absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/28 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, description, tag, or channel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-panel-border/50 bg-cream py-2 pr-4 pl-10 font-mono text-[11px] text-charcoal placeholder:text-charcoal/28 outline-none transition-colors focus:border-gold/40"
              aria-label="Search tutorials"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[7.5px] uppercase tracking-widest text-charcoal/28 flex-shrink-0">Level:</span>
              {(["All", "Yes", "Somewhat", "No"] as LevelFilter[]).map((lvl) => {
                const labels: Record<string, string> = { All: "Any", Yes: "Beginner", Somewhat: "Intermediate", No: "Advanced" };
                return (
                  <button
                    key={lvl}
                    onClick={() => setLevelFilter(lvl)}
                    className={`rounded border px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-wide transition-colors ${
                      levelFilter === lvl
                        ? "border-gold/45 bg-forest/10 text-gold"
                        : "border-panel-border bg-cream text-charcoal/40 hover:text-charcoal/65"
                    }`}
                  >
                    {labels[lvl]}
                  </button>
                );
              })}
            </div>

            {hasFormats && (
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[7.5px] uppercase tracking-widest text-charcoal/28 flex-shrink-0">Format:</span>
                {(["All", "Full video", "Short"] as FormatFilter[]).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setFormatFilter(fmt)}
                    className={`rounded border px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-wide transition-colors ${
                      formatFilter === fmt
                        ? "border-gold/45 bg-forest/10 text-gold"
                        : "border-panel-border bg-cream text-charcoal/40 hover:text-charcoal/65"
                    }`}
                  >
                    {fmt === "Full video" ? "Full" : fmt}
                  </button>
                ))}
              </div>
            )}

            <div className="flex-1" />

            {(searchQuery || levelFilter !== "All" || formatFilter !== "All") && (
              <button
                onClick={resetAll}
                className="inline-flex items-center gap-1.5 rounded border border-panel-border bg-cream px-3 py-1.5 font-mono text-[8.5px] uppercase font-bold tracking-wider text-charcoal/50 hover:text-gold transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}
            <button
              onClick={surpriseMe}
              disabled={filtered.length === 0}
              title="Jump to a random tutorial"
              className="inline-flex items-center gap-1.5 rounded border border-panel-border bg-cream px-3 py-1.5 font-mono text-[8.5px] uppercase font-bold tracking-wider text-charcoal/50 hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Shuffle className="h-3 w-3" />
              <span className="hidden sm:inline">Surprise</span>
            </button>
          </div>
        </div>

        {/* Count bar */}
        <div className="mb-5 flex items-center justify-between border-b border-panel-border/25 pb-3 font-mono text-[9px] text-charcoal/28">
          <span>[TUTORIALS_QUERY: SUCCESS]</span>
          <span className="font-bold text-charcoal/40">
            {filtered.length} VIDEOS
            {searchQuery && ` MATCHING "${searchQuery.toUpperCase()}"`}
          </span>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded border border-dashed border-panel-border/35 bg-panel py-16 text-center">
            <p className="mb-1.5 font-mono text-[11px] text-charcoal/38">NO MATCHES FOUND</p>
            <p className="font-sans text-[11px] text-charcoal/28">Try resetting the search or changing the filters.</p>
            <button onClick={resetAll} className="mt-6 rounded border border-panel-border bg-panel px-4 py-2 font-mono text-[9.5px] uppercase font-bold tracking-wider text-gold/70 hover:text-gold transition-colors">
              Reset All
            </button>
          </div>
        ) : (
          <div className="space-y-10">

            {startHereVideos.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3
                    id="section-start-here"
                    data-jump-target=""
                    className="font-display text-[22px] font-bold uppercase tracking-[0.06em] text-charcoal leading-none min-w-0 break-words transition-colors"
                  >
                    Start Here
                  </h3>
                  <div className="h-px flex-1 bg-panel-border/20" />
                  <span className="font-mono text-[8.5px] text-charcoal/28">
                    {startHereVideos.length} {startHereVideos.length === 1 ? "video" : "videos"}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {startHereVideos.map((entry, idx) => (
                    <VideoCard key={`start-${entry.link}-${idx}`} entry={entry} source="Perplexity" />
                  ))}
                </div>
              </section>
            )}

            {groupedEntries.map(([category, catEntries]) => {
              const sectionId = `section-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
              return (
                <section key={category} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h3
                      id={sectionId}
                      data-jump-target=""
                      className="font-display text-[22px] font-bold uppercase tracking-[0.06em] text-charcoal leading-none min-w-0 break-words transition-colors"
                    >
                      {category}
                    </h3>
                    <div className="h-px flex-1 bg-panel-border/20" />
                    <span className="font-mono text-[8.5px] text-charcoal/28">
                      {catEntries.length} {catEntries.length === 1 ? "video" : "videos"}
                    </span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {catEntries.map((entry, idx) => (
                      <VideoCard key={`${entry.link}-${idx}`} entry={entry} source="Perplexity" />
                    ))}
                  </div>
                </section>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}
