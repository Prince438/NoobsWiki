import { Metadata } from "next";
import UseCasesView from "./UseCasesView";

export const metadata: Metadata = {
  title: "Hermes Use Cases — 20 Practical Workflows for Discord & Telegram",
  description: "20 beginner-to-advanced use cases for Hermes in Discord and Telegram — from morning briefings to multi-step automation pipelines.",
};

export default function UseCasesPage() {
  return <UseCasesView />;
}
