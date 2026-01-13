# Testing

> Testing strategy, conventions, and how to run tests.
>
> **Note**: Jest-only setup for this template.

---

## Quick Reference

```bash
pnpm test                   # Run all tests
pnpm test -- --watch        # Watch mode
pnpm test -- --coverage     # With coverage
```

---

## Testing Strategy

### Test Types

| Type        | Purpose                           | Location              |
| ----------- | --------------------------------- | --------------------- |
| Unit        | Functions/components in isolation | `apps/web/__tests__/` |
| Integration | React + data flow together        | `apps/web/__tests__/` |

### What to Test

- **Always test**: Business logic, data transformations, edge cases
- **Consider testing**: Component behavior, API contracts
- **Usually skip**: Third-party libraries, trivial getters/setters

---

## Writing Tests

### File Naming

```
[name].test.ts
[name].test.tsx
```

### Test Structure

**Jest (TypeScript/React)**

```javascript
describe('ComponentName', () => {
  describe('methodName', () => {
    it('should [expected behavior] when [condition]', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

_Only Jest is supported right now._

### Naming Conventions

- Describe **what** the code does, not **how**
- Use "should [verb]" format
- Be specific about conditions

Good: `it('should return empty array when no items match filter')`
Bad: `it('works correctly')`

---

## Test Data

Use inline factories in tests. Keep fixtures minimal.

---

## Coverage

### Requirements

- Minimum coverage: TBD
- New code should include tests

### Viewing Coverage

```bash
pnpm test -- --coverage
```

---

## CI Integration

Tests run automatically on:

- Pull request creation
- Push to `main` / `develop`

See `.github/workflows/` for CI configuration.

---

## Troubleshooting

### Tests are slow

- Check for unnecessary database calls
- Use mocks for external services
- Run specific files instead of full suite

### Tests are flaky

- Avoid time-dependent assertions
- Clean up state between tests
- Check for race conditions
