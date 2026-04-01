# Sector AMM Roadmap

## Overview
JM-Qafri's investment surface already tells a consistent story: curated deal flow, sector conviction, due diligence, compliance, and relationship-led access. The proposed sector AMM extends that story by turning the major investment theses in the app into tradeable, liquidity-backed market surfaces.

This is not a generic crypto exchange. It is a member-aware capital market interface for curated sector exposure.

## Core Idea
Create on-platform markets for sector tokens that represent themed exposure rather than direct company equity.

Initial market set:
- `AGRI` for agriculture and food systems
- `MEDAI` for medicine, diagnostics, and AI-enabled care
- `TRADE` for trade infrastructure and cross-border commerce
- `ETEC` for Eurasia-Africa trade corridors and industrial cooperation
- `SPACE` for frontier and long-duration speculative innovation

Initial pool structure:
- `USDC / AGRI`
- `USDC / MEDAI`
- `USDC / TRADE`
- `USDC / ETEC`
- `USDC / SPACE`

## Product Thesis
The AMM should express the broader investment thesis already embedded in the app:
- capital is routed into sectors, not random tokens
- access is curated rather than fully open
- diligence and compliance remain first-class
- membership and trust shape participation
- public pricing and private underwriting can coexist

This makes the AMM the liquidity layer for JM-Qafri's sector narratives rather than a separate product category.

## Market Design
### Recommended model
Use a hybrid design:
- primary issuance/redemption handled by treasury or an approved committee
- secondary market pricing handled by AMM pools
- a treasury reference price or NAV-like anchor keeps markets legible

### Why hybrid
A pure Uniswap-style model works well for liquid crypto assets but fits poorly with slower-moving, diligence-heavy sector theses. A hybrid design preserves:
- price discovery
- member liquidity
- treasury oversight
- room for real-world backing later

## User Roles
The current workspace model already maps well onto the proposed markets.

- `client`: discovers sectors, trades exposure, views holdings
- `funding_recipient`: links wallet, stakes, tracks earnings and documents
- `worker`: manages diligence, flags issues, reviews submissions
- `company_admin`: submits opportunities and supporting information
- `superadmin`: manages market launches, reference pricing, and controls

## Phased Rollout
### Phase 1: Thesis Markets
Goal: validate UX and product language.

Deliverables:
- sector market index
- market detail pages
- mock trade and liquidity panels
- member/compliance gating banners
- portfolio overview

No real execution, no live wallets, no settlement.

### Phase 2: Managed Mock Operations
Goal: connect markets to app workflows.

Deliverables:
- wallet connection states
- membership-based access rules
- diligence status integration
- market-level disclosures
- admin launch/pause controls

Still simulated pricing and balances.

### Phase 3: Treasury-Backed Sector Tokens
Goal: introduce real market behavior under governance.

Deliverables:
- issuance and redemption logic
- treasury reference pricing
- rewards and fee accounting
- pool participation tracking
- reporting surfaces in funding workspace

### Phase 4: Real Liquidity and Distribution
Goal: tie exposure to governed real-world value.

Deliverables:
- distribution accounting
- redemption windows
- investor statements
- audit and compliance reporting

## UI Implementation Plan
### Primary screens
- `Markets Index`: all sector markets, filters, stats, entry points
- `Market Detail`: sector thesis, chart, pool stats, diligence and disclosures
- `Trade`: dedicated swap view for `USDC <-> sector`
- `Liquidity`: add/remove liquidity and fee preview
- `Portfolio`: holdings, LP positions, earnings, compliance status

### UI principles
- maintain homepage tone: serif-led, editorial, restrained, premium
- make the experience feel like a capital markets salon, not a retail exchange
- present numbers clearly without leaning on neon trading motifs
- keep diligence and eligibility visible alongside price and liquidity

### Shared modules
- market cards
- compact chart/sparkline component
- stat rows
- eligibility banners
- swap panel
- liquidity panel
- thesis and diligence blocks

## Content Model
Each market should include:
- symbol
- sector name
- one-line thesis
- pool pair
- live or mock price
- 24h change
- TVL
- volume
- fee APR
- treasury reference price
- risk label
- access label
- diligence status
- key included themes
- disclosure text

## Alignment With Existing App
The AMM layer should reuse current app themes and data concepts:
- membership pages establish access and investor intent
- funding workspace already models wallet, stake, earned, and documents
- due diligence queues already exist in workspaces
- sector pages already provide the underlying narratives

This means the markets feature can feel native even before any on-chain logic exists.

## Risks And Constraints
- sector tokens may imply regulated exposure if tied too directly to real returns
- AMM pricing can diverge from slow-moving real-world value
- liquidity UX can become misleading without treasury and disclosure context
- compliance, jurisdiction, and membership rules must remain visible in the UI

## Immediate Build Scope
The first implementation should ship:
- roadmap and product framing
- mock market data
- route scaffolds for markets and portfolio
- wireframe-quality trade and liquidity UI
- content that matches the homepage theme

The first implementation should not yet ship:
- live swaps
- wallet execution
- token issuance
- oracle logic
- payout settlement
