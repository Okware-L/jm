"use client";

import type { UserProfile, UserRole } from "./auth";

export interface WorkspaceStat {
  label: string;
  value: string;
  hint?: string;
}

export interface WorkspaceSection {
  title: string;
  description: string;
  items?: string[];
  badge?: string;
}

export interface WorkspaceChartDatum {
  label: string;
  value: number;
  displayValue: string;
}

export interface WorkspaceChart {
  title: string;
  description: string;
  series: WorkspaceChartDatum[];
}

export interface WorkspaceTable {
  title: string;
  columns: string[];
  rows: string[][];
}

export interface WorkspaceMockData {
  eyebrow: string;
  title: string;
  subtitle: string;
  stats: WorkspaceStat[];
  sections: WorkspaceSection[];
  charts: WorkspaceChart[];
  tables: WorkspaceTable[];
  sidebarGroups: {
    label: string;
    items: string[];
  }[];
  primaryActions: string[];
}

interface CompanySeed {
  id: string;
  name: string;
  industry: string;
  city: string;
  fundingStatus: string;
  workerCount: number;
  clientCount: number;
}

interface WorkerSeed {
  id: string;
  name: string;
  companyId: string;
  title: string;
  assignedClients: number;
  anonymityEnabled: boolean;
}

interface ClientSeed {
  id: string;
  name: string;
  companyId: string;
  workerId: string;
  serviceNeed: string;
  status: string;
}

interface FundingRecipientSeed {
  id: string;
  name: string;
  riskProfile: string;
  stakedAmount: number;
  earnedAmount: number;
  milestoneStatus: string;
}

interface DocumentSeed {
  id: string;
  title: string;
  ownerType: "company" | "client" | "funding";
  ownerId: string;
  status: string;
  updatedAt: string;
}

interface DueDiligenceTaskSeed {
  id: string;
  companyId: string;
  ownerWorkerId: string;
  task: string;
  priority: string;
  status: string;
  due: string;
}

const mockDomain = {
  companies: [
    {
      id: "company-healthplus",
      name: "HealthPlus Ventures",
      industry: "Healthcare",
      city: "Nairobi",
      fundingStatus: "Seeking $185k bridge round",
      workerCount: 12,
      clientCount: 48,
    },
    {
      id: "company-aster",
      name: "Aster Labs",
      industry: "Healthcare Innovation",
      city: "Kigali",
      fundingStatus: "Compliance support only",
      workerCount: 4,
      clientCount: 11,
    },
    {
      id: "company-northwind",
      name: "Northwind Health",
      industry: "Diagnostics",
      city: "Mombasa",
      fundingStatus: "Documentation review",
      workerCount: 3,
      clientCount: 7,
    },
  ] satisfies CompanySeed[],
  workers: [
    {
      id: "worker-jane",
      name: "Jane Wanjiku",
      companyId: "company-healthplus",
      title: "Senior Account Manager",
      assignedClients: 8,
      anonymityEnabled: true,
    },
    {
      id: "worker-martin",
      name: "Martin Otieno",
      companyId: "company-healthplus",
      title: "Due Diligence Lead",
      assignedClients: 5,
      anonymityEnabled: false,
    },
    {
      id: "worker-claire",
      name: "Claire Njeri",
      companyId: "company-healthplus",
      title: "Operations Coordinator",
      assignedClients: 4,
      anonymityEnabled: false,
    },
  ] satisfies WorkerSeed[],
  clients: [
    {
      id: "client-tawidiagnostics",
      name: "Tawi Diagnostics",
      companyId: "company-healthplus",
      workerId: "worker-jane",
      serviceNeed: "Funding application support",
      status: "Fast-track onboarding",
    },
    {
      id: "client-telecliniceast",
      name: "TeleClinic East",
      companyId: "company-healthplus",
      workerId: "worker-jane",
      serviceNeed: "Funding escalation support",
      status: "Active",
    },
    {
      id: "client-northwind",
      name: "Northwind Health",
      companyId: "company-healthplus",
      workerId: "worker-martin",
      serviceNeed: "Signed agreements",
      status: "Waiting on documents",
    },
    {
      id: "client-asterlabs",
      name: "Aster Labs",
      companyId: "company-healthplus",
      workerId: "worker-jane",
      serviceNeed: "Compliance review",
      status: "Questionnaire overdue",
    },
  ] satisfies ClientSeed[],
  fundingRecipients: [
    {
      id: "funding-lena",
      name: "Lena Muthoni",
      riskProfile: "Balanced",
      stakedAmount: 24500,
      earnedAmount: 1280,
      milestoneStatus: "2 of 3 complete",
    },
    {
      id: "funding-ibrahim",
      name: "Ibrahim Noor",
      riskProfile: "Growth",
      stakedAmount: 31200,
      earnedAmount: 1940,
      milestoneStatus: "Reporting due",
    },
  ] satisfies FundingRecipientSeed[],
  documents: [
    {
      id: "doc-nda",
      title: "Signed NDA",
      ownerType: "client",
      ownerId: "client-asterlabs",
      status: "Completed",
      updatedAt: "Yesterday",
    },
    {
      id: "doc-bank-statements",
      title: "Bank statement pack",
      ownerType: "client",
      ownerId: "client-tawidiagnostics",
      status: "Needs March reconciliation",
      updatedAt: "2 hours ago",
    },
    {
      id: "doc-board-pack",
      title: "Board approval pack",
      ownerType: "company",
      ownerId: "company-healthplus",
      status: "Ready for investor room",
      updatedAt: "Today",
    },
    {
      id: "doc-funding-report",
      title: "Capital deployment report",
      ownerType: "funding",
      ownerId: "funding-lena",
      status: "Submitted",
      updatedAt: "3 days ago",
    },
  ] satisfies DocumentSeed[],
  dueDiligenceTasks: [
    {
      id: "dd-tax",
      companyId: "company-healthplus",
      ownerWorkerId: "worker-martin",
      task: "Validate tax compliance annex",
      priority: "High",
      status: "Flagged",
      due: "Today",
    },
    {
      id: "dd-kyb",
      companyId: "company-healthplus",
      ownerWorkerId: "worker-jane",
      task: "Review KYB upload set for Tawi Diagnostics",
      priority: "Medium",
      status: "In review",
      due: "Tomorrow",
    },
    {
      id: "dd-site-visit",
      companyId: "company-healthplus",
      ownerWorkerId: "worker-martin",
      task: "Prepare site visit summary",
      priority: "Low",
      status: "Queued",
      due: "Friday",
    },
  ] satisfies DueDiligenceTaskSeed[],
};

function currency(value: number) {
  return `$${value.toLocaleString()}`;
}

function buildCompanyWorkspace(profile: UserProfile): WorkspaceMockData {
  const company = mockDomain.companies[0];
  const companyWorkers = mockDomain.workers.filter((worker) => worker.companyId === company.id);
  const companyClients = mockDomain.clients.filter((client) => client.companyId === company.id);
  const companyDocuments = mockDomain.documents.filter((document) => document.ownerType === "company" || document.ownerId === company.id);

  return {
    eyebrow: "Company Workspace",
    title: profile.companyName || company.name,
    subtitle: "Manage your company profile, workers, clients, documents, and funding activity from one place.",
    stats: [
      { label: "Workers", value: String(company.workerCount), hint: "3 new this week" },
      { label: "Clients", value: String(company.clientCount), hint: "9 high-priority accounts" },
      { label: "Documents", value: "126", hint: "11 awaiting review" },
      { label: "Funding", value: "$185k", hint: "2 active requests" },
    ],
    sections: [
      {
        title: "Leadership Snapshot",
        description: "This workspace is now backed by a real company record in Firestore instead of only a registration application.",
        badge: "Operational Mock",
        items: [
          `${company.name} is listed under ${profile.industry || company.industry} with ${company.city} as the primary operating city.`,
          `Current funding note: ${company.fundingStatus}.`,
          "The company workspace is positioned as an action surface for operations, staffing, diligence, and document handling.",
        ],
      },
      {
        title: "Operational Signals",
        description: "These seeded records show how workers, clients, documents, and diligence items connect inside the company scope.",
        items: [
          `${companyWorkers.length} active workers are attached to this company seed.`,
          `${companyClients.length} seeded clients are currently mapped into this workspace.`,
          `${companyDocuments.length} document records and ${mockDomain.dueDiligenceTasks.length} diligence tasks are ready for UI reuse.`,
        ],
      },
    ],
    charts: [
      {
        title: "Client Pipeline",
        description: "Seeded distribution of client workload across the current company workspace.",
        series: [
          { label: "Active", value: 31, displayValue: "31" },
          { label: "Review", value: 9, displayValue: "9" },
          { label: "Blocked", value: 5, displayValue: "5" },
          { label: "Escalated", value: 3, displayValue: "3" },
        ],
      },
      {
        title: "Document Status",
        description: "Mock document readiness for company-side operations.",
        series: [
          { label: "Complete", value: 62, displayValue: "62" },
          { label: "In Review", value: 28, displayValue: "28" },
          { label: "Requested", value: 21, displayValue: "21" },
          { label: "Overdue", value: 11, displayValue: "11" },
        ],
      },
    ],
    tables: [
      {
        title: "Workers",
        columns: ["Name", "Role", "Assigned Clients", "Anonymous Mode"],
        rows: companyWorkers.map((worker) => [
          worker.name,
          worker.title,
          String(worker.assignedClients),
          worker.anonymityEnabled ? "Enabled" : "Off",
        ]),
      },
      {
        title: "Client Accounts",
        columns: ["Client", "Service Need", "Status", "Assigned Worker"],
        rows: companyClients.map((client) => [
          client.name,
          client.serviceNeed,
          client.status,
          mockDomain.workers.find((worker) => worker.id === client.workerId)?.name || "Unassigned",
        ]),
      },
      {
        title: "Document Register",
        columns: ["Document", "Owner", "Status", "Updated"],
        rows: [
          ["Board approval pack", company.name, "Ready for investor room", "Today"],
          ["Bridge funding statement", company.name, "Awaiting CFO upload", "4 hours ago"],
          ["Tax compliance annex", "Tawi Diagnostics", "Missing pages", "1 hour ago"],
        ],
      },
      {
        title: "Due Diligence Queue",
        columns: ["Task", "Owner", "Priority", "Due"],
        rows: mockDomain.dueDiligenceTasks.map((task) => [
          task.task,
          mockDomain.workers.find((worker) => worker.id === task.ownerWorkerId)?.name || "Unknown",
          task.priority,
          task.due,
        ]),
      },
    ],
    sidebarGroups: [
      { label: "Workspace", items: ["Overview", "Company Profile", "Clients", "Workers"] },
      { label: "Operations", items: ["Documents", "Due Diligence", "Funding", "Compliance"] },
    ],
    primaryActions: ["Upload Document", "Request Document", "Add Worker", "Assign Client"],
  };
}

function buildClientWorkspace(profile: UserProfile): WorkspaceMockData {
  const client = mockDomain.clients.find((item) => item.name === profile.displayName) || mockDomain.clients[0];
  const assignedWorker = mockDomain.workers.find((worker) => worker.id === client.workerId) || mockDomain.workers[0];
  const relatedDocuments = mockDomain.documents.filter((document) => document.ownerId === client.id);

  return {
    eyebrow: "Client Portal",
    title: profile.displayName,
    subtitle: "Track your assigned company team, documents, compliance pack, and service requests.",
    stats: [
      { label: "Assigned Worker", value: assignedWorker.name.split(" ")[0] + " W.", hint: "Current servicing contact" },
      { label: "Documents", value: String(Math.max(relatedDocuments.length, 7)), hint: "2 require action" },
      { label: "Requests", value: "4", hint: "1 urgent" },
      { label: "Compliance", value: "82%", hint: "Near completion" },
    ],
    sections: [
      {
        title: "Account Snapshot",
        description: "This seeded client portal is designed to feel operational, not generic.",
        badge: "Client Mock",
        items: [
          `Primary service need is ${client.serviceNeed.toLowerCase()}.`,
          "Preferred contact window is weekday mornings in Nairobi time.",
          `Company assignment is ${mockDomain.companies.find((company) => company.id === client.companyId)?.name || "Pending"} for the current engagement cycle.`,
        ],
      },
      {
        title: "Service Coordination",
        description: "The client side is centered around requests, document readiness, and accountable servicing.",
        items: [
          `Assigned worker is ${assignedWorker.name}, currently handling ${assignedWorker.assignedClients} client accounts.`,
          "Escalation fallback is the company admin if response time exceeds 24 hours.",
          "Service handoff and compliance progress should eventually be driven by live assignment records.",
        ],
      },
    ],
    charts: [
      {
        title: "Request Health",
        description: "Seeded status mix for the current client account.",
        series: [
          { label: "Open", value: 4, displayValue: "4" },
          { label: "Waiting", value: 2, displayValue: "2" },
          { label: "Completed", value: 6, displayValue: "6" },
        ],
      },
      {
        title: "Compliance Pack",
        description: "Mock readiness across the current client checklist.",
        series: [
          { label: "Uploaded", value: 8, displayValue: "8" },
          { label: "Reviewed", value: 5, displayValue: "5" },
          { label: "Missing", value: 2, displayValue: "2" },
        ],
      },
    ],
    tables: [
      {
        title: "Documents",
        columns: ["Document", "Status", "Updated"],
        rows: [
          ...relatedDocuments.map((document) => [document.title, document.status, document.updatedAt]),
          ["Business registration certificate", "Uploaded", "Yesterday"],
          ["Bank statement pack", "Needs March reconciliation", "2 hours ago"],
        ],
      },
      {
        title: "Service Requests",
        columns: ["Request", "Owner", "Status"],
        rows: [
          ["Funding application assistance", "Jane W.", "In review"],
          ["Compliance pack check", "Jane W.", "Waiting on upload"],
          ["NDA verification", "Company admin", "Completed"],
        ],
      },
    ],
    sidebarGroups: [
      { label: "Portal", items: ["Overview", "My Profile", "Assigned Team"] },
      { label: "Work", items: ["Documents", "Service Requests", "Compliance"] },
    ],
    primaryActions: ["Upload Document", "View Service Pack", "Complete Request"],
  };
}

function buildFundingWorkspace(profile: UserProfile): WorkspaceMockData {
  const recipient =
    mockDomain.fundingRecipients.find((item) => item.name === profile.displayName) || mockDomain.fundingRecipients[0];
  const fundingDocuments = mockDomain.documents.filter((document) => document.ownerType === "funding");

  return {
    eyebrow: "Funding Workspace",
    title: profile.displayName,
    subtitle: "Manage your funding profile, staking readiness, transaction history, milestone reporting, and supporting documents.",
    stats: [
      { label: "Wallet", value: "Ready", hint: "Mock address reserved" },
      { label: "Staked", value: currency(recipient.stakedAmount), hint: "Across 2 pools" },
      { label: "Earned", value: currency(recipient.earnedAmount), hint: "30 day window" },
      { label: "Milestones", value: "3", hint: "2 complete" },
    ],
    sections: [
      {
        title: "Funding Profile",
        description: "The funding workspace is positioned around accountable reporting, not just passive display.",
        badge: "Yield Mock",
        items: [
          `Risk profile is ${recipient.riskProfile} with healthcare and education as preferred sectors.`,
          "KYC fields are complete and wallet linking is the next activation step.",
          "Initial stake preference is configured for recurring monthly deposits.",
        ],
      },
      {
        title: "Milestone Reporting",
        description: "Disbursement and reporting should eventually live here with clear status tracking.",
        items: [
          "Milestone 01: onboarding complete and verified.",
          "Milestone 02: capital deployment report submitted.",
          `Milestone summary: ${recipient.milestoneStatus}.`,
        ],
      },
    ],
    charts: [
      {
        title: "Yield Performance",
        description: "Seeded monthly earnings trend for the funding workspace.",
        series: [
          { label: "Jan", value: 220, displayValue: "$220" },
          { label: "Feb", value: 310, displayValue: "$310" },
          { label: "Mar", value: 420, displayValue: "$420" },
          { label: "Apr", value: 330, displayValue: "$330" },
        ],
      },
      {
        title: "Pool Allocation",
        description: "Mock split of staked capital across seeded pools.",
        series: [
          { label: "Balanced A", value: 55, displayValue: "55%" },
          { label: "Growth B", value: 30, displayValue: "30%" },
          { label: "Reserve", value: 15, displayValue: "15%" },
        ],
      },
    ],
    tables: [
      {
        title: "Funding Records",
        columns: ["Recipient", "Risk", "Staked", "Earned"],
        rows: mockDomain.fundingRecipients.map((item) => [
          item.name,
          item.riskProfile,
          currency(item.stakedAmount),
          currency(item.earnedAmount),
        ]),
      },
      {
        title: "Supporting Documents",
        columns: ["Document", "Status", "Updated"],
        rows: fundingDocuments.map((document) => [document.title, document.status, document.updatedAt]),
      },
      {
        title: "Milestone Ledger",
        columns: ["Milestone", "Status", "Owner"],
        rows: [
          ["Onboarding verification", "Complete", "Platform"],
          ["Capital deployment report", "Submitted", recipient.name],
          ["Quarterly outcome review", "Due in 9 days", recipient.name],
        ],
      },
    ],
    sidebarGroups: [
      { label: "Funding", items: ["Overview", "Wallet", "Yield Pools"] },
      { label: "Records", items: ["Documents", "Milestones", "Compliance"] },
    ],
    primaryActions: ["Upload Report", "Link Wallet", "View Pool Terms"],
  };
}

function buildWorkerWorkspace(profile: UserProfile): WorkspaceMockData {
  const worker = mockDomain.workers.find((item) => item.name === profile.displayName) || mockDomain.workers[0];
  const assignedClients = mockDomain.clients.filter((client) => client.workerId === worker.id);
  const diligenceTasks = mockDomain.dueDiligenceTasks.filter((task) => task.ownerWorkerId === worker.id);
  const company = mockDomain.companies.find((item) => item.id === worker.companyId) || mockDomain.companies[0];

  return {
    eyebrow: "Worker Console",
    title: profile.displayName,
    subtitle: "Handle assigned clients, document tasks, due diligence, and escalations within your company scope.",
    stats: [
      { label: "Assigned Clients", value: String(Math.max(worker.assignedClients, assignedClients.length)), hint: "2 escalated" },
      { label: "Open Tasks", value: String(diligenceTasks.length + 14), hint: "5 due today" },
      { label: "Documents", value: "23", hint: "6 need review" },
      { label: "Approvals", value: "4", hint: "2 awaiting decision" },
    ],
    sections: [
      {
        title: "Company Scope",
        description: "Workers should only exist after being created by a company admin and attached to a company membership.",
        badge: "Assigned",
        items: [
          `Current scope is ${company.name}, ${company.industry} vertical, ${company.city} region.`,
          "Permissions include client follow-up, document review, and onboarding tasks.",
          "Cross-company access remains disabled in the target operating model.",
        ],
      },
      {
        title: "Client Handling",
        description: "This console should feel like an action surface for real operational follow-up.",
        items: [
          "Northwind Health requires two final KYC uploads before activation.",
          "Aster Labs has an overdue compliance questionnaire due by 4 PM.",
          "TeleClinic East needs a funding issue escalated to the company admin.",
        ],
      },
    ],
    charts: [
      {
        title: "Task Load",
        description: "Seeded due diligence and client-response workload this week.",
        series: [
          { label: "Due Diligence", value: 6, displayValue: "6" },
          { label: "Client Requests", value: 8, displayValue: "8" },
          { label: "Doc Review", value: 5, displayValue: "5" },
          { label: "Escalations", value: 2, displayValue: "2" },
        ],
      },
      {
        title: "Approval Load",
        description: "Seeded approvals and review pressure by day.",
        series: [
          { label: "Mon", value: 4, displayValue: "4" },
          { label: "Tue", value: 6, displayValue: "6" },
          { label: "Wed", value: 5, displayValue: "5" },
          { label: "Thu", value: 7, displayValue: "7" },
          { label: "Fri", value: 3, displayValue: "3" },
        ],
      },
    ],
    tables: [
      {
        title: "Assigned Clients",
        columns: ["Client", "Need", "Status"],
        rows: assignedClients.map((client) => [client.name, client.serviceNeed, client.status]),
      },
      {
        title: "Due Diligence Tasks",
        columns: ["Task", "Priority", "Status", "Due"],
        rows: diligenceTasks.map((task) => [task.task, task.priority, task.status, task.due]),
      },
      {
        title: "Document Review Queue",
        columns: ["Client", "Document", "Status"],
        rows: [
          ["Northwind Health", "Service agreements", "Waiting on signatures"],
          ["Aster Labs", "Compliance questionnaire", "Overdue"],
          ["Tawi Diagnostics", "KYB upload set", "In review"],
        ],
      },
    ],
    sidebarGroups: [
      { label: "Console", items: ["Overview", "Assigned Clients", "Approvals"] },
      { label: "Actions", items: ["Documents", "Due Diligence", "Escalations"] },
    ],
    primaryActions: ["Request Document", "Mark Review Complete", "Escalate Task"],
  };
}

function buildSuperadminWorkspace(profile: UserProfile): WorkspaceMockData {
  const activeCompanies = mockDomain.companies.length;
  const activeWorkers = mockDomain.workers.length;
  const activeClients = mockDomain.clients.length;
  const activeFundingRecipients = mockDomain.fundingRecipients.length;
  const activeDocuments = mockDomain.documents.length;
  const activeTasks = mockDomain.dueDiligenceTasks.length;

  return {
    eyebrow: "Superadmin Oversight",
    title: profile.displayName,
    subtitle: "Govern the full platform across companies, workers, clients, funding recipients, compliance workflows, and operational health.",
    stats: [
      { label: "Companies", value: String(activeCompanies), hint: "1 flagged for follow-up" },
      { label: "Workers", value: String(activeWorkers), hint: "All scoped to companies" },
      { label: "Clients", value: String(activeClients), hint: "2 need assignment review" },
      { label: "Funding", value: String(activeFundingRecipients), hint: "1 report overdue" },
    ],
    sections: [
      {
        title: "Platform Governance",
        description: "Superadmin oversees the network, but company operations should still stay inside the company and worker scopes.",
        badge: "Oversight Mock",
        items: [
          `${activeCompanies} seeded companies are live in the platform catalog.`,
          `${activeWorkers} workers and ${activeClients} clients are currently represented in the shared seed graph.`,
          "This layer is intended for governance, exceptions, assignments, compliance, and platform health rather than day-to-day company operations.",
        ],
      },
      {
        title: "Operational Watchlist",
        description: "A small seeded watchlist that mirrors the kind of issues a superadmin should monitor.",
        items: [
          "HealthPlus Ventures has 11 documents awaiting review and one active funding escalation.",
          "TeleClinic East has a funding escalation that should remain in audit scope.",
          "One funding recipient milestone report is nearing deadline and should be monitored from the funding workspace.",
        ],
      },
    ],
    charts: [
      {
        title: "Platform Composition",
        description: "Seeded entity distribution across the current mock platform.",
        series: [
          { label: "Companies", value: activeCompanies, displayValue: String(activeCompanies) },
          { label: "Workers", value: activeWorkers, displayValue: String(activeWorkers) },
          { label: "Clients", value: activeClients, displayValue: String(activeClients) },
          { label: "Funding", value: activeFundingRecipients, displayValue: String(activeFundingRecipients) },
        ],
      },
      {
        title: "Oversight Queue",
        description: "Mock governance queue across documents, due diligence, and escalations.",
        series: [
          { label: "Documents", value: activeDocuments, displayValue: String(activeDocuments) },
          { label: "Due Diligence", value: activeTasks, displayValue: String(activeTasks) },
          { label: "Escalations", value: 2, displayValue: "2" },
          { label: "Assignments", value: 4, displayValue: "4" },
        ],
      },
    ],
    tables: [
      {
        title: "Company Registry",
        columns: ["Company", "Industry", "City", "Funding Status"],
        rows: mockDomain.companies.map((company) => [
          company.name,
          company.industry,
          company.city,
          company.fundingStatus,
        ]),
      },
      {
        title: "Worker Oversight",
        columns: ["Worker", "Company", "Role", "Assigned Clients"],
        rows: mockDomain.workers.map((worker) => [
          worker.name,
          mockDomain.companies.find((company) => company.id === worker.companyId)?.name || "Unknown",
          worker.title,
          String(worker.assignedClients),
        ]),
      },
      {
        title: "Due Diligence Queue",
        columns: ["Task", "Owner", "Priority", "Due"],
        rows: mockDomain.dueDiligenceTasks.map((task) => [
          task.task,
          mockDomain.workers.find((worker) => worker.id === task.ownerWorkerId)?.name || "Unknown",
          task.priority,
          task.due,
        ]),
      },
      {
        title: "Document Oversight",
        columns: ["Document", "Owner Type", "Status", "Updated"],
        rows: mockDomain.documents.map((document) => [
          document.title,
          document.ownerType,
          document.status,
          document.updatedAt,
        ]),
      },
    ],
    sidebarGroups: [
      { label: "Oversight", items: ["Platform Overview", "Companies", "Assignments"] },
      { label: "Governance", items: ["Documents", "Due Diligence", "Compliance"] },
    ],
    primaryActions: ["Create Company", "Review Escalations", "Open Audit Pack"],
  };
}

export function getWorkspaceMockData(role: UserRole, profile: UserProfile): WorkspaceMockData {
  switch (role) {
    case "superadmin":
      return buildSuperadminWorkspace(profile);
    case "company_admin":
      return buildCompanyWorkspace(profile);
    case "client":
      return buildClientWorkspace(profile);
    case "funding_recipient":
      return buildFundingWorkspace(profile);
    case "worker":
      return buildWorkerWorkspace(profile);
    default:
      return {
        eyebrow: "Workspace",
        title: profile.displayName,
        subtitle: "This workspace will be populated with shared seeded data as the platform grows.",
        stats: [],
        sections: [],
        charts: [],
        tables: [],
        sidebarGroups: [],
        primaryActions: [],
      };
  }
}
