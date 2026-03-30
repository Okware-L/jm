"use client";

import RoleWorkspaceShell from "@/components/RoleWorkspaceShell";
import type { UserProfile } from "@/lib/auth";
import { useRequireRole } from "@/lib/auth";
import { useWorkspaceActions } from "@/lib/workspace-actions";
import { useWorkspaceData } from "@/lib/workspace-data";

export default function ClientPage() {
  const { state, profile } = useRequireRole(["client"]);

  if (state === "loading" || !profile) {
    return <LoadingScreen label="Opening client portal" />;
  }

  return <ClientWorkspace profile={profile} />;
}

function ClientWorkspace({ profile }: { profile: UserProfile }) {
  const { workspace, loading, reload } = useWorkspaceData("client", profile);
  const {
    busyAction,
    notice,
    dialog,
    closeDialog,
    submitDialog,
    updateDialogValue,
    handlePrimaryAction,
    handleTableAction,
  } = useWorkspaceActions({
    role: "client",
    profile,
    reload,
  });

  if (loading) {
    return <LoadingScreen label="Loading live client account" />;
  }

  return (
    <RoleWorkspaceShell
      eyebrow={workspace.eyebrow}
      title={workspace.title}
      subtitle={workspace.subtitle}
      stats={workspace.stats}
      sections={workspace.sections}
      charts={workspace.charts}
      tables={workspace.tables}
      sidebarGroups={workspace.sidebarGroups}
      primaryActions={workspace.primaryActions}
      onPrimaryAction={handlePrimaryAction}
      onTableAction={handleTableAction}
      busyAction={busyAction}
      actionNotice={notice}
      actionDialog={dialog}
      onDialogClose={closeDialog}
      onDialogSubmit={submitDialog}
      onDialogValueChange={updateDialogValue}
    />
  );
}

function LoadingScreen({ label }: { label: string }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-8 h-px bg-[#2c5aa0] mx-auto animate-pulse" />
        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">{label}</p>
      </div>
    </div>
  );
}
