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

JSON array of items. Each item has:

- `category`
- `description`
- `steps`
- `passes`

Schema example:

```json
{
  "category": "functional",
  "description": "Short, clear outcome",
  "steps": [
    "Step to verify result"
  ],
  "passes": false
}
```

Sample entry (Next.js + Turborepo):

```json
{
  "category": "frontend",
  "description": "Add base app shell with Tailwind + shadcn/ui layout",
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
