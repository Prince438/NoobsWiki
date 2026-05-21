import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-panel-border bg-cream py-10 px-6 font-sans">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row sm:px-8">
        
        {/* Info & Legal */}
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <p className="text-sm font-semibold text-charcoal">
            noobs<span className="text-gold">_</span>
          </p>
          <p className="text-xs text-charcoal/50 text-center sm:text-left">
            &copy; {currentYear} noobs Malaysia. A curated community initiative for the local tech and startup ecosystem.
          </p>
        </div>

        {/* Technical Logs / Visual Details */}
        <div className="flex flex-col items-center gap-2 sm:items-end">
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-charcoal/40">
            <span>[LOC: MY_KUL]</span>
            <span>•</span>
            <span>[TZ: GMT+8]</span>
            <span>•</span>
            <span className="text-forest font-semibold">[BUILD: STATIC]</span>
          </div>
          <p className="text-[10px] text-charcoal/40 font-mono">
            Inspired by StartupMap.one. Curated with care.
          </p>
        </div>

      </div>
    </footer>
  );
}
