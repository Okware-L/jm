import Link from "next/link";
import type { SectorMarket } from "@/lib/market-data";
import { formatCompactCurrency, formatPercent } from "@/lib/market-data";

export default function MarketCard({ market }: { market: SectorMarket }) {
  const positive = market.change24h >= 0;

  return (
    <article className="border border-[var(--line)] bg-white p-6 md:p-8 transition-colors duration-300 hover:border-[var(--accent)]">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-[10px] font-light tracking-[0.22em] uppercase text-[var(--grey)] mb-2">
            {market.category}
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.7rem)] font-light tracking-[-0.03em] leading-[1.05] text-[var(--black)]">
            {market.symbol}
          </h2>
          <p className="text-[13px] font-light leading-[1.7] text-[var(--grey)] mt-2">
            {market.name}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-light tracking-[0.18em] uppercase text-[var(--grey)] mb-2">
            24h
          </p>
          <p
            className="font-sans text-[15px] font-light"
            style={{ color: positive ? "var(--accent)" : "#8f1d1d" }}
          >
            {formatPercent(market.change24h)}
          </p>
        </div>
      </div>

      <p className="font-sans text-[14px] font-light leading-[1.8] text-[var(--black)] mb-8">
        {market.thesis}
      </p>

      <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-8">
        <div>
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
            Price
          </p>
          <p className="font-serif text-[1.6rem] font-light tracking-[-0.03em]">
            ${market.price.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
            TVL
          </p>
          <p className="font-serif text-[1.6rem] font-light tracking-[-0.03em]">
            {formatCompactCurrency(market.tvl)}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
            Volume
          </p>
          <p className="text-[13px] font-light text-[var(--black)]">
            {formatCompactCurrency(market.volume24h)}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
            Fee APR
          </p>
          <p className="text-[13px] font-light text-[var(--black)]">
            {market.feeApr.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {[market.access, market.diligenceStatus, market.risk].map((badge) => (
          <span
            key={badge}
            className="border border-[var(--line)] px-3 py-1 text-[10px] font-light tracking-[0.14em] uppercase text-[var(--grey)]"
          >
            {badge}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/markets/${market.symbol.toLowerCase()}`}
          className="inline-flex items-center gap-2 border border-[var(--accent)] px-5 py-3 text-[11px] font-light tracking-[0.18em] uppercase text-[var(--accent)] transition-all duration-200 hover:bg-[var(--accent)] hover:text-white"
        >
          View Market
        </Link>
        <Link
          href={`/markets/${market.symbol.toLowerCase()}/trade`}
          className="inline-flex items-center gap-2 text-[11px] font-light tracking-[0.18em] uppercase text-[var(--black)] hover:text-[var(--accent)] transition-colors duration-200"
        >
          Trade
        </Link>
      </div>
    </article>
  );
}
