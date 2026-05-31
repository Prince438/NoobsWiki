"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronDown,
  Download,
  BookOpen,
  Tv2,
  FileText,
  ExternalLink,
} from "lucide-react";
import BookmarkButton from "@/components/BookmarkButton";
import { LESSONS, getLessonNotes, saveLessonNote } from "@/data/lessons";
import type { BookmarkItem } from "@/components/BookmarkButton";

type ExportFormat = "txt" | "md" | "html";

const FORMAT_OPTS: { value: ExportFormat; label: string }[] = [
  { value: "md",   label: "Markdown (.md)"   },
  { value: "txt",  label: "Plain Text (.txt)" },
  { value: "html", label: "HTML (.html)"      },
];

export default function KDLessonsView() {
  const [selectedId, setSelectedId]     = useState(LESSONS[0].id);
  const [notes, setNotes]               = useState("");
  const [saveStatus, setSaveStatus]     = useState<"idle" | "saving" | "saved">("idle");
  const [exportFormat, setExportFormat] = useState<ExportFormat>("md");
  const [mounted, setMounted]           = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const lesson = LESSONS.find((l) => l.id === selectedId) ?? LESSONS[0];

  useEffect(() => { setMounted(true); }, []);

  // Load notes when lesson changes
  useEffect(() => {
    if (!mounted) return;
    const all = getLessonNotes();
    setNotes(all[lesson.id] ?? "");
    setSaveStatus("idle");
  }, [lesson.id, mounted]);

  // Autosave with debounce
  const handleNoteChange = useCallback(
    (value: string) => {
      setNotes(value);
      setSaveStatus("saving");
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        saveLessonNote(lesson.id, value);
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2200);
      }, 800);
    },
    [lesson.id],
  );

  // Export notes
  const handleExport = () => {
    if (!notes.trim()) return;
    const title = lesson.title;
    let content = "";
    let filename = "";
    let mimeType = "";

    if (exportFormat === "txt") {
      content  = `${title}\n${"=".repeat(title.length)}\n\n${notes}`;
      filename = `${lesson.id}-notes.txt`;
      mimeType = "text/plain";
    } else if (exportFormat === "md") {
      content  = `# ${title}\n\n${notes}`;
      filename = `${lesson.id}-notes.md`;
      mimeType = "text/markdown";
    } else {
      const escaped = notes.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} — Notes</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 700px; margin: 2rem auto; line-height: 1.7; color: #1a1a1a; }
    h1   { border-bottom: 2px solid #ddd; padding-bottom: .5rem; }
    pre  { white-space: pre-wrap; font-family: inherit; }
  </style>
</head>
<body>
<h1>${title}</h1>
<pre>${escaped}</pre>
</body>
</html>`;
      filename = `${lesson.id}-notes.html`;
      mimeType = "text/html";
    }

    const blob = new Blob([content], { type: mimeType });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const bookmarkItem: BookmarkItem = {
    id:          `lesson-${lesson.id}`,
    name:        lesson.title,
    type:        "lesson",
    description: lesson.description,
    pageUrl:     "/kd-lessons",
  };

  const embedSrc = `https://www.youtube.com/embed/${lesson.videoId}?rel=0&modestbranding=1&color=white`;

  const wordCount = notes.trim() ? notes.trim().split(/\s+/).length : 0;

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-8 animate-fade-in">

        {/* ── Page header ── */}
        <div className="mb-7 max-w-3xl space-y-2">
          <div className="font-mono text-[10px] tracking-[0.22em] text-gold/65 uppercase">
            [ DIGITAL CLASSROOM ]
          </div>
          <h1 className="font-display text-[44px] font-bold uppercase tracking-[0.05em] text-charcoal leading-none md:text-[56px]">
            KD Lessons
          </h1>
          <p className="font-sans text-[15px] text-charcoal/60 leading-[1.65]">
            Live sessions and recorded lessons — watch, take notes, and save your progress.
          </p>
        </div>

        {/* ── Lesson selector row ── */}
        <div className="mb-5 flex items-center gap-3 flex-wrap">
          {/* Dropdown */}
          <div className="relative min-w-[200px]">
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full appearance-none rounded border border-panel-border bg-panel/90 px-3.5 py-2.5 pr-8 font-mono text-[11px] tracking-wide text-charcoal/85 focus:outline-none focus:border-gold/45 cursor-pointer transition-colors hover:border-forest/50"
            >
              {LESSONS.map((l) => (
                <option key={l.id} value={l.id}>{l.title}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-charcoal/38" />
          </div>

          {/* Bookmark */}
          <BookmarkButton item={bookmarkItem} />

          {/* Description hint */}
          <span className="hidden sm:block font-mono text-[10px] text-charcoal/30 tracking-wide">
            // {lesson.description}
          </span>
        </div>

        {/* ── Cinema player ── */}
        <div className="relative mb-6 overflow-hidden rounded border border-panel-border bg-panel shadow-[0_12px_80px_rgba(0,0,0,0.85)]">

          {/* Top forest accent bar */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/60 pointer-events-none z-10" />

          {/* Corner marks */}
          <span className="absolute top-[7px] left-[7px] h-[8px] w-[8px] border-t border-l border-gold/20 pointer-events-none z-10" />
          <span className="absolute top-[7px] right-[7px] h-[8px] w-[8px] border-t border-r border-gold/20 pointer-events-none z-10" />
          <span className="absolute bottom-[7px] left-[7px] h-[8px] w-[8px] border-b border-l border-gold/20 pointer-events-none z-10" />
          <span className="absolute bottom-[7px] right-[7px] h-[8px] w-[8px] border-b border-r border-gold/20 pointer-events-none z-10" />

          {/* Player header */}
          <div className="flex items-center gap-2 border-b border-panel-border/40 px-4 py-3">
            <span className="h-1.5 w-1.5 rounded-full bg-forest flex-shrink-0" />
            <span className="font-mono text-[8px] tracking-[0.2em] text-gold/55 uppercase flex-shrink-0">
              Now Playing
            </span>
          </div>

          {/* Title row */}
          <div className="border-b border-panel-border/20 px-4 py-3">
            <p className="font-sans text-[13px] font-bold leading-snug text-charcoal line-clamp-1">
              {lesson.title}
            </p>
          </div>

          {/* Embed */}
          <div className="aspect-video w-full bg-panel-raised">
            <iframe
              key={lesson.videoId}
              src={embedSrc}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>

          {/* Player footer */}
          <div className="flex items-center justify-between gap-3 border-t border-panel-border/20 px-4 py-3">
            <span className="font-mono text-[7.5px] uppercase tracking-widest text-charcoal/22">
              KD Lessons · Digital Classroom
            </span>
            <a
              href={`https://www.youtube.com/watch?v=${lesson.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-wider text-gold/45 hover:text-gold transition-colors"
            >
              <ExternalLink className="h-2.5 w-2.5" />
              <span>Open in YouTube</span>
            </a>
          </div>

        </div>

        {/* ── Subtitles / CC panel ── */}
        <div className="mb-5 rounded border border-panel-border/45 bg-panel/50 px-5 py-4">
          <div className="mb-2 flex items-center gap-2">
            <Tv2 className="h-3.5 w-3.5 text-charcoal/35" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-charcoal/38 uppercase">Subtitles &amp; Captions</span>
          </div>
          <p className="font-sans text-[13px] text-charcoal/50 leading-[1.6]">
            Captions are served directly by YouTube. Use the{" "}
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-gold/70 border border-panel-border/60 bg-panel px-1.5 py-0.5 rounded">CC</span>
            {" "}button inside the player to toggle subtitles and select a language. Real-time caption sync is not available through the YouTube embed API.
          </p>
        </div>

        {/* ── Notes panel ── */}
        <div className="rounded border border-panel-border bg-panel/80">

          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-panel-border/45 px-5 py-3">
            <div className="flex items-center gap-2.5">
              <BookOpen className="h-3.5 w-3.5 text-gold/55" />
              <span className="font-mono text-[10px] tracking-[0.18em] text-charcoal/55 uppercase">Lesson Notes</span>
              <span className="font-mono text-[9px] text-charcoal/28">— {lesson.title}</span>
            </div>
            <span
              className={`font-mono text-[9px] tracking-wide transition-all duration-300 ${
                saveStatus === "saving"
                  ? "text-gold/55 opacity-100"
                  : saveStatus === "saved"
                  ? "text-forest-hover opacity-100"
                  : "opacity-0"
              }`}
            >
              {saveStatus === "saving" ? "saving…" : "saved ✓"}
            </span>
          </div>

          {/* Textarea */}
          <textarea
            value={notes}
            onChange={(e) => handleNoteChange(e.target.value)}
            placeholder={`Write your notes for ${lesson.title} here…\n\nNotes are saved automatically and tied to this lesson. Switch lessons and your notes follow.`}
            className="min-h-[220px] w-full resize-y bg-transparent px-5 py-4 font-sans text-[14px] text-charcoal/82 placeholder:text-charcoal/18 focus:outline-none leading-[1.7]"
            spellCheck
          />

          {/* Export footer */}
          <div className="flex items-center gap-3 flex-wrap border-t border-panel-border/30 px-5 py-3">
            <div className="flex items-center gap-1.5">
              <FileText className="h-3 w-3 text-charcoal/30" />
              <span className="font-mono text-[10px] text-charcoal/38 uppercase tracking-wider">Export:</span>
            </div>

            {/* Format select */}
            <div className="relative">
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
                className="appearance-none rounded border border-panel-border/55 bg-panel px-3 py-1.5 pr-6 font-mono text-[10px] text-charcoal/65 focus:outline-none focus:border-gold/40 cursor-pointer"
              >
                {FORMAT_OPTS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-charcoal/35" />
            </div>

            {/* Download button */}
            <button
              onClick={handleExport}
              disabled={!notes.trim()}
              className="inline-flex items-center gap-1.5 rounded border border-panel-border/55 bg-panel px-3 py-1.5 font-mono text-[10px] text-gold/58 hover:text-gold hover:border-gold/38 transition-colors disabled:pointer-events-none disabled:opacity-25"
            >
              <Download className="h-3 w-3" />
              <span>Download</span>
            </button>

            {/* Word / char count */}
            {notes.trim() && (
              <span className="ml-auto font-mono text-[9px] text-charcoal/25">
                {wordCount} {wordCount === 1 ? "word" : "words"} · {notes.length} chars
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
