"use client";

import React from "react";
import type {
  WorkspaceChart,
  WorkspaceSection,
  WorkspaceStat,
  WorkspaceTable,
} from "@/lib/mock-data";

interface Props {
  activeView: string;
  activeViewLabel: string;
  defaultView: string;
  stats: WorkspaceStat[];
  sections: WorkspaceSection[];
  charts: WorkspaceChart[];
  tables: WorkspaceTable[];
  busyAction?: string | null;
  onTableAction?: (tableTitle: string, action: string) => void | Promise<void>;
}

function keywordMatcher(viewLabel: string) {
  const normalized = viewLabel.toLowerCase();

  if (normalized === "overview" || normalized === "platform overview") {
    return [];
  }

  if (normalized.includes("company")) return ["company", "leadership", "record", "profile"];
  if (normalized.includes("client")) return ["client", "service", "assignment", "request"];
  if (normalized.includes("worker")) return ["worker", "assigned clients", "role", "assignment"];
  if (normalized.includes("document")) return ["document", "supporting", "request", "review"];
  if (normalized.includes("due diligence")) return ["due diligence", "diligence", "review", "checklist", "flagged"];
  if (normalized.includes("funding")) return ["funding", "yield", "wallet", "milestone", "pool"];
  if (normalized.includes("compliance")) return ["compliance", "kyc", "kyb", "review", "identity"];
  if (normalized.includes("assigned team")) return ["worker", "assigned", "company", "team"];
  if (normalized.includes("service")) return ["service", "request", "coordination", "client"];
  if (normalized.includes("my profile")) return ["profile", "record", "snapshot", "display name"];
  if (normalized.includes("wallet")) return ["wallet", "yield", "staked", "earned"];
  if (normalized.includes("yield")) return ["yield", "pool", "staked", "performance"];
  if (normalized.includes("milestone")) return ["milestone", "report", "ledger"];
  if (normalized.includes("approval")) return ["approval", "review", "diligence"];
  if (normalized.includes("escalation")) return ["escalation", "flagged", "watchlist"];
  if (normalized.includes("assignment")) return ["assignment", "worker", "client", "company"];
  if (normalized.includes("platform")) return ["platform", "governance", "oversight"];

  return [normalized];
}

function matchesKeywords(value: string, keywords: string[]) {
  if (keywords.length === 0) return true;
  const haystack = value.toLowerCase();
  return keywords.some((keyword) => haystack.includes(keyword));
}

function filterSections(items: WorkspaceSection[], keywords: string[]) {
  return items.filter((item) =>
    matchesKeywords([item.title, item.description, ...(item.items || [])].join(" "), keywords)
  );
}

function filterCharts(items: WorkspaceChart[], keywords: string[]) {
  return items.filter((item) =>
    matchesKeywords([item.title, item.description, ...item.series.map((series) => series.label)].join(" "), keywords)
  );
}

function filterTables(items: WorkspaceTable[], keywords: string[]) {
  return items.filter((item) =>
    matchesKeywords([item.title, ...item.columns, ...item.rows.flat()].join(" "), keywords)
  );
}

function StatsGrid({ stats }: { stats: WorkspaceStat[] }) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="border border-slate-200 bg-white px-5 py-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{stat.label}</p>
          <p className="font-['Cormorant'] text-3xl font-light text-slate-900 mt-3">{stat.value}</p>
          {stat.hint && <p className="text-xs text-slate-400 mt-2">{stat.hint}</p>}
        </div>
      ))}
    </div>
  );
}

function SectionsGrid({ sections }: { sections: WorkspaceSection[] }) {
  if (sections.length === 0) return null;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {sections.map((section) => (
        <section key={section.title} className="border border-slate-200 bg-white px-5 py-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-['Cormorant'] text-2xl font-light text-slate-900">{section.title}</h2>
            {section.badge && (
              <span className="border border-slate-200 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                {section.badge}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed">{section.description}</p>
          {section.items && section.items.length > 0 && (
            <div className="mt-5 space-y-2">
              {section.items.map((item) => (
                <div key={item} className="flex items-start gap-3 border-t border-slate-100 pt-2.5 first:border-t-0 first:pt-0">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#2c5aa0] shrink-0" />
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

function ChartsGrid({ charts }: { charts: WorkspaceChart[] }) {
  if (charts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {charts.map((chart) => {
        const maxValue = Math.max(...chart.series.map((item) => item.value), 1);
        return (
          <section key={chart.title} className="border border-slate-200 bg-white px-5 py-5">
            <h2 className="font-['Cormorant'] text-2xl font-light text-slate-900">{chart.title}</h2>
            <p className="text-sm text-slate-500 mt-3">{chart.description}</p>
            <div className="mt-5 space-y-3">
              {chart.series.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-1.5">
                    <span>{item.label}</span>
                    <span>{item.displayValue}</span>
                  </div>
                  <div className="h-2 bg-slate-100 overflow-hidden">
                    <div className="h-full bg-[#2c5aa0]" style={{ width: `${(item.value / maxValue) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function TablesStack({
  tables,
  busyAction,
  onTableAction,
}: {
  tables: WorkspaceTable[];
  busyAction?: string | null;
  onTableAction?: (tableTitle: string, action: string) => void | Promise<void>;
}) {
  if (tables.length === 0) return null;

  return (
    <div className="space-y-4">
      {tables.map((table) => (
        <section key={table.title} className="border border-slate-200 bg-white overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
            <h2 className="font-['Cormorant'] text-2xl font-light text-slate-900">{table.title}</h2>
            {table.title.toLowerCase().includes("document") && (
              <button
                onClick={() => void onTableAction?.(table.title, "Upload Document")}
                disabled={busyAction === "Upload Document"}
                className={`inline-flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.18em] border border-[#2c5aa0] text-[#2c5aa0] hover:bg-[#2c5aa0] hover:text-white transition-colors ${
                  busyAction === "Upload Document" ? "opacity-60 cursor-wait" : ""
                }`}
              >
                <span className="text-sm leading-none">↑</span>
                <span>{busyAction === "Upload Document" ? "Working..." : "Upload Document"}</span>
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {table.columns.map((column) => (
                    <th
                      key={column}
                      className="px-5 py-3 text-left text-[10px] uppercase tracking-[0.18em] text-slate-400 font-medium"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, index) => (
                  <tr key={`${table.title}-${index}`} className="border-t border-slate-100 hover:bg-slate-50/70">
                    {row.map((cell, cellIndex) => (
                      <td key={`${table.title}-${index}-${cellIndex}`} className="px-5 py-3 text-slate-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

function EmptyModuleState() {
  return (
    <section className="border border-slate-200 bg-white px-5 py-6">
      <h2 className="font-['Cormorant'] text-2xl font-light text-slate-900">No Module Content Yet</h2>
      <p className="mt-3 text-sm text-slate-500">
        This sidebar route is active, but it does not have a dedicated workspace panel mapped yet.
      </p>
    </section>
  );
}

export default function WorkspaceModuleContent({
  activeView,
  activeViewLabel,
  defaultView,
  stats,
  sections,
  charts,
  tables,
  busyAction,
  onTableAction,
}: Props) {
  const keywords = keywordMatcher(activeViewLabel);
  const overview = activeView === defaultView;

  const visibleSections = overview ? sections : filterSections(sections, keywords);
  const visibleCharts = overview ? charts : filterCharts(charts, keywords);
  const visibleTables = overview ? tables : filterTables(tables, keywords);

  return (
    <div className="space-y-8">
      {!overview && (
        <div className="border border-slate-200 bg-white px-5 py-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Active View</p>
          <h2 className="font-['Cormorant'] text-2xl font-light text-slate-900 mt-2">{activeViewLabel}</h2>
        </div>
      )}

      <StatsGrid stats={stats} />
      <SectionsGrid sections={visibleSections} />
      <ChartsGrid charts={visibleCharts} />
      <TablesStack tables={visibleTables} busyAction={busyAction} onTableAction={onTableAction} />

      {visibleSections.length === 0 && visibleCharts.length === 0 && visibleTables.length === 0 && (
        <EmptyModuleState />
      )}
    </div>
  );
}
