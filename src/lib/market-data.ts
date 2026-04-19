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
  cluster: string;
  category: string;
  tokenModel: string;
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
  sectors: string[];
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

export const backboneLayer = {
  title: "NET-REF Layer · JM-Credits Backbone",
  summary:
    "A shared supplier, financer, employee reward, reputation, and incentive layer that sits underneath every cluster rather than belonging to one market.",
  notes: [
    "NET-REF links members, suppliers, financers, and operators across the entire investment graph.",
    "JM-Credits act as the reward and reputation infrastructure connecting participation, reporting, and governance.",
    "Clusters 3 and 4 act as the liquidity engine, while cluster 1 revenue and cluster 5 credits can seed APY flows.",
  ],
};

export const sectorMarkets: SectorMarket[] = [
  {
    symbol: "REAL",
    name: "Real Assets",
    slug: "real",
    pair: "USDC / REAL",
    cluster: "Cluster 1",
    category: "Anchor Value",
    tokenModel: "STO / NFT",
    thesis:
      "Physical collateral anchors the DAO: land, buildings, produce, minerals, and title-linked assets create the base layer of stable value.",
    summary:
      "REAL is the collateral-first market. It groups all sectors with physical backing and positions them as the stability anchor for the broader investment architecture.",
    price: 1.06,
    change24h: 1.2,
    tvl: 4240000,
    volume24h: 286000,
    feeApr: 8.4,
    feeBps: 20,
    treasuryReferencePrice: 1.04,
    access: "KYC Required",
    diligenceStatus: "Verified",
    risk: "Measured",
    launchStage: "Anchor market",
    liquidityMix: "Treasury 58% · Members 42%",
    sectors: [
      "Agriculture",
      "Real estate",
      "Hospitality",
      "Mining",
      "Agrotech",
      "Environmental",
      "Manufacturing",
      "Light industry",
      "Food & beverage",
      "Art (physical)",
    ],
    overview: [
      "REAL maps directly to the SVG's Real Assets cluster and is meant to hold everything with physical collateral and recoverable title value.",
      "This market is the stable-value anchor for the rest of the cluster system, making it the natural treasury-heavy pool in the UI.",
      "Tokenization is framed around STOs, warehouse receipts, and NFTs tied to deeds, inventory, or title-linked proofs.",
    ],
    composition: [
      "Land, buildings, and hospitality infrastructure",
      "Produce, food systems, and warehouse-linked receipts",
      "Mining, manufacturing, and light industry output",
      "Physical art and collateralized inventory",
    ],
    diligenceNotes: [
      "Physical collateral and title verification sit at the center of this cluster's diligence workflow.",
      "Reference pricing is best understood as a NAV-adjacent guide rather than a public-market mark.",
      "Revenue from this cluster can later help seed APY behavior in debt and digital pools.",
    ],
    disclosures: [
      "REAL is framed as collateral-backed sector exposure, not direct title transfer at the UI layer.",
      "Reference pricing can lag the true speed of physical asset repricing and realization.",
      "Redemption, settlement, and legal wrappers remain future-phase work.",
    ],
    priceHistory: [
      { label: "Mon", value: 0.98 },
      { label: "Tue", value: 1.0 },
      { label: "Wed", value: 1.01 },
      { label: "Thu", value: 1.02 },
      { label: "Fri", value: 1.04 },
      { label: "Sat", value: 1.05 },
      { label: "Sun", value: 1.06 },
    ],
  },
  {
    symbol: "VENT",
    name: "Equity & Venture",
    slug: "vent",
    pair: "USDC / VENT",
    cluster: "Cluster 2",
    category: "High Growth",
    tokenModel: "Governance token",
    thesis:
      "Tech, biotech, pharma, education, M&A, and venture-style projects belong in a governance-heavy market designed for upside and influence.",
    summary:
      "VENT captures JM-Qafri's high-growth tier: company and project exposure where governance rights, revenue-share mechanics, and strategic upside matter most.",
    price: 1.29,
    change24h: 2.8,
    tvl: 3810000,
    volume24h: 467000,
    feeApr: 12.2,
    feeBps: 35,
    treasuryReferencePrice: 1.24,
    access: "Members Only",
    diligenceStatus: "Verified",
    risk: "Elevated",
    launchStage: "Core growth market",
    liquidityMix: "Treasury 41% · Members 59%",
    sectors: [
      "Tech",
      "Biotech",
      "AI projects",
      "Education",
      "M&A",
      "Forums",
      "Pharmaceuticals",
      "Beauty",
      "Consulting",
      "Places of communion",
      "Space project",
    ],
    overview: [
      "VENT replaces the earlier single-theme growth markets with a broader venture cluster modeled on the SVG structure.",
      "This is where governance rights, upside participation, and revenue-share language fit naturally in the product narrative.",
      "It is the cluster most closely tied to company-building, strategic upside, and member participation in high-growth conviction.",
    ],
    composition: [
      "Tech, biotech, and AI-led operating plays",
      "Education, pharma, beauty, and consulting ventures",
      "M&A opportunities and strategic forums",
      "Experimental frontier projects including space",
    ],
    diligenceNotes: [
      "Governance design and revenue-share disclosure should be shown prominently for this cluster.",
      "This pool benefits from deeper diligence notes because upside stories can otherwise read as purely speculative.",
      "A future version can attach milestone, voting, and reporting modules to this market detail page.",
    ],
    disclosures: [
      "VENT represents a higher-risk, higher-upside governance market.",
      "Returns are sensitive to operator quality, dilution, execution speed, and strategic fit.",
      "Governance-token framing in the UI does not itself define legal rights.",
    ],
    priceHistory: [
      { label: "Mon", value: 1.04 },
      { label: "Tue", value: 1.09 },
      { label: "Wed", value: 1.11 },
      { label: "Thu", value: 1.17 },
      { label: "Fri", value: 1.2 },
      { label: "Sat", value: 1.23 },
      { label: "Sun", value: 1.29 },
    ],
  },
  {
    symbol: "YLD",
    name: "Debt & Fixed Yield",
    slug: "yld",
    pair: "USDC / YLD",
    cluster: "Cluster 3",
    category: "Predictable Yield",
    tokenModel: "Bond / pool",
    thesis:
      "Microfinance, co-op banking, trade finance, and lending pools form the steady-yield layer where predictable APY absorbs debt-like activity across the ecosystem.",
    summary:
      "YLD packages debt and fixed-yield exposure into the cluster designed to produce predictable income, absorb lending activity, and host fee-generating instruments such as the BLSH affiliate flow.",
    price: 1.01,
    change24h: 0.6,
    tvl: 2960000,
    volume24h: 253000,
    feeApr: 11.7,
    feeBps: 25,
    treasuryReferencePrice: 1.0,
    access: "KYC Required",
    diligenceStatus: "In Review",
    risk: "Measured",
    launchStage: "Income market",
    liquidityMix: "Treasury 49% · Members 51%",
    sectors: [
      "Finance (Co-op, NWCV)",
      "Yield farming",
      "DE-Fi",
      "Pure trade (BLSH affiliate)",
    ],
    overview: [
      "YLD takes the debt-and-predictable-APY story from the SVG and makes it explicit inside the market system.",
      "It is the income-oriented cluster where bond tokens, lending pools, and fee-bearing debt instruments are grouped together.",
      "Clusters 3 and 4 together are the liquidity engine in the architecture, so this screen should always feel operational rather than purely thematic.",
    ],
    composition: [
      "Micro-loan and bond-token structures",
      "Co-op banking and structured finance programs",
      "Trade finance and affiliate-fee debt instruments",
      "Yield pools connected to broader cluster cash flows",
    ],
    diligenceNotes: [
      "Predictable APY claims should be backed by visible pool logic and eventual reporting modules.",
      "This cluster should show a stronger bridge between market UI and funding-recipient reporting.",
      "The mock design assumes part of its liquidity can be seeded by real-asset revenue and ESG-linked flows.",
    ],
    disclosures: [
      "YLD is designed for predictable yield but remains subject to counterparty, default, and pool management risk.",
      "Displayed APY is a wireframe estimate, not a live return promise.",
      "Debt-like exposure can still be sensitive to trade disruptions and capital concentration.",
    ],
    priceHistory: [
      { label: "Mon", value: 0.99 },
      { label: "Tue", value: 0.99 },
      { label: "Wed", value: 1.0 },
      { label: "Thu", value: 1.0 },
      { label: "Fri", value: 1.01 },
      { label: "Sat", value: 1.01 },
      { label: "Sun", value: 1.01 },
    ],
  },
  {
    symbol: "LIQD",
    name: "Digital & Liquid Assets",
    slug: "liqd",
    pair: "USDC / LIQD",
    cluster: "Cluster 4",
    category: "On-Chain Native",
    tokenModel: "Utility token",
    thesis:
      "Exchange tokens, APY instruments, DeFi farms, and digitally native art form the always-tradeable on-chain bucket with higher liquidity and faster repricing.",
    summary:
      "LIQD is the ecosystem's liquid-native cluster, built for on-chain instruments that can be traded, pooled, and repriced continuously.",
    price: 0.93,
    change24h: 4.1,
    tvl: 2140000,
    volume24h: 398000,
    feeApr: 15.6,
    feeBps: 45,
    treasuryReferencePrice: 0.9,
    access: "Open",
    diligenceStatus: "In Review",
    risk: "Frontier",
    launchStage: "Liquidity engine",
    liquidityMix: "Treasury 33% · Members 67%",
    sectors: [
      "Exchange tokens",
      "APY instruments",
      "DE-Fi platform (exchange, farms)",
      "Art (digital / resale royalty)",
      "Omega tech reproduction",
    ],
    overview: [
      "LIQD translates the SVG's Digital & Liquid cluster into the most obviously AMM-native market in the set.",
      "It is designed as the anytime-tradeable bucket for utility-style exposure, tokenized digital culture, and DeFi-native yield surfaces.",
      "Together with YLD, this cluster acts as the liquidity engine for the broader market system.",
    ],
    composition: [
      "Exchange tokens and APY-bearing instruments",
      "DeFi platform, farms, and liquid utility exposure",
      "Digital art with royalty and resale logic",
      "Other digitally native, fast-settlement assets",
    ],
    diligenceNotes: [
      "This cluster needs sharper risk warnings because liquidity can make volatility feel deceptively safe.",
      "A future UI can expose fee routing and reward emissions more directly here than in the other clusters.",
      "This is the most natural place to connect NET-REF rewards and JM-Credits incentives over time.",
    ],
    disclosures: [
      "LIQD is high-liquidity but higher-volatility than the anchor clusters.",
      "On-chain-native instruments may reprice sharply and are subject to platform, oracle, and smart-contract risk.",
      "Open access in the mock UI does not imply universal legal availability.",
    ],
    priceHistory: [
      { label: "Mon", value: 0.71 },
      { label: "Tue", value: 0.75 },
      { label: "Wed", value: 0.78 },
      { label: "Thu", value: 0.83 },
      { label: "Fri", value: 0.87 },
      { label: "Sat", value: 0.9 },
      { label: "Sun", value: 0.93 },
    ],
  },
  {
    symbol: "ESG",
    name: "Impact & ESG Credits",
    slug: "esg",
    pair: "USDC / ESG",
    cluster: "Cluster 5",
    category: "Cross-Cutting Credits",
    tokenModel: "Credit / REC",
    thesis:
      "Impact, ESG, carbon, UNEP-linked, government, NGO, healthcare, and longevity layers produce credits and incentives that can circulate back into the other clusters.",
    summary:
      "ESG is the circular incentive market. It is cross-cutting by design, generating credits and impact-linked flows that can be sold, staked, or routed into the other four clusters.",
    price: 1.12,
    change24h: 1.5,
    tvl: 1880000,
    volume24h: 161000,
    feeApr: 9.9,
    feeBps: 30,
    treasuryReferencePrice: 1.09,
    access: "Members Only",
    diligenceStatus: "Restricted",
    risk: "Measured",
    launchStage: "Cross-cluster layer",
    liquidityMix: "Treasury 61% · Members 39%",
    sectors: [
      "Carbon credits",
      "UNEP-linked tokens",
      "NGO / Government grant pools",
      "Environmental",
      "Agrotech (UNEP)",
      "Healthcare (universal)",
      "Longevity",
      "NGO",
      "Government",
    ],
    overview: [
      "ESG is not just another sector bucket. It is a cross-cutting credits layer intended to feed value and incentives into the rest of the architecture.",
      "This cluster is where environmental, health, NGO, and public-good linked flows can become tradeable, stakeable, or reward-bearing instruments.",
      "Its strongest product role is to make the circular incentive loop visible in the interface rather than hiding it in documentation.",
    ],
    composition: [
      "Carbon and REC-style credit instruments",
      "UNEP-linked environmental and agrotech programs",
      "Healthcare, longevity, and public-good credits",
      "NGO and government-linked grant or impact pools",
    ],
    diligenceNotes: [
      "This cluster needs the clearest disclosure language because it crosses public-good framing with market behavior.",
      "A future version should show how credits are sold, staked, or routed into other clusters.",
      "Cross-cluster incentive mapping is the core differentiator of this market surface.",
    ],
    disclosures: [
      "ESG is a cross-cutting incentive and credits market, not a simple single-sector pool.",
      "Credit quality, policy dependence, and verification standards can materially affect value.",
      "Restricted status reflects the need for tighter program-level disclosure and approval.",
    ],
    priceHistory: [
      { label: "Mon", value: 1.01 },
      { label: "Tue", value: 1.03 },
      { label: "Wed", value: 1.04 },
      { label: "Thu", value: 1.07 },
      { label: "Fri", value: 1.08 },
      { label: "Sat", value: 1.1 },
      { label: "Sun", value: 1.12 },
    ],
  },
];

export const mockPortfolio: PortfolioPosition[] = [
  {
    symbol: "REAL",
    balance: 7200,
    marketValue: 7632,
    costBasis: 7185,
    pnlPercent: 6.22,
    positionType: "Spot",
  },
  {
    symbol: "VENT",
    balance: 2840,
    marketValue: 3663.6,
    costBasis: 3375,
    pnlPercent: 8.55,
    positionType: "Spot",
  },
  {
    symbol: "YLD",
    balance: 8600,
    marketValue: 8686,
    costBasis: 8521,
    pnlPercent: 1.94,
    positionType: "LP",
  },
];

export const mockLiquidityPositions: LiquidityPosition[] = [
  {
    symbol: "YLD",
    pair: "USDC / YLD",
    poolShare: 2.14,
    suppliedUsd: 14500,
    feesEarned: 392,
    rewardsEarned: 146,
  },
  {
    symbol: "LIQD",
    pair: "USDC / LIQD",
    poolShare: 1.71,
    suppliedUsd: 9800,
    feesEarned: 268,
    rewardsEarned: 219,
  },
];

export const portfolioSummary = {
  totalExposure: 19981.6,
  activeLpValue: 9800,
  earnedFees: 660,
  pendingComplianceItems: 3,
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
