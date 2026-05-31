"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";

export interface BookmarkItem {
  id: string;
  name: string;
  type: "tool" | "group" | "builder" | "agency" | "tutorial" | "vc" | "lesson";
  description: string;
  externalUrl?: string;
  pageUrl: string;
}

const STORAGE_KEY = "kd-bookmarks";

export function getBookmarks(): BookmarkItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

interface Props {
  item: BookmarkItem;
}

export default function BookmarkButton({ item }: Props) {
  const [bookmarked, setBookmarked] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setBookmarked(getBookmarks().some((b) => b.id === item.id));
  }, [item.id]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const current = getBookmarks();
    const wasBookmarked = bookmarked;
    const next = wasBookmarked
      ? current.filter((b) => b.id !== item.id)
      : [...current, item];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setBookmarked(!wasBookmarked);
    if (!wasBookmarked) {
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 1500);
    }
    window.dispatchEvent(new Event("kd-bookmarks-changed"));
  };

  return (
    <button
      onClick={toggle}
      aria-label={bookmarked ? "Remove from saved" : "Save for later"}
      title={bookmarked ? "Remove from saved" : "Save for later"}
      className={`flex items-center gap-1 rounded p-1.5 -m-1.5 touch-manipulation transition-all duration-200 ${
        bookmarked ? "text-gold" : "text-charcoal/42 hover:text-gold/75"
      }`}
    >
      <Bookmark
        className={`h-3.5 w-3.5 flex-shrink-0 transition-transform duration-150 ${justSaved ? "scale-125" : "scale-100"}`}
        fill={bookmarked ? "currentColor" : "none"}
        strokeWidth={1.8}
      />
      {justSaved && (
        <span className="font-mono text-[9px] tracking-wide">Saved!</span>
      )}
    </button>
  );
}
