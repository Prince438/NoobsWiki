import copilotData from "@/data/github-copilot-tutorials.json";
import type { HermesEntry } from "@/components/VideoCard";
import GitHubCopilotView from "./GitHubCopilotView";

export const metadata = {
  title: "GitHub Copilot Tutorials — KD Tech Wiki",
  description: "108 curated YouTube tutorials for GitHub Copilot covering setup, chat and prompting, coding workflows, PR reviews, CLI agents, integrations, and productivity tips.",
};

const entries = copilotData as HermesEntry[];

export default function GitHubCopilotPage() {
  return <GitHubCopilotView entries={entries} />;
}
