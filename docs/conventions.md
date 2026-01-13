# Conventions

> **Document Type**: State (keep current)
>
> Last updated: 2026-01-13
>
> **Note**: Conventions match the stack in `docs/stack.md` and assume latest versions.

---

## File Structure

```
project-root/
├── apps/
│   └── web/                # Next.js app (App Router)
├── packages/
│   └── ui/                 # Shared UI primitives (shadcn/ui)
├── docs/                   # Workflow + project docs
└── ...
```

_Keep Turborepo layout simple: apps + packages only._

---

## Naming Conventions

_Define conventions for your stack. Examples:_

### Files

| Type        | Convention  | Example             |
| ----------- | ----------- | ------------------- |
| Components  | PascalCase  | `UserProfile.tsx`   |
| Hooks       | camelCase   | `useUser.ts`        |
| Utilities   | camelCase   | `formatDate.ts`     |
| Tests       | .test.ts(x) | `user.test.tsx`     |

### Code

| Type        | Convention       | Example        |
| ----------- | ---------------- | -------------- |
| Variables   | camelCase        | `userName`     |
| Functions   | camelCase        | `getUserById`  |
| Types       | PascalCase       | `UserProfile`  |
| Constants   | SCREAMING_SNAKE  | `MAX_RETRIES`  |

---

## Code Style

### General Principles

- Prefer clarity over cleverness
- Keep functions small and focused
- Use meaningful names
- Write self-documenting code; comments for _why_ only

### Language-Specific

_Add your stack's style rules here. Common examples:_

```
# TypeScript/React
- Prefer `const` over `let`
- Prefer named exports
- Keep component props typed

# Tailwind
- Prefer utility classes over custom CSS
- Extract shared styles into components
```

### Imports / Dependencies

_Define import ordering for your stack. General pattern:_

```
# 1. External deps
# 2. Internal packages
# 3. Relative imports
```

---

## Git Conventions

### Branches

```
feature/issue-{number}-{short-description}
fix/issue-{number}-{short-description}
refactor/{description}
docs/{description}
```

### Commits

```
type(scope): description

Types: feat, fix, refactor, test, docs, chore
```

### PRs

- Title: `[TYPE] Brief description (#issue)`
- Always link to the issue/task being solved
- Include a brief description of the approach

---

## Testing

This project uses **TDD**. Keep cycles small.

### TDD Workflow

Follow the RED-GREEN-REFACTOR cycle:

1. **RED**: failing test
2. **GREEN**: simplest pass
3. **REFACTOR**: clean up

### What to Test

- Business logic and data transformations
- Edge cases and error handling
- Public APIs and interfaces
- Integration points

### What to Skip

- Third-party library internals
- Trivial getters/setters
- Implementation details

### Test Naming

Use descriptive names that explain the scenario:

```
Good: test_returns_empty_list_when_no_items_match_filter
Bad:  test_filter_works
```

---

## Documentation

### Code Comments

- Explain _why_, not _what_
- Document non-obvious behavior
- Use your language's doc format (JSDoc, docstrings, rustdoc, godoc, Javadoc, etc.)

### Docs Folder

- Keep docs up to date when making changes
- Reference docs in PR descriptions when relevant
