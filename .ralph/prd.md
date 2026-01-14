# Affiliate Portal PRD v0.01

## Purpose
Define the first scope for the new affiliate portal to validate login and basic UI in all environments while connected to the legacy system.

## Goals
- Run the new portal across all environments (dev, staging, prod).
- Connect to the legacy portal for authentication and data access.
- Allow affiliates to log in to the new portal (no sign up).
- Provide a basic dashboard page as a UI reference.

## Non-goals
- New affiliate sign-up flow.
- Full feature parity with the legacy portal.
- Replacing legacy APIs or data sources.

## Scope (v0.01)

### Environments
- Environments supported: dev, staging, production.
- Each environment must connect to the corresponding legacy backend.

### Authentication
- Login only (email + password).
- No self-service sign-up or password reset.
- Session established via legacy-compatible flow (SSO bridge).

### Legacy connectivity
- New portal routes proxy to legacy APIs.
- Legacy remains source of truth.

### UI
- Basic dashboard page.
- Must use real data from legacy APIs (no static or mocked data).

## User journey (happy path)
1) Affiliate opens the new portal.
2) Affiliate logs in using existing credentials.
3) Affiliate lands on a basic dashboard page.

## Success criteria
- Login succeeds for existing affiliates in dev, staging, and prod.
- Basic dashboard loads after login in all environments.
- New portal can access legacy APIs via proxy.

## Open questions
- Domain mapping per environment (new portal and legacy).
- Session cookie domain for cross-portal login.
- Identity mapping (email vs affiliate UUID).
