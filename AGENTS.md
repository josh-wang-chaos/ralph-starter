Ralph starter template. Frontend-only.

Always use latest stack in `docs/stack.md`.
Read ALL files in `.ralph` every iteration.
Only one task per iteration.

Before commit, ALL must pass:

- pnpm lint
- pnpm typecheck
- pnpm test
- pnpm build

Update `.ralph/prd.json` (set passes) and append to `.ralph/progress.txt`.
Keep progress entries concise. Grammar optional.

## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.
