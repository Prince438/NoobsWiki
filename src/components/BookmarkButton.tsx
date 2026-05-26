"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";

export interface BookmarkItem {
  id: string;
  name: string;
  type: "tool" | "group" | "builder" | "agency" | "tutorial";
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

  useEffect(() => {
    setBookmarked(getBookmarks().some((b) => b.id === item.id));
  }, [item.id]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const current = getBookmarks();
    const next = bookmarked
      ? current.filter((b) => b.id !== item.id)
      : [...current, item];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setBookmarked(!bookmarked);
    window.dispatchEvent(new Event("kd-bookmarks-changed"));
  };

  return (
    <button
      onClick={toggle}
      aria-label={bookmarked ? "Remove bookmark" : "Save for later"}
      title={bookmarked ? "Remove bookmark" : "Save for later"}
      className={`transition-colors duration-200 ${
        bookmarked ? "text-gold" : "text-charcoal/22 hover:text-gold/65"
      }`}
    >
      <Bookmark
        className="h-3.5 w-3.5"
        fill={bookmarked ? "currentColor" : "none"}
        strokeWidth={1.8}
      />
    </button>
  );
}
