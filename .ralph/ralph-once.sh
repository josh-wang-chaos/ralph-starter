#!/bin/bash

node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('.ralph/prd.json','utf8'));if(!p||!Array.isArray(p.features))throw new Error('Invalid prd.json: missing features[]');for(const f of p.features){if(!f.id||!f.category||!f.description||typeof f.priority!=='number'||!Array.isArray(f.steps)||f.steps.length===0||typeof f.passes!=='boolean')throw new Error('Invalid prd.json: bad feature');}"
codex --dangerously-bypass-approvals-and-sandbox "@.ralph/guardrails.md @.ralph/prd.json @.ralph/progress.txt \
1. Read ALL files in .ralph. \
2. Find the next incomplete task and implement it. \
3. Run feedback loops: pnpm lint, pnpm typecheck, pnpm test, pnpm build. \
4. Only if all pass, update prd.json and progress.txt. \
5. Commit your changes. \
ONLY DO ONE TASK AT A TIME."
