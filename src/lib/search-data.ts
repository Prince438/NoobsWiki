import { parseCommunityGroups, parseGovernmentAgencies } from "./parser";
import { VC_DATA } from "@/data/vc-data";
import fs from "fs";
import path from "path";

export type SearchItemType = "group" | "builder" | "agency" | "vc" | "tutorial";

export interface SearchItem {
  id: string;
  name: string;
  description: string;
  href: string;
  type: SearchItemType;
  category?: string;
}

export const TYPE_LABELS: Record<SearchItemType, string> = {
  group: "Community",
  builder: "Builder",
  agency: "Agency",
  vc: "VC Firm",
  tutorial: "Tutorial",
};

const TUTORIAL_ITEMS: SearchItem[] = [
  {
    id: "tutorial-hermes",
    name: "Hermes Agent",
    description: "Setup guides, automation workflows, integrations, and advanced Hermes Agent use cases.",
    href: "/tech-tutorials/hermes",
    type: "tutorial",
    category: "AI Agent",
  },
  {
    id: "tutorial-obsidian",
    name: "Obsidian",
    description: "Plugin deep dives, vault organisation, daily notes, Dataview, Canvas, and second-brain workflows.",
    href: "/tech-tutorials/obsidian",
    type: "tutorial",
    category: "PKM",
  },
  {
    id: "tutorial-claude",
    name: "Claude",
    description: "Claude Code workflows, MCP integrations, artifacts, projects, and productivity.",
    href: "/tech-tutorials/claude",
    type: "tutorial",
    category: "AI",
  },
  {
    id: "tutorial-kimi",
    name: "Kimi",
    description: "Long-context document analysis, research workflows, and productivity with Kimi AI.",
    href: "/tech-tutorials/kimi",
    type: "tutorial",
    category: "AI",
  },
  {
    id: "tutorial-chatgpt",
    name: "ChatGPT",
    description: "Prompting, GPT builders, and productivity workflows with ChatGPT.",
    href: "/tech-tutorials/chatgpt",
    type: "tutorial",
    category: "AI",
  },
  {
    id: "tutorial-perplexity",
    name: "Perplexity",
    description: "AI search, research mode, and knowledge workflows with Perplexity.",
    href: "/tech-tutorials/perplexity",
    type: "tutorial",
    category: "AI Search",
  },
  {
    id: "tutorial-cursor",
    name: "Cursor",
    description: "AI code editor — setup, Tab completion, Composer, and developer workflows.",
    href: "/tech-tutorials/cursor",
    type: "tutorial",
    category: "AI Dev Tool",
  },
  {
    id: "tutorial-copilot",
    name: "GitHub Copilot",
    description: "IDE setup, Chat, code completions, and AI-assisted development.",
    href: "/tech-tutorials/copilot",
    type: "tutorial",
    category: "AI Dev Tool",
  },
];

let _cache: SearchItem[] | null = null;

export function getAllSearchItems(): SearchItem[] {
  if (_cache) return _cache;

  const items: SearchItem[] = [];

  // Community Groups
  try {
    for (const cat of parseCommunityGroups()) {
      for (const item of cat.items) {
        items.push({
          id: `group-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          name: item.name,
          description: item.description,
          href: "/community-groups",
          type: "group",
          category: cat.categoryName,
        });
      }
    }
  } catch {}

  // Government Agencies
  try {
    for (const cat of parseGovernmentAgencies()) {
      for (const item of cat.items) {
        items.push({
          id: `agency-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          name: item.name,
          description: item.description,
          href: "/government-agencies",
          type: "agency",
          category: cat.categoryName,
        });
      }
    }
  } catch {}

  // Malaysian VCs
  for (const vc of VC_DATA) {
    items.push({
      id: `vc-${vc.id}`,
      name: vc.name,
      description: vc.shortDesc,
      href: "/malaysian-vcs",
      type: "vc",
      category: vc.category,
    });
  }

  // Community Builders
  try {
    const buildersPath = path.join(process.cwd(), "kd-tech-wiki-community-builders-expanded.json");
    if (fs.existsSync(buildersPath)) {
      const raw = JSON.parse(fs.readFileSync(buildersPath, "utf-8"));
      const entries: { name?: string; description?: string; category?: string }[] =
        Array.isArray(raw) ? raw : (raw.entries ?? []);
      for (const entry of entries) {
        if (!entry.name) continue;
        items.push({
          id: `builder-${entry.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          name: entry.name,
          description: entry.description ?? "",
          href: "/community-builders",
          type: "builder",
          category: entry.category ?? "Builder",
        });
      }
    }
  } catch {}

  // Tutorials (static)
  items.push(...TUTORIAL_ITEMS);

  _cache = items;
  return items;
}

export function scoreAndFilter(items: SearchItem[], query: string, max = 25): SearchItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return items
    .map((item) => {
      const name = item.name.toLowerCase();
      const desc = item.description.toLowerCase();
      let score = 0;
      if (name === q) score = 10;
      else if (name.startsWith(q)) score = 7;
      else if (name.includes(q)) score = 4;
      if (desc.includes(q)) score += 1;
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map(({ item }) => item);
}
