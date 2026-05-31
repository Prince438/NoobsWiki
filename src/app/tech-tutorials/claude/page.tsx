import claudeData from "@/data/claude-tutorials.json";
import type { HermesEntry } from "@/components/VideoCard";
import ClaudeView from "./ClaudeView";

export const metadata = {
  title: "Claude Tutorials — Malaysian Tech Wiki",
  description: "70 curated YouTube tutorials for Claude covering basics, Claude Code, MCP integrations, artifacts, projects, and advanced AI workflows.",
};

const entries = claudeData as HermesEntry[];

export default function ClaudePage() {
  return <ClaudeView entries={entries} />;
}
