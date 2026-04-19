import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EligibilityBanner from "@/components/markets/EligibilityBanner";
import MarketMiniChart from "@/components/markets/MarketMiniChart";
import SwapPanel from "@/components/markets/SwapPanel";
import LiquidityPanel from "@/components/markets/LiquidityPanel";
import {
  formatCompactCurrency,
  formatPercent,
  getSectorMarket,
  sectorMarkets,
} from "@/lib/market-data";

export function generateStaticParams() {
  return sectorMarkets.map((market) => ({ symbol: market.symbol.toLowerCase() }));
}

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const market = getSectorMarket(symbol);

  if (!market) notFound();

  return (
    <div className="min-h-screen bg-[var(--white)]">
      <Navbar />

      <main>
        <section className="px-6 bg-teal-50 md:px-[var(--pad-x)] pt-[calc(clamp(64px,8vh,72px)+clamp(48px,7vw,88px))] pb-[clamp(48px,7vw,88px)] border-b border-[var(--line)]">
          <p className="font-sans text-[11px] font-light tracking-[0.22em] uppercase text-[var(--grey)] mb-5">
            {market.cluster} · {market.category} · {market.pair}
          </p>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h1 className="font-serif text-[clamp(3rem,8vw,6.4rem)] font-light tracking-[-0.05em] leading-[0.95] text-[var(--black)]">
                {market.symbol}
                <br />
                <em style={{ color: "var(--accent)" }}>{market.name}</em>
              </h1>
              <p className="mt-6 font-sans text-[clamp(15px,1.6vw,19px)] font-light leading-[1.8] text-slate-600 max-w-3xl">
                {market.summary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
              <div>
                <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Price</p>
                <p className="font-serif text-[2.2rem] font-light tracking-[-0.03em]">${market.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">24h Change</p>
                <p className="font-serif text-[2.2rem] font-light tracking-[-0.03em]">{formatPercent(market.change24h)}</p>
              </div>
              <div>
                <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">TVL</p>
                <p className="text-[14px] font-light text-[var(--black)]">{formatCompactCurrency(market.tvl)}</p>
              </div>
              <div>
                <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Volume</p>
                <p className="text-[14px] font-light text-[var(--black)]">{formatCompactCurrency(market.volume24h)}</p>
              </div>
              <div>
                <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Token Model</p>
                <p className="text-[14px] font-light text-[var(--black)]">{market.tokenModel}</p>
              </div>
              <div>
                <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Reference</p>
                <p className="text-[14px] font-light text-[var(--black)]">${market.treasuryReferencePrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">Launch Stage</p>
                <p className="text-[14px] font-light text-[var(--black)]">{market.launchStage}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--line)] px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-white">
          <EligibilityBanner access={market.access} diligenceStatus={market.diligenceStatus} />

          <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] mt-10">
            <div className="border border-[var(--line)] p-6 md:p-8">
              <p className="text-[10px] font-light tracking-[0.22em] uppercase text-[var(--grey)] mb-4">
                Price Action
              </p>
              <MarketMiniChart points={market.priceHistory} accent />
            </div>

            <div className="border border-[var(--line)] p-6 md:p-8 bg-teal-50">
              <p className="text-[10px] font-light tracking-[0.22em] uppercase text-[var(--grey)] mb-4">
                Market Notes
              </p>
              <p className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-light tracking-[-0.03em] leading-[1.15] text-[var(--black)] mb-4">
                {market.thesis}
              </p>
              <p className="text-[13px] font-light leading-[1.8] text-[var(--grey)]">
                {market.liquidityMix}. Mock pricing is supported with a treasury reference band so the market can
                feel active without pretending to be a finished execution layer.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--line)] px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-50">
          <div className="grid gap-10 xl:grid-cols-2">
            <SwapPanel market={market} />
            <LiquidityPanel market={market} />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/markets/${market.symbol.toLowerCase()}/trade`}
              className="inline-flex items-center gap-2 border border-[var(--accent)] px-5 py-3 text-[11px] font-light tracking-[0.18em] uppercase text-[var(--accent)] transition-all duration-200 hover:bg-[var(--accent)] hover:text-white"
            >
              Open Trade Page
            </Link>
            <Link
              href={`/markets/${market.symbol.toLowerCase()}/liquidity`}
              className="inline-flex items-center gap-2 border border-[var(--line)] px-5 py-3 text-[11px] font-light tracking-[0.18em] uppercase text-[var(--black)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Open Liquidity Page
            </Link>
          </div>
        </section>

        <section className="border-t border-slate-700 px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-slate-900">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-5">Overview</p>
              <div className="space-y-4">
                {market.overview.map((item) => (
                  <div key={item} className="border border-slate-700 p-5">
                    <p className="text-[13px] font-light leading-[1.8] text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-5">Composition</p>
              <div className="space-y-4">
                {[...market.composition, `SVG sectors: ${market.sectors.join(" · ")}`].map((item) => (
                  <div key={item} className="border border-slate-700 p-5">
                    <p className="text-[13px] font-light leading-[1.8] text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-5">Diligence & Disclosure</p>
              <div className="space-y-4 mb-6">
                {market.diligenceNotes.map((item) => (
                  <div key={item} className="border border-slate-700 p-5">
                    <p className="text-[13px] font-light leading-[1.8] text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {market.disclosures.map((item) => (
                  <div key={item} className="border border-slate-700 p-5 bg-[rgba(37,99,168,0.12)]">
                    <p className="text-[13px] font-light leading-[1.8] text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
