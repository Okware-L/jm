import type { MarketMetricPoint } from "@/lib/market-data";

export default function MarketMiniChart({
  points,
  accent = false,
}: {
  points: MarketMetricPoint[];
  accent?: boolean;
}) {
  const max = Math.max(...points.map((point) => point.value));
  const min = Math.min(...points.map((point) => point.value));
  const range = max - min || 1;

  return (
    <div className="grid grid-cols-7 gap-2 items-end h-28">
      {points.map((point) => {
        const ratio = (point.value - min) / range;
        const height = `${Math.max(18, ratio * 100)}%`;

        return (
          <div key={point.label} className="flex flex-col items-center justify-end gap-2 h-full">
            <div
              className="w-full rounded-sm transition-all duration-300"
              style={{
                height,
                background: accent ? "var(--accent)" : "#0f172a",
                opacity: accent ? 0.82 : 0.74,
              }}
            />
            <span className="text-[10px] font-light tracking-[0.16em] uppercase text-[var(--grey)]">
              {point.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
