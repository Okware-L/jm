import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  formatCompactCurrency,
  formatCurrency,
  mockLiquidityPositions,
  mockPortfolio,
  portfolioSummary,
  sectorMarkets,
} from "@/lib/market-data";

export default function PortfolioPage() {
  const pendingMarketCount = sectorMarkets.filter((market) => market.diligenceStatus !== "Verified").length;

  return (
    <div className="min-h-screen bg-[var(--white)]">
      <Navbar />

      <main>
        <section className="px-6 bg-teal-50 md:px-[var(--pad-x)] pt-[calc(clamp(64px,8vh,72px)+clamp(48px,7vw,88px))] pb-[clamp(48px,7vw,88px)] border-b border-[var(--line)]">
          <h1 className="font-serif p-6 bg-slate-900 text-[clamp(2.8rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[1.05] mb-6">
            <span className="text-white">Market</span>{" "}
            <em className="italic" style={{ color: "var(--accent)" }}>
              Portfolio
            </em>
          </h1>
          <p className="font-sans text-[clamp(15px,1.6vw,19px)] font-light leading-[1.8] text-slate-600 max-w-3xl">
            A first-pass investor workspace for cluster balances, LP positions, fee income, and compliance signals.
            This route translates the DAO-style market architecture into a portfolio dashboard while keeping the
            site&apos;s editorial investment tone.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div>
              <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Total Exposure</p>
              <p className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-light tracking-[-0.03em]">
                {formatCompactCurrency(portfolioSummary.totalExposure)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Active LP Value</p>
              <p className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-light tracking-[-0.03em]">
                {formatCompactCurrency(portfolioSummary.activeLpValue)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Earned Fees</p>
              <p className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-light tracking-[-0.03em]">
                {formatCurrency(portfolioSummary.earnedFees)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Compliance Items</p>
              <p className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-light tracking-[-0.03em]">
                {portfolioSummary.pendingComplianceItems}
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--line)] px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-white">
          <p className="flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-[var(--grey)] mb-[var(--gap-lg)]">
            Held Exposure
            <span className="flex-1 h-px bg-[var(--line)]" />
          </p>

          <div className="grid gap-4">
            {mockPortfolio.map((position) => (
              <div
                key={`${position.symbol}-${position.positionType}`}
                className="grid gap-4 border border-[var(--line)] bg-white p-6 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.6fr]"
              >
                <div>
                  <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
                    {position.positionType}
                  </p>
                  <p className="font-serif text-[1.9rem] font-light tracking-[-0.03em] text-[var(--black)]">
                    {position.symbol}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Balance</p>
                  <p className="text-[13px] font-light text-[var(--black)]">{position.balance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Market Value</p>
                  <p className="text-[13px] font-light text-[var(--black)]">{formatCurrency(position.marketValue)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Cost Basis</p>
                  <p className="text-[13px] font-light text-[var(--black)]">{formatCurrency(position.costBasis)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">PnL</p>
                  <p
                    className="text-[13px] font-light"
                    style={{ color: position.pnlPercent >= 0 ? "var(--accent)" : "#8f1d1d" }}
                  >
                    {position.pnlPercent >= 0 ? "+" : ""}
                    {position.pnlPercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--line)] px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
          <p className="flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-[var(--grey)] mb-[var(--gap-lg)]">
            Liquidity Positions
            <span className="flex-1 h-px bg-[var(--line)]" />
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            {mockLiquidityPositions.map((position) => (
              <div key={position.symbol} className="border border-[var(--line)] bg-white p-6 md:p-8">
                <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
                  {position.pair}
                </p>
                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-light tracking-[-0.03em] mb-6">
                  {position.symbol} LP
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Pool Share</p>
                    <p className="text-[13px] font-light text-[var(--black)]">{position.poolShare.toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Supplied</p>
                    <p className="text-[13px] font-light text-[var(--black)]">{formatCurrency(position.suppliedUsd)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Fees Earned</p>
                    <p className="text-[13px] font-light text-[var(--black)]">{formatCurrency(position.feesEarned)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Rewards</p>
                    <p className="text-[13px] font-light text-[var(--black)]">{formatCurrency(position.rewardsEarned)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-700 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-900">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-5">Operations View</p>
              <p className="font-serif text-[clamp(1.8rem,4vw,3.4rem)] font-light tracking-[-0.03em] leading-[1.15] text-white max-w-4xl">
                The portfolio layer can later merge directly with funding workspaces, document requests, and
                treasury reporting without changing the visual model established here.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                `${pendingMarketCount} markets currently need additional diligence or have restricted access.`,
                "Wallet state, reporting cadence, and disclosure acceptance can become portfolio-level status cards.",
                "Funding workspace fields like stake, earned, and linked documents map naturally into this dashboard.",
              ].map((item) => (
                <div key={item} className="border border-slate-700 p-5">
                  <p className="text-[13px] font-light leading-[1.8] text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/markets"
              className="inline-flex items-center gap-2 border border-[var(--accent)] bg-[var(--accent)] px-6 py-4 text-[11px] font-light tracking-[0.2em] uppercase text-white transition-all duration-200 hover:bg-transparent hover:text-[var(--accent)]"
            >
              Back To Markets
            </Link>
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 px-1 py-4 text-[11px] font-light tracking-[0.2em] uppercase text-slate-300 hover:text-white transition-colors duration-200"
            >
              Membership Access
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
