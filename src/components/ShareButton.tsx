"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  url?: string;
}

export default function ShareButton({ url }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const target = url ?? (typeof window !== "undefined" ? window.location.href : "");
    if (!target) return;
    navigator.clipboard.writeText(target).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={copy}
      aria-label={copied ? "Copied!" : "Copy link"}
      title={copied ? "Copied!" : "Copy link"}
      className={`transition-colors duration-200 ${
        copied ? "text-forest" : "text-charcoal/22 hover:text-charcoal/55"
      }`}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" strokeWidth={2} />
      ) : (
        <Copy className="h-3.5 w-3.5" strokeWidth={1.8} />
      )}
    </button>
  );
}
