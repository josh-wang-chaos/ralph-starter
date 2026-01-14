# Ralph Starter

Starter template for running a Ralph loop with Codex CLI.

## How To Use

1. Create a new repo from this template.
2. Write your evolving PRD in `.ralph/prd.md`.
3. Convert `.ralph/prd.md` into `.ralph/prd.json`.
4. Run `./.ralph/ralph-once.sh` to execute one iteration.
5. Repeat `./.ralph/ralph-once.sh` until complete.

## Loop Rules

- Read ALL files in `.ralph` every iteration.
- One task per iteration.
- Before commit, all must pass:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
- Update `.ralph/prd.json` and append to `.ralph/progress.txt`.

## Docs

- `docs/ralph-loop.md` for PRD schema and loop details.
- `docs/stack.md` for the latest stack.

## PRD JSON Tip

On first run, share `.ralph/prd.md` and let the agent:

1. Analyze requirements.
2. Ask clarifying questions.
3. Propose a detailed, executable `.ralph/prd.json` step by step.

Keep steps granular (3–6 small, verifiable steps per feature).
