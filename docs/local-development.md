# Local Development

> How to set up and run this project on your machine.
>
> **Note**: Concise instructions for this Ralph starter.

---

## Prerequisites

_Minimal setup for frontend-only template._

- [ ] Node.js (latest)
- [ ] pnpm (latest)
- [ ] Codex CLI (latest), configured to follow `docs/stack.md`

---

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/username/ralph-starter.git
cd ralph-starter
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

```bash
cp .env.example .env
```

#### Required Environment Variables

| Variable | Description | Example |
| -------- | ----------- | ------- |
| `NEXT_PUBLIC_API_BASE_URL` | API base URL | `https://api.example.com` |

### 4. Database Setup (if applicable)

_No database in this template._

### 5. Start the Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:[PORT]`.

---

## Common Tasks

### Reset Local State

```bash
pnpm clean
```

### Update Dependencies

```bash
pnpm update -L
```

### Generate Types / Build Assets

```bash
pnpm build
```

---

## Troubleshooting

### Problem: pnpm missing

**Solution**: `corepack enable && corepack prepare pnpm@latest --activate`

---

## IDE Setup (Optional)

### VS Code / Cursor

Recommended extensions:

- ESLint
- Tailwind CSS IntelliSense

Recommended settings (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true
}
```
