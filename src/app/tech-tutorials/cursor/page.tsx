import cursorData from "@/data/cursor-tutorials.json";
import type { HermesEntry } from "@/components/VideoCard";
import CursorView from "./CursorView";

export const metadata = {
  title: "Cursor Tutorials — Malaysian Tech Wiki",
  description: "106 curated YouTube tutorials for Cursor covering setup, Composer, AI agent workflows, codebase navigation, MCP integrations, real projects, and productivity tips.",
};

const entries = cursorData as HermesEntry[];

export default function CursorPage() {
  return <CursorView entries={entries} />;
}
