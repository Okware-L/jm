"use client";

import React from "react";
import { OrganizationSwitcher, useAuth } from "@clerk/nextjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { WorkspaceChart, WorkspaceSection, WorkspaceStat, WorkspaceTable } from "@/lib/mock-data";
import type { WorkspaceActionDialog } from "@/lib/workspace-actions";
import WorkspaceModuleContent from "@/components/workspace/WorkspaceModuleContent";
import { usePlatformSignOut } from "@/lib/auth";

export default function RoleWorkspaceShell({
  eyebrow,
  title,
  subtitle,
  stats,
  sections,
  charts,
  tables,
  sidebarGroups,
  primaryActions,
  onPrimaryAction,
  onTableAction,
  busyAction,
  actionNotice,
  actionDialog,
  onDialogClose,
  onDialogSubmit,
  onDialogValueChange,
  showOrganizationSwitcher = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  stats: WorkspaceStat[];
  sections: WorkspaceSection[];
  charts: WorkspaceChart[];
  tables: WorkspaceTable[];
  sidebarGroups: { label: string; items: string[] }[];
  primaryActions: string[];
  onPrimaryAction?: (action: string) => void | Promise<void>;
  onTableAction?: (tableTitle: string, action: string) => void | Promise<void>;
  busyAction?: string | null;
  actionNotice?: { tone: "success" | "error"; text: string } | null;
  actionDialog?: WorkspaceActionDialog | null;
  onDialogClose?: () => void;
  onDialogSubmit?: () => void | Promise<void>;
  onDialogValueChange?: (name: string, value: string | boolean) => void;
  showOrganizationSwitcher?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { orgId } = useAuth();

  const handleSignOut = usePlatformSignOut();

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const firstSidebarItem = sidebarGroups[0]?.items[0] || "Overview";
  const activeView = searchParams.get("view") || slugify(firstSidebarItem);
  const activeViewLabel =
    sidebarGroups.flatMap((group) => group.items).find((item) => slugify(item) === activeView) ||
    firstSidebarItem;

  const actionIcon = (action: string) => {
    const value = action.toLowerCase();
    if (value.includes("upload")) return "↑";
    if (value.includes("add") || value.includes("create") || value.includes("link")) return "+";
    if (value.includes("review") || value.includes("view")) return "○";
    return "•";
  };

  const handleSidebarNavigate = (item: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", slugify(item));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-100" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex lg:w-72 border-r border-slate-200 bg-white flex-col">
          <div className="px-6 py-6 border-b border-slate-200">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">{eyebrow}</p>
            <h1 className="font-['Cormorant'] text-3xl font-light text-slate-900 leading-tight">{title}</h1>
            <p className="text-sm text-slate-500 mt-3">{subtitle}</p>
            {showOrganizationSwitcher && (
              <div className="mt-5 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Active Company Organization</p>
                {orgId ? (
                  <OrganizationSwitcher
                    hidePersonal
                    afterSelectOrganizationUrl={pathname}
                    afterLeaveOrganizationUrl="/dashboard"
                    appearance={{
                      elements: {
                        organizationSwitcherTrigger:
                          "w-full justify-between rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-none",
                      },
                    }}
                  />
                ) : (
                  <div className="border border-amber-200 bg-amber-50 px-3 py-3 text-xs text-amber-700">
                    No active Clerk organization is selected yet. Choose one before managing company-scoped records.
                  </div>
                )}
              </div>
            )}
          </div>

          <nav className="flex-1 px-6 py-6 space-y-6">
            {sidebarGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-3">{group.label}</p>
                <div className="space-y-1">
                  {group.items.map((item, index) => (
                    <button
                      key={item}
                      onClick={() => handleSidebarNavigate(item)}
                      className={`w-full text-left px-3 py-2.5 text-sm border transition-colors ${
                        slugify(item) === activeView
                          ? "border-[#2c5aa0]/20 bg-[#2c5aa0]/5 text-[#2c5aa0]"
                          : "border-transparent text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="px-6 py-5 border-t border-slate-200">
            <button
              onClick={handleSignOut}
              className="w-full px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="border-b border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2 lg:hidden">{eyebrow}</p>
                <h1 className="font-['Cormorant'] text-4xl font-light text-slate-900">{title}</h1>
                <p className="text-sm text-slate-500 mt-2 max-w-3xl">{subtitle}</p>
                {actionNotice && (
                  <div
                    className={`mt-4 inline-flex items-center gap-2 px-3 py-2 text-xs border ${
                      actionNotice.tone === "success"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    <span>{actionNotice.tone === "success" ? "Done" : "Error"}</span>
                    <span>{actionNotice.text}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {primaryActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => void onPrimaryAction?.(action)}
                    disabled={busyAction === action}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] border transition-colors ${
                      action.toLowerCase().includes("upload")
                        ? "border-[#2c5aa0] bg-[#2c5aa0] text-white hover:bg-[#1f467c]"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    } ${busyAction === action ? "opacity-60 cursor-wait" : ""}`}
                  >
                    <span className="text-sm leading-none">{actionIcon(action)}</span>
                    <span>{busyAction === action ? "Working..." : action}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
            <WorkspaceModuleContent
              activeView={activeView}
              activeViewLabel={activeViewLabel}
              defaultView={slugify(firstSidebarItem)}
              stats={stats}
              sections={sections}
              charts={charts}
              tables={tables}
              busyAction={busyAction}
              onTableAction={onTableAction}
            />
          </div>
        </main>
      </div>

      {actionDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4">
          <div className="w-full max-w-xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">
                  Workspace Action
                </p>
                <h2 className="font-['Cormorant'] text-3xl font-light text-slate-900">
                  {actionDialog.title}
                </h2>
                <p className="mt-2 text-sm text-slate-500">{actionDialog.description}</p>
              </div>
              <button
                onClick={onDialogClose}
                className="text-sm uppercase tracking-[0.18em] text-slate-400 hover:text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="px-6 py-6 space-y-5">
              {actionDialog.fields.map((field) => {
                const value = actionDialog.values[field.name];

                return (
                  <div key={field.name}>
                    <label className="block text-[10px] uppercase tracking-[0.22em] text-slate-400 mb-2">
                      {field.label}
                    </label>

                    {field.type === "select" && (
                      <select
                        value={String(value ?? "")}
                        onChange={(event) => onDialogValueChange?.(field.name, event.target.value)}
                        className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#2c5aa0]"
                      >
                        {(field.options || []).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {(field.type === "text" || field.type === "email") && (
                      <input
                        type={field.type}
                        value={String(value ?? "")}
                        onChange={(event) => onDialogValueChange?.(field.name, event.target.value)}
                        placeholder={field.placeholder}
                        className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#2c5aa0]"
                      />
                    )}

                    {field.type === "date" && (
                      <input
                        type="date"
                        value={String(value ?? "")}
                        onChange={(event) => onDialogValueChange?.(field.name, event.target.value)}
                        className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#2c5aa0]"
                      />
                    )}

                    {field.type === "textarea" && (
                      <textarea
                        value={String(value ?? "")}
                        onChange={(event) => onDialogValueChange?.(field.name, event.target.value)}
                        placeholder={field.placeholder}
                        rows={4}
                        className="w-full resize-none border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#2c5aa0]"
                      />
                    )}

                    {field.type === "checkbox" && (
                      <label className="inline-flex items-center gap-3 border border-slate-200 px-4 py-3 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={Boolean(value)}
                          onChange={(event) => onDialogValueChange?.(field.name, event.target.checked)}
                          className="h-4 w-4 accent-[#2c5aa0]"
                        />
                        <span>{field.label}</span>
                      </label>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-5">
              <button
                onClick={onDialogClose}
                className="px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => void onDialogSubmit?.()}
                disabled={busyAction === actionDialog.action}
                className={`px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] border border-[#2c5aa0] bg-[#2c5aa0] text-white hover:bg-[#1f467c] ${
                  busyAction === actionDialog.action ? "opacity-60 cursor-wait" : ""
                }`}
              >
                {busyAction === actionDialog.action ? "Saving..." : actionDialog.submitLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
