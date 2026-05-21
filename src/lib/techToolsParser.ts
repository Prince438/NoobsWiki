import fs from "fs";
import path from "path";

export interface ToolLink {
  label: string;
  url: string;
}

export interface Tool {
  name: string;
  description: string;
  links: ToolLink[];
  subcategory: string;
}

export interface ToolCategorySummary {
  id: string;
  name: string;
  description: string;
  toolCount: number;
}

export interface ToolCategoryData {
  id: string;
  name: string;
  description: string;
  tools: Tool[];
}

const CATEGORY_DEFS: { id: string; name: string }[] = [
  { id: "ai",               name: "Artificial Intelligence" },
  { id: "privacy",          name: "Privacy / Security" },
  { id: "downloading",      name: "Downloading" },
  { id: "android-ios",      name: "Android / iOS" },
  { id: "linux-macos",      name: "Linux / macOS" },
  { id: "system-tools",     name: "System Tools" },
  { id: "file-tools",       name: "File Tools" },
  { id: "internet-tools",   name: "Internet Tools" },
  { id: "text-tools",       name: "Text Tools" },
  { id: "image-tools",      name: "Image Tools" },
  { id: "video-tools",      name: "Video Tools" },
  { id: "audio-tools",      name: "Audio Tools" },
  { id: "educational",      name: "Educational" },
  { id: "developer-tools",  name: "Developer Tools" },
];

// Module-level cache – parse the file once per process lifetime
let _sections: string[] | null = null;

function loadSections(): string[] {
  if (_sections) return _sections;
  const filePath = path.join(process.cwd(), "tech-tools-combined.md");
  const content = fs.readFileSync(filePath, "utf-8");
  // Split on "Source file: xxxx.txt" — each match starts a new top-level category
  _sections = content.split(/Source file: \w+\.txt/);
  return _sections;
}

function parseTool(raw: string, subcategory: string): Tool | null {
  // Strip leading bullet and zero-width chars
  const line = raw
    .replace(/^\*\s+/, "")
    .replace(/[⁠﻿​]/g, "")
    .trim();

  if (!line) return null;

  // Split on " — " (space + U+2014 em-dash + space)
  const EM = "—";
  const sep = ` ${EM} `;
  const parts = line.split(sep);

  const name = parts[0].trim();
  if (!name) return null;

  let description = "";
  let linksStr = "";

  if (parts.length === 1) {
    // No separator — name only
  } else if (parts.length === 2) {
    const last = parts[1].trim();
    if (last.startsWith("http") || last.includes(" | ")) {
      linksStr = last;
    } else {
      description = last;
    }
  } else {
    // name — description — links
    description = parts.slice(1, -1).join(sep).trim();
    linksStr = parts[parts.length - 1].trim();
  }

  // Parse link chips from "primaryUrl | Label: url | ..."
  const links: ToolLink[] = [];
  if (linksStr) {
    for (const chunk of linksStr.split(" | ")) {
      const t = chunk.trim();
      if (!t) continue;

      // "Label: https://..."
      const colonIdx = t.indexOf(": ");
      if (colonIdx > 0 && !t.startsWith("http") && t.slice(colonIdx + 2).startsWith("http")) {
        links.push({ label: t.slice(0, colonIdx).trim(), url: t.slice(colonIdx + 2).trim() });
      } else if (t.startsWith("http")) {
        links.push({ label: "Website", url: t });
      }

      if (links.length >= 6) break;
    }
  }

  return {
    name,
    description: description.slice(0, 220),
    links: links.filter((l) => l.url.startsWith("http")),
    subcategory,
  };
}

function parseSection(section: string, categoryName: string): Tool[] {
  const tools: Tool[] = [];
  let currentSubcategory = categoryName;

  for (const rawLine of section.split("\n")) {
    const line = rawLine.trim();

    if (line.startsWith("### ")) {
      currentSubcategory = line.slice(4).trim();
    } else if (line.startsWith("## ")) {
      currentSubcategory = line.slice(3).trim();
    } else if (line.startsWith("* ")) {
      const tool = parseTool(line, currentSubcategory);
      if (tool) tools.push(tool);
    }
  }

  return tools;
}

// ── Public API ───────────────────────────────────────────────────────────────

export function getCategories(): ToolCategorySummary[] {
  const sections = loadSections();

  return CATEGORY_DEFS.map((def, i) => {
    const section = sections[i + 1] ?? "";
    const toolCount = (section.match(/^\* /gm) ?? []).length;
    const descMatch = section.match(/^>\s+(.+)$/m);
    return {
      id: def.id,
      name: def.name,
      description: descMatch ? descMatch[1].trim() : "",
      toolCount,
    };
  });
}

export function getCategoryTools(categoryId: string): ToolCategoryData | null {
  const idx = CATEGORY_DEFS.findIndex((d) => d.id === categoryId);
  if (idx === -1) return null;

  const sections = loadSections();
  const section = sections[idx + 1];
  if (!section) return null;

  const def = CATEGORY_DEFS[idx];
  const descMatch = section.match(/^>\s+(.+)$/m);
  const tools = parseSection(section, def.name);

  return {
    id: def.id,
    name: def.name,
    description: descMatch ? descMatch[1].trim() : "",
    tools,
  };
}
