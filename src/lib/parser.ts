import fs from "fs";
import path from "path";

export interface DirectoryItem {
  name: string;
  url: string;
  description: string;
}

export interface DirectoryCategory {
  categoryName: string;
  items: DirectoryItem[];
}

// Custom descriptions for popular entities to make the curated feel extremely high quality and professional
const CURATED_DESCRIPTIONS: Record<string, string> = {
  // Community Groups
  "Dev Malaysia": "The premier digital home for Malaysian developers, engineers, and creators to share projects, discuss code, and collaborate.",
  "Developer Kaki": "A thriving Malaysian developer community providing a platform for technical discussions, peer support, and resource sharing.",
  "Komuniti.dev": "A community-focused space for local software developers to discuss tools, trends, and career growth within Malaysia.",
  "Tech in Malaysia": "An open community and discovery platform for technology companies, developers, and makers across Malaysia.",
  "Tech Malaysia Advocates": "Global tech community coalition driving innovation and linking Malaysia's technology experts to international markets.",
  "Flutter KL": "A vibrant developer group organizing regular meetups and sharing knowledge about Flutter, Dart, and cross-platform mobile development.",
  "GDG Kuala Lumpur": "Google Developer Group KL, bringing developer meetups, workshops, and large-scale technical conferences to the capital city.",
  "GDG Cloud KL": "Focusing on Google Cloud technologies, hosting workshops and networking events for cloud architects and DevOps professionals.",
  "GDG George Town": "Connecting developers in Penang, hosting meetups on Web, Mobile, AI, and Cloud computing architectures.",
  "PyCon Malaysia": "The official organizers of PyCon Malaysia, celebrating Python development through meetups, workshops, and annual conferences.",
  "StartupMamak": "One of Malaysia's oldest and most iconic startup communities. A casual, high-impact network for founders, builders, and investors.",
  "Jomweb": "A massive, long-running Malay-language community focusing on web development, programming practices, and professional coaching.",
  "Javascript.my": "The focal hub for the JavaScript ecosystem in Malaysia, hosting tutorials, discussions, and event notifications.",
  "AWS User Group Malaysia": "A highly active user-led community organizing regular technical sessions on Amazon Web Services and cloud architecture.",
  "DevOps Malaysia": "A collaborative forum for systems engineers, developers, and practitioners to share DevOps, CI/CD, and SRE best practices.",
  "rawSEC": "Malaysia's leading information security community, promoting cyber security awareness, professional networking, and CTF challenges.",
  "Women in Tech Malaysia": "Empowering women in technology careers across Malaysia through mentorship programs, technical workshops, and advocacy.",
  "Startup Jobs Malaysia": "Connecting founders and tech talents with exciting, high-growth startup opportunities across the country.",

  // Government / Public Bodies
  "Ministry of Digital": "The official ministry spearheading Malaysia's digital transformation, policy frameworks, and national technology adoption.",
  "Ministry of Science, Technology and Innovation (MOSTI)": "Leading Malaysia's research, scientific innovation, sandbox programs, and scientific funding opportunities.",
  "MDEC": "Malaysia Digital Economy Corporation, the lead government agency driving the country's digital economy growth, MSC status, and digital grants.",
  "Cradle Fund": "Malaysia's early-stage startup influencer, offering seed funding, commercialization grants, and managing the national MYStartup portal.",
  "MYStartup": "The national single-window platform for Malaysia's startup ecosystem, offering programs, resources, and directory databases for founders.",
  "MRANTI": "Malaysia Research Accelerator for Technology & Innovation, accelerating products from lab to market via testing environments and sandbox access.",
  "MTDC": "Malaysia Technology Development Corporation, providing technology commercialization funding, advisory, and incubation facilities.",
  "MAVCAP": "Malaysia Venture Capital Management Berhad, the largest government-backed venture capital firm, investing in local startups.",
  "MIDA": "Malaysian Investment Development Authority, the main government agency responsible for promoting foreign and domestic investments.",
  "MCMC": "Malaysian Communications and Multimedia Commission, regulating the communications, multimedia, and digital signature industries.",
  "CyberSecurity Malaysia": "The national cyber security specialist agency, providing emergency response, digital forensics, and security certifications.",
  "Securities Commission Malaysia": "Regulating and developing the capital markets, including equity crowdfunding (ECF) and peer-to-peer (P2P) lending rules.",
  "Bank Negara Malaysia": "The Central Bank of Malaysia, overseeing monetary stability, financial inclusion, and licensing digital banks and fintech sandboxes.",
  "SME Corp Malaysia": "The central coordinating agency formulating policies and coordinating support programs for Small and Medium Enterprises (SMEs).",
  "National Technology & Innovation Sandbox (NTIS)": "Allowing startups and innovators to test their technology, products, and services in real-world regulatory-relaxed environments.",
  "InvestKL": "Attracting global multinationals and fast-growing tech companies to set up their regional hubs in Greater Kuala Lumpur.",
  "SDEC": "Sarawak Digital Economy Corporation, driving Sarawak's digital transformation, infrastructure, and startup hub ecosystem.",
};

// Fallback generator if no custom description is matched
function generateFallbackDescription(name: string, category: string): string {
  const cat = category.toLowerCase();
  if (cat.includes("devops") || cat.includes("cloud") || cat.includes("infrastructure")) {
    return `A specialized technical group in Malaysia bringing together cloud engineers, DevOps practitioners, and system architects to discuss scalable modern infrastructure.`;
  }
  if (cat.includes("data") || cat.includes("ai") || cat.includes("database")) {
    return `Focusing on the advancements in data engineering, machine learning architectures, and data science applications within the Malaysian tech landscape.`;
  }
  if (cat.includes("security") || cat.includes("blockchain") || cat.includes("fintech")) {
    return `Connecting experts and enthusiasts in cybersecurity compliance, fintech solutions, and distributed ledger technologies across Malaysia.`;
  }
  if (cat.includes("startup") || cat.includes("founder") || cat.includes("coworking")) {
    return `Supporting Malaysian entrepreneurs and early-stage startup teams with networking, collaboration spaces, and resources to accelerate business scaling.`;
  }
  if (cat.includes("web") || cat.includes("frontend") || cat.includes("language")) {
    return `A developer-focused community centering on web engineering frameworks, frontend UI designs, and modern programming language standards.`;
  }
  if (cat.includes("mobile") || cat.includes("hardware") || cat.includes("platform")) {
    return `Bringing together mobile app developers, IoT hardware builders, and platform engineers in Malaysia to build next-generation hardware and software solutions.`;
  }
  if (cat.includes("ministr") || cat.includes("portal") || cat.includes("federal")) {
    return `Official federal body and portal facilitating governmental policy, business registrations, public services, and innovation framework guidelines.`;
  }
  if (cat.includes("state") || cat.includes("regional") || cat.includes("corridor")) {
    return `Regional agency promoting state-level commercialization, investment facilitation, and economic corridor advancement in Malaysia.`;
  }
  if (cat.includes("university") || cat.includes("public university")) {
    return `Public university center facilitating student entrepreneurship, technology commercialization, incubation programs, and intellectual property development.`;
  }
  return `A curated community resource and networking directory in Malaysia, helping founders and developers connect, learn, and grow the local technology ecosystem.`;
}

/**
 * Parses the "community group file.txt" from the workspace root
 */
export function parseCommunityGroups(): DirectoryCategory[] {
  try {
    const filePath = path.join(process.cwd(), "community group file.txt");
    if (!fs.existsSync(filePath)) {
      console.warn("community group file.txt not found at:", filePath);
      return [];
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split(/\r?\n/);
    const categories: DirectoryCategory[] = [];
    
    let currentCategory: DirectoryCategory | null = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip title header pages (lines 1 to 7 are intro)
      if (i < 7) continue;
      
      if (!line) continue;
      
      // Check if next line is a divider (e.g. -----)
      const nextLine = lines[i + 1] ? lines[i + 1].trim() : "";
      if (nextLine.startsWith("---") || nextLine.startsWith("===")) {
        // This line is a Category Name
        currentCategory = {
          categoryName: line,
          items: []
        };
        categories.push(currentCategory);
        // Skip the underline line
        i++;
        continue;
      }
      
      // If we have a category, parse item lines
      if (currentCategory && line.startsWith("-")) {
        // Line format: - Name | URL
        // Remove leading "- "
        const rawItem = line.substring(1).trim();
        
        let name = "";
        let url = "";
        
        if (rawItem.includes("|")) {
          const parts = rawItem.split("|");
          name = parts[0].trim();
          url = parts[1].trim();
        } else {
          // Fallback if no pipe divider
          const match = rawItem.match(/(https?:\/\/[^\s]+)/);
          if (match) {
            url = match[0];
            name = rawItem.replace(url, "").trim();
          } else {
            name = rawItem;
          }
        }
        
        if (name) {
          // Cleanup name from trailing characters if any
          name = name.replace(/^\|\s*/, "").trim();
          const description = CURATED_DESCRIPTIONS[name] || generateFallbackDescription(name, currentCategory.categoryName);
          
          currentCategory.items.push({
            name,
            url,
            description
          });
        }
      }
    }
    
    // Filter out categories with empty items
    return categories.filter(c => c.items.length > 0);
  } catch (error) {
    console.error("Error parsing community groups:", error);
    return [];
  }
}

/**
 * Parses the "Government Agencies file.txt" from the workspace root
 */
export function parseGovernmentAgencies(): DirectoryCategory[] {
  try {
    const filePath = path.join(process.cwd(), "Government Agencies file.txt");
    if (!fs.existsSync(filePath)) {
      console.warn("Government Agencies file.txt not found at:", filePath);
      return [];
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split(/\r?\n/);
    const categories: DirectoryCategory[] = [];
    
    let currentCategory: DirectoryCategory | null = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip intro title page
      if (i < 7) continue;
      
      if (!line) continue;
      
      // Check if it's a section header, like:
      // "1) Federal ministries and national portals"
      // "2) National startup, innovation, funding, and ecosystem bodies"
      // "3) State, regional, corridor, and investment agencies"
      const categoryMatch = line.match(/^\d+\)\s+(.+)$/);
      if (categoryMatch) {
        currentCategory = {
          categoryName: categoryMatch[1].trim(),
          items: []
        };
        categories.push(currentCategory);
        continue;
      }
      
      // Check if it's a numbered list item like:
      // "10. MYStartup — https://www.mystartup.gov.my"
      // "1. MyGovernment (Portal Rasmi Kerajaan Malaysia) — https://www.malaysia.gov.my"
      if (currentCategory) {
        const itemMatch = line.match(/^\d+\.\s+(.+)$/);
        if (itemMatch) {
          const rawItem = itemMatch[1].trim();
          let name = "";
          let url = "";
          
          if (rawItem.includes("—")) {
            const parts = rawItem.split("—");
            name = parts[0].trim();
            url = parts[1].trim();
          } else {
            const match = rawItem.match(/(https?:\/\/[^\s]+)/);
            if (match) {
              url = match[0];
              name = rawItem.replace(url, "").trim();
            } else {
              name = rawItem;
            }
          }
          
          if (name) {
            // Remove double quotes or dash from name if any
            name = name.replace(/^—\s*/, "").trim();
            const description = CURATED_DESCRIPTIONS[name] || generateFallbackDescription(name, currentCategory.categoryName);
            
            currentCategory.items.push({
              name,
              url,
              description
            });
          }
        }
      }
    }
    
    return categories.filter(c => c.items.length > 0);
  } catch (error) {
    console.error("Error parsing government agencies:", error);
    return [];
  }
}
