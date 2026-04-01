import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EligibilityBanner from "@/components/markets/EligibilityBanner";
import SwapPanel from "@/components/markets/SwapPanel";
import { getSectorMarket, sectorMarkets } from "@/lib/market-data";

export function generateStaticParams() {
  return sectorMarkets.map((market) => ({ symbol: market.symbol.toLowerCase() }));
}

export default async function MarketTradePage({
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
            Trade Workspace · {market.symbol}
          </p>
          <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] font-light tracking-[-0.05em] leading-[0.95] text-[var(--black)]">
            Trade <em style={{ color: "var(--accent)" }}>{market.symbol}</em>
          </h1>
          <p className="mt-6 font-sans text-[clamp(15px,1.6vw,19px)] font-light leading-[1.8] text-slate-600 max-w-3xl">
            A dedicated route for swap behavior, member access language, and future wallet execution. For now,
            this page functions as the wireframe version of the trade terminal.
          </p>
        </section>

        <section className="border-t border-[var(--line)] px-6 md:px-[var(--pad-x)] py-[var(--section-y)] bg-white">
          <EligibilityBanner access={market.access} diligenceStatus={market.diligenceStatus} />

          <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr] mt-10">
            <div className="border border-[var(--line)] bg-slate-900 p-6 md:p-8">
              <p className="text-[10px] font-light tracking-[0.25em] uppercase text-slate-400 mb-4">Trade Notes</p>
              <p className="font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light tracking-[-0.03em] leading-[1.15] text-white mb-4">
                {market.thesis}
              </p>
              <p className="text-[13px] font-light leading-[1.8] text-slate-300 mb-6">
                Dedicated trade screens should eventually handle wallet checks, eligibility, price tolerance,
                and route confirmation. This scaffold keeps the content and hierarchy ready before execution logic.
              </p>
              <div className="space-y-4">
                {[
                  `Pair: ${market.pair}`,
                  `Fee tier: ${market.feeBps} bps`,
                  `Reference price: $${market.treasuryReferencePrice.toFixed(2)}`,
                  `Launch stage: ${market.launchStage}`,
                ].map((item) => (
                  <div key={item} className="border border-slate-700 p-4">
                    <p className="text-[12px] font-light leading-[1.7] text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <SwapPanel market={market} />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/markets/${market.symbol.toLowerCase()}`}
              className="inline-flex items-center gap-2 border border-[var(--line)] px-5 py-3 text-[11px] font-light tracking-[0.18em] uppercase text-[var(--black)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Back To Market
            </Link>
            <Link
              href={`/markets/${market.symbol.toLowerCase()}/liquidity`}
              className="inline-flex items-center gap-2 text-[11px] font-light tracking-[0.18em] uppercase text-[var(--accent)] hover:text-[var(--black)] transition-colors duration-200"
            >
              View Liquidity Surface
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
