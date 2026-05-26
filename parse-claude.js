const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "claude-youtube-tutorials.txt");
const outputPath = path.join(__dirname, "src", "data", "claude-tutorials.json");

const raw = fs.readFileSync(inputPath, "utf8");
const lines = raw.split("\n");

const entries = [];
let currentCategory = null;
let currentEntry = null;

function extractEmbedId(url) {
  const match = url.match(/\/embed\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

function flushEntry() {
  if (currentEntry && currentEntry.title && currentEntry.embedId) {
    entries.push(currentEntry);
  }
  currentEntry = null;
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trimEnd();

  const catMatch = line.match(/^## (.+?) \(\d+\)$/);
  if (catMatch) {
    flushEntry();
    currentCategory = catMatch[1].trim();
    continue;
  }

  const titleMatch = line.match(/^### (.+)$/);
  if (titleMatch) {
    flushEntry();
    currentEntry = {
      title: titleMatch[1].trim(),
      category: currentCategory,
      format: "Full video",
      beginnerFriendly: "No",
      searchTags: [],
      recommendationTags: [],
      os: null,
      link: null,
      embedId: null,
      description: null,
    };
    continue;
  }

  if (!currentEntry) continue;

  const fmtMatch = line.match(/^- Format:\s*(.+)$/);
  if (fmtMatch) { currentEntry.format = fmtMatch[1].trim(); continue; }

  const bfMatch = line.match(/^- Beginner friendly:\s*(.+)$/);
  if (bfMatch) { currentEntry.beginnerFriendly = bfMatch[1].trim(); continue; }

  const stMatch = line.match(/^- Search tags:\s*(.+)$/);
  if (stMatch) {
    currentEntry.searchTags = stMatch[1].split(",").map((t) => t.trim()).filter(Boolean);
    continue;
  }

  const rtMatch = line.match(/^- Recommendation tags:\s*(.+)$/);
  if (rtMatch) {
    currentEntry.recommendationTags = rtMatch[1].split(",").map((t) => t.trim()).filter(Boolean);
    continue;
  }

  const osMatch = line.match(/^- Operating systems:\s*(.+)$/);
  if (osMatch) { currentEntry.os = osMatch[1].trim(); continue; }

  const linkMatch = line.match(/^- Link:\s*(.+)$/);
  if (linkMatch) { currentEntry.link = linkMatch[1].trim(); continue; }

  const embedMatch = line.match(/^- Embed link:\s*(.+)$/);
  if (embedMatch) {
    currentEntry.embedId = extractEmbedId(embedMatch[1].trim());
    continue;
  }

  const descMatch = line.match(/^- Small description:\s*(.+)$/);
  if (descMatch) { currentEntry.description = descMatch[1].trim(); continue; }
}

flushEntry();

fs.writeFileSync(outputPath, JSON.stringify(entries, null, 2), "utf8");
console.log(`Done: wrote ${entries.length} entries to ${outputPath}`);
