import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarketCard from "@/components/markets/MarketCard";
import { backboneLayer, formatCompactCurrency, sectorMarkets } from "@/lib/market-data";

export default function MarketsPage() {
  const totalTvl = sectorMarkets.reduce((sum, market) => sum + market.tvl, 0);
  const totalVolume = sectorMarkets.reduce((sum, market) => sum + market.volume24h, 0);
  const verifiedCount = sectorMarkets.filter((market) => market.diligenceStatus === "Verified").length;

  return (
    <div className="min-h-screen bg-[var(--white)]">
      <Navbar />

      <main>
        <section className="px-6 bg-teal-50 md:px-[var(--pad-x)] pt-[calc(clamp(64px,8vh,72px)+clamp(48px,7vw,88px))] pb-[clamp(48px,7vw,88px)] border-b border-[var(--line)]">
          <h1 className="font-serif p-6 bg-slate-900 text-[clamp(2.8rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[1.05] mb-6">
            <span className="text-white">Cluster</span>{" "}
            <em className="italic" style={{ color: "var(--accent)" }}>
              Markets
            </em>
          </h1>
          <p className="font-sans text-[clamp(15px,1.6vw,19px)] font-light leading-[1.8] text-slate-600 max-w-3xl">
            Structured from the investment-cluster architecture: five cluster markets, each with its own token
            logic, and a shared NET-REF / JM-Credits backbone linking them together.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div>
              <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Cluster Markets</p>
              <p className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-light tracking-[-0.03em]">
                {sectorMarkets.length}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Aggregate TVL</p>
              <p className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-light tracking-[-0.03em]">
                {formatCompactCurrency(totalTvl)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">24h Volume</p>
              <p className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-light tracking-[-0.03em]">
                {formatCompactCurrency(totalVolume)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Verified Pools</p>
              <p className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-light tracking-[-0.03em]">
                {verifiedCount}
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--line)] px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-white">
          <div className="border border-[var(--line)] bg-slate-900 p-6 md:p-8 mb-[var(--gap-lg)]">
            <p className="text-[10px] font-light tracking-[0.22em] uppercase text-slate-400 mb-3">Shared Infrastructure</p>
            <h2 className="font-serif text-[clamp(1.8rem,4vw,3.2rem)] font-light tracking-[-0.03em] leading-[1.08] text-white mb-4">
              {backboneLayer.title}
            </h2>
            <p className="text-[13px] font-light leading-[1.8] text-slate-300 max-w-4xl mb-6">
              {backboneLayer.summary}
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {backboneLayer.notes.map((note) => (
                <div key={note} className="border border-slate-700 p-4">
                  <p className="text-[12px] font-light leading-[1.8] text-slate-300">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-[var(--grey)] mb-[var(--gap-lg)]">
            Market Directory
            <span className="flex-1 h-px bg-[var(--line)]" />
          </p>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sectorMarkets.map((market) => (
              <MarketCard key={market.symbol} market={market} />
            ))}
          </div>
        </section>

        <section className="border-t border-slate-700 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-900">
          <p className="flex items-center gap-5 font-sans text-[11px] font-light tracking-[0.22em] uppercase text-slate-400 mb-[var(--gap-lg)]">
            Why This Layer
            <span className="flex-1 h-px bg-slate-700" />
          </p>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="font-serif text-[clamp(1.8rem,4vw,3.6rem)] font-light tracking-[-0.03em] leading-[1.15] text-white max-w-4xl">
                The market surface turns JM-Qafri&apos;s five-cluster investment architecture into liquid,
                visible expressions without abandoning curation, diligence, or membership discipline.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                "Cluster 1 anchors value with physical collateral and STO / NFT structures.",
                "Cluster 2 captures upside with governance-token and revenue-share logic.",
                "Clusters 3 and 4 act as the liquidity engine through debt pools and on-chain native assets.",
                "Cluster 5 feeds circular incentives back into the system through impact and ESG credits.",
              ].map((item) => (
                <div key={item} className="border border-slate-700 p-5">
                  <p className="text-[13px] font-light leading-[1.8] text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 border border-[var(--accent)] bg-[var(--accent)] px-6 py-4 text-[11px] font-light tracking-[0.2em] uppercase text-white transition-all duration-200 hover:bg-transparent hover:text-[var(--accent)]"
            >
              View Portfolio
            </Link>
            <Link
              href="/Invest"
              className="inline-flex items-center gap-2 px-1 py-4 text-[11px] font-light tracking-[0.2em] uppercase text-slate-300 hover:text-white transition-colors duration-200"
            >
              Back To Investment Thesis
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
