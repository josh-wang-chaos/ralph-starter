# Technology Stack

> **Document Type**: State (keep current)
>
> Last updated: 2026-01-13
>
> **Note**: All stack choices use latest versions unless stated.

---

## Runtime & Language

| Technology | Version | Purpose                |
| ---------- | ------- | ---------------------- |
| Node.js    | Latest  | Frontend runtime       |
| TypeScript | Latest  | Application language   |
| pnpm       | Latest  | Package manager        |
| Turborepo  | Latest  | Monorepo task runner   |

---

## Framework & Libraries

### Core

| Library           | Version | Purpose                             |
| ----------------- | ------- | ----------------------------------- |
| Next.js (App Router) | Latest  | Web framework                       |
| React             | Latest  | UI rendering                        |
| Tailwind CSS      | Latest  | Styling                             |
| shadcn/ui         | Latest  | Component primitives                |
| Zustand           | Latest  | Client state                        |
| TanStack Query    | Latest  | Server state                        |
| Zod               | Latest  | Schema validation                   |
| React Hook Form   | Latest  | Forms                               |

### Testing

| Library | Version | Purpose       |
| ------- | ------- | ------------- |
| TBD     | TBD     | Test runner   |

### Development

| Tool       | Version | Purpose  |
| ---------- | ------- | -------- |
| ESLint     | Latest  | Linter   |
| Prettier   | Latest  | Formatter|
| Tailwind CSS CLI | Latest | CSS tooling |

---

## Infrastructure

| Service | Purpose  | Notes   |
| ------- | -------- | ------- |
| Vercel  | Hosting  | Production + preview |

---

## Key Technical Decisions

Brief notes on why major choices were made. For detailed rationale, see `docs/how-to-work/decisions.md`.

- **Next.js (App Router)**: Rapid iteration with strong conventions for app routing.
- **Turborepo**: Scales the template to multiple apps/packages without changing workflows.
- **pnpm**: Fast installs and deterministic dependency layout.
