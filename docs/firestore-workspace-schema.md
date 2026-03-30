# Firestore Workspace Schema

This document describes the current Firestore-backed workspace model in the app and the planned full document workflow model we have now chosen to follow from the platform brief.

Current direction:
- keep the existing role-based workspace UI
- keep Firestore as the operational data store
- evolve documents from a simple owner/status table into a full workflow system
- design the schema so due diligence, secure sharing, review, and signature routing can all live in the same model

This file is intentionally a no-code design session, not an implementation diff.

---

## 1. Current App State

As of now, the app already uses or bootstraps these collections:

- `users`
- `companies`
- `companyMemberships`
- `workers`
- `clients`
- `fundingRecipients`
- `documents`
- `dueDiligenceTasks`
- `industries`
- `platform_meta`

The dashboards now read live Firestore data through the workspace adapter, and some dashboard actions already write live data:

- upload document/report
- add worker
- assign client

However, the current `documents` model is still shallow. It mainly stores:

- owner
- title
- status

That is not enough for the PDF-aligned workflow.

---

## 2. Decision We Are Taking

We are choosing the full workflow-oriented model for documents.

That means documents should not be treated as standalone uploaded files only.

Instead, document sharing in the app should be modeled as:

1. a document exists
2. it belongs to a business process or case
3. someone requests it
4. someone uploads it
5. specific people can access it
6. a worker or admin reviews it
7. approval/rejection decisions are recorded
8. signature can be requested
9. signed output is stored and auditable
10. blockchain/audit integration can be layered in later

---

## 3. Core Collections

### `users/{uid}`
- `email: string`
- `displayName: string`
- `photoURL?: string`
- `platformRole: "superadmin" | "company_user" | "client" | "funding_recipient"`
- `orgRole?: "org:admin" | "org:worker" | null`
- `role: "superadmin" | "company_admin" | "worker" | "client" | "funding_recipient"`
- `status: "active" | "registered" | "pending" | "approved" | "rejected" | "suspended"`
- `companyId?: string`
- `entityId?: string`
- `clerkOrganizationId?: string | null`
- `companyName?: string`
- `registrationNumber?: string`
- `industry?: string`
- `createdAt: Timestamp`
- `updatedAt: Timestamp`
- `lastLoginAt?: Timestamp`

### `companies/{companyId}`
- `id: string`
- `clerkOrganizationId: string | null`
- `name: string`
- `registrationNumber: string`
- `industry: string`
- `description: string`
- `employees: string`
- `founded: string`
- `email: string`
- `phone: string`
- `website: string`
- `address: string`
- `city: string`
- `country: string`
- `fundingNeeds: string`
- `fundingAmount: string`
- `status: "active" | "inactive" | "archived"`
- `companyAdminId: string`
- `workerCount: number`
- `clientCount: number`
- `createdAt: Timestamp`
- `updatedAt: Timestamp`

### `companyMemberships/{membershipId}`
- `id: string`
- `companyId: string`
- `userId: string | null`
- `inviteEmail: string | null`
- `clerkOrganizationId: string | null`
- `orgRole: "org:admin" | "org:worker"`
- `role: "company_admin" | "worker"`
- `status: "active" | "inactive" | "pending"`
- `createdAt: Timestamp`
- `updatedAt: Timestamp`

### `workers/{workerId}`
- `id: string`
- `userId: string | null`
- `companyId: string`
- `clerkOrganizationId: string | null`
- `displayName: string`
- `email: string`
- `title: string`
- `assignedClientIds: string[]`
- `anonymityEnabled: boolean`
- `inviteStatus: "pending" | "accepted"`
- `status: "active" | "inactive" | "pending"`
- `createdAt: Timestamp`
- `updatedAt: Timestamp`

### `clients/{clientId}`
- `userId: string`
- `firstName: string`
- `lastName: string`
- `displayName: string`
- `email: string`
- `phone: string`
- `city: string`
- `country: string`
- `serviceNeeds: string[]`
- `description: string`
- `companyId: string | null`
- `assignedWorkerId: string | null`
- `status: "active" | "inactive" | "pending"`
- `createdAt: Timestamp`
- `updatedAt: Timestamp`

### `fundingRecipients/{fundingRecipientId}`
- `userId: string`
- `firstName: string`
- `lastName: string`
- `displayName: string`
- `email: string`
- `phone: string`
- `city: string`
- `country: string`
- `idType: string`
- `idNumber: string`
- `investmentBackground: string`
- `yieldPreference: string`
- `fundingSectors: string[]`
- `initialStakeAmount: string`
- `sourceOfFunds: string`
- `walletAddress: string | null`
- `stakedAmount: number`
- `totalEarned: number`
- `status: "active" | "inactive" | "pending"`
- `createdAt: Timestamp`
- `updatedAt: Timestamp`

---

## 4. Full Document Workflow Collections

These are the collections we should treat as the proper target model.

### `documents/{documentId}`
This is the canonical document record.

- `id: string`
- `title: string`
- `documentType: "company_business" | "kyc_kyb" | "due_diligence_report" | "funding_application" | "service_agreement" | "nda" | "contract" | "signature_agreement" | "other"`
- `ownerType: "company" | "client" | "funding_recipient" | "platform"`
- `ownerId: string`
- `caseType: "company_profile" | "client_onboarding" | "due_diligence" | "funding" | "service_delivery" | "signature_flow" | "general"`
- `caseId: string | null`
- `requestedByUserId: string | null`
- `uploadedByUserId: string | null`
- `assignedReviewerUserId: string | null`
- `companyId: string | null`
- `clientId: string | null`
- `workerId: string | null`
- `status: "draft" | "requested" | "uploaded" | "in_review" | "approved" | "rejected" | "signed" | "archived"`
- `reviewState: "not_required" | "pending" | "reviewing" | "approved" | "rejected"`
- `signatureState: "not_required" | "pending" | "in_progress" | "signed" | "failed"`
- `storageProvider: "firebase_storage" | "ipfs" | "external" | null`
- `storagePath: string | null`
- `downloadUrl: string | null`
- `contentHash: string | null`
- `version: number`
- `isLatestVersion: boolean`
- `parentDocumentId: string | null`
- `tags: string[]`
- `notes: string`
- `createdAt: Timestamp`
- `updatedAt: Timestamp`

### `documentRequests/{requestId}`
This is the workflow object that says a document is needed.

- `id: string`
- `documentType: string`
- `title: string`
- `description: string`
- `requestedFromType: "company" | "client" | "funding_recipient"`
- `requestedFromId: string`
- `companyId: string | null`
- `clientId: string | null`
- `workerId: string | null`
- `caseType: string`
- `caseId: string | null`
- `requestedByUserId: string`
- `assignedReviewerUserId: string | null`
- `priority: "low" | "medium" | "high" | "critical"`
- `status: "open" | "submitted" | "under_review" | "approved" | "rejected" | "cancelled"`
- `dueAt: Timestamp | null`
- `fulfilledByDocumentId: string | null`
- `reviewNotes: string`
- `createdAt: Timestamp`
- `updatedAt: Timestamp`

### `documentAccess/{accessId}`
This controls who can see or act on a document.

- `id: string`
- `documentId: string`
- `granteeUserId: string`
- `companyId: string | null`
- `accessRole: "viewer" | "uploader" | "reviewer" | "signer" | "owner"`
- `canDownload: boolean`
- `canComment: boolean`
- `canSign: boolean`
- `canApprove: boolean`
- `grantedByUserId: string`
- `createdAt: Timestamp`
- `expiresAt: Timestamp | null`

### `documentReviews/{reviewId}`
This records the review decision history.

- `id: string`
- `documentId: string`
- `reviewerUserId: string`
- `reviewerRole: "worker" | "company_admin" | "superadmin"`
- `decision: "approved" | "rejected" | "needs_changes" | "flagged"`
- `notes: string`
- `checklistSnapshot: string[]`
- `createdAt: Timestamp`

### `documentSignatures/{signatureId}`
This tracks signature routing and completion.

- `id: string`
- `documentId: string`
- `signerUserId: string`
- `signerRole: string`
- `order: number`
- `status: "pending" | "sent" | "viewed" | "signed" | "declined" | "expired"`
- `signatureHash: string | null`
- `signedAt: Timestamp | null`
- `verificationRef: string | null`
- `createdAt: Timestamp`
- `updatedAt: Timestamp`

### `dueDiligenceCases/{caseId}`
This is the umbrella record for a diligence process.

- `id: string`
- `companyId: string`
- `clientId: string | null`
- `subjectType: "company" | "client" | "funding_recipient"`
- `subjectId: string`
- `assignedWorkerId: string`
- `status: "open" | "collecting" | "reviewing" | "approved" | "rejected" | "closed"`
- `riskLevel: "low" | "medium" | "high"`
- `summary: string`
- `finalReportDocumentId: string | null`
- `createdByUserId: string`
- `createdAt: Timestamp`
- `updatedAt: Timestamp`

### `dueDiligenceItems/{itemId}`
This is the checklist-level object inside a diligence case.

- `id: string`
- `caseId: string`
- `label: string`
- `description: string`
- `category: "registration" | "tax" | "financials" | "licenses" | "references" | "site_visit" | "compliance" | "other"`
- `status: "pending" | "requested" | "uploaded" | "in_review" | "approved" | "rejected" | "waived"`
- `required: boolean`
- `priority: "low" | "medium" | "high"`
- `requestedDocumentId: string | null`
- `submittedDocumentId: string | null`
- `assignedWorkerId: string | null`
- `reviewNotes: string`
- `dueAt: Timestamp | null`
- `createdAt: Timestamp`
- `updatedAt: Timestamp`

### `auditLogs/{logId}`
This is the immutable-style operational trail on the application side.

- `id: string`
- `entityType: "document" | "document_request" | "document_review" | "signature" | "due_diligence_case" | "due_diligence_item"`
- `entityId: string`
- `action: string`
- `actorUserId: string`
- `actorRole: string`
- `companyId: string | null`
- `metadata: Record<string, unknown>`
- `createdAt: Timestamp`

---

## 5. No-Code Design Session: How Document Sharing Should Work

This section maps the exact intended workflow for the four main document categories we discussed.

### 5.1 Company Business Documents

Examples:
- certificate of incorporation
- board resolutions
- tax certificates
- licenses
- bank statements
- financial statements

#### Who owns them
- primary owner is the company
- the company admin is the operational owner
- assigned workers are reviewers
- superadmin has oversight access

#### How they are shared
1. Company admin uploads or responds to a request.
2. A `documents` record is created with:
   - `ownerType = "company"`
   - `ownerId = companyId`
   - `companyId = companyId`
3. If the file was explicitly requested, a `documentRequests` record exists first.
4. Assigned worker gets reviewer access via `documentAccess`.
5. Worker reviews and records result in `documentReviews`.
6. If acceptable, request/item is resolved.
7. If signature is needed later, the same document or a derived version enters `documentSignatures`.

#### Visibility
- company admin: full access
- assigned workers in that company: review access
- superadmin: full oversight
- clients: no access by default

#### Why this matters
These are foundational business records and should be reusable across multiple diligence cases instead of uploaded from scratch every time.

---

### 5.2 Client KYC/KYB Documents

Examples:
- ID/passport
- proof of address
- business registration for client company
- tax PIN
- beneficial ownership declarations

#### Who owns them
- primary owner is the client
- assigned worker is the reviewer
- company admin can supervise within the same company

#### How they are shared
1. Worker opens onboarding or diligence flow.
2. Worker creates one or more `documentRequests`.
3. Client sees pending requests in their portal.
4. Client uploads requested files.
5. Each upload creates a `documents` record linked to:
   - `ownerType = "client"`
   - `ownerId = clientId or client userId`
   - `clientId = clientId`
   - `companyId = assigned company`
6. Worker reviews the file.
7. Review result is stored in `documentReviews`.
8. The related `documentRequests` and `dueDiligenceItems` are updated.

#### Visibility
- client: own documents
- assigned worker: full review access
- company admin: company-level oversight
- superadmin: exception/oversight access
- other workers: no access unless explicitly granted

#### Important rule
Client KYC/KYB documents should be private-by-default and access-controlled through assignment, not just by broad company membership.

---

### 5.3 Due Diligence Requests

Examples:
- tax compliance annex request
- audited financials request
- site visit report request
- reference letters request

#### What they are
A due diligence request is not the same thing as the uploaded file.

It is the workflow object that says:
- what is needed
- from whom
- by when
- for which case
- who is reviewing it

#### How the workflow should behave
1. Company admin or worker opens a `dueDiligenceCases` record.
2. The case is broken into `dueDiligenceItems`.
3. Some items generate `documentRequests`.
4. The request is assigned to the correct subject:
   - company
   - client
   - funding recipient
5. Upload satisfies the request and links back through:
   - `fulfilledByDocumentId`
   - `submittedDocumentId`
6. Review decision updates:
   - `documentReviews`
   - `dueDiligenceItems.status`
   - `documentRequests.status`
7. Final output can generate a due diligence report document.

#### Visibility
- assigned worker: primary operator
- company admin: supervisory visibility
- superadmin: audit and exception visibility

#### Important distinction
The request is the task.
The document is the evidence.
The review is the decision.

Those should remain separate records.

---

### 5.4 Signature-Ready Agreements

Examples:
- NDAs
- service agreements
- funding agreements
- contracts

#### What makes them different
These documents are not only stored and reviewed.
They need a signer sequence and verification state.

#### How they should work
1. A document is uploaded or generated.
2. It is marked with:
   - `documentType = "signature_agreement"` or a more specific contract type
   - `signatureState = "pending"`
3. Signers are created in `documentSignatures`.
4. Notifications are sent to signers.
5. Each signer updates their signature state.
6. Signed artifact is stored as:
   - latest version in `documents`
   - hashed reference if blockchain is later enabled
7. `auditLogs` capture every transition.

#### Visibility
- only signers, owners, assigned reviewers, and superadmin oversight roles
- not broad company-wide by default unless intentionally granted

#### Important rule
Do not mix general document review with signature routing in one single status field only.

That is why the document record needs both:
- `reviewState`
- `signatureState`

---

## 6. Recommended Access Rules

### Superadmin
- full read across all document-related collections
- can override review state
- can audit all signature events

### Company Admin
- full access to company-owned documents
- supervisory access to client documents inside their company scope
- can open diligence cases
- can assign workers

### Worker
- access only inside assigned company scope
- can request documents
- can review documents
- can approve/reject within workflow rules
- can see only assigned client-private documents unless explicitly broadened

### Client
- can upload own documents
- can view own requests
- can see their own review outcomes where appropriate
- cannot see unrelated company-private records

### Funding Recipient
- can upload own compliance/supporting documents
- can view signature requests and reporting files tied to their own record

---

## 7. Bootstrap Metadata

These documents are auto-created when the platform layer is touched:

### `platform_meta/core`
- platform initialization marker

### `platform_meta/workspace_schema_v1`
- lightweight schema reference used by the app bootstrap

### `industries/catalog`
- shared industry options

For the next schema version, `platform_meta/workspace_schema_v1` should eventually be expanded to also describe:
- document workflow collections
- due diligence case collections
- signature collections
- audit collections

---

## 8. Dashboard Mapping Notes

### `superadmin`
- reads across all collections
- monitors documents, requests, reviews, signatures, diligence cases, audit logs

### `company_admin`
- reads by `companyId`
- manages company documents, diligence requests, workers, and client-level review coordination

### `worker`
- reads from assigned company scope and assigned client scope
- sees document requests, review queues, and diligence items

### `client`
- reads own requests and own uploaded/private documents

### `funding_recipient`
- reads own compliance and reporting documents

---

## 9. Practical Seeding Advice

If you want the dashboards and workflows to feel real after cleaning the database:

1. Create one `companies` record.
2. Create one `users` record with `role: "company_admin"` and matching `companyId`.
3. Create one `companyMemberships` record linking that user to the company.
4. Create one or more `workers` linked to the same company.
5. Create one or more `clients` with `companyId` and `assignedWorkerId`.
6. Create one `dueDiligenceCases` record for that company.
7. Create several `dueDiligenceItems` inside that case.
8. Create matching `documentRequests`.
9. Create one or more `documents` linked to those requests and cases.
10. Create one or more `documentReviews`.
11. Create a sample `documentSignatures` flow for an NDA or service agreement.
12. Create matching `auditLogs`.

That seed path will reflect the PDF much better than seeding raw documents only.

---

## 10. Concrete Firestore Implementation Plan

This section translates the schema design into a practical rollout plan in the exact order we agreed on:

1. `documentRequests`
2. `dueDiligenceCases`
3. `dueDiligenceItems`
4. `documentReviews`
5. `documentAccess`
6. `documentSignatures`
7. `auditLogs`

The key implementation principle:

- keep `documents` as the canonical artifact record
- add workflow collections around it
- do not overload `documents.status` with every workflow state

### 10.1 Phase 1: `documentRequests`

#### ID strategy
- document ID pattern: `dreq_<autoId>`
- examples:
  - `dreq_7xA1mQ`
  - `dreq_corp_tax_2026_01` if a readable ID is preferred for seeded/admin-created records

#### Parent/child relationship
- parent conceptually belongs to:
  - `company`
  - `client`
  - `funding_recipient`
  - `dueDiligenceCase`
- child linkage:
  - `fulfilledByDocumentId -> documents/{documentId}`

#### Query patterns
- company admin dashboard:
  - all open requests for `companyId`
  - all submitted requests awaiting review for `companyId`
- worker dashboard:
  - all requests where `assignedReviewerUserId == currentUserId`
  - all open requests for assigned client/company scope
- client dashboard:
  - all requests where `requestedFromId == clientId`
  - all requests where `status in ["open", "rejected"]`
- funding dashboard:
  - all requests where `requestedFromType == "funding_recipient"` and `requestedFromId == currentRecipientId`
- superadmin dashboard:
  - all overdue open requests
  - all rejected requests

#### Security-rule intent
- requester may create if they are:
  - assigned worker
  - company admin inside same company
  - superadmin
- client/funding recipient cannot create arbitrary requests for others
- clients/funding recipients can read only requests addressed to them
- workers can read/write only requests inside their company scope

#### First dashboards to use it
- `company_admin` writes first
- `worker` writes and reviews second
- `client` reads/responds third
- `superadmin` reads oversight summaries after that

### 10.2 Phase 2: `dueDiligenceCases`

#### ID strategy
- case ID pattern: `ddc_<autoId>`
- example:
  - `ddc_healthplus_tawi_2026q1`

#### Parent/child relationship
- parent belongs to:
  - one `company`
  - optionally one `client`
  - or another diligence subject
- children:
  - `dueDiligenceItems`
  - `documentRequests`
  - `documents`
  - final report document

#### Query patterns
- company admin:
  - all open cases by `companyId`
  - all cases grouped by `status`
- worker:
  - all cases where `assignedWorkerId == currentWorkerId`
- superadmin:
  - all high-risk cases
  - all stale cases where `updatedAt` is old and `status != closed`

#### Security-rule intent
- only company admin, assigned worker, and superadmin can create/open cases
- clients should not create diligence cases directly
- clients may read only the case summary if explicitly exposed later
- worker access limited to assigned company scope

#### First dashboards to use it
- `company_admin` creates cases
- `worker` operates them
- `superadmin` audits them

### 10.3 Phase 3: `dueDiligenceItems`

#### ID strategy
- item ID pattern: `ddi_<autoId>`
- example:
  - `ddi_tax_clearance`
  - `ddi_site_visit`

#### Parent/child relationship
- belongs to one `dueDiligenceCase`
- may reference:
  - `requestedDocumentId`
  - `submittedDocumentId`
  - assigned worker

#### Query patterns
- worker:
  - all items for assigned cases
  - all items by `status`
  - all overdue required items
- company admin:
  - all items in a company grouped by case
- superadmin:
  - flagged or rejected items across all companies

#### Security-rule intent
- worker/company admin can update status within their scope
- only reviewer roles can set `approved`, `rejected`, or `waived`
- clients should never edit diligence checklist items directly

#### First dashboards to use it
- `worker` first
- `company_admin` second
- `superadmin` read-only third

### 10.4 Phase 4: `documentReviews`

#### ID strategy
- review ID pattern: `drev_<autoId>`

#### Parent/child relationship
- belongs to one `document`
- optionally linked to:
  - a `documentRequest`
  - a `dueDiligenceItem`

#### Query patterns
- worker:
  - all reviews authored by current worker
  - latest review for a document
- company admin:
  - review history for company-scoped documents
- client:
  - only final review outcome where allowed, not internal-only notes
- superadmin:
  - all flagged or rejected reviews

#### Security-rule intent
- only workers, company admins, and superadmins with scope may create reviews
- clients/funding recipients cannot write review records
- internal review notes may need private/internal flags later

#### First dashboards to use it
- `worker` writes first
- `company_admin` writes/reads second
- `superadmin` reads/audits third

### 10.5 Phase 5: `documentAccess`

#### ID strategy
- access ID pattern: `<documentId>_<userId>_<accessRole>`
- example:
  - `doc_abc123_uid_456_reviewer`

This is one case where a deterministic ID is useful.

#### Parent/child relationship
- belongs to one `document`
- references one grantee user

#### Query patterns
- any dashboard:
  - all access rows where `granteeUserId == currentUserId`
- company admin:
  - all access rows for a given company document
- superadmin:
  - access audit by document or user

#### Security-rule intent
- access grants should only be created by:
  - company admin for company scope
  - assigned worker for narrow workflow cases if allowed
  - superadmin globally
- reads should be based on either:
  - ownership
  - explicit access row
  - high-level admin role

#### First dashboards to use it
- `company_admin` first
- `worker` second
- `client` and `funding_recipient` benefit immediately after reads are gated through it

### 10.6 Phase 6: `documentSignatures`

#### ID strategy
- signature ID pattern: `dsig_<documentId>_<order>`
- example:
  - `dsig_doc_abc123_1`
  - `dsig_doc_abc123_2`

#### Parent/child relationship
- belongs to one signature-ready document
- references signer user
- may point to blockchain verification later

#### Query patterns
- client/funding/company dashboards:
  - all pending signatures where `signerUserId == currentUserId`
- company admin:
  - signing progress for agreements owned by their company
- superadmin:
  - failed/expired signatures platform-wide

#### Security-rule intent
- only authorized owners/admins can create signer sequences
- signers can update only their own signature state
- superadmin can audit but should not impersonate signature completion

#### First dashboards to use it
- `company_admin` first for agreements
- `client` and `funding_recipient` second as signers
- `superadmin` third for oversight

### 10.7 Phase 7: `auditLogs`

#### ID strategy
- log ID pattern: `alog_<autoId>`

#### Parent/child relationship
- references any entity by:
  - `entityType`
  - `entityId`

#### Query patterns
- superadmin:
  - all logs by company
  - all logs by entity
  - all logs by actor
- company admin:
  - company-only audit stream
- worker:
  - optional limited activity stream for their own actions later

#### Security-rule intent
- application writes only
- no client-side direct writes in the long term if avoidable
- if client-side writes are temporarily allowed, restrict to actor = current user and allowed entity scope
- reads should be highly restricted:
  - superadmin full
  - company admin company-only
  - clients generally none

#### First dashboards to use it
- `superadmin` first
- `company_admin` second

---

## 11. UI Changes This Plan Prompts

This schema plan implies concrete UI changes, even before code is written.

### 11.1 Company Admin Dashboard
- add a `Document Requests` module
- add a `Due Diligence Cases` module
- add a `Signatures` module
- split `Documents` into:
  - company library
  - pending requests
  - awaiting review
  - agreements awaiting signature

### 11.2 Worker Dashboard
- add `Assigned Cases`
- add `Requested Documents`
- add `Review Queue`
- add `Evidence Checklist`
- add review forms tied to each document

### 11.3 Client Dashboard
- replace generic document list with:
  - pending requests
  - uploaded responses
  - rejected/needs changes
  - agreements to sign

### 11.4 Funding Dashboard
- add compliance request inbox
- add signed-agreement area
- add reporting and evidence flow

### 11.5 Superadmin Dashboard
- add:
  - audit stream
  - cross-company review queue
  - stale diligence cases
  - signature failures/overdue states

### 11.6 Shared UI Components Needed
- request table component
- case list component
- checklist component
- document review drawer/modal
- signer progress component
- audit log table

---

## 12. Parent/Child Relationship Summary

The intended relationship graph is:

- `dueDiligenceCases`
  - parent of `dueDiligenceItems`
  - parent context for `documentRequests`
  - parent context for many `documents`

- `documentRequests`
  - can be fulfilled by one `documents` record

- `documents`
  - can have many `documentReviews`
  - can have many `documentAccess` rows
  - can have many `documentSignatures`

- `auditLogs`
  - attaches to all workflow entities as the cross-cutting trail

---

## 13. Query Index Intent

These are the main index-style access paths to plan around:

- `documentRequests`
  - `companyId + status`
  - `requestedFromId + status`
  - `assignedReviewerUserId + status`

- `dueDiligenceCases`
  - `companyId + status`
  - `assignedWorkerId + status`
  - `riskLevel + status`

- `dueDiligenceItems`
  - `caseId + status`
  - `assignedWorkerId + status`

- `documentReviews`
  - `documentId + createdAt`
  - `reviewerUserId + createdAt`

- `documentAccess`
  - `granteeUserId + documentId`

- `documentSignatures`
  - `signerUserId + status`
  - `documentId + order`

- `auditLogs`
  - `entityType + entityId + createdAt`
  - `companyId + createdAt`
  - `actorUserId + createdAt`

---

## 14. Recommended Rollout by Dashboard Ownership

### Step 1
- company admin dashboard writes `documentRequests`
- worker dashboard reads them
- client dashboard responds to them

### Step 2
- company admin opens `dueDiligenceCases`
- worker manages `dueDiligenceItems`

### Step 3
- worker writes `documentReviews`
- company admin supervises review outcomes

### Step 4
- company admin/worker assign `documentAccess`
- document visibility starts moving off broad ownership alone

### Step 5
- company admin creates `documentSignatures`
- client/funding/company actors complete signing flow

### Step 6
- superadmin reads `auditLogs`
- company admin gets scoped audit visibility

This rollout keeps the early implementation centered on company-admin and worker workflows, which is the fastest way to make the platform behave like the uploaded brief.
