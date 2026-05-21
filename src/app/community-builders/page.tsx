import { Metadata } from "next";
import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunityBuildersList from "./CommunityBuildersList";

export const metadata: Metadata = {
  title: "Community Builders",
  description:
    "Meet the individuals behind the communities. This section highlights community builders who organise meetups, events, programs, and initiatives in Malaysia.",
};

export default function CommunityBuildersPage() {
  // Read and parse community builders JSON data at runtime/build-time
  let builders = [];
  try {
    const filePath = path.join(process.cwd(), "src", "data", "community-builders.json");
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      builders = JSON.parse(content);
    }
  } catch (error) {
    console.error("Error reading community builders JSON data:", error);
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream bg-dot-pattern">
      {/* Top Navbar */}
      <Navbar />

      {/* Spacious Outer Container */}
      <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-8">
        
        {/* Clean Header Area with generous spacing */}
        <div className="mb-12 max-w-3xl space-y-4">
          <div className="font-mono text-xs font-semibold text-gold tracking-widest uppercase">
            [ DIRECTORY // SEC_02 ]
          </div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-charcoal md:text-4xl">
            Community Builders
          </h1>
          <p className="font-sans text-base leading-relaxed text-charcoal/70">
            Meet the individuals behind the communities. This section highlights community builders who organise meetups, events, programs, and initiatives that support learning, collaboration, and innovation within the tech ecosystem.
          </p>
        </div>

        {/* Dynamic Interactivity Layer */}
        <CommunityBuildersList builders={builders} />

      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
