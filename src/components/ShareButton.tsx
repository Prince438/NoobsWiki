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
      className={`flex items-center gap-1 rounded p-1.5 -m-1.5 touch-manipulation transition-all duration-200 ${
        copied
          ? "text-gold"
          : "text-charcoal/42 hover:text-charcoal/78"
      }`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={2.2} />
          <span className="font-mono text-[9px] tracking-wide">Copied!</span>
        </>
      ) : (
        <Copy className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.8} />
      )}
    </button>
  );
}
