# Deployment

> How to deploy this project to different environments.

---

## Environments

| Environment | URL                           | Branch        | Auto-deploy |
| ----------- | ----------------------------- | ------------- | ----------- |
| Production  | `https://app.example.com`     | `main`        | Yes         |
| Staging     | `https://staging.example.com` | `staging`     | Yes         |
| Preview     | PR URLs                       | PR branches   | Yes         |

---

## Prerequisites

- [ ] Vercel project connected
- [ ] Required env vars set
- [ ] CI configured

---

## Deployment Process

### Automatic Deployments

_Describe what triggers automatic deployments._

```
main → Production
staging → Staging
pull requests → Preview
```

### Manual Deployments

```bash
vercel --prod
```

---

## Environment Variables

### Production

| Variable | Description | Where to set |
| -------- | ----------- | ------------ |
| `NEXT_PUBLIC_API_BASE_URL` | API base URL | Vercel env vars |

### Staging

_Same as production, but with staging values._

---

## Pre-deployment Checklist

- [ ] Tests pass
- [ ] Env vars set
- [ ] Preview verified

---

## Database Migrations

### Running Migrations

_No database migrations in this template._

### Migration Strategy

- Migrations run automatically before deployment: N/A
- Zero-downtime migration approach: N/A

---

## Rollback Procedure

### Quick Rollback

```bash
vercel rollback
```

### Full Rollback (with database)

1. Identify the last known good version
2. Rollback database migrations (if safe)
3. Deploy previous version
4. Verify functionality

---

## Monitoring

### Health Checks

- Endpoint: `/api/health` (if added)
- Expected response: `200 OK`

### Logs

```bash
vercel logs
```

### Alerts

Use Vercel alerts or Slack integration.

---

## Troubleshooting

### Deployment Failed

1. Check CI/CD logs
2. Verify environment variables
3. Check for build errors
4. Review recent changes

### App Not Starting

1. Check application logs
2. Verify database connectivity
3. Check environment variables
4. Verify dependencies installed

### Performance Issues Post-Deploy

1. Check monitoring dashboards
2. Review recent changes for N+1 queries, memory leaks
3. Consider rollback if critical
