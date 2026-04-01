export type MarketAccess = "Open" | "Members Only" | "KYC Required";
export type DiligenceStatus = "Verified" | "In Review" | "Restricted";
export type RiskBand = "Measured" | "Elevated" | "Frontier";

export interface MarketMetricPoint {
  label: string;
  value: number;
}

export interface SectorMarket {
  symbol: string;
  name: string;
  slug: string;
  pair: string;
  category: string;
  thesis: string;
  summary: string;
  price: number;
  change24h: number;
  tvl: number;
  volume24h: number;
  feeApr: number;
  feeBps: number;
  treasuryReferencePrice: number;
  access: MarketAccess;
  diligenceStatus: DiligenceStatus;
  risk: RiskBand;
  launchStage: string;
  liquidityMix: string;
  overview: string[];
  composition: string[];
  diligenceNotes: string[];
  disclosures: string[];
  priceHistory: MarketMetricPoint[];
}

export interface PortfolioPosition {
  symbol: string;
  balance: number;
  marketValue: number;
  costBasis: number;
  pnlPercent: number;
  positionType: "Spot" | "LP";
}

export interface LiquidityPosition {
  symbol: string;
  pair: string;
  poolShare: number;
  suppliedUsd: number;
  feesEarned: number;
  rewardsEarned: number;
}

export const sectorMarkets: SectorMarket[] = [
  {
    symbol: "AGRI",
    name: "Agriculture Systems",
    slug: "agri",
    pair: "USDC / AGRI",
    category: "Food & Land",
    thesis:
      "Exposure to regenerative inputs, logistics, soil technology, and climate-resilient agricultural production.",
    summary:
      "AGRI prices the conviction that resilient food infrastructure in emerging markets will compound through productivity, distribution, and land stewardship.",
    price: 1.18,
    change24h: 3.4,
    tvl: 2840000,
    volume24h: 318000,
    feeApr: 10.8,
    feeBps: 30,
    treasuryReferencePrice: 1.14,
    access: "Members Only",
    diligenceStatus: "Verified",
    risk: "Measured",
    launchStage: "Pilot market",
    liquidityMix: "Treasury 44% · Members 56%",
    overview: [
      "AGRI is designed as a sector-expression market for food systems, soil health, export infrastructure, and production resilience.",
      "The market aligns with JM-Qafri's agriculture pages and trade relationships by making the thesis legible as a priced exposure surface.",
      "In a future treasury-backed version, AGRI can serve as the liquid layer for a curated basket of approved agricultural opportunities.",
    ],
    composition: [
      "Organic soil inputs and crop enhancement",
      "Cold-chain and distribution infrastructure",
      "Livestock and feed efficiency systems",
      "Export-linked agricultural logistics",
    ],
    diligenceNotes: [
      "Underlying themes have sector memos and operating-partner review.",
      "Treasury reference price updates are assumed weekly in the mock model.",
      "Pool participation is limited to approved members during pilot phase.",
    ],
    disclosures: [
      "AGRI represents sector exposure, not direct equity ownership in any single company.",
      "AMM price may trade above or below treasury reference price.",
      "Sector thesis can underperform even when individual portfolio companies execute well.",
    ],
    priceHistory: [
      { label: "Mon", value: 0.94 },
      { label: "Tue", value: 1.01 },
      { label: "Wed", value: 1.04 },
      { label: "Thu", value: 1.09 },
      { label: "Fri", value: 1.12 },
      { label: "Sat", value: 1.16 },
      { label: "Sun", value: 1.18 },
    ],
  },
  {
    symbol: "MEDAI",
    name: "Medicine & Intelligence",
    slug: "medai",
    pair: "USDC / MEDAI",
    category: "Healthcare",
    thesis:
      "A sector market focused on diagnostics, AI-assisted care, data processing, and healthcare delivery infrastructure.",
    summary:
      "MEDAI prices the belief that healthcare systems with stronger diagnostic intelligence and better data workflows will attract durable capital.",
    price: 1.31,
    change24h: 1.8,
    tvl: 3620000,
    volume24h: 442000,
    feeApr: 12.4,
    feeBps: 35,
    treasuryReferencePrice: 1.28,
    access: "KYC Required",
    diligenceStatus: "Verified",
    risk: "Measured",
    launchStage: "Core market",
    liquidityMix: "Treasury 38% · Members 62%",
    overview: [
      "MEDAI extends the app's AI-in-medicine narrative into a liquid sector market with healthcare-specific framing.",
      "The mock market assumes exposure to diagnostics, medical software, AI-enabled triage, and data normalization layers.",
      "This market is best positioned as a flagship thesis because it connects health, infrastructure, and emerging technology.",
    ],
    composition: [
      "Clinical decision support platforms",
      "Medical imaging and diagnostics tooling",
      "Data standardization and patient workflow systems",
      "Preventive and personalized care infrastructure",
    ],
    diligenceNotes: [
      "Healthcare-linked themes are KYC-gated in the first-pass design.",
      "Operator review and disclosure documents should sit alongside pricing panels.",
      "A future version can include milestone reporting from approved portfolio entities.",
    ],
    disclosures: [
      "MEDAI does not guarantee exposure to regulated healthcare securities.",
      "Sector pricing reflects market demand for the thesis and may diverge from private valuations.",
      "Regulatory and clinical adoption risks remain material.",
    ],
    priceHistory: [
      { label: "Mon", value: 1.11 },
      { label: "Tue", value: 1.14 },
      { label: "Wed", value: 1.17 },
      { label: "Thu", value: 1.24 },
      { label: "Fri", value: 1.23 },
      { label: "Sat", value: 1.27 },
      { label: "Sun", value: 1.31 },
    ],
  },
  {
    symbol: "TRADE",
    name: "Trade Infrastructure",
    slug: "trade",
    pair: "USDC / TRADE",
    category: "Commerce",
    thesis:
      "A liquid expression of cross-border trade rails, logistics, commodities handling, and digitally coordinated market access.",
    summary:
      "TRADE is built for members who want exposure to infrastructure that moves goods, trust, and settlement between regions.",
    price: 0.96,
    change24h: -0.9,
    tvl: 2190000,
    volume24h: 267000,
    feeApr: 9.6,
    feeBps: 30,
    treasuryReferencePrice: 0.99,
    access: "Members Only",
    diligenceStatus: "In Review",
    risk: "Elevated",
    launchStage: "Expansion market",
    liquidityMix: "Treasury 51% · Members 49%",
    overview: [
      "TRADE turns the app's global trade story into a market surface with clearer pricing, depth, and member participation.",
      "The pool is framed around infrastructure and execution capacity rather than speculative commodity directionality.",
      "Because corridor and counterparty quality matter, diligence remains more prominent here than in a generic swap venue.",
    ],
    composition: [
      "Trade finance infrastructure",
      "Commodity handling and storage systems",
      "Cross-border distribution partnerships",
      "Settlement and provenance tooling",
    ],
    diligenceNotes: [
      "Market is flagged In Review while corridor-level underwriting standards are refined.",
      "Pool participants should see trade-specific document and compliance prompts.",
      "A future version can expose due diligence milestones directly from worker workflows.",
    ],
    disclosures: [
      "TRADE includes counterparty and geopolitical sensitivity.",
      "Lower liquidity can widen quoted execution in volatile sessions.",
      "Treasury intervention may be used if price dislocates materially from reference band.",
    ],
    priceHistory: [
      { label: "Mon", value: 1.08 },
      { label: "Tue", value: 1.05 },
      { label: "Wed", value: 1.02 },
      { label: "Thu", value: 1.01 },
      { label: "Fri", value: 1.0 },
      { label: "Sat", value: 0.98 },
      { label: "Sun", value: 0.96 },
    ],
  },
  {
    symbol: "ETEC",
    name: "Eurasia Trade Corridor",
    slug: "etec",
    pair: "USDC / ETEC",
    category: "Corridor Strategy",
    thesis:
      "A corridor market for industrial cooperation, African market access, equipment flows, and strategic trade relationships.",
    summary:
      "ETEC gives members a market for corridor conviction where logistics, diplomacy, and regional industrial alignment matter as much as price.",
    price: 1.07,
    change24h: 2.1,
    tvl: 1710000,
    volume24h: 149000,
    feeApr: 11.1,
    feeBps: 40,
    treasuryReferencePrice: 1.03,
    access: "KYC Required",
    diligenceStatus: "In Review",
    risk: "Elevated",
    launchStage: "Restricted pilot",
    liquidityMix: "Treasury 63% · Members 37%",
    overview: [
      "ETEC translates the app's corridor cooperation pages into a more disciplined capital market interface.",
      "The market is intentionally restricted because regional exposure depends on contracts, operator trust, and jurisdictional clarity.",
      "This is a good example of how the AMM can still feel curated, gated, and thesis-led.",
    ],
    composition: [
      "Industrial equipment access",
      "Africa-Russia and corridor trade networks",
      "Distribution relationships and procurement support",
      "Legal and transaction accompaniment layers",
    ],
    diligenceNotes: [
      "Access should be conditioned on KYC and disclosure acceptance.",
      "Pool launch remains gated while partnership quality and legal wrappers are reviewed.",
      "Worker and admin workspaces can later feed corridor updates into this screen.",
    ],
    disclosures: [
      "ETEC carries heightened jurisdictional and execution sensitivity.",
      "Participation may be restricted by location or membership status.",
      "Reference pricing should not be read as a guarantee of exit liquidity.",
    ],
    priceHistory: [
      { label: "Mon", value: 0.91 },
      { label: "Tue", value: 0.95 },
      { label: "Wed", value: 0.97 },
      { label: "Thu", value: 1.0 },
      { label: "Fri", value: 1.01 },
      { label: "Sat", value: 1.05 },
      { label: "Sun", value: 1.07 },
    ],
  },
  {
    symbol: "SPACE",
    name: "Frontier Systems",
    slug: "space",
    pair: "USDC / SPACE",
    category: "Frontier",
    thesis:
      "A frontier market for long-duration innovation, environmental systems, and speculative infrastructure with impact resonance.",
    summary:
      "SPACE is the app's high-variance market for members who want frontier exposure framed through sustainability and systems design.",
    price: 0.88,
    change24h: 4.9,
    tvl: 930000,
    volume24h: 112000,
    feeApr: 16.8,
    feeBps: 50,
    treasuryReferencePrice: 0.84,
    access: "Members Only",
    diligenceStatus: "Restricted",
    risk: "Frontier",
    launchStage: "Experimental",
    liquidityMix: "Treasury 71% · Members 29%",
    overview: [
      "SPACE is intentionally framed as a frontier allocation rather than a core market.",
      "The first-pass UI treats it as an experimental thesis surface to show how the app could support higher-variance markets without losing curation.",
      "This market should always carry stronger disclosure language than core sector pools.",
    ],
    composition: [
      "Frontier sustainability technologies",
      "Environmental systems and advanced materials",
      "Long-duration infrastructure concepts",
      "Research-heavy speculative partnerships",
    ],
    diligenceNotes: [
      "Restricted status signals that access and treasury participation remain tightly controlled.",
      "Members should view disclosures before initiating any mock trade or liquidity action.",
      "Pool depth is intentionally thinner to reflect experimental status.",
    ],
    disclosures: [
      "SPACE is a high-risk frontier market with thin mock liquidity.",
      "Price can be more volatile and less tied to near-term operating metrics.",
      "This market is intended as exploratory exposure, not a core allocation.",
    ],
    priceHistory: [
      { label: "Mon", value: 0.67 },
      { label: "Tue", value: 0.69 },
      { label: "Wed", value: 0.74 },
      { label: "Thu", value: 0.77 },
      { label: "Fri", value: 0.79 },
      { label: "Sat", value: 0.84 },
      { label: "Sun", value: 0.88 },
    ],
  },
];

export const mockPortfolio: PortfolioPosition[] = [
  {
    symbol: "AGRI",
    balance: 6420,
    marketValue: 7575.6,
    costBasis: 6984.9,
    pnlPercent: 8.46,
    positionType: "Spot",
  },
  {
    symbol: "MEDAI",
    balance: 3100,
    marketValue: 4061,
    costBasis: 3779,
    pnlPercent: 7.46,
    positionType: "Spot",
  },
  {
    symbol: "TRADE",
    balance: 8200,
    marketValue: 7872,
    costBasis: 8110,
    pnlPercent: -2.93,
    positionType: "LP",
  },
];

export const mockLiquidityPositions: LiquidityPosition[] = [
  {
    symbol: "MEDAI",
    pair: "USDC / MEDAI",
    poolShare: 1.82,
    suppliedUsd: 12000,
    feesEarned: 412,
    rewardsEarned: 164,
  },
  {
    symbol: "TRADE",
    pair: "USDC / TRADE",
    poolShare: 2.47,
    suppliedUsd: 8600,
    feesEarned: 219,
    rewardsEarned: 73,
  },
];

export const portfolioSummary = {
  totalExposure: 19508.6,
  activeLpValue: 8600,
  earnedFees: 631,
  pendingComplianceItems: 2,
};

export function getSectorMarket(symbol: string) {
  return sectorMarkets.find((market) => market.symbol.toLowerCase() === symbol.toLowerCase());
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value);
}

export function formatCompactCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}
