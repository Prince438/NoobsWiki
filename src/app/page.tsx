import Link from "next/link";
import { Terminal, Users, Cpu, ShieldAlert, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-cream bg-dot-pattern">
      
      {/* Centered Main Content Area */}
      <main className="mx-auto flex flex-1 w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center md:px-8">
        
        {/* Understated Tech Accent Header Tag */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-panel-border bg-white/70 px-4 py-1.5 font-mono text-xs text-charcoal/60 backdrop-blur-sm shadow-sm animate-fade-in">
          <span className="h-2 w-2 rounded-full bg-forest animate-pulse"></span>
          <span>MALAYSIA TECH ECOSYSTEM ENGINE</span>
          <span className="text-panel-border">|</span>
          <span className="font-semibold text-gold">ACTIVE</span>
        </div>

        {/* Custom "noobs" Centerpiece Logo */}
        <div className="mb-8 flex flex-col items-center select-none">
          <div className="flex items-center gap-3">
            {/* Minimalist Tech Shape Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-cream shadow-md shadow-forest/10">
              <Terminal className="h-7 w-7 stroke-[2.5]" />
            </div>
            
            {/* Logo Text */}
            <h1 className="font-sans text-5xl font-extrabold tracking-tight text-charcoal md:text-6xl">
              noobs
              <span className="text-gold font-mono text-4xl font-normal ml-0.5 animate-terminal-blink">_</span>
            </h1>
          </div>
          <div className="mt-1 font-mono text-[9px] tracking-widest text-charcoal/40 uppercase">
            [ directory & resources hub ]
          </div>
        </div>

        {/* Short Ecosystem Description */}
        <p className="mx-auto mb-16 max-w-2xl font-sans text-base md:text-lg leading-relaxed text-charcoal/70">
          A minimalist and curated directory of Malaysia’s technology and startup ecosystem. Designed to bring together community groups, ecosystem builders, and governmental resources in one accessible directory.
        </p>

        {/* Three Large Section Clickable Cards */}
        <div className="grid w-full gap-8 sm:grid-cols-1 md:grid-cols-3">
          
          {/* Card 1: Community Group */}
          <Link
            href="/community-groups"
            className="group relative flex flex-col justify-between rounded-2xl border border-panel-border bg-white p-8 text-left shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-forest hover:shadow-[0_15px_30px_-5px_rgba(27,67,50,0.08)]"
          >
            {/* Tech boundary corners on hover */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div>
              {/* Icon / Meta */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-forest/5 text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-cream">
                <Users className="h-6 w-6 stroke-[2]" />
              </div>

              {/* Title */}
              <h2 className="mb-3 font-sans text-xl font-bold text-charcoal transition-colors group-hover:text-forest">
                Community Groups
              </h2>

              {/* Description */}
              <p className="mb-8 font-sans text-xs leading-relaxed text-charcoal/60">
                A curated list of local tech community groups across Malaysia, including developer groups, startup communities, and industry-focused networks. Discover, join, and stay connected with communities shaping the tech scene.
              </p>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-forest/70 transition-colors group-hover:text-forest">
              <span>Explore Group Directories</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 2: Community Builders */}
          <Link
            href="/community-builders"
            className="group relative flex flex-col justify-between rounded-2xl border border-panel-border bg-white p-8 text-left shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-crimson hover:shadow-[0_15px_30px_-5px_rgba(155,34,38,0.08)]"
          >
            {/* Tech boundary corners on hover */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div>
              {/* Icon / Meta */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/5 text-crimson transition-colors duration-300 group-hover:bg-crimson group-hover:text-cream">
                <Cpu className="h-6 w-6 stroke-[2]" />
              </div>

              {/* Title */}
              <h2 className="mb-3 font-sans text-xl font-bold text-charcoal transition-colors group-hover:text-crimson">
                Community Builders
              </h2>

              {/* Description */}
              <p className="mb-8 font-sans text-xs leading-relaxed text-charcoal/60">
                Meet the individuals behind the communities. This section highlights community builders who organise meetups, events, programs, and initiatives that support learning, collaboration, and innovation within the tech ecosystem.
              </p>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-crimson/70 transition-colors group-hover:text-crimson">
              <span>View Ecosystem Builders</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 3: Government Agencies */}
          <Link
            href="/government-agencies"
            className="group relative flex flex-col justify-between rounded-2xl border border-panel-border bg-white p-8 text-left shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_15px_30px_-5px_rgba(197,168,128,0.15)]"
          >
            {/* Tech boundary corners on hover */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl tech-border opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div>
              {/* Icon / Meta */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/5 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-cream">
                <ShieldAlert className="h-6 w-6 stroke-[2]" />
              </div>

              {/* Title */}
              <h2 className="mb-3 font-sans text-xl font-bold text-charcoal transition-colors group-hover:text-gold-hover">
                Government Agencies
              </h2>

              {/* Description */}
              <p className="mb-8 font-sans text-xs leading-relaxed text-charcoal/60">
                Explore government agencies and public institutions supporting the tech and startup ecosystem through grants, programs, policies, and infrastructure. A useful reference for founders, startups, and ecosystem builders.
              </p>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-gold-hover/70 transition-colors group-hover:text-gold">
              <span>Explore Public Institutions</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>

        </div>

      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
