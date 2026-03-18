import React from "react";

const ITEMS = [
  "Wealth Planning", "DeFi", "Pharma", "Agriculture",
  "Blockchain", "AI Medicine", "Real Estate", "Acquisitions",
];

export default function TickerBar() {
  // Duplicate for seamless loop
  const all = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-t border-b border-[var(--line)] py-3">
      <div className="ticker-track flex whitespace-nowrap">
        {all.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-7 pr-14
                       font-sans text-[11px] font-light tracking-[0.18em]
                       uppercase text-[var(--grey)]"
          >
            {item}
            <span className="text-[var(--line)]" aria-hidden="true">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}