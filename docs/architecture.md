# Architecture

> **Document Type**: State (keep current)
>
> Last updated: 2026-01-13

---

## Overview

This starter repo defines a Ralph-ready workflow for a frontend-only sample app built with Next.js App Router. The architecture assumes a single web app with client-side state managed via Zustand, server state via TanStack Query, and shared UI primitives via shadcn/ui, with no backend services in scope.

---

## System Diagram

```
┌──────────────┐     ┌──────────────────┐
│   Browser    │────▶│ Next.js App      │
│ (React UI)   │     │ (App Router)     │
└──────────────┘     └──────────────────┘
         ▲                    │
         │                    ▼
         │            ┌──────────────────┐
         └────────────│ API endpoints     │
                      │ (future optional)│
                      └──────────────────┘
```

---

## Components

### App Router Shell

**Responsibility**: Defines layout, routing, and shared providers.

**Location**: `apps/web/app`

**Key interfaces**:

- Layouts and route segments

**Dependencies**:

- shadcn/ui, Tailwind CSS

### Client State

**Responsibility**: Local UI state and cross-page ephemeral state.

**Location**: `apps/web/store`

**Key interfaces**:

- Zustand stores and selectors

**Dependencies**:

- Zustand

### Server State

**Responsibility**: Data fetching and caching for remote resources.

**Location**: `apps/web/lib/queries`

**Key interfaces**:

- Query keys and fetch functions

**Dependencies**:

- TanStack Query

---

## Data Flow

User interactions trigger React components, which read or update local state via Zustand. Remote data is fetched and cached via TanStack Query hooks; forms are validated with Zod and managed by React Hook Form.

### Example Flow: Form Submission

1. User submits a form managed by React Hook Form.
2. Zod validates input before submission.
3. A TanStack Query mutation sends the request.
4. On success, cache updates and UI re-renders.

---

## Key Patterns

Patterns intended for the sample app remain consistent across pages and components.

### Shared UI Primitives

**Where used**: Components in `apps/web/components/ui`.

**How it works**: shadcn/ui primitives are customized via Tailwind and reused across pages.

### Query-First Data Access

**Where used**: All remote data access.

**How it works**: Components call TanStack Query hooks instead of ad-hoc fetches to centralize caching.

---

## Boundaries & Constraints

The sample app is frontend-only and does not include backend services or database access.
