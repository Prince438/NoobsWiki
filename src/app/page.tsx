import Link from "next/link";
import { Users, Cpu, ShieldAlert, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-cream bg-dot-pattern">
      
      {/* Centered Main Content Area */}
      <main className="mx-auto flex flex-1 w-full max-w-5xl flex-col items-center justify-center px-6 py-20 text-center md:px-8">
        
        {/* Understated Tech Accent Header Tag */}
        <div className="mb-8 inline-flex items-center gap-2 rounded border border-panel-border bg-panel px-4 py-1.5 font-mono text-[10px] text-charcoal/60 backdrop-blur-sm shadow-sm animate-fade-in">
          <span className="h-1.5 w-1.5 rounded-full bg-forest animate-pulse"></span>
          <span>MALAYSIA TECH ECOSYSTEM INTEL</span>
          <span className="text-panel-border/30">|</span>
          <span className="font-semibold text-gold">ACTIVE_NODE</span>
        </div>

        {/* Custom "KD Tech Wiki" Centerpiece Logo */}
        <div className="mb-10 flex flex-col items-center select-none">
          <div className="flex flex-col items-center gap-4">
            {/* Minimalist Tech Shape Icon */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded border border-panel-border bg-panel text-gold shadow-sm transition-colors hover:border-gold/30">
              <span className="absolute -top-1 -left-1 text-[8px] text-gold/40 font-mono">+</span>
              <span className="absolute -bottom-1 -right-1 text-[8px] text-gold/40 font-mono">+</span>
              <svg className="h-10 w-10 stroke-[1.3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6.5V20m0-13.5C10.5 5 6 5 4 6.5V18c2-1.5 6.5-1.5 8 0m0-11.5c1.5-1.5 6-1.5 8-0.5V18c-2-1.5-6.5-1.5-8 0" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 10l1.5 1.5L8 13" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* Logo Text */}
            <h1 className="font-mono text-3xl font-extrabold tracking-widest text-charcoal uppercase md:text-4xl">
              KD Tech Wiki
              <span className="text-gold font-mono text-2xl font-normal ml-0.5 animate-terminal-blink">_</span>
            </h1>
          </div>
          <div className="mt-2 font-mono text-[9px] tracking-widest text-charcoal/40 uppercase">
            [ Curated Ecosystem Database & Reference Wiki ]
          </div>
        </div>

        {/* Short Ecosystem Description */}
        <p className="mx-auto mb-16 max-w-2xl font-sans text-sm md:text-base leading-relaxed text-charcoal/60">
          A highly structured, technical wiki and directory of Malaysia’s technology and startup ecosystem. Centrally indexing community groups, active builders, and public bodies in a single knowledge interface.
        </p>

        {/* Three Compact Hermes-style Panels */}
        <div className="grid w-full gap-6 sm:grid-cols-1 md:grid-cols-3">
          
          {/* Card 1: Community Groups */}
          <Link
            href="/community-groups"
            className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 text-left transition-all duration-300 hover:border-gold/40"
          >
            <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div>
              {/* Icon / Meta */}
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded border border-panel-border bg-panel text-gold transition-colors duration-300 group-hover:border-gold/30">
                <Users className="h-5 w-5 stroke-[1.8]" />
              </div>

              {/* Title */}
              <h2 className="mb-2.5 font-sans text-md font-bold text-charcoal transition-colors group-hover:text-gold">
                Community Groups
              </h2>

              {/* Description */}
              <p className="mb-6 font-sans text-xs leading-relaxed text-charcoal/50">
                A curated list of local tech community groups across Malaysia, including developer groups, startup communities, and industry-focused networks. Discover, join, and stay connected with communities shaping the tech scene.
              </p>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-gold/70 transition-colors group-hover:text-gold">
              <span>EXPLORE DIRECTORIES</span>
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* Card 2: Community Builders */}
          <Link
            href="/community-builders"
            className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 text-left transition-all duration-300 hover:border-gold/40"
          >
            <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div>
              {/* Icon / Meta */}
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded border border-panel-border bg-panel text-gold transition-colors duration-300 group-hover:border-gold/30">
                <Cpu className="h-5 w-5 stroke-[1.8]" />
              </div>

              {/* Title */}
              <h2 className="mb-2.5 font-sans text-md font-bold text-charcoal transition-colors group-hover:text-gold">
                Community Builders
              </h2>

              {/* Description */}
              <p className="mb-6 font-sans text-xs leading-relaxed text-charcoal/50">
                Meet the individuals behind the communities. This section highlights community builders who organise meetups, events, programs, and initiatives that support learning, collaboration, and innovation within the tech ecosystem.
              </p>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-gold/70 transition-colors group-hover:text-gold">
              <span>VIEW ECOSYSTEM BUILDERS</span>
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* Card 3: Government Agencies */}
          <Link
            href="/government-agencies"
            className="group relative flex flex-col justify-between rounded border border-panel-border bg-panel p-6 text-left transition-all duration-300 hover:border-gold/40"
          >
            <div className="absolute inset-0 pointer-events-none rounded tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div>
              {/* Icon / Meta */}
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded border border-panel-border bg-panel text-gold transition-colors duration-300 group-hover:border-gold/30">
                <ShieldAlert className="h-5 w-5 stroke-[1.8]" />
              </div>

              {/* Title */}
              <h2 className="mb-2.5 font-sans text-md font-bold text-charcoal transition-colors group-hover:text-gold">
                Government Agencies
              </h2>

              {/* Description */}
              <p className="mb-6 font-sans text-xs leading-relaxed text-charcoal/50">
                Explore government agencies and public institutions supporting the tech and startup ecosystem through grants, programs, policies, and infrastructure. A useful reference for founders, startups, and ecosystem builders.
              </p>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-gold/70 transition-colors group-hover:text-gold">
              <span>EXPLORE PUBLIC BODIES</span>
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </Link>

        </div>

      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

