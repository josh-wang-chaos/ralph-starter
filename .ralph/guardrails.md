Ralph guardrails. Read all files in .ralph every iteration.

Quality bar: starter template, long-lived. No shortcuts.

Feedback loops (all must pass before commit):
- pnpm lint
- pnpm typecheck
- pnpm test
- pnpm build

PRD JSON schema example:
{
  "category": "functional",
  "description": "Short, clear outcome",
  "steps": [
    "Step to verify result"
  ],
  "passes": false
}

Sample PRD entry (Next.js + Turborepo):
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
