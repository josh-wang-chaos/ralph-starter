#!/bin/bash

codex --dangerously-bypass-approvals-and-sandbox "@.ralph/guardrails.md @.ralph/prd.json @.ralph/progress.txt \
1. Read ALL files in .ralph. \
2. Find the next incomplete task and implement it. \
3. Run feedback loops: pnpm lint, pnpm typecheck, pnpm test, pnpm build. \
4. Only if all pass, update prd.json and progress.txt. \
5. Commit your changes. \
ONLY DO ONE TASK AT A TIME."
