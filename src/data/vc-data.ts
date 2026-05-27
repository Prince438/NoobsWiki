export interface VCStat {
  label: string;
  value: string;
}

export interface VCPortfolioItem {
  company: string;
  sector: string;
  notes: string;
}

export interface VCLeader {
  name: string;
  role: string;
}

export interface VCDetail {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  url: string;
  type: string;
  founded: string;
  hq: string;
  stats?: VCStat[];
  overview: string;
  stages: string[];
  sectors: string[];
  geographies?: string[];
  ticketSizes?: string[];
  portfolio?: VCPortfolioItem[];
  team?: VCLeader[];
  email?: string;
  linkedin?: string;
  crunchbase?: string;
  twitter?: string;
  pitchTips?: string[];
  notes?: string[];
}

export const VC_DATA: VCDetail[] = [
  // ─── Pre-seed & Seed ────────────────────────────────────────────────────────
  {
    id: "1337-ventures",
    name: "1337 Ventures",
    category: "Pre-seed & Seed",
    shortDesc:
      "Malaysia's leading tech accelerator and pre-seed VC. Home of the Alpha Startups programme — the go-to entry point for early-stage Malaysian founders.",
    url: "https://1337.ventures",
    type: "Tech Accelerator + Early-stage VC",
    founded: "2014",
    hq: "Kuala Lumpur, Malaysia",
    stats: [{ label: "Portfolio", value: "24+ startups" }],
    overview:
      "1337 Ventures (pronounced 'leet ventures') is Malaysia's most well-known tech accelerator and early-stage venture capital firm. It combines a structured accelerator programme (Alpha Startups) with direct equity investment, making it the go-to entry point for pre-seed Malaysian founders. The firm is known for its strong community, founder alumni network, and honest, no-fluff approach to startup building.",
    stages: ["Pre-seed", "Seed"],
    sectors: ["Consumer apps", "B2B SaaS", "Fintech", "Edtech", "Marketplaces"],
    geographies: ["Malaysia (primary)", "Southeast Asia (follow-ons)"],
    ticketSizes: ["Alpha Startups: RM50K–RM150K for equity", "Direct VC: $100K–$500K"],
    portfolio: [
      { company: "Supahands", sector: "AI / Data Labelling", notes: "Acquired by Circles.Life" },
      { company: "Jirnexu (RinggitPlus)", sector: "Fintech", notes: "Growth stage" },
      { company: "Involve Asia", sector: "Affiliate Marketing", notes: "Growth stage" },
      { company: "Mula", sector: "Edtech", notes: "Active" },
      { company: "Talenox", sector: "HR SaaS", notes: "Singapore/Malaysia" },
    ],
    team: [
      { name: "Bikesh Lakhmichand", role: "Founding Partner" },
      { name: "Ang Yi Chin", role: "Partner" },
      { name: "Priya Thiagarajah", role: "Programme Director" },
    ],
    email: "hello@1337.ventures",
    linkedin: "https://www.linkedin.com/company/1337ventures/",
    crunchbase: "https://www.crunchbase.com/organization/1337-ventures",
    twitter: "https://twitter.com/1337vc",
    pitchTips: [
      "Apply to Alpha Startups at 1337.ventures — applications open each cohort",
      "Direct investment: email hello@1337.ventures with a short pitch",
      "They look for scrappy founders, clear problem, early validation, Malaysian/SEA focus",
      "Show traction, customer interviews, or early revenue — effort is valued over perfection",
    ],
    notes: [
      "One of the most active ecosystem builders in Malaysia",
      "Runs regular events, founder dinners, and community meetups",
      "Produces annual 'Most Active VC Firms in Malaysia' report",
      "Strong alumni network — many Alpha Startups founders now mentor newer cohorts",
    ],
  },
  {
    id: "cradle-seed-ventures",
    name: "Cradle Seed Ventures",
    category: "Pre-seed & Seed",
    shortDesc:
      "Venture capital arm of Cradle Fund (Ministry of Finance). The most accessible institutional early-stage funder for Malaysian tech startups.",
    url: "https://www.cradle.com.my",
    type: "Government-backed Venture Capital",
    founded: "2003",
    hq: "Kuala Lumpur, Malaysia",
    stats: [{ label: "Parent", value: "Ministry of Finance Malaysia" }],
    overview:
      "Cradle Seed Ventures is the venture capital arm of Cradle Fund Sdn Bhd, Malaysia's premier early-stage startup financier operating under the Ministry of Finance. CSV manages early-stage venture funds and complements Cradle's grant programmes (CIP) with equity investment. It is one of the most important entry points for Malaysian tech founders seeking institutional capital.",
    stages: ["Pre-seed", "Seed"],
    sectors: ["ICT", "Deep Tech", "B2B SaaS", "Fintech", "Healthtech"],
    geographies: ["Malaysia (primary)"],
    ticketSizes: ["RM500K–RM5M typical range"],
    email: "info@cradle.com.my",
    linkedin: "https://www.linkedin.com/company/cradle-fund/",
    pitchTips: [
      "Apply via cradle.com.my — CIP grant and CSV equity investment have separate tracks",
      "Must be a Malaysian-incorporated company with an ICT/tech component",
      "Government process: allow 3–6 months for full due diligence",
      "Prepare: business plan, financials, team credentials, IP documentation",
    ],
    notes: [
      "Cradle Fund also manages the CIP grant programme — complementary to CSV equity",
      "One of the most credible signals of early institutional backing for Malaysian startups",
      "Works closely with MDEC, MoF, and the broader government tech ecosystem",
    ],
  },
  {
    id: "nexea",
    name: "NEXEA",
    category: "Pre-seed & Seed",
    shortDesc:
      "Early-stage VC and accelerator focused on B2B tech and SaaS. Also operates a curated angel investor network for Malaysia.",
    url: "https://www.nexea.co",
    type: "Early-stage VC + Accelerator",
    founded: "2003",
    hq: "Kuala Lumpur, Malaysia",
    overview:
      "NEXEA is one of Malaysia's most established early-stage venture capital and accelerator organisations. With roots going back to 2003 under the Malaysian Ministry of Finance's startup development ecosystem, NEXEA has evolved into an active investor focused on B2B technology, SaaS, and marketplace models. NEXEA also maintains a curated Angel Investor network connecting startups to HNW individuals.",
    stages: ["Seed", "Series A"],
    sectors: ["B2B SaaS", "Enterprise software", "Fintech infrastructure", "HR/PropTech/LegalTech", "Marketplaces"],
    geographies: ["Malaysia (primary)", "Singapore, Indonesia (follow-on)"],
    ticketSizes: ["Seed: $200K–$1M", "Series A: $1M–$5M"],
    portfolio: [
      { company: "Funding Societies", sector: "SME Fintech", notes: "Unicorn — co-investor" },
      { company: "PolicyStreet", sector: "Insurtech", notes: "Series B" },
    ],
    team: [{ name: "Ben Lim", role: "CEO & Founder" }],
    email: "contact@nexea.co",
    linkedin: "https://www.linkedin.com/company/nexea/",
    crunchbase: "https://www.crunchbase.com/organization/nexea",
    pitchTips: [
      "Apply via nexea.co — application form available online",
      "For angel network access: contact@nexea.co",
      "Strong preference for B2B startups with paying customers",
      "Clearly articulate: customer acquisition strategy, recurring revenue model, and SEA expansion path",
    ],
    notes: [
      "Publishes annual reports on Malaysia's startup funding landscape",
      "Runs regular Startup Founders meetups",
      "One of the most active angel networks in Malaysia",
      "Offers advisory services for startups pre-fundraise",
    ],
  },
  {
    id: "500-global",
    name: "500 Global",
    category: "Pre-seed & Seed",
    shortDesc:
      "Global VC with $2.4B AUM and 2,800+ portfolio companies. Active in Malaysia through the Distro Dojo programme and direct seed investments.",
    url: "https://500.co",
    type: "Global VC + Accelerator",
    founded: "2010",
    hq: "San Francisco, USA (SEA office: Kuala Lumpur)",
    stats: [
      { label: "AUM", value: "$2.4 Billion" },
      { label: "Portfolio", value: "2,800+ startups" },
    ],
    overview:
      "500 Global (formerly 500 Startups) is one of the world's most active and prolific venture capital firms. It operates large-scale accelerator programmes alongside direct VC investment. In Southeast Asia, 500 Global has been particularly active in Malaysia through its Distro Dojo programme and direct fund investments, making it one of the highest-volume early-stage investors in the region.",
    stages: ["Pre-seed (accelerator)", "Seed", "Series A (selective)"],
    sectors: ["Consumer internet", "Fintech", "B2B SaaS", "Marketplace", "Healthtech", "Edtech"],
    geographies: ["Global (80+ countries)", "SEA: Malaysia, Indonesia, Thailand, Vietnam, Philippines"],
    ticketSizes: ["Accelerator: $150K–$200K for ~6% equity", "Seed direct: $500K–$2M"],
    portfolio: [
      { company: "Carsome", sector: "Auto Marketplace", notes: "Malaysia" },
      { company: "Grab", sector: "Super App", notes: "Singapore/SEA" },
      { company: "Canva", sector: "Design SaaS", notes: "Early SEA bet" },
    ],
    team: [
      { name: "Khailee Ng", role: "Managing Partner, 500 SEA" },
      { name: "Vishal Harnal", role: "Managing Partner" },
    ],
    email: "info@500.co",
    linkedin: "https://www.linkedin.com/company/500startups/",
    crunchbase: "https://www.crunchbase.com/organization/500-startups",
    pitchTips: [
      "Apply to accelerator programmes at 500.co/apply",
      "For direct VC investment: warm intro through portfolio founders or LinkedIn",
      "Khailee Ng (KL-based) is the key contact for SEA investments",
      "They look for: exceptional founders, large addressable market, early traction, and scalability",
    ],
    notes: [
      "500 SEA is one of the highest-volume early investors in Malaysia's history",
      "Khailee Ng is one of the most influential VCs in the Malaysian ecosystem",
      "Known for backing founders early and staying through multiple rounds",
      "500 Global's LP network is useful for follow-on capital introductions",
    ],
  },
  {
    id: "artem-ventures",
    name: "Artem Ventures",
    category: "Pre-seed & Seed",
    shortDesc:
      "Malaysia-based pre-seed VC that pairs capital with hands-on founder capacity-building, skills development, and mentorship.",
    url: "https://www.artemventures.co",
    type: "Early-stage Venture Capital",
    founded: "~2015",
    hq: "Kuala Lumpur, Malaysia",
    overview:
      "Artem Ventures is a Malaysia-based venture capital firm with a distinctive approach: it goes beyond pure capital to focus on building the capacity and capabilities of founders. Artem believes that sustainable, adaptable businesses are built by founders with the right mindset, skills, and networks — and the firm invests hands-on time and expertise alongside money. The name 'Artem' is derived from Latin for 'craft' or 'art,' reflecting this artisanal approach to building companies.",
    stages: ["Pre-seed", "Seed"],
    sectors: ["B2B / Enterprise", "Digital services", "Social enterprise / Impact"],
    geographies: ["Malaysia (primary)", "Broader SEA (follow-ons)"],
    ticketSizes: ["$100K–$750K typical range"],
    email: "hello@artemventures.co",
    linkedin: "https://www.linkedin.com/company/artem-ventures/",
    crunchbase: "https://www.crunchbase.com/organization/artem-ventures",
    pitchTips: [
      "Email hello@artemventures.co with a personal narrative + business deck",
      "They value: founder story, learning agility, and a strong 'why' behind the business",
      "Capacity to grow as a leader matters as much as the business idea",
      "Expect multiple conversations before investment — relationship-driven process",
    ],
    notes: [
      "Less volume-focused than accelerators; takes fewer bets per year",
      "Good fit for founders who want a partner, not just a cheque",
      "Active in startup community events in KL",
    ],
  },
  {
    id: "kk-fund",
    name: "KK Fund",
    category: "Pre-seed & Seed",
    shortDesc:
      "Regional pre-seed to seed fund for consumer internet and software startups in SEA, with active Malaysia deal flow.",
    url: "https://kkfund.co",
    type: "Early-stage Regional VC",
    founded: "Not publicly stated",
    hq: "Southeast Asia / Regional",
    overview:
      "KK Fund is an early-stage venture capital firm in Southeast Asia that appears on Malaysia VC directories and founder resource lists. It is best treated as a regional seed fund with Malaysia relevance rather than a Malaysia-only fund. A useful reference for very early founders who want a lean seed investor with broad SEA exposure.",
    stages: ["Pre-seed", "Seed"],
    sectors: ["Consumer internet", "Software", "Marketplaces", "Digital products"],
    geographies: ["Malaysia", "Singapore", "Broader Southeast Asia"],
    linkedin: "https://www.linkedin.com/company/kk-fund/",
    notes: [
      "A useful name to include in a Malaysia VC map even though it is more regional than domestic",
      "Best fit for very early founders who want a lean seed investor with SEA exposure",
      "Check the website directly for current portfolio and partner details",
    ],
  },

  // ─── Seed to Series A ───────────────────────────────────────────────────────
  {
    id: "gobi-partners",
    name: "Gobi Partners",
    category: "Seed to Series A",
    shortDesc:
      "Pan-Asian VC with ~$1.6B AUM across 17 funds and 380+ portfolio companies. Strong presence in Malaysia and underserved SEA markets.",
    url: "https://www.gobi.vc",
    type: "Pan-Asian Venture Capital",
    founded: "2002",
    hq: "Kuala Lumpur, Malaysia & Hong Kong",
    stats: [
      { label: "AUM", value: "~$1.6 Billion" },
      { label: "Funds", value: "17 across Asia" },
      { label: "Portfolio", value: "380+ startups" },
      { label: "Unicorns", value: "9 backed" },
    ],
    overview:
      "Gobi Partners is one of Asia's most established and interconnected venture capital firms. Founded in 2002, it operates across North Asia, South Asia, and ASEAN with a strong presence in emerging and underserved markets. Gobi is notable for its focus on backing founders in markets that larger funds often overlook — including frontier markets within SEA and Islamic fintech.",
    stages: ["Seed", "Series A (primary)", "Series B (selective)"],
    sectors: ["Enterprise SaaS & B2B tech", "Consumer internet", "Fintech & Islamic fintech", "Logistics & supply chain", "Digital health"],
    geographies: ["Malaysia", "Indonesia", "Thailand", "Vietnam", "Philippines", "Pakistan, Bangladesh"],
    ticketSizes: ["Seed: $500K–$2M", "Series A: $2M–$8M", "Follow-on: up to $15M+"],
    portfolio: [
      { company: "Carsome", sector: "Auto Marketplace", notes: "Malaysia" },
      { company: "Funding Societies", sector: "SME Fintech", notes: "Malaysia/SEA" },
      { company: "Aerodyne", sector: "Drone Tech", notes: "Malaysia" },
      { company: "Fave", sector: "Deals / Payments", notes: "Malaysia" },
      { company: "Katsana", sector: "Fleet Telematics", notes: "Malaysia" },
      { company: "PichaEats", sector: "Social Enterprise", notes: "Malaysia" },
    ],
    team: [
      { name: "Thomas G. Tsao", role: "Co-founder & General Partner" },
      { name: "Jamaluddin Bujang", role: "Managing Partner, Malaysia/SEA" },
    ],
    email: "info@gobi.vc",
    linkedin: "https://www.linkedin.com/company/gobipartners/",
    crunchbase: "https://www.crunchbase.com/organization/gobi-partners",
    twitter: "https://twitter.com/gobipartners",
    pitchTips: [
      "Submit via website contact form at gobi.vc — warm intros through portfolio founders preferred",
      "Deck should clearly show: unit economics, market sizing for SEA, and go-to-market",
      "Particularly interested in: Islamic economy, halal tech, and frontier market adaptation",
      "They look for: strong founding team, defensible business model, regional scalability",
    ],
    notes: [
      "One of the most active VCs in Malaysia for cross-border deals",
      "Manages Malaysia-specific funds in addition to pan-Asian vehicles",
      "Known for supporting founders through rough patches, not just good times",
      "Regular LP base includes family offices, sovereign wealth funds, and DFIs",
    ],
  },
  {
    id: "rhl-ventures",
    name: "RHL Ventures",
    category: "Seed to Series A",
    shortDesc:
      "Malaysian multi-stage VC backing disruptive founders from Seed to Series B across Southeast Asia with a hands-on approach.",
    url: "https://www.rhlventures.com",
    type: "Multi-stage Venture Capital",
    founded: "2018",
    hq: "Kuala Lumpur, Malaysia",
    overview:
      "RHL Ventures is a Malaysian-based multi-stage venture capital firm that invests across Southeast Asia, supporting visionary entrepreneurs building disruptive and scalable companies. Founded by Richard Eu, Hisham Hamid, and Lim Kok Beng, RHL is known for a hands-on approach and strong network in the Malaysian corporate and financial ecosystem.",
    stages: ["Seed", "Series A (primary)", "Series B (select follow-ons)"],
    sectors: ["Fintech & financial services", "Consumer internet", "Digital media", "Enterprise SaaS", "Healthtech", "Edtech"],
    geographies: ["Malaysia (primary)", "Indonesia, Singapore, Thailand, Vietnam"],
    ticketSizes: ["Seed: $500K–$1.5M", "Series A: $2M–$7M", "Follow-on: up to $10M+"],
    portfolio: [
      { company: "PolicyStreet", sector: "Insurtech", notes: "Malaysia" },
      { company: "Arus Oil", sector: "Waste / Cleantech", notes: "Malaysia" },
      { company: "Supahands", sector: "AI Data Labelling", notes: "Malaysia" },
      { company: "BookDoc", sector: "Healthtech", notes: "Malaysia" },
      { company: "TheLorry", sector: "Logistics", notes: "Malaysia" },
    ],
    team: [
      { name: "Richard Eu", role: "Co-founder & Managing Partner" },
      { name: "Hisham Hamid", role: "Co-founder & Partner" },
      { name: "Lim Kok Beng", role: "Co-founder & Partner" },
    ],
    email: "info@rhlventures.com",
    linkedin: "https://www.linkedin.com/company/rhl-ventures/",
    crunchbase: "https://www.crunchbase.com/organization/rhl-ventures",
    pitchTips: [
      "Email pitch deck to info@rhlventures.com — warm intros preferred",
      "Look for: strong founding team with complementary skills, clear SEA expansion plan",
      "Strong preference for B2C or B2SME companies solving real pain points",
      "Proven unit economics at seed level is a strong signal for them",
    ],
    notes: [
      "Known for co-investing with international VCs entering Malaysia",
      "Has a strong bridge between corporate Malaysia and startups",
      "Active in ecosystem building — hosts events and mentoring programmes",
      "Founders Richard and Hisham are well-connected across Malaysian GLCs and banking sector",
    ],
  },
  {
    id: "monks-hill-ventures",
    name: "Monk's Hill Ventures",
    category: "Seed to Series A",
    shortDesc:
      "Singapore-based VC co-founded by serial entrepreneurs; one of the most active Series A investors in Malaysian deep tech and enterprise software.",
    url: "https://www.monkshill.com",
    type: "Venture Capital",
    founded: "2014",
    hq: "Singapore (with active Malaysia portfolio)",
    overview:
      "Monk's Hill Ventures (MHV) is a venture capital firm co-founded by serial entrepreneurs Peng T. Ong and Kuo-Yi Lim, both of whom have built and exited tech companies themselves. MHV focuses on early-stage technology companies across Southeast Asia, with a strong thesis around deep tech, developer tools, and enterprise software. Though headquartered in Singapore, MHV is one of the most active Series A investors in Malaysian startups.",
    stages: ["Pre-Series A (primary)", "Series A", "Selective Seed (exceptional teams)"],
    sectors: ["Deep Tech (AI, robotics, computer vision)", "Developer tools & infrastructure", "Enterprise SaaS & B2B software", "Fintech", "Healthtech", "Climate tech"],
    geographies: ["SEA: Singapore, Malaysia, Indonesia, Vietnam, Philippines"],
    ticketSizes: ["Pre-Series A: $1M–$3M", "Series A: $3M–$10M"],
    portfolio: [
      { company: "Carro", sector: "Auto Marketplace", notes: "Singapore/SEA" },
      { company: "Funding Societies", sector: "SME Fintech", notes: "Malaysia/SEA" },
      { company: "Deskera", sector: "ERP SaaS", notes: "Malaysia" },
      { company: "StashAway", sector: "Wealthtech", notes: "Singapore" },
    ],
    team: [
      { name: "Peng T. Ong", role: "Co-founder & Managing Partner" },
      { name: "Kuo-Yi Lim", role: "Co-founder & Managing Partner" },
      { name: "Lim Wai Mun", role: "Partner" },
    ],
    email: "info@monkshill.com",
    linkedin: "https://www.linkedin.com/company/monks-hill-ventures/",
    crunchbase: "https://www.crunchbase.com/organization/monk-s-hill-ventures",
    twitter: "https://twitter.com/monkshill",
    pitchTips: [
      "Email info@monkshill.com with a concise deck — warm intros through SEA tech network are highly effective",
      "They want: founder-market fit, clear technical differentiation, strong B2B sales motion",
      "Deep tech: demonstrate a working prototype and early customer validation",
      "Enterprise SaaS: show ARR growth, NRR, and expansion potential",
    ],
    notes: [
      "Peng T. Ong previously co-founded Match.com — brings Silicon Valley networks",
      "Known for founder-friendly terms and genuine operational support post-investment",
      "Publishes thought leadership on SEA tech — worth following for market insights",
      "Fund III raised in recent years with larger ticket sizes",
    ],
  },
  {
    id: "mavcap",
    name: "MAVCAP",
    category: "Seed to Series A",
    shortDesc:
      "Malaysia's largest government-owned VC (Ministry of Finance). Invests directly and via fund-of-funds into ICT and high-growth tech sectors.",
    url: "https://www.mavcap.com.my",
    type: "Government-owned Venture Capital",
    founded: "2001",
    hq: "Kuala Lumpur, Malaysia",
    stats: [
      { label: "Owner", value: "Ministry of Finance (100%)" },
      { label: "Status", value: "Malaysia's largest VC" },
    ],
    overview:
      "MAVCAP (Malaysia Venture Capital Management Berhad) is Malaysia's largest and oldest government-owned venture capital firm. Wholly owned by the Ministry of Finance, MAVCAP has a national mandate to develop Malaysia's venture capital ecosystem, fund high-growth technology startups, and attract international co-investors to Malaysia. MAVCAP operates both direct investment funds and fund-of-funds vehicles.",
    stages: ["Seed", "Series A (primary direct investment)", "Series B (follow-on)"],
    sectors: ["ICT (primary mandate)", "Fintech", "AI & data analytics", "Cybersecurity", "Healthtech", "Digital media"],
    geographies: ["Malaysia-incorporated companies (primary)", "Malaysian founders in SEA"],
    ticketSizes: ["Direct investment: RM2M–RM20M", "Fund-of-Funds: RM10M–RM50M per fund"],
    portfolio: [
      { company: "Soft Space", sector: "Fintech", notes: "Growth stage" },
      { company: "Aerodyne", sector: "Drone Tech / AI", notes: "Series C" },
      { company: "Katsana", sector: "Fleet Management", notes: "Growth" },
      { company: "Datasonic", sector: "Digital Identity", notes: "Listed company" },
    ],
    team: [{ name: "Shahril Effendi Ibrahim", role: "CEO" }],
    email: "info@mavcap.com.my",
    linkedin: "https://www.linkedin.com/company/mavcap/",
    crunchbase: "https://www.crunchbase.com/organization/mavcap",
    pitchTips: [
      "Apply via mavcap.com.my or email info@mavcap.com.my",
      "Must be Malaysia-incorporated with a clear ICT/tech component",
      "Government-linked process — expect longer due diligence (3–6 months is common)",
      "Prepare: audited financials, business plan, IP documentation, team credentials",
    ],
    notes: [
      "MAVCAP has invested in 70+ companies across multiple fund generations since 2001",
      "Its fund-of-funds programme has attracted Vertex Ventures (SEA) and other top-tier VCs",
      "Slower decision process than private VCs but provides credibility and government network access",
      "Participates in Malaysia Digital Economy Blueprint initiatives",
    ],
  },
  {
    id: "kumpulan-modal-perdana",
    name: "Kumpulan Modal Perdana",
    category: "Seed to Series A",
    shortDesc:
      "Government-linked VC focused on deep tech, electronics, and greentech — aligned with Malaysia's national semiconductor and green economy agenda.",
    url: "https://www.kmp.com.my",
    type: "Government-linked Venture Capital",
    founded: "1999",
    hq: "Kuala Lumpur, Malaysia",
    overview:
      "Kumpulan Modal Perdana Sdn Bhd (KMP) is a Malaysian government-linked venture capital firm with a distinctive focus on deep technology, electronics, semiconductor-adjacent businesses, and green technology. KMP supports entrepreneurs building market-disrupting products, particularly those targeting solutions to real-world engineering problems. Its mandate aligns closely with Malaysia's National Semiconductor Strategy and green economy agenda.",
    stages: ["Seed", "Series A"],
    sectors: ["Deep tech (hardware, electronics, embedded systems)", "Semiconductor & electronics manufacturing tech", "Renewable energy & energy storage", "Greentech & cleantech", "IoT & industrial automation", "Defence & aerospace tech"],
    geographies: ["Malaysia (primary)", "Technology commercialisation from Malaysian institutions"],
    ticketSizes: ["RM500K–RM5M typical range"],
    email: "info@kmp.com.my",
    linkedin: "https://www.linkedin.com/company/kumpulan-modal-perdana/",
    crunchbase: "https://www.crunchbase.com/organization/kumpulan-modal-perdana",
    pitchTips: [
      "Contact info@kmp.com.my with a technical pitch deck",
      "Essential: working prototype or proof-of-concept, IP filing status, technical team credentials (engineers, PhDs)",
      "Strong alignment needed with: national semiconductor strategy, green economy, industrial digitalisation",
      "Highlight: Malaysian manufacturing or commercialisation pathway and export potential",
    ],
    notes: [
      "Highly relevant as Malaysia positions itself in the global semiconductor value chain",
      "Growing importance as Malaysia attracts Intel, Infineon, Bosch expansions that need local tech suppliers",
      "Stands apart from Malaysia's largely software-focused VC landscape by actively backing hardware",
      "Government-linked process — allow 3–6 months for full due diligence",
    ],
  },
  {
    id: "xeraya-capital",
    name: "Xeraya Capital",
    category: "Seed to Series A",
    shortDesc:
      "Malaysia's leading life sciences VC. Invests globally in biotech, healthtech, medical devices, and pharmaceutical innovation.",
    url: "https://xeraya.com",
    type: "Venture Capital + Private Equity",
    founded: "2010",
    hq: "Kuala Lumpur, Malaysia",
    overview:
      "Xeraya Capital is Malaysia's leading life sciences-focused venture capital and private equity firm. It invests globally in healthcare innovation with a specific mandate to drive value creation in Malaysia's bioeconomy. Xeraya's portfolio spans pharmaceutical tech, medical devices, digital health, agricultural biotech, and clinical-stage biotech companies. It is backed by a consortium of Malaysian institutional investors and family offices with a global outlook.",
    stages: ["Seed (select)", "Series A", "Series B", "Late-stage / Pre-IPO"],
    sectors: ["Pharmaceutical tech & drug development", "Medical devices & diagnostics", "Digital health & telemedicine", "Biotech & synthetic biology", "Agritech & agricultural biotech", "Nutraceuticals & wellness"],
    geographies: ["USA, Europe, Israel (global biotech hubs)", "Malaysia (local value creation)", "ASEAN (healthtech expansion)"],
    ticketSizes: ["VC: $1M–$20M", "PE: $10M–$50M+"],
    team: [{ name: "Wong Mun Choong", role: "CEO & Managing Partner" }],
    email: "info@xeraya.com",
    linkedin: "https://www.linkedin.com/company/xeraya-capital/",
    crunchbase: "https://www.crunchbase.com/organization/xeraya-capital",
    pitchTips: [
      "Email info@xeraya.com — pitch deck should include clinical data, IP status, and regulatory pathway",
      "Essential: proof of concept or clinical-stage data, clear IP ownership, commercialisation plan for Malaysia/ASEAN",
      "They do not invest in pure digital health without a life sciences component",
      "International companies: highlight Malaysia expansion opportunity (manufacturing, clinical trials, distribution)",
    ],
    notes: [
      "Published the comprehensive Malaysia Venture Capital Roadmap 2024–2030",
      "Active in MoST and Bioeconomy Corporation working groups",
      "One of the few Malaysian VCs with genuine biotech domain expertise",
      "Malaysia's bioeconomy ambitions make Xeraya a strategic partner for life sciences founders",
    ],
  },
  {
    id: "vynn-capital",
    name: "Vynn Capital",
    category: "Seed to Series A",
    shortDesc:
      "Kuala Lumpur-based early-stage VC focused on sector-specific tech and fintech startups in the digital economy.",
    url: "https://vynncapital.com",
    type: "Early-stage Venture Capital",
    founded: "Not publicly stated",
    hq: "Kuala Lumpur, Malaysia",
    overview:
      "Vynn Capital describes itself as a sector-focused early-stage venture capital firm investing in tech startups within synergistic industries. It is positioned as a hands-on partner to founders, with a clear Malaysia base and regional ambition. The firm emphasises strategic sector fit rather than pure generalist investing.",
    stages: ["Early-stage", "Select follow-ons"],
    sectors: ["Fintech", "Digital economy", "B2B technology", "Software-enabled services"],
    geographies: ["Malaysia", "Southeast Asia"],
    linkedin: "https://www.linkedin.com/company/vynncapital/",
    notes: [
      "Good reference for founders looking for a Malaysia-based early-stage investor",
      "The firm's positioning suggests an emphasis on strategic sector fit",
      "Worth checking directly for current thesis and portfolio priorities before outreach",
    ],
  },

  // ─── Growth & Multi-stage ───────────────────────────────────────────────────
  {
    id: "osk-ventures",
    name: "OSK Ventures International",
    category: "Growth & Multi-stage",
    shortDesc:
      "Publicly listed Malaysian VC (Bursa Main Market) offering both equity and venture debt for Series A–B growth-stage companies.",
    url: "https://www.oskvi.com",
    type: "Venture Capital + Venture Debt (Listed)",
    founded: "1997",
    hq: "Kuala Lumpur, Malaysia",
    stats: [
      { label: "Listed", value: "Bursa Malaysia (Main Market)" },
      { label: "Parent", value: "OSK Holdings Berhad" },
    ],
    overview:
      "OSK Ventures International Berhad (OSKVI) is a publicly listed venture capital and private equity firm in Malaysia, a subsidiary of OSK Holdings. It is one of the few Malaysian VCs listed on the stock exchange. OSKVI combines traditional equity investment with venture debt — making it particularly attractive for capital-efficient founders who want non-dilutive scaling capital alongside equity.",
    stages: ["Series A (primary)", "Series B", "Growth equity"],
    sectors: ["Fintech & financial services", "Technology-enabled services", "Consumer internet", "Digital infrastructure", "Healthtech"],
    geographies: ["Malaysia (primary)", "Southeast Asia (expansion)"],
    ticketSizes: ["Equity: $2M–$15M", "Venture Debt: $1M–$10M", "Total exposure: up to $20M+"],
    portfolio: [
      { company: "Aerodyne", sector: "Drone Tech / AI", notes: "Malaysia" },
      { company: "Soft Space", sector: "Fintech", notes: "Malaysia" },
      { company: "BookDoc", sector: "Healthtech", notes: "Malaysia" },
    ],
    team: [{ name: "See Kok Weng", role: "Managing Director" }],
    email: "ir@oskvi.com",
    linkedin: "https://www.linkedin.com/company/osk-ventures-international/",
    crunchbase: "https://www.crunchbase.com/organization/osk-ventures-international",
    pitchTips: [
      "Contact via ir@oskvi.com or through corporate advisory channels",
      "For venture debt: submit financial models, revenue projections, and collateral information",
      "For equity: standard deck with unit economics, team background, and SEA expansion plan",
      "Being listed means higher governance standards — founders should be prepared for rigorous due diligence",
    ],
    notes: [
      "One of the oldest active VCs in Malaysia",
      "Listed status provides liquidity for LPs and regulatory accountability",
      "Venture debt product is underutilised by Malaysian founders — worth considering for growth-stage companies",
      "Active in Bursa Malaysia ecosystem — can help portfolio companies think about public listings",
    ],
  },
  {
    id: "th-capital",
    name: "TH Capital",
    category: "Growth & Multi-stage",
    shortDesc:
      "Malaysian private investment firm supporting early-to-growth ventures with a Southeast Asian connectivity and nation-building focus.",
    url: "http://th.capital",
    type: "Private Investment Firm",
    founded: "Not publicly stated",
    hq: "Kuala Lumpur, Malaysia",
    overview:
      "TH Capital presents itself as a Malaysian private investment firm with strong Southeast Asian connections. The firm's messaging leans toward venture financing and business growth support, making it relevant for founders looking beyond classic generalist VC labels.",
    stages: ["Early-stage", "Growth-stage"],
    sectors: ["Technology-enabled businesses", "Venture financing opportunities", "SEA-connectivity startups"],
    geographies: ["Malaysia", "Southeast Asia"],
    email: "admin@th.capital",
    linkedin: "https://www.linkedin.com/company/th-capital/",
    notes: [
      "A Malaysia-based investment firm relevant for ecosystem mapping and founder research",
      "The site framing suggests a broader capital-allocation role than a narrow sector fund",
      "Verify current strategy before outreach, as positioning can shift over time",
    ],
  },

  // ─── Fund-of-Funds & Ecosystem ──────────────────────────────────────────────
  {
    id: "jelawang-capital",
    name: "Jelawang Capital",
    category: "Fund-of-Funds & Ecosystem",
    shortDesc:
      "Khazanah Nasional's national Fund-of-Funds (Dana Impak). Allocates capital to qualified VC managers to catalyse Malaysia's startup ecosystem.",
    url: "https://www.jelawangcapital.com",
    type: "National Fund-of-Funds",
    founded: "2022",
    hq: "Kuala Lumpur, Malaysia",
    stats: [{ label: "Parent", value: "Khazanah Nasional (Dana Impak)" }],
    overview:
      "Jelawang Capital is Malaysia's National Fund-of-Funds, operating under Khazanah Nasional's Dana Impak (Impact Fund) initiative. Rather than investing directly in startups, Jelawang allocates capital to qualified VC fund managers — both domestic and international — to catalyse private sector investment into Malaysia's startup ecosystem. The name 'Jelawang' refers to a Malaysian hardwood tree, symbolising resilience and deep roots.",
    stages: ["Fund-of-Funds — no direct startup investments"],
    sectors: ["All sectors via portfolio funds", "AI, sustainability, healthcare, fintech prioritised"],
    email: "info@jelawangcapital.com",
    linkedin: "https://www.linkedin.com/company/jelawang-capital/",
    pitchTips: [
      "If you are a VC fund manager: submit fund strategy, track record, and Malaysian deployment plan to info@jelawangcapital.com",
      "If you are a startup: engage the VC funds backed by Jelawang — not Jelawang directly",
      "If you are an LP: Jelawang is government-backed; private co-investment may be possible via the Dana Impak framework",
    ],
    notes: [
      "Launched as part of Malaysia's push to deepen domestic VC infrastructure (2022–2025)",
      "Acts as an anchor LP — gives credibility to new fund managers raising first/second funds",
      "Creates a multiplier effect: RM1 from Jelawang catalyses RM3–5 from co-investors",
      "Critical missing piece in Malaysia's ecosystem — creating institutional LP base for VCs",
    ],
  },
  {
    id: "endeavor-malaysia",
    name: "Endeavor Malaysia",
    category: "Fund-of-Funds & Ecosystem",
    shortDesc:
      "Non-dilutive global network for high-impact founders. Selection-based access to world-class mentors, peer entrepreneurs, and investors.",
    url: "https://endeavor.org/offices/malaysia",
    type: "Entrepreneur Support Network (Non-dilutive)",
    founded: "1997 (global)",
    hq: "Kuala Lumpur, Malaysia",
    stats: [
      { label: "Global", value: "40+ countries" },
      { label: "Network", value: "2,000+ founders" },
    ],
    overview:
      "Endeavor Malaysia is the local office of Endeavor Global, the world's leading community of high-impact entrepreneurs. Unlike traditional VCs, Endeavor does not take equity — instead, it offers access to a curated global network of mentors, peer founders, and investors. Endeavor selects entrepreneurs through a rigorous process and provides ongoing support to help them scale beyond borders.",
    stages: ["Growth-stage (non-dilutive support)"],
    sectors: ["All — High-Impact Entrepreneurs at scale"],
    geographies: ["Global + Malaysia focus"],
    portfolio: [
      { company: "Carsome", sector: "Auto Marketplace", notes: "Endeavor Entrepreneur" },
      { company: "Funding Societies", sector: "SME Fintech", notes: "Endeavor Entrepreneur" },
    ],
    team: [{ name: "Shan Li Tay", role: "Managing Director, Endeavor Malaysia" }],
    email: "malaysia@endeavor.org",
    linkedin: "https://www.linkedin.com/company/endeavor/",
    crunchbase: "https://www.crunchbase.com/organization/endeavor",
    pitchTips: [
      "Apply at endeavor.org/apply — open applications reviewed periodically",
      "Referral from an existing Endeavor Entrepreneur is strongly preferred",
      "Selection process: local panel → regional panel → International Selection Panel in New York",
      "Best suited for founders already scaling — not early-stage; expect 6–12 months from application to selection",
    ],
    notes: [
      "Endeavor does NOT take equity — access to the network is the value",
      "Carsome and Funding Societies are both Endeavor Entrepreneurs — signals Malaysia's ecosystem maturity",
      "Endeavor's 'give-back' culture means selected founders become mentors to the next generation",
      "Catalyst Fund has invested in 200+ companies globally alongside top-tier VCs",
    ],
  },

  // ─── Corporate & Regional ───────────────────────────────────────────────────
  {
    id: "golden-gate-ventures",
    name: "Golden Gate Ventures",
    category: "Corporate & Regional",
    shortDesc:
      "Singapore-based early-to-growth SEA VC with a long track record backing founders across the region, including Malaysia.",
    url: "https://www.goldengate.vc",
    type: "Venture Capital",
    founded: "2011",
    hq: "Singapore (active in Malaysia)",
    overview:
      "Golden Gate Ventures is a Southeast Asia-focused venture capital firm with a strong track record backing founders across the region. It is not Malaysia-only, but it has long been active in the Malaysian startup ecosystem and is one of the most visible regional funds on founder shortlists. Known for backing early regional winners and helping Malaysian founders think SEA-first.",
    stages: ["Early-stage (primary)", "Select growth-stage follow-ons"],
    sectors: ["Consumer internet", "Fintech", "SaaS / software", "Digital platforms", "Cross-border SEA startups"],
    geographies: ["Singapore", "Malaysia", "Indonesia", "Vietnam", "Thailand", "Broader SEA"],
    email: "hello@goldengate.vc",
    linkedin: "https://www.linkedin.com/company/golden-gate-ventures/",
    twitter: "https://twitter.com/GoldenGateVC",
    notes: [
      "Known for backing early regional winners and helping Malaysian founders think SEA-first",
      "A useful reference fund for founders targeting multi-country expansion",
      "Often appears alongside other SEA funds in syndicated rounds",
    ],
  },
  {
    id: "sunway-ilabs",
    name: "Sunway iLabs",
    category: "Corporate & Regional",
    shortDesc:
      "Sunway Group's corporate VC and innovation lab. Early-stage investing in AI and deep tech aligned with the Sunway ecosystem.",
    url: "https://innovationlabs.sunway.edu.my/venture-capital/",
    type: "Corporate Venture Capital / Innovation Lab",
    founded: "2017",
    hq: "Bandar Sunway, Malaysia",
    overview:
      "Sunway iLabs is Sunway Group and Sunway University's innovation and entrepreneurship platform. It operates as a corporate venture-capital style unit with a fund-of-funds and strategic investment approach, supporting startups through investment, talent, and ecosystem access. Best fit for founders looking for strategic access to Sunway's large ecosystem of properties, education, and services.",
    stages: ["Early-stage", "Strategic corporate ventures"],
    sectors: ["Deep tech", "AI", "Innovation infrastructure", "Education/research-adjacent startups", "Sunway ecosystem-aligned startups"],
    geographies: ["Malaysia", "Southeast Asia"],
    email: "sunwayilabs@sunway.com.my",
    linkedin: "https://www.linkedin.com/company/sunway-ilabs/",
    notes: [
      "Useful example of corporate venture capital in Malaysia",
      "Good fit for founders looking for strategic access to Sunway's large ecosystem",
      "Particularly relevant for innovation-heavy or partnership-driven startups",
    ],
  },
];
