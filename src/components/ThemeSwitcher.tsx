"use client";

import { useEffect, useState } from "react";

type Theme = "green" | "blue" | "yellow" | "red" | "purple";

const THEMES: { key: Theme; color: string; label: string }[] = [
  { key: "green",  color: "#4ADE80", label: "Green"  },
  { key: "blue",   color: "#60A5FA", label: "Blue"   },
  { key: "yellow", color: "#FBBF24", label: "Yellow" },
  { key: "red",    color: "#F87171", label: "Red"    },
  { key: "purple", color: "#C084FC", label: "Purple" },
];

function applyTheme(t: Theme) {
  const html = document.documentElement;
  THEMES.forEach(({ key }) => html.classList.remove(`theme-${key}`));
  if (t !== "green") html.classList.add(`theme-${t}`);
  localStorage.setItem("kd-theme", t);
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("green");

  useEffect(() => {
    const saved = localStorage.getItem("kd-theme") as Theme | null;
    if (saved && THEMES.some((t) => t.key === saved)) {
      setTheme(saved);
    }
  }, []);

  const handleSelect = (t: Theme) => {
    applyTheme(t);
    setTheme(t);
  };

  return (
    <div className="border-t border-panel-border/50 px-4 py-3.5">
      <div className="mb-2 font-mono text-[9px] tracking-[0.2em] text-charcoal/38 uppercase">Theme</div>
      <div className="flex items-center gap-2.5">
        {THEMES.map(({ key, color, label }) => (
          <button
            key={key}
            title={label}
            onClick={() => handleSelect(key)}
            className={`h-3.5 w-3.5 rounded-full border-2 transition-all duration-150 ${
              theme === key
                ? "scale-125 border-charcoal/50"
                : "border-transparent opacity-50 hover:opacity-90 hover:scale-110"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
