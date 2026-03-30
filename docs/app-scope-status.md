# Community Hub Platform: Current Scope, Status, Pain Points, and Next Steps

## Document Purpose

This document is the current project snapshot for the JM Community Hub platform.

It reflects:
- the current app architecture
- what is already implemented
- what has changed recently
- where the platform still falls short of the planning document
- the next recommended implementation direction

This file is meant to stay aligned with the actual codebase, not just the original concept.

---

## 1. Executive Summary

The app is currently a hybrid of:

- a public-facing JM-Qafri website
- a role-based community platform in active refactor
- a superadmin/admin oversight area
- a Firestore-backed workspace system with mock fallback where data is sparse

The platform direction is now much clearer than before. The app is being shaped around:

- `superadmin`
- `company_admin`
- `worker`
- `client`
- `funding_recipient`

Recent work has focused on:

- simplifying authentication and registration
- creating durable platform entities in Firestore
- routing users into role-specific workspaces
- introducing a live Firestore workspace adapter under the existing dashboard UI
- wiring first-pass dashboard actions to Firestore
- replacing prompt-based action flows with in-app modals
- defining a fuller document workflow target model based on the platform brief

Current reality:

- the role model exists
- the Firestore entity model exists
- live workspace reads exist
- selected live workspace writes exist
- the document workflow is still only partially implemented
- the public site and some older admin patterns still coexist with the refactor

The app is now beyond “pure mockup,” but it is still not yet a fully operational workflow platform.

---

## 2. Product Scope Implemented So Far

### 2.1 Public Website Layer

The repo still contains a substantial public website and content layer, including:

- home / landing
- about
- contact
- blog
- charity
- pharma
- careers
- tenders
- acquisitions
- partnership
- airdrop
- membership
- art and architecture related pages

This layer predates the current platform refactor.

### 2.2 Authentication Layer

Authentication is now in transition to Clerk for the active identity layer.

Current main-path behavior:

- Clerk powers the public `sign in` and `sign up` screens
- protected workspace and role-registration routes are gated by Clerk middleware
- Clerk session identity is resolved into Firestore `users/{uid}` platform profiles
- Firestore remains the source of truth for roles, memberships, and platform entities

Legacy behavior still present outside the main path:

- some older Firebase Auth code still exists in unused or not-yet-migrated files
- the old admin modal still reflects the previous Firebase-auth approach and should be treated as legacy until rewritten

Important auth behavior now in place:

- a user must have a Firestore platform profile to proceed into role workspaces
- if Clerk auth succeeds but no Firestore user document exists, the user is directed into registration
- `superadmin` remains separate from public registration

### 2.3 Registration Layer

Public registration currently supports:

- company registrants, who become `company_admin`
- clients
- funding recipients

Registration now assumes:

- Clerk creates and owns the account identity first
- the selected role form then creates the matching Firestore platform profile and entity records
- registration forms no longer need to create auth accounts inline themselves

Workers are no longer treated as public self-signup users in the intended model. They are meant to be provisioned by company admins.

### 2.4 Firestore Platform Layer

The app now treats Firestore entity records as the platform source of truth instead of relying only on legacy application-form collections.

Current core collections in active use or bootstrap scope:

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

The app is designed to create required records or metadata when users interact with the platform.

### 2.5 Role-Based Workspaces

The app now has separate destinations for each role:

- `/admin`
- `/company`
- `/worker`
- `/client`
- `/funding`

The legacy `/dashboard` route now works primarily as a role dispatcher.

### 2.6 Workspace Data Layer

The dashboards now use a workspace adapter pattern:

- live Firestore reads are used where data exists
- local mock fallback is used where collections are empty or insufficient for the active role

This means the workspace UI can stay stable while the platform gradually shifts from demo data to live operational data.

### 2.7 Dashboard Action Layer

The dashboards now support real Firestore writes for selected actions:

- create document/report records
- create pending worker records
- assign clients to workers

These writes are now initiated through in-app modal flows instead of browser prompts.

---

## 3. Architectural Direction

### 3.1 Role Model

The current role model is:

- `superadmin`
- `company_admin`
- `worker`
- `client`
- `funding_recipient`

The identity model is now moving toward:

- `platformRole = superadmin | company_user | client | funding_recipient`
- `orgRole = org:admin | org:worker`

This means company staff authority is now intended to come from Clerk Organizations, while Firestore still owns business records and platform profile state.

### 3.2 Scope Model

The intended operational scope model is:

- superadmin has cross-platform oversight
- company admins manage a company
- workers operate inside company scope
- clients belong to company-managed service flows
- funding recipients operate in a separate funding/compliance workspace

This is a major improvement over the older shared-dashboard pattern.

The active company boundary is now being aligned to one Clerk Organization per company.

### 3.3 UI + Data Strategy

The current platform direction is:

- keep the workspace shell stable
- move data access behind adapters
- allow Firestore and fallback mock data to coexist during transition

This direction is already implemented at the dashboard layer.

### 3.4 Document Workflow Direction

The product direction has now explicitly shifted toward the full workflow-oriented document model from the planning PDF.

That means the target document architecture is no longer just:

- `documents`
- `dueDiligenceTasks`

The intended target model is now:

- `documents`
- `documentRequests`
- `documentAccess`
- `documentReviews`
- `documentSignatures`
- `dueDiligenceCases`
- `dueDiligenceItems`
- `auditLogs`

This full model is now documented, but not fully implemented yet.

---

## 4. What Has Been Implemented in Code

### 4.1 Firebase Initialization

The app now consistently uses the shared Firebase config for the auth/platform path.

This matters because it resolved the earlier:

- `No Firebase App '[DEFAULT]' has been created`

issue in the refactored signup and workspace flows.

### 4.2 Auth and Role Utilities

The auth layer now includes:

- typed user profiles
- role-aware route helpers
- `useRequireAuth`
- `useRequireRole`

Routing currently maps:

- `superadmin -> /admin`
- `company_admin -> /company`
- `worker -> /worker`
- `client -> /client`
- `funding_recipient -> /funding`

### 4.3 Platform Entity Creation Helpers

The platform helper layer currently supports:

- company admin account creation
- client account creation
- funding recipient account creation
- user profile upsert
- platform bootstrap initialization
- document record creation
- worker record creation
- client assignment updates

### 4.4 Role-Specific Workspace Pages

Role-specific workspace pages exist and are wired to the shared workspace shell:

- superadmin
- company admin
- worker
- client
- funding recipient

### 4.5 Workspace Adapter

The workspace adapter now:

- reads live Firestore data
- maps it into the existing shell shape
- falls back to mock data when role-relevant records are missing

This is one of the most important refactor milestones so far because it allows the UI to stay stable while the backend model evolves.

### 4.6 Dashboard Actions

Dashboard actions are now partially operational.

Implemented action paths include:

- upload document/report metadata into Firestore
- add worker into Firestore
- assign client to worker in Firestore

These actions now use modal forms rather than prompt dialogs.

---

## 5. Current Workspace Behavior

### 5.1 Superadmin Workspace

Current behavior:

- reads platform-level company, worker, client, funding, document, and diligence data where available
- provides oversight-style summaries and tables
- still lacks the full audit-led governance flow described in the planning document

### 5.2 Company Admin Workspace

Current behavior:

- reads live company-scoped workers, clients, documents, and diligence signals
- can add workers
- can assign clients
- can create document records

Still missing:

- document request workflows
- company-scoped review histories
- true due diligence case management
- signature routing

### 5.3 Worker Workspace

Current behavior:

- reads assigned clients, document context, and diligence-related task summaries
- reflects live Firestore data where records exist

Still missing:

- document request authoring
- review decisions
- case-based diligence workflows
- evidence-driven approvals/rejections

### 5.4 Client Workspace

Current behavior:

- reads own Firestore-backed client profile and own document records
- can create document records through the dashboard

Still missing:

- request inbox
- structured KYC/KYB submission flow
- request-specific responses
- access-controlled document sharing beyond simple ownership

### 5.5 Funding Workspace

Current behavior:

- reads own funding-recipient profile
- reads own document records
- can create report/document records

Still missing:

- richer compliance document flow
- funding-related signature flow
- milestone/report lifecycle beyond basic records

---

## 6. Document and Due Diligence Status

### 6.1 What Exists Today

The app currently has:

- a simple `documents` collection
- role-based document visibility in dashboards
- live document creation from dashboard actions
- a simple `dueDiligenceTasks` collection
- diligence summaries shown in workspaces

### 6.2 What Does Not Exist Yet

The app does not yet fully implement the planning document’s workflow model for:

- secure document request flows
- granular document access rules
- review history
- due diligence evidence linkage
- signature routing
- signed document lifecycle
- audit trail collection design in the live app
- versioning/storage metadata at a mature level

### 6.3 Current Interpretation of the PDF

The platform brief clearly describes documents as part of a process, not just as uploaded files.

The intended model is:

1. request a document
2. upload the document
3. review the document
4. approve/reject the document
5. route for signature where needed
6. store final artifact
7. retain auditability

That interpretation is now reflected in `docs/firestore-workspace-schema.md`.

---

## 7. Pain Points and Gaps

### 7.1 Legacy + Refactor Coexistence

Old and new patterns still coexist in the repo:

- legacy admin assumptions
- older content/admin surfaces
- new role-based workspace architecture

This creates conceptual drag.

### 7.2 Workflow Depth Still Lags Behind UI Quality

The dashboards are now much more believable than before, but the underlying workflow depth is still catching up.

The app can now:

- show live data
- write some live records

But many important workflow layers are still missing.

### 7.3 Document Model Is Still Underbuilt

This is now the single most important product-model gap.

The current app can create document records, but it still lacks:

- request objects
- access objects
- review records
- signature records
- diligence case linkage
- audit records

### 7.4 Due Diligence Is Not Yet Case-Based

The current diligence layer is still task-oriented rather than case-oriented.

What is missing:

- umbrella diligence cases
- checklist items tied to evidence
- final report generation lifecycle
- request-to-evidence-to-decision linkage

### 7.5 Verification Confidence Is Still Limited

The repo still contains unrelated TypeScript issues outside this platform slice, so full-project verification is not yet clean.

---

## 8. Current Strengths

The app is now strong in several ways:

- the role architecture is much clearer
- Firestore entity modeling is more coherent
- workspaces are separated by role
- the workspace shell is reusable and stable
- live Firestore reads are in place
- selected live Firestore writes are in place
- dashboard actions now feel more app-like due to modal flows
- the product direction is increasingly compatible with the planning document

---

## 9. Current Weaknesses

The main weaknesses are:

- document workflow depth is still missing
- due diligence still lacks case-level modeling
- old and new admin assumptions still coexist
- worker lifecycle is only partially complete
- file storage and signature workflow are still under-modeled
- unrelated TS issues still reduce confidence in repo-wide verification

---

## 10. Recommended Next Steps

### 10.1 Immediate Product/Schema Priorities

1. Introduce `documentRequests`.
2. Introduce `dueDiligenceCases`.
3. Introduce `dueDiligenceItems`.
4. Introduce `documentReviews`.
5. Introduce `documentAccess`.
6. Introduce `documentSignatures`.
7. Introduce `auditLogs`.

### 10.2 Immediate App Priorities

1. Refactor dashboard document actions to write the fuller workflow collections, not just `documents`.
2. Add company business document request flows.
3. Add client KYC/KYB request and response flows.
4. Add due diligence case creation and checklist management.
5. Add worker review actions tied to specific evidence files.
6. Refactor superadmin oversight to read from the richer workflow collections.

### 10.3 Medium-Term Priorities

- build file storage metadata and file upload plumbing properly
- add signed artifact lifecycle
- add audit views to the superadmin workspace
- separate governance from operations more clearly
- connect more of the older admin area into the new model or quarantine it

### 10.4 Longer-Term Priorities

- blockchain verification/hash support
- signature verification support
- wallet and funding expansion once operational workflows are stable
- industry directory completion
- external integration work

---

## 11. Conclusion

The app is no longer just a public site with a generic authenticated area.

It now has:

- structured roles
- structured workspace destinations
- durable platform entities
- live Firestore-backed workspace reads
- selected live Firestore-backed workspace writes
- a clear next-stage document architecture

However, the platform is still best understood as:

**a strong operational refactor in progress, with live workspace foundations in place, but without the full document and due diligence workflow model yet implemented**

The most important next milestone is now clear:

move from:

- simple document ownership and status

to:

- full workflow-driven document, diligence, review, signature, and audit records

That is the next step that will bring the codebase closest to the uploaded planning document.
