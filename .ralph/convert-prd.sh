#!/bin/bash
set -euo pipefail

INPUT=".ralph/prd.md"
OUTPUT=".ralph/prd.json"
TMP="$(mktemp)"

if ! command -v codex >/dev/null 2>&1; then
  echo "codex not found in PATH" >&2
  exit 1
fi

codex exec "@${INPUT} Convert into JSON with project, version, scope, and features[]. Each feature has id, category, description, priority, steps, passes:false. Keep steps as verifiable checks. Output JSON only." > "$TMP"

node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));if(!p||!Array.isArray(p.features))throw new Error('Invalid prd.json: missing features[]');for(const f of p.features){if(!f.id||!f.category||!f.description||typeof f.priority!=='number'||!Array.isArray(f.steps)||f.steps.length===0||typeof f.passes!=='boolean')throw new Error('Invalid prd.json: bad feature');}fs.writeFileSync(process.argv[2], JSON.stringify(p, null, 2) + '\\n');" "$TMP" "$OUTPUT"
echo "Wrote ${OUTPUT}"
