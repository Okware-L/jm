# Community Hub Platform System Design

## Purpose

This document defines the Community Hub platform as a system, not just a collection of pages and forms.

It is intended to answer:

- what the system is
- which business domains it contains
- how identity, roles, permissions, and workflows should work
- what Firestore should store
- what the UI is responsible for
- where the app currently is relative to that target

This is the architectural source of truth for the next stage of the platform.

---

## 1. System Definition

The Community Hub is a multi-role operational platform for:

- company administration
- worker-led servicing and due diligence
- client onboarding and document exchange
- funding-recipient compliance and reporting
- superadmin governance and audit oversight

It should not be treated as:

- only a website with dashboards
- only an admin console
- only a Firestore-backed CRUD app

It should be treated as a workflow-based business system with:

- strong identity
- scoped permissions
- persistent business entities
- explicit workflow states
- auditable transitions

---

## 2. System Goals

### Primary Goals

- allow authenticated users to operate inside a role-specific workspace
- enforce company and assignment scope
- manage document-driven workflows
- manage due diligence and approvals
- support secure document sharing and signature flows
- give superadmin a full oversight and audit surface

### Secondary Goals

- provide a public-facing company/industry presence later
- support integrations later
- support blockchain verification later

### Non-Goals Right Now

- full blockchain-native operation
- full messaging stack
- broad marketplace/discovery features before workflow maturity

---

## 3. System Layers

The platform should be implemented as five explicit layers.

### 3.1 Identity Layer

Responsibility:

- authentication
- session management
- user session claims
- auth middleware

Recommended technology:

- Clerk

What belongs here:

- sign in
- sign up
- session
- logout
- MFA later if needed

What does not belong here:

- deep business role logic
- workflow state
- company assignment logic

### 3.2 Domain Layer

Responsibility:

- business entities
- relationships
- canonical records

Core entities:

- user
- company
- membership
- worker
- client
- funding recipient
- document
- document request
- due diligence case
- due diligence item
- review
- signature
- audit log

This layer is the source of truth for the business.

### 3.3 Workflow Layer

Responsibility:

- state transitions
- approval logic
- case lifecycle
- request lifecycle
- review lifecycle
- signature lifecycle

Examples:

- client assignment workflow
- document request workflow
- due diligence workflow
- signature workflow

This is the layer that turns records into a system.

### 3.4 Access Control Layer

Responsibility:

- role enforcement
- company scope enforcement
- assignment scope enforcement
- superadmin override rules

This should exist separately from the UI.

### 3.5 Application Layer

Responsibility:

- pages
- dashboard modules
- forms
- tables
- charts
- drawers and modals

Important rule:

The UI should consume workflows and domain records.
It should not be the primary place where business rules live.

---

## 4. Core Domains

The system is composed of the following domains.

### 4.1 Identity and Access Domain

Contains:

- Clerk user/session
- internal user profile
- role mapping
- membership and scope checks

### 4.2 Organization Domain

Contains:

- companies
- company admins
- workers
- memberships

### 4.3 Client Services Domain

Contains:

- clients
- worker assignment
- service needs
- onboarding and compliance flow

### 4.4 Funding Domain

Contains:

- funding recipients
- compliance/reporting artifacts
- wallet and financial profile later

### 4.5 Document Domain

Contains:

- document repository
- document requests
- document access
- document reviews
- document signatures
- document versions later

### 4.6 Due Diligence Domain

Contains:

- diligence cases
- diligence items
- evidence linkage
- review checkpoints
- final report outcomes

### 4.7 Governance Domain

Contains:

- audit logs
- superadmin oversight
- exception handling
- compliance watchlists

---

## 5. Identity and Role Model

### 5.1 Identity Source of Truth

Recommended structure:

- Clerk is the source of truth for authentication identity
- Firestore `users` is the source of truth for platform role/profile state

Why:

- Clerk is excellent for auth/session
- Firestore is already where the business relationships live
- roles in this system are not just auth claims; they are tied to companies, assignments, and workflows

### 5.2 Roles

System roles:

- `superadmin`
- `company_admin`
- `worker`
- `client`
- `funding_recipient`

### 5.3 Scope

Roles alone are not enough.

Every access decision should consider:

- role
- company scope
- assignment scope
- ownership
- workflow participation

Examples:

- a worker can only review documents inside their assigned company scope
- a client can only see their own records and explicitly shared records
- a company admin can supervise company-owned and company-scoped flows
- superadmin can inspect all scopes

### 5.4 User Profile Record

Internal user profile should contain:

- identity link to Clerk user
- role
- status
- companyId if applicable
- entityId if applicable
- display name
- high-level profile metadata

The system should avoid storing all business meaning only in Clerk metadata.

---

## 6. Domain Model

### 6.1 Entities

Core domain entities:

- `User`
- `Company`
- `CompanyMembership`
- `Worker`
- `Client`
- `FundingRecipient`
- `Document`
- `DocumentRequest`
- `DueDiligenceCase`
- `DueDiligenceItem`
- `DocumentReview`
- `DocumentSignature`
- `AuditLog`

### 6.2 Relationship Summary

- a `User` may represent a company admin, worker, client, or funding recipient
- a `Company` has memberships
- a `Worker` belongs to one company
- a `Client` belongs to zero or one company and may be assigned to one worker
- a `FundingRecipient` has its own profile and document flows
- a `DocumentRequest` requests a `Document`
- a `Document` may satisfy one request
- a `DueDiligenceCase` owns many `DueDiligenceItems`
- `DueDiligenceItems` may require documents
- a `Document` may have many `DocumentReviews`
- a `Document` may have many `DocumentSignatures`
- `AuditLogs` can refer to every important entity

---

## 7. Workflow Model

This is the most important part of the system design.

### 7.1 Registration Workflow

#### Company Admin

1. identity created
2. user profile created
3. company created
4. membership created
5. role routed to company workspace

#### Client

1. identity created
2. user profile created
3. client entity created
4. waits for assignment or enters active self-owned state depending on policy

#### Funding Recipient

1. identity created
2. user profile created
3. funding recipient entity created
4. compliance/reporting workflow starts later

#### Worker

1. company admin provisions worker
2. identity invitation or linked account created later
3. user profile and worker entity created
4. membership created

### 7.2 Assignment Workflow

1. company admin chooses client and worker
2. system validates company scope
3. client assigned to worker
4. assignment stored in client and worker records
5. audit event recorded

### 7.3 Document Request Workflow

1. company admin or worker creates request
2. request is scoped to company/client/funding recipient
3. request appears in recipient portal
4. recipient uploads document
5. request becomes submitted
6. reviewer is notified

### 7.4 Document Review Workflow

1. worker or company admin opens submitted document
2. reviews against checklist or request criteria
3. records outcome:
   - approved
   - rejected
   - needs changes
   - flagged
4. request and related diligence item update accordingly
5. audit event recorded

### 7.5 Due Diligence Workflow

1. case created
2. checklist items created
3. some items generate document requests
4. uploaded evidence satisfies checklist items
5. reviewer records outcomes
6. final report generated
7. case closes with result

### 7.6 Signature Workflow

1. agreement document created or promoted to signature-ready state
2. signers assigned in order
3. signature requests sent
4. signers complete or reject
5. final signed artifact stored
6. audit and verification recorded

---

## 8. State Machines

### 8.1 User Status

- `registered`
- `active`
- `pending`
- `approved`
- `rejected`
- `suspended`

Recommended simplification over time:

- `registered`
- `active`
- `suspended`

Use workflow objects for approval states instead of overloading user state.

### 8.2 Document Request Status

- `open`
- `submitted`
- `under_review`
- `approved`
- `rejected`
- `cancelled`

### 8.3 Document Status

- `draft`
- `requested`
- `uploaded`
- `in_review`
- `approved`
- `rejected`
- `signed`
- `archived`

### 8.4 Due Diligence Case Status

- `open`
- `collecting`
- `reviewing`
- `approved`
- `rejected`
- `closed`

### 8.5 Due Diligence Item Status

- `pending`
- `requested`
- `uploaded`
- `in_review`
- `approved`
- `rejected`
- `waived`

### 8.6 Signature Status

- `pending`
- `sent`
- `viewed`
- `signed`
- `declined`
- `expired`

---

## 9. Firestore as the Business Store

### 9.1 Recommended Active Collections

- `users`
- `companies`
- `companyMemberships`
- `workers`
- `clients`
- `fundingRecipients`
- `documents`
- `documentRequests`
- `dueDiligenceCases`
- `dueDiligenceItems`
- `documentReviews`
- `documentAccess`
- `documentSignatures`
- `auditLogs`
- `industries`
- `platform_meta`

### 9.2 Design Principles

- use top-level collections for major system entities
- keep references explicit
- avoid deeply nesting business-critical workflow records where they become hard to query
- treat Firestore as an operational store, not just a display cache

### 9.3 Query Principles

Design for:

- company scope queries
- assigned worker queries
- recipient-specific request queries
- superadmin audit queries

---

## 10. Access Control Design

### 10.1 Decision Inputs

Every read/write decision should be based on:

- authenticated user identity
- system role
- company membership
- assignment
- ownership
- explicit document access record where needed

### 10.2 Examples

#### Company Admin

Can:

- manage their company
- create workers
- assign clients
- open diligence cases
- request documents
- supervise company-scoped reviews

Cannot:

- operate across other companies unless also superadmin

#### Worker

Can:

- act inside assigned company scope
- request documents
- review evidence
- manage assigned client flows

Cannot:

- see unrelated companies
- see unrelated clients

#### Client

Can:

- see own requests
- upload own evidence
- view own profile and assigned team

Cannot:

- see company-private documents by default
- see other clients’ data

#### Funding Recipient

Can:

- view own requests
- upload own supporting documents
- handle own agreement/reporting flow

#### Superadmin

Can:

- view all scopes
- inspect workflows
- override or intervene in exceptional cases
- audit platform activity

---

## 11. Module Design for Dashboards

Dashboards should no longer be treated as generic “overview pages.”

They should be module surfaces over the system.

### 11.1 Company Admin Modules

- Overview
- Company Profile
- Clients
- Workers
- Documents
- Document Requests
- Due Diligence
- Funding
- Compliance

### 11.2 Worker Modules

- Overview
- Assigned Clients
- Requested Documents
- Review Queue
- Due Diligence
- Escalations

### 11.3 Client Modules

- Overview
- My Profile
- Assigned Team
- Documents
- Document Requests
- Compliance

### 11.4 Funding Modules

- Overview
- Wallet
- Documents
- Requests
- Milestones
- Compliance

### 11.5 Superadmin Modules

- Platform Overview
- Companies
- Assignments
- Documents
- Document Requests
- Due Diligence
- Compliance
- Audit

---

## 12. Service Boundaries

Even if implemented in the same codebase, the system should be mentally divided into services/modules.

### 12.1 Identity Service

Owns:

- Clerk integration
- session helpers
- auth middleware

### 12.2 Profile Service

Owns:

- internal user profiles
- role mapping
- route decisions

### 12.3 Organization Service

Owns:

- companies
- memberships
- workers
- client assignment

### 12.4 Document Service

Owns:

- document records
- storage metadata
- document access
- document requests
- review hooks

### 12.5 Due Diligence Service

Owns:

- cases
- checklist items
- evidence mapping
- outcome logic

### 12.6 Signature Service

Owns:

- signers
- signing states
- signed artifact lifecycle

### 12.7 Governance Service

Owns:

- audit logs
- superadmin summaries
- watchlists
- exception flows

---

## 13. UI Responsibilities vs System Responsibilities

### UI Responsibilities

- render data
- collect user input
- call actions
- show status
- navigate modules

### System Responsibilities

- validate role and scope
- create/update canonical records
- enforce lifecycle transitions
- maintain relationships
- maintain auditability

Important rule:

No business-critical workflow should exist only in component state.

---

## 14. Current State vs Target State

### What the App Already Has

- role-based route separation
- Firestore entity layer
- Firestore-backed workspace reads
- some Firestore-backed writes
- module-clickable sidebars
- first workflow collection: `documentRequests`
- modal-based workflow entry points

### What It Does Not Yet Fully Have

- Clerk-based identity
- complete workflow engine
- case-based due diligence
- full document access model
- review history model
- signature model
- audit model
- robust rule enforcement layer

So the app is currently:

**a platform shell with some real workflow foundations**

not yet:

**a complete operational system**

---

## 15. Recommended Next System Moves

### Move 1

Migrate identity to Clerk while preserving Firestore as the business database.

### Move 2

Finish the workflow domain:

- `dueDiligenceCases`
- `dueDiligenceItems`
- `documentReviews`
- `documentAccess`
- `documentSignatures`
- `auditLogs`

### Move 3

Refactor business actions out of page logic and into platform service modules.

### Move 4

Add explicit access-control helpers that every workflow write path uses.

### Move 5

Refactor dashboards so every sidebar module maps to a dedicated module component with a clear system responsibility.

---

## 16. Final Architectural Position

This platform should be built as:

**Clerk identity + Firestore business system + workflow-driven dashboards**

## Organization Model Addendum

The recommended Clerk organization mapping is:

- one Clerk organization per company
- `superadmin` remains a platform-level Firestore role
- company staff are `platformRole = company_user`
- company authority is refined by Clerk organization membership:
  - `org:admin`
  - `org:worker`
- clients and funding recipients remain platform actors, not default organization members

This keeps organization switching and staff membership in Clerk while preserving Firestore as the operational system of record.

not as:

**dashboard pages with actions attached directly to collections**

That is the difference between:

- an app that looks like a system

and

- an app that actually is one.
