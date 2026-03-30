"use client";

import { useMemo, useState } from "react";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "../../firebseConfig";
import type { UserProfile, UserRole } from "./auth";
import { assertCompanyScope } from "./domain-access";
import {
  assignClientToWorker,
  createDocumentRequest,
  createCompanyWorker,
  createDocumentRecord,
  type ClientRecord,
  type DocumentRequestRecord,
  type WorkerRecord,
} from "./platform";

type WorkspaceRole = Exclude<UserRole, null>;

interface NoticeState {
  tone: "success" | "error";
  text: string;
}

export interface WorkspaceActionFieldOption {
  label: string;
  value: string;
}

export interface WorkspaceActionField {
  name: string;
  label: string;
  type: "text" | "email" | "select" | "checkbox" | "textarea" | "date";
  placeholder?: string;
  required?: boolean;
  options?: WorkspaceActionFieldOption[];
}

export interface WorkspaceActionDialog {
  action: string;
  title: string;
  description: string;
  submitLabel: string;
  fields: WorkspaceActionField[];
  values: Record<string, string | boolean>;
}

interface WorkspaceActionsConfig {
  role: WorkspaceRole;
  profile: UserProfile;
  reload: () => Promise<void>;
}

function getDefaultValues(fields: WorkspaceActionField[]) {
  return fields.reduce<Record<string, string | boolean>>((accumulator, field) => {
    if (field.type === "checkbox") {
      accumulator[field.name] = false;
      return accumulator;
    }

    if (field.type === "select") {
      accumulator[field.name] = field.options?.[0]?.value || "";
      return accumulator;
    }

    accumulator[field.name] = "";
    return accumulator;
  }, {});
}

export function useWorkspaceActions({
  role,
  profile,
  reload,
}: WorkspaceActionsConfig) {
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [notice, setNotice] = useState<NoticeState | null>(null);
  const [dialog, setDialog] = useState<WorkspaceActionDialog | null>(null);

  const ownerType = useMemo(() => {
    if (role === "company_admin") return "company" as const;
    if (role === "worker") return "company" as const;
    if (role === "funding_recipient") return "funding" as const;
    return "client" as const;
  }, [role]);

  const ownerId = useMemo(() => {
    if (role === "company_admin" || role === "worker") return profile.companyId || profile.entityId || "";
    return profile.uid;
  }, [profile.companyId, profile.entityId, profile.uid, role]);

  const openDialog = (config: Omit<WorkspaceActionDialog, "values">) => {
    setDialog({
      ...config,
      values: getDefaultValues(config.fields),
    });
  };

  const buildDocumentDialog = async (action: string) => {
    const requestOptions: WorkspaceActionFieldOption[] = [{ label: "Not linked to a request", value: "" }];

    const requestsSnapshot = await getDocs(collection(db, "documentRequests"));
    requestsSnapshot.docs.forEach((item) => {
      const request = item.data() as DocumentRequestRecord;
      const belongsToOwner =
        (ownerType === "company" &&
          request.requestedFromType === "company" &&
          request.requestedFromId === ownerId) ||
        (ownerType === "client" &&
          request.requestedFromType === "client" &&
          request.requestedFromId === profile.uid) ||
        (ownerType === "funding" &&
          request.requestedFromType === "funding_recipient" &&
          request.requestedFromId === profile.uid);

      if (belongsToOwner && (request.status === "open" || request.status === "rejected")) {
        requestOptions.push({
          label: `${request.title} (${request.status})`,
          value: request.id,
        });
      }
    });

    openDialog({
      action,
      title: action === "Upload Report" ? "Upload Report" : "Upload Document",
      description: "Capture the core metadata now, then store the record directly in Firestore.",
      submitLabel: action === "Upload Report" ? "Save Report" : "Save Document",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          placeholder: "e.g. Board approval pack",
          required: true,
        },
        {
          name: "status",
          label: "Initial Status",
          type: "select",
          required: true,
          options: [
            { label: "Uploaded", value: "uploaded" },
            { label: "Draft", value: "draft" },
            { label: "In Review", value: "in_review" },
          ],
        },
        {
          name: "requestId",
          label: "Linked Request",
          type: "select",
          options: requestOptions,
        },
      ],
    });
  };

  const buildWorkerDialog = () => {
    openDialog({
      action: "Add Worker",
      title: "Add Worker",
      description: "Provision a pending worker seat for the active Clerk organization and store the operational worker record in Firestore.",
      submitLabel: "Provision Worker",
      fields: [
        {
          name: "displayName",
          label: "Full Name",
          type: "text",
          placeholder: "e.g. Jane Wanjiku",
          required: true,
        },
        {
          name: "email",
          label: "Email Address",
          type: "email",
          placeholder: "jane@company.com",
          required: true,
        },
        {
          name: "title",
          label: "Role Title",
          type: "text",
          placeholder: "Account Manager",
          required: true,
        },
        {
          name: "anonymityEnabled",
          label: "Enable Anonymous Mode",
          type: "checkbox",
        },
      ],
    });
  };

  const buildAssignmentDialog = async () => {
    if (!profile.companyId) {
      throw new Error("This company workspace is missing its company ID.");
    }

    const [clientsSnapshot, workersSnapshot] = await Promise.all([
      getDocs(collection(db, "clients")),
      getDocs(query(collection(db, "workers"), where("companyId", "==", profile.companyId))),
    ]);

    const clientOptions = clientsSnapshot.docs
      .map((item) => {
        const data = item.data() as ClientRecord;
        return {
          value: data.userId,
          label: `${data.displayName} (${data.email})`,
          companyId: data.companyId,
        };
      })
      .filter((item) => !item.companyId || item.companyId === profile.companyId);

    const workerOptions = workersSnapshot.docs.map((item) => {
      const data = item.data() as WorkerRecord;
      return {
        value: item.id,
        label: `${data.displayName} (${data.title})`,
      };
    });

    if (clientOptions.length === 0) {
      throw new Error("There are no assignable clients in Firestore yet.");
    }

    if (workerOptions.length === 0) {
      throw new Error("There are no workers in this company yet.");
    }

    openDialog({
      action: "Assign Client",
      title: "Assign Client",
      description: "Link a client to a worker inside the current company scope.",
      submitLabel: "Save Assignment",
      fields: [
        {
          name: "clientIdentifier",
          label: "Client",
          type: "select",
          required: true,
          options: clientOptions,
        },
        {
          name: "workerIdentifier",
          label: "Worker",
          type: "select",
          required: true,
          options: workerOptions,
        },
      ],
    });
  };

  const buildRequestDialog = async () => {
    if (!profile.companyId) {
      throw new Error("This workspace is missing its company ID.");
    }

    const [clientsSnapshot, workersSnapshot] = await Promise.all([
      getDocs(collection(db, "clients")),
      getDocs(query(collection(db, "workers"), where("companyId", "==", profile.companyId))),
    ]);

    const requestTargets: WorkspaceActionFieldOption[] = [
      { label: "Company Document Library", value: `company::${profile.companyId}` },
      ...clientsSnapshot.docs
        .map((item) => item.data() as ClientRecord)
        .filter((client) => client.companyId === profile.companyId)
        .map((client) => ({
          label: `${client.displayName} (${client.email})`,
          value: `client::${client.userId}`,
        })),
    ];

    const reviewerOptions: WorkspaceActionFieldOption[] =
      role === "company_admin"
        ? [
            { label: "No reviewer assigned yet", value: "" },
            ...workersSnapshot.docs.map((item) => {
              const worker = item.data() as WorkerRecord;
              return {
                label: `${worker.displayName} (${worker.title}${worker.userId ? "" : ", pending invite"})`,
                value: worker.userId || worker.id,
              };
            }),
          ]
        : [{ label: "Assigned to me", value: profile.uid }];

    openDialog({
      action: "Request Document",
      title: "Request Document",
      description: "Create a live document request that can later be fulfilled and reviewed inside the workflow.",
      submitLabel: "Create Request",
      fields: [
        {
          name: "title",
          label: "Request Title",
          type: "text",
          placeholder: "e.g. Tax compliance certificate",
          required: true,
        },
        {
          name: "documentType",
          label: "Document Type",
          type: "select",
          required: true,
          options: [
            { label: "Company Business Document", value: "company_business" },
            { label: "KYC/KYB Document", value: "kyc_kyb" },
            { label: "Due Diligence Report", value: "due_diligence_report" },
            { label: "Funding Application", value: "funding_application" },
            { label: "Service Agreement", value: "service_agreement" },
            { label: "NDA", value: "nda" },
            { label: "Contract", value: "contract" },
            { label: "Other", value: "other" },
          ],
        },
        {
          name: "requestedFrom",
          label: "Requested From",
          type: "select",
          required: true,
          options: requestTargets,
        },
        {
          name: "priority",
          label: "Priority",
          type: "select",
          required: true,
          options: [
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
            { label: "Critical", value: "critical" },
          ],
        },
        {
          name: "assignedReviewerUserId",
          label: "Assigned Reviewer",
          type: "select",
          options: reviewerOptions,
        },
        {
          name: "dueDate",
          label: "Due Date",
          type: "date",
        },
        {
          name: "description",
          label: "Request Description",
          type: "textarea",
          placeholder: "Explain exactly what should be uploaded and why it is needed.",
          required: true,
        },
      ],
    });
  };

  const handlePrimaryAction = async (action: string) => {
    setNotice(null);

    try {
      if (action === "Upload Document" || action === "Upload Report") {
        await buildDocumentDialog(action);
        return;
      }

      if (action === "Add Worker") {
        buildWorkerDialog();
        return;
      }

      if (action === "Assign Client") {
        setBusyAction(action);
        await buildAssignmentDialog();
        return;
      }

      if (action === "Request Document") {
        setBusyAction(action);
        await buildRequestDialog();
        return;
      }

      setNotice({
        tone: "error",
        text: `${action} is not wired to Firestore yet.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "The action failed.";
      setNotice({ tone: "error", text: message });
    } finally {
      setBusyAction(null);
    }
  };

  const handleSubmit = async () => {
    if (!dialog) return;

    for (const field of dialog.fields) {
      if (!field.required) continue;
      const value = dialog.values[field.name];

      if (field.type === "checkbox") continue;
      if (!String(value || "").trim()) {
        setNotice({ tone: "error", text: `${field.label} is required.` });
        return;
      }
    }

    setBusyAction(dialog.action);
    setNotice(null);

    try {
      if (dialog.action === "Upload Document" || dialog.action === "Upload Report") {
        if (!ownerId) {
          throw new Error("This workspace does not have a valid document owner yet.");
        }

        await createDocumentRecord({
          title: String(dialog.values.title).trim(),
          documentType: role === "funding_recipient" ? "funding_supporting_document" : ownerType === "client" ? "client_supporting_document" : "company_business_document",
          uploadedByUserId: profile.uid,
          ownerType,
          ownerId,
          requestId: String(dialog.values.requestId || "").trim() || null,
          companyId: profile.companyId || null,
          clientId: role === "client" ? profile.uid : null,
          workerId: role === "worker" ? profile.entityId || profile.uid : null,
          visibility: ownerType === "company" ? "company" : "private",
          linkedEntityType: String(dialog.values.requestId || "").trim() ? "request" : null,
          linkedEntityId: String(dialog.values.requestId || "").trim() || null,
          status: String(dialog.values.status).trim() as "draft" | "uploaded" | "in_review",
        });

        await reload();
        setNotice({
          tone: "success",
          text: `"${String(dialog.values.title).trim()}" was added to Firestore.`,
        });
        setDialog(null);
        return;
      }

      if (dialog.action === "Add Worker") {
        const companyId = assertCompanyScope(profile, profile.companyId);
        if (!profile.clerkOrganizationId) {
          throw new Error("This company workspace does not have an active Clerk organization yet.");
        }

        await createCompanyWorker({
          companyId,
          clerkOrganizationId: profile.clerkOrganizationId,
          displayName: String(dialog.values.displayName).trim(),
          email: String(dialog.values.email).trim(),
          title: String(dialog.values.title).trim(),
          anonymityEnabled: Boolean(dialog.values.anonymityEnabled),
        });

        await reload();
        setNotice({
          tone: "success",
          text: `${String(dialog.values.displayName).trim()} was provisioned as a pending worker under the active organization.`,
        });
        setDialog(null);
        return;
      }

      if (dialog.action === "Assign Client") {
        const companyId = assertCompanyScope(profile, profile.companyId);

        const result = await assignClientToWorker({
          companyId,
          clientIdentifier: String(dialog.values.clientIdentifier).trim(),
          workerIdentifier: String(dialog.values.workerIdentifier).trim(),
        });

        await reload();
        setNotice({
          tone: "success",
          text: `${result.clientName} is now assigned to ${result.workerName}.`,
        });
        setDialog(null);
        return;
      }

      if (dialog.action === "Request Document") {
        const companyId = assertCompanyScope(profile, profile.companyId);

        const [requestedFromType, requestedFromId] = String(dialog.values.requestedFrom).split("::");
        const dueDateValue = String(dialog.values.dueDate || "").trim();

        await createDocumentRequest({
          title: String(dialog.values.title).trim(),
          description: String(dialog.values.description).trim(),
          documentType: String(dialog.values.documentType).trim(),
          requestedFromType: requestedFromType as "company" | "client" | "funding_recipient",
          requestedFromId,
          companyId,
          clientId: requestedFromType === "client" ? requestedFromId : null,
          workerId: role === "worker" ? profile.entityId || null : null,
          caseType: "general",
          requestedByUserId: profile.uid,
          assignedReviewerUserId: String(dialog.values.assignedReviewerUserId || "").trim() || null,
          priority: String(dialog.values.priority).trim() as "low" | "medium" | "high" | "critical",
          dueAt: dueDateValue ? Timestamp.fromDate(new Date(`${dueDateValue}T00:00:00`)) : null,
        });

        await reload();
        setNotice({
          tone: "success",
          text: `"${String(dialog.values.title).trim()}" was added to the request queue.`,
        });
        setDialog(null);
        return;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "The action failed.";
      setNotice({ tone: "error", text: message });
    } finally {
      setBusyAction(null);
    }
  };

  const updateDialogValue = (name: string, value: string | boolean) => {
    setDialog((current) => {
      if (!current) return current;
      return {
        ...current,
        values: {
          ...current.values,
          [name]: value,
        },
      };
    });
  };

  return {
    busyAction,
    notice,
    dialog,
    clearNotice: () => setNotice(null),
    closeDialog: () => setDialog(null),
    updateDialogValue,
    submitDialog: handleSubmit,
    handlePrimaryAction,
    handleTableAction: (_tableTitle: string, action: string) => handlePrimaryAction(action),
  };
}
