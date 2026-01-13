#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

for ((i=1; i<=$1; i++)); do
  result=$(codex --dangerously-bypass-approvals-and-sandbox "@.ralph/guardrails.md @.ralph/prd.json @.ralph/progress.txt \
  1. Read ALL files in .ralph. \
  2. Find the highest-priority task and implement it. \
  3. Run feedback loops: pnpm lint, pnpm typecheck, pnpm test, pnpm build. \
  4. Only if all pass, update prd.json and progress.txt. \
  5. Commit your changes. \
  ONLY WORK ON A SINGLE TASK. \
  If the PRD is complete, output <promise>COMPLETE</promise>.")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "PRD complete after $i iterations."
    exit 0
  fi
done
