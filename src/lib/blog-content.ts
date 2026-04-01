import slugify from "slugify";

export interface BlogPostRecord {
  id: string;
  title: string;
  content: string;
  slug: string;
  author: string;
  date: string;
  readingTime: number;
  category: string;
  excerpt: string;
}

interface BlogSeedInput {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  author?: string;
}

const estimateReadingTime = (content: string) =>
  Math.max(1, Math.ceil(content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 200));

const createSeedPost = ({
  title,
  category,
  date,
  excerpt,
  content,
  author = "JM Group",
}: BlogSeedInput): BlogPostRecord => {
  const slug = slugify(title, { lower: true, strict: true });
  return {
    id: `seed-${slug}`,
    title,
    slug,
    content,
    author,
    date,
    readingTime: estimateReadingTime(content),
    category,
    excerpt,
  };
};

export const SEEDED_BLOG_POSTS: BlogPostRecord[] = [
  createSeedPost({
    title: "When Do They Call Us? – Client Protocol",
    category: "Client Protocol",
    date: "2026-03-29",
    excerpt:
      "JM Group frames the Ark conversation as a response to observable continuity gaps, not speculative fear, with relationship managers stepping in only once a client reaches a clear threshold.",
    content: `
      <p>A prospective client contacts JM Group under defined, observable conditions. These conditions are not speculative. They emerge when an existing wealth and legacy structure cannot address a specific gap: unconditional continuity of capital, health, and governance across generations, irrespective of external events.</p>
      <p>We do not initiate these conversations. The client does.</p>
      <h2>The Observable Threshold</h2>
      <p>A client or their trusted advisor calls when the following three conditions converge:</p>
      <ol>
        <li>Existing tools have reached their limit. Trusts, foundations, second residencies, and physical commodity storage provide partial protection. None provide a fully self-sustaining community infrastructure with its own energy, water, food, and medical systems.</li>
        <li>The client holds material exposure to African markets. Africa offers superior demographic and resource fundamentals. The client seeking continuity views Africa not as opportunistic but as the optimal jurisdiction for a long-duration, real-asset anchor.</li>
        <li>Technology has become a counterparty risk. Rapid change in AI, synthetic biology, and decentralized networks creates fragility. Digital sovereignty without physical redundancy is incomplete.</li>
      </ol>
      <p>When these three converge, the client calls.</p>
      <h2>What the Client Says</h2>
      <p>The call does not mention doomsday or alarm. Typical phrases include:</p>
      <ul>
        <li>“We need to discuss a long-term habitat project.”</li>
        <li>“Your firm offers something beyond standard real estate development.”</li>
        <li>“I understand you are building a closed-loop community.”</li>
      </ul>
      <p>Our response is scripted:</p>
      <blockquote><p>“JM Group maintains a structured community development initiative in select African jurisdictions. The project is capitalized as a profitable, multi-decade asset with principal-protected membership tiers. I will assign a dedicated relationship manager to provide the relevant operational summary.”</p></blockquote>
      <h2>Role of the Relationship Manager</h2>
      <p>Every individual or entity that contacts JM Group on this topic is immediately assigned a dedicated relationship manager.</p>
      <p>Responsibilities include:</p>
      <ul>
        <li>Confirming the client’s sector of expertise across energy, biotech, food systems, data infrastructure, health longevity, and governance.</li>
        <li>Providing encrypted SOP excerpts limited to that sector.</li>
        <li>Scheduling a follow-up at the client’s preferred cadence.</li>
        <li>Documenting no speculative notes in standard systems.</li>
      </ul>
      <p>For existing clients, the instruction is simple: contact your designated relationship manager via encrypted channel. For prospective clients, a manager is assigned within 24 hours of initial contact. No introduction or referral is needed.</p>
      <p>No alarm. No urgency. No marketing. Only readiness.</p>
    `,
  }),
  createSeedPost({
    title: "Investing Across the Continuum – Sector Positioning",
    category: "Investment Strategy",
    date: "2026-03-28",
    excerpt:
      "This piece lays out JM Group’s sector-by-sector positioning for Ark communities, showing how capital is allocated to preserve function in disrupted futures while still generating carry in normal conditions.",
    content: `
      <p>Capital allocated to continuity must satisfy two conditions that conventional portfolios do not require. First, it must preserve function, not just nominal value, across an interrupted future. Second, it must generate real carry during normal conditions to justify its holding cost. Emerging markets, and Africa in particular, offer the strongest convexity for this dual mandate.</p>
      <p>This document outlines our sector-by-sector positioning.</p>
      <h2>Sector 1: Energy</h2>
      <p>Distributed, non-grid-dependent energy is the enabling layer of any self-sufficient community. Solar, wind, long-duration storage such as iron-air, gravity, and vanadium flow, plus small-scale nuclear form the technical stack.</p>
      <p>Our positioning is to build behind-the-meter systems for Ark communities with a target of 150% of peak load capacity and 14 days of storage.</p>
      <p>Partnerships cover generation, storage, distribution, and maintenance.</p>
      <h2>Sector 2: Food Systems</h2>
      <p>Closed-loop food production requires controlled environment agriculture, aquaponics, seed vaulting, and soil regeneration.</p>
      <p>JM Group positions across three tracks: greenhouse CEA for vegetables, aquaculture for protein, and dry storage for grains. Each Ark is designed to feed its permanent population plus 300% surge capacity.</p>
      <h2>Sector 3: Water</h2>
      <p>Water security requires extraction, purification, and recycling, with atmospheric water generation serving as tertiary backup.</p>
      <p>Our positioning is a primary source, secondary purification sized for double peak demand, and a tertiary atmospheric system with a minimum of 90 days of storage.</p>
      <h2>Sector 4: Health and Longevity</h2>
      <p>Health continuity includes acute care, chronic disease management, and longevity interventions.</p>
      <p>Each clinic is designed to be staffed by a general surgeon, emergency physician, and longevity specialist, with pharmaceutical reserves held in climate-controlled vaults.</p>
      <h2>Sector 5: Data and Communications</h2>
      <p>Data continuity requires local processing, encrypted storage, and redundant communications. Quantum-resistant encryption is treated as mandatory.</p>
      <p>The stack includes a local mesh network, two satellite terminals, one HF radio backup, and fully encrypted storage with post-quantum algorithms.</p>
      <h2>Sector 6: Manufacturing and Tooling</h2>
      <p>A closed-loop community cannot rely on external supply chains for replacement parts. Additive manufacturing, CNC milling, and basic metallurgy provide on-demand fabrication.</p>
      <p>Our positioning includes multiple 3D printers, a 5-axis CNC mill, a basic foundry, and a two-year rolling reserve of feedstock.</p>
      <h2>Sector 7: Governance and Legal Structures</h2>
      <p>Continuity requires a legal framework that survives its originating jurisdiction. JM Group uses a tiered legal structure: foundation in a stable jurisdiction, trust in the host country, and private membership agreements, with disputes resolved by binding arbitration.</p>
      <h2>Additional Sectors</h2>
      <p>Additional sectors identified in the continuum include construction and materials, transportation and logistics, waste management, education and knowledge transfer, finance and tokenisation, security and access control, textiles, chemical and pharmaceutical storage, art and cultural preservation, and genetics and seed banking.</p>
    `,
  }),
  createSeedPost({
    title: "Expert Managed Investment – Security, Liability, and Local Partnerships",
    category: "Managed Investment",
    date: "2026-03-27",
    excerpt:
      "JM Group positions the Ark managed investment structure around segregated asset vehicles, operational accountability, strict partner vetting, and sector specialists with demonstrable experience.",
    content: `
      <p>Direct investment in continuity infrastructure requires specialised oversight. JM Group offers a managed investment structure for the Ark in which the client retains beneficial ownership while the manager assumes operational responsibility.</p>
      <h2>Security</h2>
      <p><strong>Asset level:</strong> each Ark asset is held in a segregated legal vehicle with no commingling. Physical assets are registered in a dedicated holding entity per client and multi-signature authorisation is required.</p>
      <p><strong>Custody:</strong> commodities are stored in JM Group-operated vaults with quarterly third-party audits. No single individual has unmonitored access.</p>
      <p><strong>Cyber:</strong> the operating standard is post-quantum encryption, a dedicated portal, and no general email. Breach notification protocols are tested semi-annually.</p>
      <h2>Liability</h2>
      <p>Liability is contained at the vehicle level. JM Group operating entities do not guarantee asset performance. Sector experts carry professional indemnity coverage of at least $20 million per claim.</p>
      <p>Force majeure is addressed explicitly, including acts of war, expropriation, and biological events, and is mitigated through geographic and jurisdictional diversification.</p>
      <h2>Experience</h2>
      <p>Each sector expert must satisfy three conditions:</p>
      <ol>
        <li>At least 15 years of demonstrated experience.</li>
        <li>Prior management of assets exceeding $50 million.</li>
        <li>No regulatory sanctions.</li>
      </ol>
      <p>Current profiles include former CTOs from energy storage firms, agronomy directors from continental-scale farming operations, and supply chain officers from pharmaceutical logistics.</p>
      <h2>Local Partnerships</h2>
      <p>Continuity infrastructure cannot be fully imported. Local partners provide land access, regulatory navigation, and workforce integration.</p>
      <p>Partner types include landholding entities, licensed construction firms, security providers, and professional services. Vetting covers beneficial ownership disclosure, regulatory compliance review, reference checks, and site visits. Reviews are annual, with immediate termination for cause.</p>
    `,
  }),
  createSeedPost({
    title: "Other Solutions – Account Access, Sign-Up, and Sector Representatives",
    category: "Platform Access",
    date: "2026-03-26",
    excerpt:
      "This article explains the Ark solution tiers, what the client portal gives members, how sign-up pathways differ, and which sector representatives handle specialist questions.",
    content: `
      <p>The Ark is a continuum of solutions across sectors, risk profiles, and participation levels.</p>
      <h2>Solution Tiers</h2>
      <ul>
        <li><strong>Full Ark Membership:</strong> minimum $5,000,000, 10-year lock-up, full commitment, residential participation.</li>
        <li><strong>Sector-Specific:</strong> minimum $500,000 per sector, 5-year lock-up, no full-residential commitment.</li>
        <li><strong>Reserve and Commodity Only:</strong> minimum $100,000, no lock-up, no broader commitment.</li>
        <li><strong>Knowledge Contribution:</strong> no minimum investment, provisional-only participation.</li>
      </ul>
      <h2>Account Access</h2>
      <p>The client portal provides real-time asset verification, capital account statements, encrypted messaging, and a document vault. A succession feature allows naming up to three individuals with tiered access rights.</p>
      <h2>Sign-Up Pathways</h2>
      <ul>
        <li><strong>Direct application:</strong> completion of the online form assigns a relationship manager within 24 hours.</li>
        <li><strong>Referral by existing member:</strong> bypasses initial screening, with no referral compensation.</li>
        <li><strong>Institutional introduction:</strong> a group presentation covering solution tiers and liability structures.</li>
      </ul>
      <h2>Sector Representatives</h2>
      <p>Each sector maintains a designated representative as the primary contact for technical questions, investment opportunities, and partner coordination.</p>
      <ul>
        <li>Energy: Director of Infrastructure and Storage</li>
        <li>Food Systems: Director of Closed-Loop Nutrition</li>
        <li>Water: Director of Water Security</li>
        <li>Health and Longevity: Director of Continuity Medicine</li>
        <li>Data and Communications: Director of Redundant Networks</li>
        <li>Manufacturing: Director of On-Demand Fabrication</li>
        <li>Governance: Director of Continuity Frameworks</li>
        <li>Additional Sectors: Director of Cross-Sector Coordination</li>
      </ul>
    `,
  }),
  createSeedPost({
    title: "Traditional Equities – Integration, Procedure, and AI Assistance",
    category: "Public Markets",
    date: "2026-03-25",
    excerpt:
      "JM Group positions traditional equities as a complement to continuity assets, with liquidity, inflation pass-through, AI-assisted portfolio construction, and exclusion-based screening.",
    content: `
      <p>The Ark is not a replacement for conventional wealth management. It is a complement.</p>
      <h2>Role of Traditional Equities</h2>
      <p>Public equities serve three functions:</p>
      <ol>
        <li>Liquidity: positions can be sold in hours or days.</li>
        <li>Inflation pass-through: companies can adjust prices rapidly.</li>
        <li>Diversification: exposure is uncoupled from continuity-specific risks.</li>
      </ol>
      <h2>Sector Overlap Watchlist</h2>
      <p>The watchlist focuses on public companies in energy storage, controlled environment agriculture, water treatment, longevity biotech, encryption, and satellite communications. These are presented as reference points, not recommendations.</p>
      <h2>Exclusion List</h2>
      <p>Excluded are companies with exposure to jurisdictions lacking rule of law, single-source geopolitically concentrated supply chains, or reliance on government bailout or grid-dependent infrastructure.</p>
      <h2>Procedure</h2>
      <p><strong>Existing holdings:</strong> the client uploads positions, JM Group scans them against the exclusion list, and non-compliant holdings are flagged for divestment within 90 days.</p>
      <p><strong>New allocation:</strong> the client specifies amount and risk tolerance, then an AI-assisted portfolio construction process proposes 10 to 25 securities. Execution runs through JM Group custodial partners, with a $250,000 minimum.</p>
      <p><strong>Ongoing management:</strong> monthly rebalancing, quarterly exclusion review, and semi-annual liquidity stress testing.</p>
      <h2>AI Assistant</h2>
      <p>The proprietary AI model accepts capital amount, risk tolerance, liquidity requirement, and thematic preferences. It outputs proposed portfolio weights, expected return, volatility, and a continuity score. It does not execute trades. Natural language queries are permitted for data, not advice.</p>
    `,
  }),
  createSeedPost({
    title: "DeFi Protocol – Platform Access and Membership",
    category: "Digital Assets",
    date: "2026-03-24",
    excerpt:
      "The Ark DeFi protocol is framed as a member-only liquidity layer with yield generation, collateralised borrowing, on-chain attestation, and controls around upgrades, withdrawals, and membership tiers.",
    content: `
      <p>Decentralised finance provides liquidity when traditional market infrastructure degrades. JM Group has developed a proprietary DeFi protocol for Ark members.</p>
      <h2>Protocol Functions</h2>
      <ol>
        <li>Yield generation: idle capital is deployed into lending pools.</li>
        <li>Collateralised borrowing: members borrow against Ark assets without selling.</li>
        <li>On-chain attestation: membership and succession records are maintained on distributed ledger infrastructure.</li>
      </ol>
      <h2>Supported Assets</h2>
      <p>Supported assets include stablecoins such as USDC, USDT, and DAI, plus Bitcoin, Ethereum, tokenised Ark membership rights, and tokenised commodity storage receipts.</p>
      <h2>Risk Disclosures</h2>
      <p>Key risks include smart contract vulnerability, oracle failure, stablecoin de-pegging, and regulatory uncertainty. Mitigants include multi-signature governance, circuit breakers, and diversification, while acknowledging that no mitigation is absolute.</p>
      <h2>Platform Access</h2>
      <p>The interface is web-based and reserved for members only. Multi-factor authentication is required. Withdrawals above $50,000 need second approval from the account manager, and smart contract upgrades operate with a 72-hour timelock plus member veto rights.</p>
      <h2>Membership Tiers and DeFi Access</h2>
      <ul>
        <li><strong>Full Ark:</strong> automatic DeFi access, yield generation enabled, annual fee included.</li>
        <li><strong>Sector-Specific:</strong> DeFi add-on available, yield generation enabled, $1,000 annual fee.</li>
        <li><strong>Reserve-Only:</strong> DeFi add-on available, no yield generation, $1,000 annual fee.</li>
        <li><strong>Knowledge Contributor:</strong> no DeFi access.</li>
      </ul>
    `,
  }),
  createSeedPost({
    title: "Real Assets – Unique Opportunities, Board Verification, and Asset Liquidation",
    category: "Real Assets",
    date: "2026-03-23",
    excerpt:
      "JM Group describes Ark real assets as functional preservation tools, with category-specific minimums, board verification, and defined liquidation routes through redemption, member marketplace, or internal reserve.",
    content: `
      <p>Traditional real assets offer preservation but lack utility. Ark real assets offer preservation with function.</p>
      <h2>Unique Opportunity Criteria</h2>
      <ol>
        <li>The opportunity cannot be replicated in public markets.</li>
        <li>It has functional utility during a continuity event.</li>
        <li>It is offered only to JM Group members.</li>
      </ol>
      <h2>Opportunity Categories</h2>
      <ul>
        <li>Deployed Energy Infrastructure: power generation, $100,000 minimum, 60-day liquidation notice.</li>
        <li>Operating Farms and Food Facilities: nutrition, $100,000 minimum, 60-day notice.</li>
        <li>Water Rights and Treatment Plants: potable water, $100,000 minimum, 60-day notice.</li>
        <li>Medical Reserve Vaults: health continuity, $50,000 minimum, 30-day notice.</li>
        <li>Communications and Data Infrastructure: bandwidth and compute, $50,000 minimum, 30-day notice.</li>
        <li>Manufacturing and Tooling Facilities: on-demand fabrication, $50,000 minimum, 30-day notice.</li>
        <li>Cultural and Knowledge Vaults: preservation, $25,000 minimum, 90-day notice.</li>
      </ul>
      <h2>Asset Liquidation</h2>
      <p>Three pathways are defined:</p>
      <ol>
        <li>Direct redemption with JM Group, subject to notice period and fee.</li>
        <li>Sale to other members via an internal marketplace.</li>
        <li>Transfer to the JM Group liquidity reserve at a discount to NAV, subject to limited capacity.</li>
      </ol>
      <p>Notice periods are capped at 90 days, and early liquidation fees range from 1% to 3%.</p>
      <h2>Board Verification</h2>
      <p>A seven-member board comprising three independent directors, two sector experts, and two JM Group principals verifies title, physical condition, revenue model, contingency utility, counterparty risk, and regulatory compliance. Future returns are not verified.</p>
      <p>Assets are re-verified annually, with immediate special verification for material changes.</p>
      <h2>Liability and Security</h2>
      <p>The structure relies on segregated special purpose vehicles, with member liability limited to invested capital. Physical security covers perimeter, asset-level controls, 24/7 monitoring, and quarterly unannounced inspections. Ownership records are stored in paper, digital, and hashed DeFi form.</p>
    `,
  }),
  createSeedPost({
    title: "Countries of Operation – Partner Network and Contact Procedure",
    category: "Partner Network",
    date: "2026-03-22",
    excerpt:
      "This article lays out JM Group’s active-country footprint, the partner categories it vets in-market, and the member procedure for requesting country introductions through the portal.",
    content: `
      <p>Continuity infrastructure requires local partners. JM Group maintains a vetted partner network across multiple African jurisdictions.</p>
      <h2>Active Countries</h2>
      <p>Current countries of operation are Kenya, Rwanda, Ghana, Namibia, Botswana, Zambia, and South Africa.</p>
      <h2>Partner Categories</h2>
      <ul>
        <li>Legal and Regulatory</li>
        <li>Land and Property</li>
        <li>Construction and Engineering</li>
        <li>Security</li>
        <li>Logistics and Supply Chain</li>
        <li>Medical</li>
        <li>Agricultural</li>
        <li>Energy</li>
        <li>Water</li>
        <li>Financial</li>
      </ul>
      <h2>Request to Contact Partners</h2>
      <p>Active members follow a six-step process:</p>
      <ol>
        <li>Log in to the client portal.</li>
        <li>Navigate to the Countries section.</li>
        <li>Select the target country and partner category.</li>
        <li>Complete the introduction request form.</li>
        <li>JM Group reviews within five business days.</li>
        <li>Upon approval, JM Group facilitates the introductory call.</li>
      </ol>
      <p>Members conduct their own due diligence, while JM Group provides vetting summary, annual review status, and insurance verification.</p>
      <h2>Prospective Clients</h2>
      <p>Prospective clients may request a redacted country summary covering categories and partner counts only. Full introductions require completion of membership.</p>
    `,
  }),
  createSeedPost({
    title: "Educational Program – Robotics, Technology, Ecology, and Longevity Sciences",
    category: "Education",
    date: "2026-03-21",
    excerpt:
      "JM Group’s educational program is positioned as a continuity discipline spanning robotics, technology, ecology, and longevity sciences, with distinct participant pathways and a required integration module for full residency.",
    content: `
      <p>Continuity requires preserved knowledge and the capability to transmit it across generations.</p>
      <h2>Four Disciplinary Tracks</h2>
      <ul>
        <li>Robotics: 24 months, foundational to advanced, four partner organisations.</li>
        <li>Technology: 24 months, foundational to advanced, four partner organisations.</li>
        <li>Ecology: 24 months, foundational to advanced, four partner organisations.</li>
        <li>Longevity Sciences: 24 months, foundational to advanced, four partner organisations.</li>
        <li>Cross-disciplinary integration: 3-month integration module.</li>
      </ul>
      <h2>Participant Categories</h2>
      <ol>
        <li>Members and dependents: no tuition, voluntary but encouraged for long-term residents.</li>
        <li>Local community participants: scholarship-based, with host-country residency, demonstrated aptitude, a two-year post-completion commitment, and local partner recommendation. Five to ten scholarships are planned per host country each year.</li>
        <li>External researchers: fee-based, with no residency rights.</li>
      </ol>
      <h2>Cross-Disciplinary Integration</h2>
      <ul>
        <li>Robotics for ecology, including automated planting and harvesting.</li>
        <li>Technology for longevity, including remote diagnostics and health data encryption.</li>
        <li>Ecology for technology, including biodegradable components and waste heat recovery.</li>
        <li>Longevity for robotics, including human factors and ergonomics.</li>
      </ul>
      <h2>Instructor Network</h2>
      <p>Instruction comes from sector representatives, partner-organisation trainers, senior members providing peer instruction, and recorded materials. All are vetted for expertise and teaching competency.</p>
      <h2>Account Manager Role</h2>
      <p>The account manager advises on track selection, facilitates instructor introductions, coordinates scheduling, and processes dependent enrolment.</p>
    `,
  }),
  createSeedPost({
    title: "Structured Products – Solutions Suited to Your Needs",
    category: "Structured Products",
    date: "2026-03-20",
    excerpt:
      "The structured products article translates continuity requirements into customised wrappers that combine Ark assets, derivatives, and legal structures for protection, liquidity, and tax efficiency.",
    content: `
      <p>Off-the-shelf products assume a standard client. No continuity client is standard.</p>
      <h2>What Is a Structured Product?</h2>
      <p>A structured product is a pre-packaged investment strategy combining underlying assets, derivative overlays, and a legal wrapper. The result behaves differently from any component individually.</p>
      <h2>Why Structured Products for Continuity Clients?</h2>
      <ul>
        <li><strong>Duration mismatch:</strong> hold long-duration assets while hedging interim price risk.</li>
        <li><strong>Asymmetric protection:</strong> secure downside protection while preserving upside participation.</li>
        <li><strong>Contingent liquidity:</strong> enable automatic liquidation upon verified trigger events.</li>
        <li><strong>Tax and legal efficiency:</strong> use a single vehicle with an optimised domicile.</li>
      </ul>
      <h2>Customisation Process</h2>
      <ol>
        <li>Needs assessment: the client and account manager document objectives, exposure, risk tolerance, horizon, liquidity, and legal constraints, then sign a needs statement.</li>
        <li>Product design: the structuring desk creates a specification and sends it to board review within 5 to 10 days.</li>
        <li>Pricing and terms: a term sheet is issued and remains valid for 10 business days. Fees include management of 0.5% to 1.5%, performance of 10% to 20% above hurdle, and structuring of 0.5% to 2%.</li>
        <li>Subscription: the client signs and funds, and the product vehicle is created within 15 business days.</li>
        <li>Ongoing management: monthly NAV statements, quarterly performance reports, and annual audit.</li>
      </ol>
      <h2>Building Blocks</h2>
      <p>Underlying assets include Ark real assets, membership rights, reserve commodities, public equities, digital assets, and fixed income. Derivative overlays include put and call options, collars, total return swaps, forwards, and variance swaps.</p>
      <p>Structural features include principal protection, autocall, leverage capped at 3x, contingent liquidity, and multi-currency design.</p>
      <h2>Board Oversight</h2>
      <p>The board approves suitability, pricing fairness, counterparty risk, and legal enforceability. It does not approve leverage above 3x or protection costing more than 20% of upside.</p>
      <h2>Example Structures</h2>
      <ul>
        <li><strong>Capital-preserving:</strong> a principal-protected note linked to the Ark energy index, with 85% in zero-coupon bonds returning principal and 15% in call options.</li>
        <li><strong>Liquidity-constrained:</strong> a secured loan using illiquid Ark assets as collateral, with a note that can be sold to another member for immediate cash.</li>
        <li><strong>Event-triggered exit:</strong> contingent liquidation upon verified political events, executed at market prices with a 2% NAV fee if triggered.</li>
      </ul>
    `,
  }),
];

export const getSeededBlogPosts = () => [...SEEDED_BLOG_POSTS];

export const mergeBlogPosts = (posts: BlogPostRecord[]) => {
  const merged = new Map<string, BlogPostRecord>();

  posts.forEach((post) => {
    merged.set(post.slug, post);
  });

  SEEDED_BLOG_POSTS.forEach((post) => {
    merged.set(post.slug, post);
  });

  return Array.from(merged.values()).sort((left, right) =>
    right.date.localeCompare(left.date),
  );
};

export const getFeaturedBlogPosts = (limit = 5) =>
  getSeededBlogPosts().slice(0, limit);

export const getSpotlightBlogPost = () =>
  getSeededBlogPosts().find(
    (post) => post.slug === "traditional-equities-integration-procedure-and-ai-assistance",
  ) ?? getSeededBlogPosts()[0];

export const findSeededBlogPostBySlug = (slug: string) =>
  getSeededBlogPosts().find((post) => post.slug === slug) ?? null;
