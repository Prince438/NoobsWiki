import chatgptData from "@/data/chatgpt-tutorials.json";
import type { HermesEntry } from "@/components/VideoCard";
import ChatGPTView from "./ChatGPTView";

export const metadata = {
  title: "ChatGPT Tutorials — KD Tech Wiki",
  description: "67 curated YouTube tutorials for ChatGPT covering basics, prompting, images and voice, custom GPTs, coding, automation, and productivity workflows.",
};

const entries = chatgptData as HermesEntry[];

export default function ChatGPTPage() {
  return <ChatGPTView entries={entries} />;
}
