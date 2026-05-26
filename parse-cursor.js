const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "cursor-youtube-tutorials.txt");
const outputPath = path.join(__dirname, "src", "data", "cursor-tutorials.json");

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
  if (currentEntry && currentEntry.title && currentEntry.embedId) entries.push(currentEntry);
  currentEntry = null;
}

for (const rawLine of lines) {
  const line = rawLine.trimEnd();

  const catMatch = line.match(/^## (.+?) \(\d+\)$/);
  if (catMatch) { flushEntry(); currentCategory = catMatch[1].trim(); continue; }

  const titleMatch = line.match(/^### (.+)$/);
  if (titleMatch) {
    flushEntry();
    currentEntry = { title: titleMatch[1].trim(), category: currentCategory, format: "Full video", beginnerFriendly: "No", searchTags: [], recommendationTags: [], os: null, link: null, embedId: null, description: null };
    continue;
  }

  if (!currentEntry) continue;

  const m = (re) => { const r = line.match(re); return r ? r[1].trim() : null; };

  const fmt = m(/^- Format:\s*(.+)$/); if (fmt) { currentEntry.format = fmt; continue; }
  const bf  = m(/^- Beginner friendly:\s*(.+)$/); if (bf) { currentEntry.beginnerFriendly = bf; continue; }
  const st  = m(/^- Search tags:\s*(.+)$/); if (st) { currentEntry.searchTags = st.split(",").map(t => t.trim()).filter(Boolean); continue; }
  const rt  = m(/^- Recommendation tags:\s*(.+)$/); if (rt) { currentEntry.recommendationTags = rt.split(",").map(t => t.trim()).filter(Boolean); continue; }
  const os  = m(/^- Operating systems:\s*(.+)$/); if (os) { currentEntry.os = os; continue; }
  const lnk = m(/^- Link:\s*(.+)$/); if (lnk) { currentEntry.link = lnk; continue; }
  const emb = m(/^- Embed link:\s*(.+)$/); if (emb) { currentEntry.embedId = extractEmbedId(emb); continue; }
  const dsc = m(/^- Small description:\s*(.+)$/); if (dsc) { currentEntry.description = dsc; continue; }
}

flushEntry();
fs.writeFileSync(outputPath, JSON.stringify(entries, null, 2), "utf8");
console.log(`Done: wrote ${entries.length} entries to ${outputPath}`);
