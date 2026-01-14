# Ralph Loop

> How to run Ralph in this repo.
>
> **Note**: Concise. Grammar optional.

---

## Overview

Ralph runs Codex in a loop. It reads all files in `.ralph`, picks one task from `.ralph/prd.json`, completes it, runs feedback loops, updates `.ralph/progress.txt`, then commits.

---

## Quick Start

1. Create new repo from this template.
2. Write your product brief in `.ralph/prd.md`.
3. Convert `.ralph/prd.md` into `.ralph/prd.json`.
4. Run `./.ralph/ralph-once.sh` to start the loop.
5. Codex initializes latest Next.js stack in `apps/web`.
6. Repeat `./.ralph/ralph-once.sh` until complete.

---

## PRD Format

Top-level object with `project`, `version`, `scope`, and `features`.

Each feature item has:

- `id`
- `category`
- `description`
- `priority`
- `steps`
- `passes`

Schema example:

```json
{
  "project": "my-app",
  "version": "0.1.0",
  "scope": "short-scope-name",
  "features": [
    {
      "id": "FEAT-001",
      "category": "functional",
      "description": "Short, clear outcome",
      "priority": 1,
      "steps": [
        "Step to verify result"
      ],
      "passes": false
    }
  ]
}
```

Sample entry (Next.js + Turborepo):

```json
{
  "id": "UI-001",
  "category": "frontend",
  "description": "Add base app shell with Tailwind + shadcn/ui layout",
  "priority": 2,
  "steps": [
    "Run pnpm dev",
    "Load / and see header + content shell",
    "No console errors"
  ],
  "passes": false
}
```

---

## Feedback Loops

All must pass before commit:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

---

## Progress

Append to `.ralph/progress.txt` each iteration:

- Task completed
- Decisions made
- Files changed
- Blockers or notes

Keep entries concise.

---

## PRD JSON Flow

On first run, share `.ralph/prd.md` and let the agent:

1. Analyze requirements.
2. Ask clarifying questions.
3. Propose a detailed, executable `.ralph/prd.json` step by step.

Keep steps granular (3–6 small, verifiable steps per feature).

---

## Standard Init (Next.js)

Use the official Next.js app router scaffold:

```bash
pnpm create next-app@latest apps/web --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Verify:

- `apps/web/package.json` exists
- `pnpm --dir apps/web dev` renders `/`
