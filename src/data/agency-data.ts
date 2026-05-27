export interface AgencyDetail {
  name: string;            // must match DirectoryItem.name exactly (used as lookup key)
  type: string;            // e.g. "Federal Ministry", "National Agency"
  overview: string;        // full paragraph
  services: string[];      // what it offers
  whoFor: string[];        // who should use it
  howToEngage?: string[];
  notes?: string[];
}

const AGENCIES: AgencyDetail[] = [

  // ─── Federal ministries and national portals ────────────────────────────────
  {
    name: "MyGovernment (Portal Rasmi Kerajaan Malaysia)",
    type: "National Government Portal",
    overview:
      "MyGovernment is Malaysia's official single-window government services portal, consolidating public-service access, citizen-facing guidance, and government information across all ministries and agencies into one digital entry point.",
    services: [
      "Centralised access to e-government services across all federal ministries",
      "Business registration, licensing, and regulatory information pathways",
      "Citizen services including passport, licences, and social services",
      "Links to official ministry portals, announcements, and policy documents",
    ],
    whoFor: [
      "Founders and businesses navigating federal approvals and licensing",
      "Citizens looking for government services, forms, and information",
      "Researchers and ecosystem builders mapping public-sector resources",
    ],
    howToEngage: [
      "Visit malaysia.gov.my to browse services by category",
      "Use the search bar to find specific licences or regulatory guidance",
    ],
  },
  {
    name: "Ministry of Digital",
    type: "Federal Ministry",
    overview:
      "Malaysia's lead federal ministry for digital policy, public-service digitisation, and national digital transformation. The Ministry of Digital oversees the MyDIGITAL agenda, coordinates digital infrastructure policy, and drives adoption of digital services across government and the private sector.",
    services: [
      "Digital policy formulation and national digital transformation agenda",
      "Oversight of MyDIGITAL national blueprint and implementation",
      "Digital government initiatives, e-services, and public-sector ICT coordination",
      "Regulation of data governance, digital identity, and digital infrastructure",
    ],
    whoFor: [
      "GovTech founders and companies seeking to work with government on digital services",
      "Policy researchers and ecosystem builders studying Malaysia's digital agenda",
      "Businesses seeking alignment with national digital transformation priorities",
    ],
    howToEngage: [
      "Follow official announcements at digital.gov.my",
      "Engage through industry consultations and public comment periods",
    ],
    notes: [
      "Formerly known as the Ministry of Communications and Digital (KKD)",
      "Coordinates closely with MDEC, MCMC, and CyberSecurity Malaysia",
    ],
  },
  {
    name: "Ministry of Science, Technology and Innovation (MOSTI)",
    type: "Federal Ministry",
    overview:
      "The national ministry responsible for science policy, research programmes, innovation frameworks, and technology development in Malaysia. MOSTI funds R&D through its agencies (SIRIM, MIMOS, Bioeconomy Corporation), runs national technology sandboxes, and publishes innovation publications relevant to startups and researchers.",
    services: [
      "Science and technology policy, research funding, and innovation frameworks",
      "National Technology & Innovation Sandbox (NTIS) programme management",
      "Oversight of SIRIM, MIMOS, Bioeconomy Corporation, and related agencies",
      "Publication of startup and innovation ecosystem updates and statistics",
      "Commercialisation grants and technology development support",
    ],
    whoFor: [
      "Deep tech founders, researchers, and university spin-offs seeking commercialisation support",
      "Biotech and life-sciences startups aligned with national science priorities",
      "Companies applying for the National Technology & Innovation Sandbox",
    ],
    howToEngage: [
      "Apply for MOSTI grants or sandbox access via mosti.gov.my",
      "Connect through MOSTI-linked agencies: SIRIM, MIMOS, or Bioeconomy Corporation",
    ],
    notes: [
      "NTIS (National Technology & Innovation Sandbox) is a key MOSTI initiative for startups",
      "Works closely with MRANTI on research-to-market commercialisation",
    ],
  },
  {
    name: "MyDIGITAL",
    type: "National Digital Agenda",
    overview:
      "MyDIGITAL is Malaysia's national digital economy agenda, outlining the country's strategic goals for digitisation, digital infrastructure, and positioning Malaysia as a regional digital hub by 2030. It is the overarching blueprint that coordinates digital initiatives across multiple ministries and agencies.",
    services: [
      "Strategic framework tracking Malaysia's digitalisation goals and KPIs",
      "Policy coordination across digital ministries, agencies, and GLCs",
      "Public access to the national digital transformation roadmap and updates",
      "Anchor for related initiatives: MyDIGITAL Corp, 5G rollout, digital talent agenda",
    ],
    whoFor: [
      "Companies and investors aligning business strategies with national digital priorities",
      "Policy researchers studying Malaysia's digital economy trajectory",
      "Ecosystem builders looking for government programme alignment opportunities",
    ],
    notes: [
      "MyDIGITAL is a blueprint, not a funding body — it coordinates rather than disburses grants",
      "Targets include making Malaysia a top-20 digital economy globally by 2030",
    ],
  },
  {
    name: "Ministry of Entrepreneur Development and Cooperatives (KUSKOP)",
    type: "Federal Ministry",
    overview:
      "The federal ministry responsible for entrepreneurship development, cooperatives, and small-business support in Malaysia. KUSKOP oversees agencies like TEKUN, PUNB, and cooperatives development, and coordinates national SME and entrepreneur policies targeting grassroots and community-level business growth.",
    services: [
      "National entrepreneurship policy and SME development coordination",
      "Oversight of TEKUN Nasional, PUNB, and cooperative development",
      "Entrepreneur training programmes, market access, and business support",
      "Bumiputera entrepreneur development and social enterprise support",
    ],
    whoFor: [
      "Micro-entrepreneurs and grassroots founders seeking government support",
      "SME owners navigating national business development programmes",
      "Cooperative and social enterprise founders",
    ],
    howToEngage: [
      "Access programmes via kuskop.gov.my or through TEKUN and PUNB",
    ],
  },
  {
    name: "Ministry of Investment, Trade and Industry (MITI)",
    type: "Federal Ministry",
    overview:
      "Malaysia's core federal ministry for industrial policy, trade development, and investor-facing national competitiveness. MITI oversees MIDA (investment promotion), MATRADE (export promotion), and plays a central role in shaping industrial development policy, FDI frameworks, and Malaysia's trade agreements.",
    services: [
      "National industrial policy and investment facilitation",
      "Oversight of MIDA and MATRADE — Malaysia's investment and trade arms",
      "Trade agreement coordination, tariff policy, and industrial incentive design",
      "Special economic zone and industrial zone policy",
    ],
    whoFor: [
      "Manufacturers, exporters, and companies seeking investment incentives",
      "Foreign investors looking for government engagement on market entry",
      "Companies in strategic sectors (EV, semiconductor, aerospace, high-tech manufacturing)",
    ],
    howToEngage: [
      "Engage through MIDA for investment approvals and incentives",
      "Contact MATRADE for export market development assistance",
    ],
    notes: [
      "MITI is the parent ministry of MIDA — Malaysia's primary investment authority",
    ],
  },
  {
    name: "Ministry of Higher Education (MOHE)",
    type: "Federal Ministry",
    overview:
      "The federal ministry overseeing Malaysia's public universities, graduate talent development, higher education policy, and research-linked innovation pathways. MOHE coordinates university entrepreneurship centres, graduate employability programmes, and research commercialisation initiatives across public institutions.",
    services: [
      "Public university governance, funding, and research policy",
      "Graduate talent development and employability programmes",
      "University-linked commercialisation and innovation centre coordination",
      "Research grant frameworks and higher education internationalisation",
    ],
    whoFor: [
      "University researchers and faculty seeking commercialisation pathways",
      "Student founders accessing university entrepreneurship programmes",
      "Companies looking for research partnerships with public universities",
    ],
  },
  {
    name: "Ministry of Finance (MOF)",
    type: "Federal Ministry",
    overview:
      "Malaysia's central fiscal ministry responsible for national budgets, public financing policy, and key government-linked investment structures. MOF is the parent body of Cradle Fund, MAVCAP, and other critical startup-ecosystem institutions — making it the ultimate source of government-backed startup capital in Malaysia.",
    services: [
      "National budget formulation and fiscal policy",
      "Oversight of Cradle Fund, MAVCAP, and government-linked investment vehicles",
      "Tax incentive policy design affecting startup and innovation investments",
      "GLICs and public finance coordination",
    ],
    whoFor: [
      "Founders and investors seeking to understand government-backed funding structures",
      "Policy researchers mapping Malaysia's fiscal support for the startup ecosystem",
    ],
    notes: [
      "MOF is the ultimate parent of Cradle Fund and MAVCAP — two of Malaysia's most important early-stage funding bodies",
      "Budget speeches are key signals for new startup and innovation incentives",
    ],
  },
  {
    name: "Majlis Amanah Rakyat (MARA)",
    type: "Federal Statutory Body",
    overview:
      "A major government statutory body focused on Bumiputera development across education, entrepreneurship, financing, and business capacity-building. MARA operates MARA University (UiTM), provides business loans, runs entrepreneur programmes, and has a dedicated entrepreneurship sector for SME and startup support.",
    services: [
      "Business financing and loans for Bumiputera entrepreneurs",
      "Entrepreneur development training, incubation, and mentorship",
      "Oversight of MyUsahawan portal and MASMED at UiTM",
      "MARA Industrial Skills Enhancement Programme (INSEP)",
      "Market access and business linkage support",
    ],
    whoFor: [
      "Bumiputera entrepreneurs and SME owners seeking financing and support",
      "Student founders at UiTM and MARA-affiliated institutions",
      "Businesses in halal economy, traditional industries, and SME segments",
    ],
    howToEngage: [
      "Apply for loans and programmes via mara.gov.my",
      "Access entrepreneur programmes through MARA district offices nationwide",
    ],
  },

  // ─── National startup, innovation, funding, and ecosystem bodies ─────────────
  {
    name: "MYStartup",
    type: "National Startup Portal",
    overview:
      "Malaysia's national single-window platform for the startup ecosystem. MYStartup serves as the official entry point for founders to register, discover government programmes, connect with investors and mentors, and access the national startup directory. Managed by Cradle Fund under the Ministry of Finance.",
    services: [
      "Startup registration and official recognition by the Malaysian government",
      "Directory of grants, programmes, and ecosystem resources for founders",
      "Investor and mentor matching platform",
      "Access to government-linked accelerators and support programmes",
      "National startup ecosystem data and tracking",
    ],
    whoFor: [
      "Malaysian founders registering their startups for government recognition and access to programmes",
      "Investors and mentors seeking to engage with the ecosystem",
      "Ecosystem builders and researchers tracking Malaysia's startup landscape",
    ],
    howToEngage: [
      "Register your startup at mystartup.gov.my — free and recommended for all Malaysian founders",
      "Browse the investor and programme directories to identify relevant support",
    ],
    notes: [
      "MYStartup registration is increasingly required for government-linked funding applications",
      "Managed by Cradle Fund on behalf of the Ministry of Finance",
    ],
  },
  {
    name: "Malaysia Digital Economy Corporation (MDEC)",
    type: "National Agency",
    overview:
      "Malaysia's main digital economy development agency and the custodian of the MSC Malaysia status programme. MDEC supports digital adoption, digital talent development, digital investment attraction, and the broader national digital economy agenda. For startups, MDEC is the key gateway to MSC status, PENJANA grants, and various digital ecosystem initiatives.",
    services: [
      "MSC Malaysia status — granting tax exemptions, IP protection, and hiring incentives",
      "Digital talent development via programmes like Digital Skills for Jobs and PADU",
      "PENJANA and digital economy grant management",
      "Digital investment facilitation and free-trade zone support",
      "Global tech company attraction and regional HQ programme coordination",
    ],
    whoFor: [
      "Tech startups and digital businesses seeking MSC Malaysia status and its incentives",
      "Companies building digital products looking for tax exemptions and talent hiring flexibility",
      "Foreign companies looking to establish Malaysian digital operations",
    ],
    howToEngage: [
      "Apply for MSC Malaysia status at mdec.my — key pathway for tech companies",
      "Explore MDEC's accelerator and tech ecosystem programmes for matching support",
    ],
    notes: [
      "MSC Malaysia status is one of the most valuable government incentives for tech startups",
      "MDEC coordinates closely with MITI and the Ministry of Digital",
    ],
  },
  {
    name: "Cradle Fund",
    type: "National Startup Funding Agency",
    overview:
      "Malaysia's flagship early-stage startup support agency, operating under the Ministry of Finance. Cradle Fund provides non-dilutive grants through its Cradle Investment Programme (CIP), manages the MYStartup national platform, and operates its venture capital arm (Cradle Seed Ventures / CSV) for equity investment in early-stage startups.",
    services: [
      "CIP (Cradle Investment Programme) — non-dilutive grants from RM150K to RM1.5M for tech startups",
      "Cradle Seed Ventures (CSV) — equity investment arm for Seed-stage startups",
      "Management of MYStartup national startup portal",
      "Mentorship, commercialisation guidance, and startup programme access",
      "Founder workshops, ecosystem events, and community building",
    ],
    whoFor: [
      "Malaysian tech founders at pre-seed and seed stage seeking non-dilutive funding",
      "Startups with validated prototypes or MVPs ready for commercialisation",
      "Companies aligned with ICT, deep tech, or digital economy mandates",
    ],
    howToEngage: [
      "Apply for CIP grants at cradle.com.my — multiple grant tracks available",
      "Enquire about CSV equity investment via info@cradle.com.my",
    ],
    notes: [
      "Cradle's CIP grants are non-dilutive — one of the most founder-friendly government instruments",
      "CSV is the equity arm that pairs with CIP for post-grant investment support",
      "Cradle also runs the national MYStartup portal on behalf of the government",
    ],
  },
  {
    name: "MRANTI",
    type: "National Commercialisation Agency",
    overview:
      "Malaysia Research Accelerator for Technology & Innovation — a government agency focused on moving research, prototypes, and innovations from the lab into market-ready products. MRANTI operates Malaysia's leading technology park (TPM), runs testbeds and sandboxes, and coordinates national commercialisation pathways for universities and research institutions.",
    services: [
      "Technology commercialisation support for research, IP, and prototypes",
      "Testbed and sandbox facilities at Taman Teknologi Malaysia (TPM)",
      "Research-to-market programmes for universities and research institutions",
      "MRANTI Technopreneur Programme for deep-tech founders",
      "National Technology & Innovation Sandbox (NTIS) co-management",
    ],
    whoFor: [
      "University researchers, scientists, and inventors commercialising IP or prototypes",
      "Deep tech and hardware startups needing testbed facilities",
      "R&D-intensive companies seeking government-linked commercialisation support",
    ],
    howToEngage: [
      "Apply for testbed access or commercialisation programmes at mranti.my",
      "Connect through the TPM ecosystem — Malaysia's largest technology park",
    ],
    notes: [
      "MRANTI was formed from the merger of MTDC and TPM in 2021",
      "TPM (Taman Teknologi Malaysia) in Bukit Jalil is MRANTI's physical hub",
    ],
  },
  {
    name: "Malaysia Technology Development Corporation (MTDC)",
    type: "Technology Commercialisation Agency",
    overview:
      "A technology commercialisation agency supporting the translation of research, IP, and innovation into investable businesses. MTDC provides technology transfer funding, advisory services, and commercialisation infrastructure. Note: MTDC's functions were largely merged into MRANTI in 2021, though MTDC continues to manage legacy programmes.",
    services: [
      "Technology commercialisation grants and advisory for research-stage IP",
      "Technology transfer funding and commercialisation pathways",
      "Incubation and venture development for research spin-offs",
    ],
    whoFor: [
      "University researchers and institutions with commercialisable research IP",
      "Founders building on government-funded research",
    ],
    notes: [
      "Much of MTDC's role has been absorbed into MRANTI following a 2021 merger",
      "Verify current programmes at mtdc.com.my before applying",
    ],
  },
  {
    name: "Malaysia Venture Capital Management Berhad (MAVCAP)",
    type: "Government Venture Capital",
    overview:
      "Malaysia's largest government-owned venture capital firm, wholly owned by the Ministry of Finance. MAVCAP invests directly in Malaysian tech startups and manages fund-of-funds programmes that back domestic and international VCs operating in Malaysia. It plays a critical national role in bridging the early-stage funding gap.",
    services: [
      "Direct equity investment in Malaysian ICT and tech startups (Seed to Series B)",
      "Fund-of-Funds programme backing domestic and international VCs in Malaysia",
      "Co-investment programme matching private sector investment dollar-for-dollar",
      "Active board participation and portfolio support post-investment",
    ],
    whoFor: [
      "Malaysian-incorporated tech startups at Seed to Series A stage",
      "VC fund managers looking for an anchor LP in Malaysia",
      "International VCs wanting to enter Malaysia with government-backed credibility",
    ],
    howToEngage: [
      "Apply via mavcap.com.my or email info@mavcap.com.my with a pitch deck",
      "Expect 3–6 months due diligence — prepare audited financials and IP documentation",
    ],
    notes: [
      "MAVCAP has invested in 70+ companies since 2001",
      "Also covered under the Malaysian VCs directory — see that page for investment details",
    ],
  },
  {
    name: "Malaysian Investment Development Authority (MIDA)",
    type: "National Investment Promotion Agency",
    overview:
      "Malaysia's primary government agency for attracting and facilitating domestic and foreign investment. MIDA coordinates investment incentives, approvals, and aftercare services for companies across manufacturing, services, and high-tech sectors. It is the first point of contact for most significant investment decisions in Malaysia.",
    services: [
      "Investment incentive approvals — Pioneer Status, Investment Tax Allowance, and more",
      "One-stop facilitation for manufacturing and services investment approvals",
      "Aftercare services and investor relations for established companies",
      "Investment facilitation for high-value sectors: EV, semiconductor, aerospace, digital",
      "Bilateral investment matchmaking and investor outreach",
    ],
    whoFor: [
      "Foreign companies establishing Malaysian operations or factories",
      "Domestic manufacturers seeking investment incentives and approvals",
      "High-tech companies in strategic sectors seeking Pioneer Status or ITA",
    ],
    howToEngage: [
      "Submit investment proposals via mida.gov.my — free consultation available",
      "Attend MIDA's global investment roadshows and industry forums",
    ],
    notes: [
      "MIDA is the key gateway for manufacturing and services investment in Malaysia",
      "Works under MITI — coordinate with both for large investment decisions",
    ],
  },
  {
    name: "Malaysian Communications and Multimedia Commission (MCMC)",
    type: "National Regulator",
    overview:
      "The regulator for Malaysia's communications and multimedia industry, including licensing of telcos, broadcasters, internet service providers, and digital platforms. MCMC oversees spectrum management, digital infrastructure, consumer protection in the digital space, and the Malaysian Communications and Multimedia Act (CMA).",
    services: [
      "Licensing for telcos, ISPs, broadcasters, and digital service providers",
      "Spectrum management and radio frequency allocation",
      "Consumer protection enforcement in the communications and multimedia sector",
      "Digital infrastructure policy and rural broadband programmes",
      "JENDELA — national broadband infrastructure initiative",
    ],
    whoFor: [
      "Telcos, ISPs, and digital service providers requiring MCMC licences",
      "Platform companies needing to understand Malaysian content and communications regulation",
      "Founders in the communications, media, or connectivity space",
    ],
    howToEngage: [
      "Apply for licences and permits at mcmc.gov.my",
      "Submit regulatory queries through the official enquiry channels",
    ],
  },
  {
    name: "CyberSecurity Malaysia",
    type: "National Cybersecurity Agency",
    overview:
      "Malaysia's national specialist cybersecurity agency, operating under MOSTI. CyberSecurity Malaysia provides incident response (MyCERT), digital forensics, cybersecurity certification, awareness programmes, and threat intelligence services. It is the go-to agency for cybersecurity incidents, certifications, and standards in Malaysia.",
    services: [
      "MyCERT — national computer emergency response team for cyber incident handling",
      "Digital forensics and cybercrime evidence support",
      "Cybersecurity certification and accreditation programmes",
      "MySEF — Malaysia Security Evaluation Facility for product security evaluation",
      "Cybersecurity awareness and training programmes for organisations",
    ],
    whoFor: [
      "Businesses experiencing cyberattacks or data breaches in Malaysia",
      "Tech companies seeking product security evaluation and certification",
      "Organisations building security compliance and awareness programmes",
    ],
    howToEngage: [
      "Report cyber incidents to MyCERT at cybersecurity.my or via +603-8008-7000",
      "Apply for security product evaluation through MySEF",
    ],
    notes: [
      "CyberSecurity Malaysia is distinct from NACSA (National Cyber Security Agency) — both operate in the cybersecurity space",
    ],
  },
  {
    name: "Securities Commission Malaysia",
    type: "Capital Markets Regulator",
    overview:
      "The national regulator for Malaysia's capital markets, including the stock exchange, equity crowdfunding (ECF), and peer-to-peer (P2P) financing platforms. The SC licenses and oversees ECF and P2P platforms — the two alternative fundraising routes most relevant to Malaysian startups and SMEs seeking non-bank capital.",
    services: [
      "Licensing and oversight of ECF platforms (e.g., Pitchin, Crowdo) and P2P lenders",
      "Capital markets regulation including IPO oversight and public market rules",
      "Investor protection, disclosure requirements, and market conduct enforcement",
      "Digital assets and cryptocurrency market regulation",
      "aSSET — alternative fundraising programme for SMEs",
    ],
    whoFor: [
      "Startups and SMEs raising via ECF (equity crowdfunding) or P2P platforms",
      "Companies planning public listings on Bursa Malaysia",
      "Digital asset businesses seeking regulatory clarity in Malaysia",
    ],
    howToEngage: [
      "Engage via licensed ECF or P2P platforms listed at sc.com.my",
      "For licensing or regulatory enquiries: sc.com.my/en/contact-us",
    ],
    notes: [
      "ECF is a key funding route for Malaysian startups — explore platforms like Pitchin and Crowdo",
      "SC regulates digital assets under the Capital Markets and Services Act",
    ],
  },
  {
    name: "Bank Negara Malaysia",
    type: "Central Bank",
    overview:
      "Malaysia's central bank, responsible for monetary stability, financial system regulation, and the development of the financial sector. For startups, Bank Negara is most relevant through its Financial Technology Enabler Group (FTEG), the regulatory sandbox (FinTech Regulatory Sandbox), and the digital bank licensing framework.",
    services: [
      "FinTech Regulatory Sandbox — allows fintech companies to test regulated services under relaxed rules",
      "Digital bank licensing framework (5 digital bank licences issued in 2022)",
      "Financial inclusion initiatives and e-payment ecosystem development",
      "Foreign exchange regulation affecting cross-border fintech businesses",
      "Financial sector development via BNM Funds and financial inclusion grants",
    ],
    whoFor: [
      "Fintech startups seeking sandbox access or regulatory guidance",
      "Companies building digital banking, insurance, or payments products",
      "Financial institutions and new entrants navigating BNM licensing",
    ],
    howToEngage: [
      "Apply for the FinTech Regulatory Sandbox at bnm.gov.my/fintech",
      "Submit regulatory enquiries through the FTEG (Financial Technology Enabler Group)",
    ],
    notes: [
      "BNM has been progressive in fintech regulation — the sandbox is actively used",
      "5 digital bank licences were awarded in 2022 to GXBank, Boost, RHB-led consortium, Sea Ltd consortium, and AEON consortium",
    ],
  },
  {
    name: "Malaysia Productivity Corporation (MPC)",
    type: "National Productivity Agency",
    overview:
      "A national agency focused on productivity improvement, operational efficiency, and competitiveness enhancement across Malaysian industries and the public sector. MPC provides consulting, training, and benchmarking services aligned with international best practices.",
    services: [
      "Productivity consulting and process improvement advisory for businesses",
      "Malaysia Productivity Blueprint and SME competitiveness programmes",
      "Industry benchmarking, lean manufacturing, and quality management programmes",
      "Productivity-linked incentives and certification",
    ],
    whoFor: [
      "Manufacturing and services companies seeking operational improvement",
      "SMEs looking to enhance efficiency and competitiveness",
      "Companies benchmarking against international productivity standards",
    ],
    howToEngage: ["Contact MPC at mpc.gov.my for consulting and training programmes"],
  },
  {
    name: "Malaysian Industry-Government Group for High Technology (MIGHT)",
    type: "Strategic High-Tech Platform",
    overview:
      "A strategic platform linking government, industry, and research to accelerate Malaysia's technology capability in high-technology sectors. MIGHT coordinates national positions in advanced manufacturing, aerospace, defence, smart agriculture, and emerging technologies, bridging between policy and industry execution.",
    services: [
      "High-tech industry-government dialogue and strategic alignment",
      "MIGHT Orbit — startup and innovation engagement platform",
      "Research and development policy coordination for strategic sectors",
      "Space technology and aerospace industry facilitation",
      "Capacity-building in strategic and emerging technologies",
    ],
    whoFor: [
      "Companies in aerospace, defence, advanced manufacturing, and smart agriculture",
      "Deep tech startups seeking government-industry alignment and support",
      "Research institutions working on strategic national technology priorities",
    ],
    howToEngage: [
      "Engage via might.org.my — explore MIGHT Orbit for startup engagement",
    ],
  },
  {
    name: "SIRIM Berhad",
    type: "National Standards & R&D Body",
    overview:
      "Malaysia's national standards, testing, certification, and industrial research body. SIRIM develops Malaysian standards (MS standards), tests and certifies products for market compliance, conducts applied R&D, and provides technology transfer services — critical for manufacturers, hardware companies, and regulated product developers.",
    services: [
      "Development of Malaysian Standards (MS) and adoption of international standards",
      "Product testing, inspection, and certification for regulatory compliance",
      "Applied industrial research and technology development",
      "Technology transfer and licensing to Malaysian industry",
      "Metrology — calibration and measurement services",
    ],
    whoFor: [
      "Hardware manufacturers and IoT companies needing product certification",
      "Companies launching regulated products requiring compliance testing",
      "Businesses seeking technology licensing from SIRIM's R&D portfolio",
    ],
    howToEngage: [
      "Submit certification and testing requests at sirim.my",
      "Contact SIRIM QAS International for product certification services",
    ],
  },
  {
    name: "MIMOS Berhad",
    type: "National ICT R&D Centre",
    overview:
      "Malaysia's national applied ICT research and development centre, operating under MOSTI. MIMOS conducts strategic research in AI, cybersecurity, microelectronics, and digital platforms — and makes its technology available for industry licensing and commercialisation. It is Malaysia's primary government ICT research lab.",
    services: [
      "Applied R&D in AI, machine learning, cybersecurity, and embedded systems",
      "Technology licensing — MIMOS patents and platforms available to industry",
      "Microelectronics design and chip development research",
      "MIMOS TechMart — technology transfer marketplace for MIMOS innovations",
      "Collaborative research programmes with universities and private sector",
    ],
    whoFor: [
      "Tech companies seeking to license government-developed IP and platforms",
      "Semiconductor and embedded systems startups in Malaysia",
      "Research institutions looking for collaborative government R&D partnerships",
    ],
    howToEngage: ["Contact via mimos.my to explore technology licensing or research collaboration"],
  },
  {
    name: "Bioeconomy Corporation",
    type: "National Bioeconomy Agency",
    overview:
      "The government-linked agency catalysing Malaysia's bioeconomy, covering biotech, agri-biotech, and life sciences commercialisation. Bioeconomy Corporation supports the translation of biological research into businesses, provides funding pathways, and coordinates Malaysia's bioeconomy transformation agenda under MOSTI.",
    services: [
      "Bioeconomy development grants and commercialisation funding",
      "Biotech company incubation and venture development support",
      "Halal biotech and agri-biotech commercialisation programmes",
      "Malaysia Bioeconomy Development Alliance (BDA) coordination",
      "Market access and international biotech partnership facilitation",
    ],
    whoFor: [
      "Biotech, agri-biotech, and life sciences startups seeking commercialisation support",
      "Research institutions working on biological R&D looking for market pathways",
      "Companies in food technology, pharmaceutical, and natural products",
    ],
    howToEngage: [
      "Apply for grants and programmes at bioeconomycorporation.my",
    ],
    notes: [
      "Works closely with MOSTI and Xeraya Capital in the Malaysian bioeconomy ecosystem",
    ],
  },
  {
    name: "Government Innovation Initiative (MyInovasi)",
    type: "Public Innovation Initiative",
    overview:
      "Malaysia's government innovation initiative for promoting public-sector innovation, ideas, and experimentation. MyInovasi creates a structured channel for civil servants and public institutions to surface and implement innovative ideas across government services.",
    services: [
      "Platform for public-sector innovation idea submission and review",
      "Recognition and awards for government innovation initiatives",
      "Knowledge sharing on public-sector best practices and innovation",
    ],
    whoFor: [
      "Civil servants and public institutions innovating within government",
      "GovTech companies interested in public-sector innovation culture",
    ],
    notes: [
      "Less relevant for private sector startups — primarily a government-internal innovation tool",
    ],
  },
  {
    name: "National Technology & Innovation Sandbox (NTIS)",
    type: "National Sandbox Programme",
    overview:
      "Malaysia's national sandbox programme allowing startups and innovators to test new technologies, products, and services in real-world environments under more flexible regulatory conditions. NTIS coordinates across ministries to provide regulatory relief for novel technologies that don't fit existing frameworks.",
    services: [
      "Regulatory sandbox access for novel technologies (AI, biotech, fintech, agritech, transport)",
      "Cross-ministry regulatory coordination for multi-sector innovations",
      "Time-limited testing environments with relaxed licensing requirements",
      "Government agency matchmaking for sandbox participants",
    ],
    whoFor: [
      "Startups with innovative products that face regulatory uncertainty or barriers",
      "Companies in AI, autonomous vehicles, biotech, agritech, and other frontier sectors",
      "Established businesses testing novel use cases outside existing regulatory frameworks",
    ],
    howToEngage: [
      "Apply via MOSTI or MRANTI — NTIS is coordinated through multiple lead agencies",
      "Identify the relevant sector regulator and apply for sandbox participation",
    ],
    notes: [
      "NTIS is managed jointly by MOSTI and MRANTI — contact either for guidance",
      "Separate from BNM's fintech sandbox — NTIS covers broader technology sectors",
    ],
  },
  {
    name: "Medical Device Authority (MDA)",
    type: "Medical Device Regulator",
    overview:
      "The Malaysian medical device regulator responsible for product registration, post-market surveillance, and market access oversight for medical devices in Malaysia. MDA implements the Medical Device Act 2012 and is essential for any healthtech or medtech company launching regulated products in Malaysia.",
    services: [
      "Medical device product registration (Class A–D) under the Medical Device Act",
      "Establishment licence for manufacturers, distributors, and importers",
      "Post-market surveillance and product compliance enforcement",
      "Guidance on clinical performance and safety testing requirements",
    ],
    whoFor: [
      "Medtech, healthtech, and diagnostic startups launching regulated devices",
      "Manufacturers and importers of medical devices in Malaysia",
      "Companies developing AI-based diagnostic or clinical tools requiring regulatory clearance",
    ],
    howToEngage: [
      "Submit device registration applications at mda.gov.my",
      "Engage early in development — MDA pre-submission meetings are available",
    ],
    notes: [
      "Medical device registration is mandatory before commercial sale in Malaysia",
      "Software as a Medical Device (SaMD) regulation is an evolving area — consult MDA early",
    ],
  },
  {
    name: "Malaysia External Trade Development Corporation (MATRADE)",
    type: "National Export Promotion Agency",
    overview:
      "Malaysia's national export promotion agency, helping Malaysian companies access international markets through trade missions, market intelligence, buyer-seller matchmaking, and export development grants. MATRADE operates an extensive global network of trade centres in major markets.",
    services: [
      "Export development grants for Malaysian SMEs entering new markets",
      "Trade missions and overseas market access programmes",
      "Market intelligence and trade information services",
      "Buyer-seller matchmaking and virtual trade meeting platforms",
      "Halal and services export promotion",
    ],
    whoFor: [
      "Malaysian SMEs and startups looking to export products or services internationally",
      "Companies in manufacturing, digital services, food, and halal sectors targeting global markets",
      "Businesses seeking trade finance and export readiness support",
    ],
    howToEngage: [
      "Register at matrade.gov.my to access programmes and export grants",
      "Apply for the Market Development Grant (MDG) via MATRADE's portal",
    ],
  },
  {
    name: "TERAJU",
    type: "Bumiputera Economic Empowerment Agency",
    overview:
      "A strategic agency focused on Bumiputera economic empowerment, business growth, and high-impact entrepreneurship development. TERAJU coordinates Bumiputera participation in high-value sectors and manages the Bumiputera transformation agenda alongside GLCs and government agencies.",
    services: [
      "High-impact Bumiputera entrepreneur development programmes",
      "Strategic Bumiputera business facilitation in priority sectors",
      "TERAJU Grant and funding facilitation for qualified businesses",
      "GLC and government agency linkage for Bumiputera businesses",
    ],
    whoFor: [
      "Bumiputera entrepreneurs in high-value and strategic industries",
      "Bumiputera-owned companies seeking government linkages and growth capital",
    ],
    howToEngage: [
      "Apply via teraju.gov.my for grants and programmes",
    ],
  },
  {
    name: "TEKUN Nasional",
    type: "Microfinancing Institution",
    overview:
      "Malaysia's national microfinancing and entrepreneurship support institution, providing small business loans and support to micro-entrepreneurs and grassroots businesspeople. TEKUN focuses on the bottom of the pyramid — making financing accessible for very small businesses and first-time entrepreneurs.",
    services: [
      "Micro and small business loans (RM1,000–RM100,000 range)",
      "Business development support and entrepreneur training",
      "Special financing programmes for youth, women, and Bumiputera entrepreneurs",
      "Food business and hawker financing schemes",
    ],
    whoFor: [
      "Micro-entrepreneurs and hawkers seeking their first business loan",
      "Small business owners who cannot access traditional bank financing",
      "Youth and women entrepreneurs starting grassroots businesses",
    ],
    howToEngage: [
      "Apply at any TEKUN branch nationwide or via tekun.gov.my",
    ],
    notes: [
      "TEKUN is not relevant for tech startups — it serves grassroots micro-businesses",
    ],
  },
  {
    name: "PUNB",
    type: "Bumiputera Business Development Agency",
    overview:
      "A government-linked business development and financing agency that supports Bumiputera entrepreneurs through capital, business development advisory, and retail franchise management. PUNB focuses on building commercially viable Bumiputera enterprises in retail, services, and light manufacturing.",
    services: [
      "Business loans and financing for Bumiputera entrepreneurs",
      "Franchise development and retail business support",
      "Business advisory and entrepreneurship capacity building",
      "SME development and market access facilitation",
    ],
    whoFor: [
      "Bumiputera entrepreneurs in retail, services, and light manufacturing",
      "Franchise operators and retail business owners seeking PUNB support",
    ],
    howToEngage: ["Contact via punb.com.my for programmes and financing applications"],
  },
  {
    name: "SME Corp Malaysia",
    type: "National SME Policy Body",
    overview:
      "The central coordinating agency for Malaysia's SME development agenda. SME Corp formulates, coordinates, and monitors SME policies across all ministries — making it the single reference point for the national SME support landscape. It also manages SME-facing grant programmes and coordinates the annual SME Annual Report.",
    services: [
      "SME policy coordination across all federal ministries and agencies",
      "SME-related grants and incentive programme management",
      "Business advisory and SME registration/certification",
      "SME Go — national SME support portal and programme directory",
      "SCORE — SME competitiveness rating and enhancement programme",
    ],
    whoFor: [
      "SME owners and founders navigating Malaysia's SME support landscape",
      "Businesses seeking SME status recognition and related incentives",
      "Companies looking for coordinated access to multiple government support programmes",
    ],
    howToEngage: [
      "Register and explore programmes at smecorp.gov.my or SME Go portal",
    ],
    notes: [
      "SME Corp is a coordinating body — it connects SMEs to the right programme rather than funding directly in all cases",
    ],
  },
  {
    name: "SME Bank Malaysia",
    type: "Development Bank",
    overview:
      "A government development financial institution focused on SME growth financing. SME Bank provides business loans, working capital, trade finance, and venture financing specifically designed for Malaysia's SME segment — complementing commercial banks with more accessible and development-oriented credit products.",
    services: [
      "Business term loans and project financing for SMEs",
      "Working capital and trade finance facilities",
      "Entrepreneur development loans and SME growth financing",
      "Special relief and emergency financing for SMEs during economic stress",
      "Advisory and capacity building for SME financial management",
    ],
    whoFor: [
      "Established SMEs seeking business expansion financing",
      "Growing companies that need development-oriented financing beyond commercial bank offerings",
      "Entrepreneurs needing structured loan products with SME-friendly terms",
    ],
    howToEngage: [
      "Apply for financing via smebank.com.my or any SME Bank branch",
    ],
  },
  {
    name: "MARA Entrepreneurship Sector",
    type: "Entrepreneurship Development Body",
    overview:
      "MARA's dedicated entrepreneurship arm, providing training, financing, and business development support specifically for Bumiputera entrepreneurs. The sector runs structured entrepreneur development programmes, coordinates business loans, and manages retail and franchise incubation.",
    services: [
      "Entrepreneur development training and incubation programmes",
      "MARA business loans and financing for Bumiputera founders",
      "Retail, franchise, and food business development support",
      "Market access and business linkage coordination",
    ],
    whoFor: [
      "Bumiputera entrepreneurs seeking structured business development support",
      "Founders accessing MARA's entrepreneurship and financing pathways",
    ],
    howToEngage: ["Apply through mara.gov.my or local MARA district offices"],
  },
  {
    name: "MyUsahawan (MARA)",
    type: "Entrepreneur Portal",
    overview:
      "MARA's entrepreneur-facing portal providing a centralised digital access point for MARA's business development programmes, support resources, and entrepreneurship-related services for Bumiputera founders and SME owners.",
    services: [
      "Digital portal for MARA entrepreneur programme access and registration",
      "Business resource directory and programme listings",
      "Online application for MARA loans and support initiatives",
    ],
    whoFor: [
      "Bumiputera entrepreneurs accessing MARA's digital services and programmes",
    ],
    howToEngage: ["Access via the MyUsahawan portal linked from mara.gov.my"],
  },

  // ─── State, regional, corridor, and investment agencies ─────────────────────
  {
    name: "InvestKL",
    type: "City Investment Promotion Agency",
    overview:
      "InvestKL is Malaysia's dedicated agency for attracting global multinationals and fast-growing tech companies to establish their regional headquarters or principal hubs in Greater Kuala Lumpur. It provides bespoke facilitation, talent support, and incentive coordination for qualified companies.",
    services: [
      "Regional HQ and principal hub attraction for MNCs and global tech companies",
      "Bespoke investment facilitation — dedicated account manager for each investor",
      "Principal Hub Incentive coordination (attractive tax rates for qualifying companies)",
      "Talent sourcing, work permit facilitation, and expatriate services",
      "Land, real estate, and office space advisory for incoming investors",
    ],
    whoFor: [
      "Global MNCs looking to establish APAC or SEA regional headquarters in KL",
      "Tech companies seeking to centralise operations in a cost-competitive ASEAN hub",
      "Investors attracted by KL's connectivity, talent pool, and government support",
    ],
    howToEngage: [
      "Contact InvestKL at investkl.gov.my — dedicated relationship managers for qualified investors",
    ],
    notes: [
      "InvestKL is specifically focused on Greater KL — not for state-based investment queries",
    ],
  },
  {
    name: "InvestPenang",
    type: "State Investment Promotion Agency",
    overview:
      "Penang's state investment promotion agency, connecting investors to the state's world-class manufacturing ecosystem, technology parks, and business opportunities. Penang is Malaysia's most industrialised state and a global hub for semiconductor, electronics, and advanced manufacturing.",
    services: [
      "Investment facilitation for manufacturing, services, and high-tech sectors in Penang",
      "Site selection, industrial land, and technology park coordination",
      "Investor aftercare and business expansion support",
      "Penang Global Connect — international investor outreach",
    ],
    whoFor: [
      "Electronics, semiconductor, and advanced manufacturing investors",
      "Tech services companies establishing Penang operations",
      "Foreign investors considering Penang as an ASEAN production base",
    ],
    howToEngage: ["Contact InvestPenang at investpenang.gov.my"],
  },
  {
    name: "Invest Selangor",
    type: "State Investment Promotion Agency",
    overview:
      "Selangor's state investment promotion agency, helping businesses expand or set up operations in Malaysia's most economically productive state. Selangor hosts the largest concentration of industrial areas, logistics hubs, and technology parks in Malaysia.",
    services: [
      "Investment facilitation for manufacturing, logistics, and services in Selangor",
      "Industrial area, technology park, and site selection advisory",
      "State incentive and business registration coordination",
    ],
    whoFor: [
      "Companies targeting Selangor for manufacturing, logistics, or services expansion",
      "Investors seeking accessible proximity to KL with competitive industrial costs",
    ],
    howToEngage: ["Contact via investselangor.com.my"],
  },
  {
    name: "Invest Johor",
    type: "State Investment Promotion Agency",
    overview:
      "Johor's investment promotion body supporting investment attraction and regional economic growth, with a focus on the booming Forest City, Iskandar Malaysia, and the rapidly developing Singapore-Malaysia special economic zone (SEZ) region.",
    services: [
      "Investment facilitation for Johor's industrial zones and business parks",
      "Iskandar Malaysia development zone promotion",
      "Cross-border Singapore-Malaysia investment coordination",
    ],
    whoFor: [
      "Companies targeting Johor's proximity to Singapore for regional operations",
      "Manufacturers and logistics companies seeking Iskandar zone access",
    ],
    howToEngage: ["Contact via investjohor.com"],
  },
  {
    name: "InvestPerak",
    type: "State Investment Promotion Agency",
    overview:
      "Perak's state investment promotion agency, facilitating business establishment, industrial development, and new investment entry in a state with growing competitiveness in manufacturing, agribusiness, and tourism.",
    services: [
      "Investment facilitation for manufacturing and agribusiness in Perak",
      "Industrial land and business zone advisory",
      "State incentive coordination for new investors",
    ],
    whoFor: [
      "Manufacturers and agribusinesses considering Perak as a cost-effective production base",
    ],
    howToEngage: ["Contact via investperak.gov.my"],
  },
  {
    name: "InvestSarawak",
    type: "State Investment Promotion Agency",
    overview:
      "Sarawak's investment promotion platform for investors exploring the state's significant business opportunities across energy, digital economy, manufacturing, and tourism — boosted by Sarawak's ambitious digital economy and green hydrogen agenda.",
    services: [
      "Investment facilitation for Sarawak's energy, digital, and manufacturing sectors",
      "Green hydrogen and renewable energy project coordination",
      "Special economic zone and business park advisory in Sarawak",
    ],
    whoFor: [
      "Energy and green tech companies seeking large-scale project opportunities",
      "Digital economy companies aligned with Sarawak's PADU digital agenda",
    ],
    howToEngage: ["Contact via investsarawak.com.my"],
  },
  {
    name: "Invest Sabah",
    type: "State Investment Promotion Agency",
    overview:
      "Sabah's state investment agency, helping investors navigate the state's business opportunities across tourism, agribusiness, fisheries, and emerging manufacturing sectors in East Malaysia.",
    services: [
      "Investment facilitation for Sabah's key sectors: tourism, agriculture, fisheries",
      "Business registration and site selection support for Sabah-based operations",
    ],
    whoFor: [
      "Agribusiness, tourism, and fisheries investors considering Sabah",
      "Companies targeting East Malaysia for resources and market access",
    ],
    howToEngage: ["Contact via investsabah.com.my"],
  },
  {
    name: "Sabah Economic Development and Investment Authority (SEDIA)",
    type: "State Development Authority",
    overview:
      "The development and investment authority for Sabah, focused on economic growth, special zones, and coordinating major investment and infrastructure development across the state. SEDIA oversees the Sabah Special Economic Zone and major catalytic projects.",
    services: [
      "Sabah Special Economic Zone facilitation and investment coordination",
      "Major infrastructure and development project oversight",
      "Investment attraction for large-scale catalytic projects in Sabah",
    ],
    whoFor: [
      "Large-scale investors targeting Sabah's special economic zones",
      "Infrastructure and logistics companies considering East Malaysia presence",
    ],
    howToEngage: ["Contact via sedia.com.my"],
  },
  {
    name: "East Coast Economic Region Development Council (ECERDC)",
    type: "Regional Development Council",
    overview:
      "The development council for Malaysia's East Coast Economic Region (ECER), covering Kelantan, Terengganu, Pahang, and Mersing in Johor. ECERDC coordinates investment attraction, infrastructure development, and economic corridor growth in an economically developing region rich in energy and agricultural resources.",
    services: [
      "ECER investment facilitation for manufacturing, tourism, and agribusiness",
      "Special economic zones and business park development in ECER states",
      "Infrastructure development coordination and corridor project oversight",
    ],
    whoFor: [
      "Investors targeting ECER states for cost-competitive manufacturing or agribusiness",
      "Tourism and hospitality companies in East Coast Malaysia",
    ],
    howToEngage: ["Contact via ecerdc.com.my"],
  },
  {
    name: "Northern Corridor Economic Region (NCER Malaysia)",
    type: "Regional Development Authority",
    overview:
      "The corridor authority driving development and investment across Malaysia's northern economic region, covering Perlis, Kedah, Penang, and Northern Perak. NCER focuses on high-tech manufacturing, agrobusiness, and logistics leveraging the northern states' strategic geographic position.",
    services: [
      "Northern region investment facilitation and project coordination",
      "Agrobusiness and food processing sector development",
      "Northern corridor infrastructure and logistics corridor development",
    ],
    whoFor: [
      "Investors targeting northern Malaysia's manufacturing and agribusiness sectors",
      "Companies seeking to leverage northern corridor logistics and connectivity",
    ],
    howToEngage: ["Contact via ncer.com.my"],
  },
  {
    name: "Iskandar Regional Development Authority (IRDA)",
    type: "Corridor Development Authority",
    overview:
      "The authority overseeing the Iskandar Malaysia development corridor in southern Johor — one of Malaysia's most ambitious economic development zones and a major Singapore-adjacent investment destination. IRDA coordinates planning, investment, and development across Iskandar Malaysia's five flagship zones.",
    services: [
      "Iskandar Malaysia investment facilitation and flagship zone coordination",
      "Urban and regional planning for the Johor Bahru metropolitan region",
      "Singapore-Malaysia cross-border investment and business facilitation",
      "Medini Iskandar — special zone with specific incentives for qualifying businesses",
    ],
    whoFor: [
      "Investors attracted by Singapore-adjacent location and Iskandar's development ecosystem",
      "Tech and creative economy companies targeting Medini or Iskandar's flagships",
    ],
    howToEngage: ["Contact via irda.com.my or through Invest Johor"],
  },
  {
    name: "Ministry of International Trade and Industry, Sarawak (MINTRED)",
    type: "State Trade and Industry Ministry",
    overview:
      "Sarawak's dedicated state ministry for international trade and industry, supporting business development, investment attraction, and trade facilitation with a state-level mandate aligned with Sarawak's Post COVID-19 Development Strategy (PCDS 2030).",
    services: [
      "Sarawak trade and industry policy and business development support",
      "Investment facilitation aligned with PCDS 2030 strategy",
      "State-level trade promotion and industry development",
    ],
    whoFor: [
      "Businesses targeting Sarawak's growing industrial and trade sectors",
      "Companies aligned with Sarawak's digital economy and green energy agenda",
    ],
    howToEngage: ["Contact via mintred.sarawak.gov.my"],
  },
  {
    name: "Sarawak Digital Economy Corporation (SDEC)",
    type: "State Digital Economy Agency",
    overview:
      "Sarawak's digital economy catalyst driving digital transformation, tech infrastructure, and startup ecosystem growth across the state. SDEC supports Sarawak's ambitious PADU digital agenda and has developed Sarawak as a surprisingly active digital economy hub with its own digital talent, connectivity, and startup support programmes.",
    services: [
      "Digital economy policy and infrastructure development for Sarawak",
      "Sarawak startup ecosystem support and incubation",
      "Digital talent development and digital literacy programmes",
      "Digital connectivity infrastructure including undersea cable projects",
      "SARAWAK DIGITAL — state digital economy brand and programme coordination",
    ],
    whoFor: [
      "Tech startups and digital companies looking to establish Sarawak presence",
      "Companies seeking East Malaysia digital market access and support",
      "Digital talent and entrepreneurs based in or relocating to Sarawak",
    ],
    howToEngage: ["Contact via sdec.com.my or explore SARAWAK DIGITAL programmes"],
    notes: [
      "Sarawak has been punching above its weight in digital economy development",
    ],
  },
  {
    name: "Invest Pahang / PKNP one-stop investment portal",
    type: "State Investment Portal",
    overview:
      "Pahang's investment entry point operated by PKNP (Pahang State Development Corporation), facilitating business setup, approvals, and investment facilitation for companies looking to establish operations in Pahang — a resource-rich state with growing tourism and agribusiness sectors.",
    services: [
      "One-stop investment facilitation for Pahang-based businesses",
      "Industrial land and development zone advisory",
      "Business licensing and approvals coordination",
    ],
    whoFor: [
      "Investors considering Pahang for manufacturing, agribusiness, or tourism projects",
    ],
    howToEngage: ["Contact via pknp.com.my"],
  },

  // ─── Public university centres ───────────────────────────────────────────────
  {
    name: "UPM Centre of Entrepreneurial Development and Graduate Marketability (CEM)",
    type: "University Entrepreneurship Centre",
    overview:
      "Universiti Putra Malaysia's centre for student entrepreneurship development and graduate marketability. CEM supports UPM student founders through training, incubation, and startup support, while also developing graduate employability and enterprise skills.",
    services: [
      "Student startup incubation and entrepreneurship training at UPM",
      "Graduate employability and enterprise skills development",
      "Access to UPM's research base for student commercialisation projects",
    ],
    whoFor: [
      "UPM students and graduates exploring entrepreneurship and startup building",
      "Researchers at UPM seeking student co-founder or commercialisation pathways",
    ],
    howToEngage: ["Contact via upm.edu.my — find CEM through the student affairs portal"],
  },
  {
    name: "University of Malaya Centre of Innovation and Enterprise (UM CIE)",
    type: "University Innovation Centre",
    overview:
      "The University of Malaya's innovation and enterprise office, driving technology commercialisation, IP management, industry partnerships, and startup incubation. UM CIE is one of Malaysia's most active university commercialisation centres given UM's research strength.",
    services: [
      "IP management and patent support for UM researchers",
      "Technology commercialisation and startup incubation",
      "Industry-university partnership and collaborative research facilitation",
      "Access to UM's research labs and facilities for startups",
    ],
    whoFor: [
      "UM researchers and academics commercialising research and IP",
      "Student founders accessing UM's incubation and innovation resources",
      "Industry partners seeking UM research collaboration",
    ],
    howToEngage: ["Contact via um.edu.my — access CIE through the research and innovation portal"],
  },
  {
    name: "Universiti Teknologi Malaysia Innovation and Commercialisation Centre (ICC)",
    type: "University Commercialisation Centre",
    overview:
      "UTM's innovation and commercialisation hub supporting research-to-market initiatives, IP management, and startup incubation. UTM ICC is particularly active given UTM's strong engineering and technology research base.",
    services: [
      "Research commercialisation and IP licensing support",
      "Startup incubation and venture creation from UTM research",
      "Industry partnership and technology transfer facilitation",
      "UTM technopreneur programmes and startup competitions",
    ],
    whoFor: [
      "UTM researchers and engineering faculty commercialising technology",
      "Engineering and tech student founders at UTM",
      "Companies seeking UTM technology licensing or R&D partnerships",
    ],
    howToEngage: ["Contact via utm.my — find ICC through the research management division"],
  },
  {
    name: "UMPSA Entrepreneurship Centre",
    type: "University Entrepreneurship Centre",
    overview:
      "UMPSA (Universiti Malaysia Pahang Al-Sultan Abdullah)'s entrepreneurship centre supporting student founders, innovation programmes, and startup guidance within the university ecosystem.",
    services: [
      "Student entrepreneur development and startup support programmes",
      "Innovation competitions and idea development support",
      "Access to UMPSA's research and facilities for student ventures",
    ],
    whoFor: [
      "UMPSA students and graduates exploring entrepreneurship",
    ],
    howToEngage: ["Contact via umpsa.edu.my"],
  },
  {
    name: "UiTM Malaysian Academy of SME & Entrepreneurship Development (MASMED)",
    type: "University SME Development Academy",
    overview:
      "UiTM's dedicated academy for SME and entrepreneurship development, combining academic entrepreneurship programmes with community outreach and business support. MASMED serves a large Bumiputera student population and extends support to the broader SME community.",
    services: [
      "Entrepreneurship education and SME development programmes",
      "Community business development and outreach initiatives",
      "Student startup support and entrepreneurship competitions",
      "SME advisory and capacity building for surrounding communities",
    ],
    whoFor: [
      "UiTM students exploring business and entrepreneurship pathways",
      "SME owners in communities surrounding UiTM campuses",
    ],
    howToEngage: ["Contact via uitm.edu.my — find MASMED through the entrepreneurship faculty"],
  },

  // ─── Other useful public-sector portals ─────────────────────────────────────
  {
    name: "MyGovernment business / public-service portal",
    type: "Government Business Services Portal",
    overview:
      "A public-service portal that directs businesses and citizens to the relevant government services, online forms, and agencies across Malaysia's government ecosystem. Primarily a directory and navigation tool rather than a transactional platform.",
    services: [
      "Directory of government services relevant to businesses",
      "Links to business registration, licensing, and regulatory portals",
      "Navigation to relevant ministry and agency portals",
    ],
    whoFor: [
      "Businesses navigating Malaysian government services for the first time",
      "Founders mapping the regulatory landscape for business compliance",
    ],
    howToEngage: ["Browse via malaysia.gov.my/portal/content/business"],
  },
  {
    name: "Ministry of Digital announcements / startup ecosystem updates",
    type: "Government Announcement Channel",
    overview:
      "The Ministry of Digital's news, announcements, and ecosystem update channel — a useful source for tracking digital policy changes, ecosystem grants, and government initiative launches relevant to the tech and startup community.",
    services: [
      "Official announcements on digital policy, grants, and programmes",
      "Ecosystem news and initiative launch updates",
      "Policy consultation notices and stakeholder engagement opportunities",
    ],
    whoFor: [
      "Ecosystem builders and founders tracking Malaysian government digital policy",
      "Journalists and researchers covering Malaysia's digital economy",
    ],
    howToEngage: ["Follow via digital.gov.my/en/news or official social media channels"],
  },
  {
    name: "MOSTI startup and innovation publications",
    type: "Government Knowledge Resource",
    overview:
      "MOSTI's publication and innovation update portal, covering science and technology research publications, startup ecosystem announcements, and innovation programme updates relevant to deep tech founders and researchers.",
    services: [
      "Science and technology research publications and reports",
      "Innovation programme announcements and updates",
      "Grant and funding opportunity listings from MOSTI agencies",
    ],
    whoFor: [
      "Deep tech founders and researchers tracking MOSTI programmes",
      "Academic institutions engaging with MOSTI's research agenda",
    ],
    howToEngage: ["Access via mosti.gov.my/en/news"],
  },
  {
    name: "MIDA media release and ecosystem news",
    type: "Government News Channel",
    overview:
      "MIDA's media and news platform for investment announcements, industry updates, and business policy communications — useful for tracking Malaysia's investment environment, new incentive packages, and major investment wins.",
    services: [
      "Investment announcement and FDI attraction news",
      "Industry and sector-specific ecosystem updates",
      "Policy changes and incentive updates relevant to investors",
    ],
    whoFor: [
      "Investors and businesses tracking Malaysia's investment climate",
      "Researchers monitoring FDI flows and industrial development",
    ],
    howToEngage: ["Browse via mida.gov.my/media"],
  },
  {
    name: "MyStartup ecosystem directory and registration",
    type: "Startup Registration Portal",
    overview:
      "The MYStartup platform's directory and startup registration entry point — the official process for Malaysian startups to register their company in the national startup ecosystem, gain recognition, and unlock access to government programmes and support.",
    services: [
      "Official startup registration with the Malaysian government",
      "Ecosystem directory for discovery and investor matching",
      "Gateway to government-linked accelerators and programme access",
    ],
    whoFor: [
      "Malaysian founders registering their startups for official recognition and programme access",
    ],
    howToEngage: ["Register at mystartup.gov.my — free and strongly recommended for all founders"],
    notes: [
      "This entry is the registration pathway of MYStartup — see also the main MYStartup entry above",
    ],
  },
];

export const AGENCY_DETAIL_MAP = new Map<string, AgencyDetail>(
  AGENCIES.map((a) => [a.name.toLowerCase(), a])
);

export function getAgencyDetail(name: string): AgencyDetail | undefined {
  return AGENCY_DETAIL_MAP.get(name.toLowerCase());
}
