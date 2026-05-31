"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, ExternalLink, Trash2, ArrowRight, FileText, GraduationCap } from "lucide-react";
import { getBookmarks, type BookmarkItem } from "@/components/BookmarkButton";
import { LESSONS, getLessonNotes, deleteLessonNote } from "@/data/lessons";

const TYPE_LABELS: Record<string, string> = {
  lesson:  "KD Lesson",
  tutorial: "Tech Tutorial",
  tool:     "Tech Tool",
  group:    "Community Group",
  builder:  "Community Builder",
  agency:   "Government Agency",
};

const TYPE_ORDER = ["lesson", "tutorial", "tool", "group", "builder", "agency"] as const;

function getLessonTitle(lessonId: string): string {
  return LESSONS.find((l) => l.id === lessonId)?.title ?? lessonId;
}

export default function SavedPage() {
  const [bookmarks, setBookmarks]     = useState<BookmarkItem[]>([]);
  const [lessonNotes, setLessonNotes] = useState<Record<string, string>>({});
  const [mounted, setMounted]         = useState(false);

  useEffect(() => {
    setMounted(true);

    const loadBookmarks = () => setBookmarks(getBookmarks());
    const loadNotes     = () => setLessonNotes(getLessonNotes());

    loadBookmarks();
    loadNotes();

    window.addEventListener("kd-bookmarks-changed", loadBookmarks);
    window.addEventListener("kd-notes-changed", loadNotes);
    return () => {
      window.removeEventListener("kd-bookmarks-changed", loadBookmarks);
      window.removeEventListener("kd-notes-changed", loadNotes);
    };
  }, []);

  const removeBookmark = (id: string) => {
    const next = bookmarks.filter((b) => b.id !== id);
    localStorage.setItem("kd-bookmarks", JSON.stringify(next));
    setBookmarks(next);
    window.dispatchEvent(new Event("kd-bookmarks-changed"));
  };

  const clearAll = () => {
    localStorage.setItem("kd-bookmarks", "[]");
    setBookmarks([]);
    window.dispatchEvent(new Event("kd-bookmarks-changed"));
  };

  const removeNote = (lessonId: string) => {
    deleteLessonNote(lessonId);
    setLessonNotes((prev) => {
      const next = { ...prev };
      delete next[lessonId];
      return next;
    });
  };

  const downloadNote = (lessonId: string, note: string) => {
    const title   = getLessonTitle(lessonId);
    const content = `# ${title}\n\n${note}`;
    const blob    = new Blob([content], { type: "text/markdown" });
    const url     = URL.createObjectURL(blob);
    const a       = document.createElement("a");
    a.href        = url;
    a.download    = `${lessonId}-notes.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!mounted) return null;

  const grouped = TYPE_ORDER.map((type) => ({
    type,
    label: TYPE_LABELS[type],
    items: bookmarks.filter((b) => b.type === type),
  })).filter((g) => g.items.length > 0);

  const noteEntries = Object.entries(lessonNotes);
  const hasContent  = bookmarks.length > 0 || noteEntries.length > 0;

  return (
    <div className="min-h-screen">
    <div className="mx-auto max-w-5xl px-6 py-10 md:px-8 animate-fade-in">

      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 font-mono text-[10px] tracking-[0.22em] text-gold/65 uppercase">
          [ SAVED ITEMS ]
        </div>
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-display text-[34px] font-bold uppercase tracking-[0.05em] text-charcoal leading-none md:text-[42px]">
            Your Bookmarks
          </h1>
          {bookmarks.length > 0 && (
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold tracking-wider text-charcoal/35 hover:text-crimson transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              <span>Clear All</span>
            </button>
          )}
        </div>
        <p className="mt-3 font-sans text-[14px] text-charcoal/50 leading-[1.65]">
          {hasContent
            ? `${bookmarks.length} saved ${bookmarks.length === 1 ? "item" : "items"}${noteEntries.length > 0 ? ` · ${noteEntries.length} lesson ${noteEntries.length === 1 ? "note" : "notes"}` : ""} — stored in your browser.`
            : "No bookmarks yet. Star any item across the directory to save it here."}
        </p>
      </div>

      {/* Empty state */}
      {!hasContent && (
        <div className="flex flex-col items-center justify-center rounded border border-dashed border-panel-border/35 bg-panel py-20 text-center">
          <Bookmark className="h-8 w-8 text-charcoal/15 mb-4" strokeWidth={1.5} />
          <p className="mb-1.5 font-mono text-[12px] text-charcoal/42">NOTHING SAVED YET</p>
          <p className="mb-8 font-sans text-[13px] text-charcoal/32">
            Browse the directory and click the bookmark icon on any card.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/tech-tools",          label: "Tech Tools"          },
              { href: "/community-groups",     label: "Community Groups"    },
              { href: "/community-builders",   label: "Community Builders"  },
              { href: "/government-agencies",  label: "Government Agencies" },
              { href: "/kd-lessons",           label: "KD Lessons"          },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded border border-panel-border bg-panel px-4 py-2 font-mono text-[10px] uppercase font-bold tracking-wider text-gold/58 hover:text-gold transition-colors"
              >
                <span>{link.label}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Lesson Notes section ── */}
      {noteEntries.length > 0 && (
        <section className="mb-12 space-y-4">
          <div className="flex items-center gap-3 border-b border-panel-border/25 pb-3">
            <GraduationCap className="h-4 w-4 text-gold/55" />
            <h2 className="font-display text-[22px] font-bold uppercase tracking-[0.05em] text-charcoal leading-none">
              Lesson Notes
            </h2>
            <span className="font-mono text-[10px] text-charcoal/32 ml-auto">
              {noteEntries.length} {noteEntries.length === 1 ? "set" : "sets"}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {noteEntries.map(([lessonId, note]) => (
              <div
                key={lessonId}
                className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel transition-all duration-300 hover:border-forest/45 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gold/0 transition-all duration-300 group-hover:bg-gold/30 pointer-events-none" />

                <div className="flex flex-col gap-2 p-4">
                  <div className="font-mono text-[10px] tracking-widest text-charcoal/36 uppercase">
                    // KD Lesson
                  </div>
                  <h3 className="font-sans text-[14px] font-bold tracking-tight text-charcoal leading-snug group-hover:text-gold/90 transition-colors">
                    {getLessonTitle(lessonId)}
                  </h3>
                  <p className="font-sans text-[12px] leading-[1.6] text-charcoal/42 line-clamp-3 whitespace-pre-wrap">
                    {note}
                  </p>
                </div>

                <div className="mx-4 mb-3 pt-3 border-t border-panel-border/25 flex items-center justify-between gap-2">
                  <Link
                    href="/kd-lessons"
                    className="inline-flex items-center gap-1 font-mono text-[10px] text-charcoal/38 hover:text-gold transition-colors"
                  >
                    <ArrowRight className="h-3 w-3" />
                    <span>Open in KD Lessons</span>
                  </Link>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => downloadNote(lessonId, note)}
                      title="Download as Markdown"
                      className="text-charcoal/25 hover:text-gold transition-colors"
                    >
                      <FileText className="h-3.5 w-3.5" strokeWidth={1.8} />
                    </button>
                    <button
                      onClick={() => removeNote(lessonId)}
                      aria-label="Delete notes"
                      className="text-charcoal/20 hover:text-crimson transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Grouped bookmark list ── */}
      {grouped.length > 0 && (
        <div className="space-y-10">
          {grouped.map(({ type, label, items }) => (
            <section key={type} className="space-y-4">

              {/* Group header */}
              <div className="flex items-center gap-3 border-b border-panel-border/25 pb-3">
                <h2 className="font-display text-[22px] font-bold uppercase tracking-[0.05em] text-charcoal leading-none">
                  {label}
                </h2>
                <span className="font-mono text-[10px] text-charcoal/32 ml-auto">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Item cards */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel transition-all duration-300 hover:border-forest/45 overflow-hidden"
                  >
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 pointer-events-none" />

                    <div className="flex flex-col gap-2 p-4">
                      <div className="font-mono text-[10px] tracking-widest text-charcoal/36 uppercase">
                        // {TYPE_LABELS[item.type] ?? item.type}
                      </div>
                      <h3 className="font-sans text-[14px] font-bold tracking-tight text-charcoal leading-snug group-hover:text-gold/90 transition-colors">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="font-sans text-[13px] leading-[1.6] text-charcoal/48 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="mx-4 mb-3 pt-3 border-t border-panel-border/25 flex items-center justify-between gap-2">
                      {item.externalUrl ? (
                        <a
                          href={item.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[10px] text-gold/48 hover:text-gold transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Visit</span>
                        </a>
                      ) : (
                        <Link
                          href={item.pageUrl}
                          className="inline-flex items-center gap-1 font-mono text-[10px] text-charcoal/38 hover:text-gold transition-colors"
                        >
                          <ArrowRight className="h-3 w-3" />
                          <span>View in directory</span>
                        </Link>
                      )}
                      <button
                        onClick={() => removeBookmark(item.id)}
                        aria-label="Remove bookmark"
                        className="text-charcoal/20 hover:text-crimson transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </section>
          ))}
        </div>
      )}

    </div>
    </div>
  );
}
