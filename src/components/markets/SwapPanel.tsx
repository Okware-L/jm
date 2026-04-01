"use client";

import { useMemo, useState } from "react";
import type { SectorMarket } from "@/lib/market-data";

export default function SwapPanel({ market }: { market: SectorMarket }) {
  const [baseAmount, setBaseAmount] = useState("1000");
  const [direction, setDirection] = useState<"buy" | "sell">("buy");

  const amount = Number(baseAmount) || 0;
  const quote = useMemo(() => {
    if (direction === "buy") return amount / market.price;
    return amount * market.price;
  }, [amount, direction, market.price]);

  const fee = useMemo(() => (amount * market.feeBps) / 10000, [amount, market.feeBps]);

  return (
    <div className="border border-[var(--line)] bg-white p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-[10px] font-light tracking-[0.22em] uppercase text-[var(--grey)] mb-2">
            Trade Panel
          </p>
          <h3 className="font-serif text-[clamp(1.8rem,3vw,2.7rem)] font-light tracking-[-0.03em]">
            {market.pair}
          </h3>
        </div>
        <div className="flex border border-[var(--line)]">
          {(["buy", "sell"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setDirection(mode)}
              className="px-4 py-3 text-[10px] font-light tracking-[0.2em] uppercase transition-colors duration-200"
              style={{
                background: direction === mode ? "var(--accent)" : "transparent",
                color: direction === mode ? "#ffffff" : "var(--grey)",
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5">
        <div className="border border-[var(--line)] p-4">
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-3">
            {direction === "buy" ? "You Pay" : `You Sell ${market.symbol}`}
          </p>
          <div className="flex items-end justify-between gap-4">
            <input
              value={baseAmount}
              onChange={(event) => setBaseAmount(event.target.value)}
              className="w-full bg-transparent border-none outline-none font-serif text-[2rem] font-light tracking-[-0.03em] text-[var(--black)]"
            />
            <span className="text-[11px] font-light tracking-[0.18em] uppercase text-[var(--grey)] whitespace-nowrap">
              {direction === "buy" ? "USDC" : market.symbol}
            </span>
          </div>
        </div>

        <div className="border border-[var(--line)] p-4 bg-teal-50">
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-3">
            {direction === "buy" ? `Estimated ${market.symbol}` : "Estimated USDC"}
          </p>
          <div className="flex items-end justify-between gap-4">
            <p className="font-serif text-[2rem] font-light tracking-[-0.03em] text-[var(--black)]">
              {quote.toFixed(2)}
            </p>
            <span className="text-[11px] font-light tracking-[0.18em] uppercase text-[var(--grey)] whitespace-nowrap">
              {direction === "buy" ? market.symbol : "USDC"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-5 mt-6 mb-8">
        <div>
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
            Execution Price
          </p>
          <p className="text-[13px] font-light text-[var(--black)]">${market.price.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
            Treasury Reference
          </p>
          <p className="text-[13px] font-light text-[var(--black)]">
            ${market.treasuryReferencePrice.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
            Estimated Fee
          </p>
          <p className="text-[13px] font-light text-[var(--black)]">${fee.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
            Slippage Guard
          </p>
          <p className="text-[13px] font-light text-[var(--black)]">0.50% mock</p>
        </div>
      </div>

      <button className="w-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-4 text-[11px] font-light tracking-[0.2em] uppercase text-white transition-all duration-200 hover:bg-transparent hover:text-[var(--accent)]">
        Preview Trade
      </button>

      <p className="mt-4 text-[12px] font-light leading-[1.8] text-[var(--grey)]">
        Wireframe only. Quotes, slippage, and routing are illustrative and are meant to shape the UX before
        any live settlement or wallet logic is introduced.
      </p>
    </div>
  );
}
