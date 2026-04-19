"use client";

import { useMemo, useState } from "react";
import type { SectorMarket } from "@/lib/market-data";

export default function LiquidityPanel({ market }: { market: SectorMarket }) {
  const [usdAmount, setUsdAmount] = useState("5000");
  const usd = Number(usdAmount) || 0;
  const sectorTokens = useMemo(() => usd / Math.max(market.price, 0.0001), [usd, market.price]);
  const feeEstimate = useMemo(() => usd * (market.feeApr / 100) * 0.083, [usd, market.feeApr]);

  return (
    <div className="border border-[var(--line)] bg-white p-6 md:p-8">
      <p className="text-[10px] font-light tracking-[0.22em] uppercase text-[var(--grey)] mb-2">
        Liquidity Panel
      </p>
      <h3 className="font-serif text-[clamp(1.8rem,3vw,2.7rem)] font-light tracking-[-0.03em] mb-6">
        Add To {market.pair}
      </h3>

      <div className="grid gap-5">
        <div className="border border-[var(--line)] p-4">
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-3">
            USDC Deposit
          </p>
          <div className="flex items-end justify-between gap-4">
            <input
              value={usdAmount}
              onChange={(event) => setUsdAmount(event.target.value)}
              className="w-full bg-transparent border-none outline-none font-serif text-[2rem] font-light tracking-[-0.03em] text-[var(--black)]"
            />
            <span className="text-[11px] font-light tracking-[0.18em] uppercase text-[var(--grey)]">USDC</span>
          </div>
        </div>

        <div className="border border-[var(--line)] p-4 bg-teal-50">
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-3">
            Matching Cluster Tokens
          </p>
          <div className="flex items-end justify-between gap-4">
            <p className="font-serif text-[2rem] font-light tracking-[-0.03em] text-[var(--black)]">
              {sectorTokens.toFixed(2)}
            </p>
            <span className="text-[11px] font-light tracking-[0.18em] uppercase text-[var(--grey)]">
              {market.symbol}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-5 mt-6 mb-8">
        <div>
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
            Projected Pool Share
          </p>
          <p className="text-[13px] font-light text-[var(--black)]">0.84% mock</p>
        </div>
        <div>
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
            Fee APR
          </p>
          <p className="text-[13px] font-light text-[var(--black)]">{market.feeApr.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
            30 Day Fee Estimate
          </p>
          <p className="text-[13px] font-light text-[var(--black)]">${feeEstimate.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
            Liquidity Mix
          </p>
          <p className="text-[13px] font-light text-[var(--black)]">{market.liquidityMix}</p>
        </div>
      </div>

      <div className="border border-[var(--line)] bg-slate-900 p-5 mb-6">
        <p className="text-[10px] font-light tracking-[0.2em] uppercase text-slate-400 mb-3">
          Liquidity Notes
        </p>
        <p className="text-[13px] font-light leading-[1.8] text-slate-300">
          Liquidity is positioned as member-and-treasury support for thesis markets. This first pass keeps pool
          behavior legible by showing expected share, reference price alignment, and a simple earnings preview.
        </p>
      </div>

      <button className="w-full border border-[var(--accent)] px-5 py-4 text-[11px] font-light tracking-[0.2em] uppercase text-[var(--accent)] transition-all duration-200 hover:bg-[var(--accent)] hover:text-white">
        Preview Liquidity Position
      </button>
    </div>
  );
}
