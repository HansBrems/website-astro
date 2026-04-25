---
name: write-tests
description: 'Write and run tests for this project. Covers pure-function unit tests, Zod schema validation tests, and React component tests with @testing-library/react. Use after implementing a feature or when adding tests to existing code.'
argument-hint: 'Optional: name of the component, function, or schema to test (e.g. "Tag component", "projectSchema")'
---

# Write Tests

Writes tests following the project's three-tier testing strategy. See `testing-strategy.md` for what to test and `testing-setup.md` for first-time infrastructure setup.

---

## Stack

| Tool                          | Purpose                                                             |
| ----------------------------- | ------------------------------------------------------------------- |
| `vitest`                      | Test runner (Vite-native, works seamlessly with Astro)              |
| `jsdom`                       | DOM environment for React component tests                           |
| `@testing-library/react`      | Render and query React components                                   |
| `@testing-library/user-event` | Simulate user interactions                                          |
| `@testing-library/jest-dom`   | Extra DOM matchers (`.toBeInTheDocument()`, `.toHaveClass()`, etc.) |

> If the test infrastructure is not yet set up, follow `testing-setup.md` before proceeding.

---

## Step 1 — Write the tests

### Tier 1 — Pure function tests

Test each exported pure function in isolation. Construct minimal inputs, assert on return values.

```ts
import { describe, expect, it } from 'vitest';

import { myFunction } from '../my-module';

describe('myFunction', () => {
  it('returns the expected value for a standard input', () => {
    expect(myFunction(input)).toBe(expectedValue);
  });

  it('returns the fallback when the primary lookup fails', () => {
    expect(myFunction(unknownInput)).toBe(fallback);
  });

  it('handles an empty collection gracefully', () => {
    expect(myFunction([])).toBe(defaultValue);
  });
});
```

---

### Tier 2 — Zod schema tests

Test each schema with a valid baseline object, then assert on individual failure modes.

```ts
import { describe, expect, it } from 'vitest';

import { mySchema } from '../my-schema';

const valid = {
  /* minimal valid object */
};

describe('mySchema', () => {
  it('parses a valid object', () => {
    expect(() => mySchema.parse(valid)).not.toThrow();
  });

  it('transforms a field as expected', () => {
    const result = mySchema.parse(valid);
    expect(result.someField).toBeInstanceOf(ExpectedType);
  });

  it('throws when a required field is missing', () => {
    const { requiredField, ...rest } = valid;
    expect(() => mySchema.parse(rest)).toThrow();
  });

  it('throws for an invalid field value', () => {
    expect(() => mySchema.parse({ ...valid, someField: 'bad-value' })).toThrow();
  });
});
```

**Data integrity pattern** — parse the actual JSON data files through their schemas to catch corrupt entries at test time:

```ts
import { describe, expect, it } from 'vitest';

import { mySchema } from '../../domain/models/my-model';
import data from '../my-data.json';

describe('data integrity — my-data.json', () => {
  it('every entry passes mySchema', () => {
    for (const entry of data) {
      expect(() => mySchema.parse(entry)).not.toThrow();
    }
  });
});
```

> Import Zod from `astro/zod`, not directly from `zod`.

---

### Tier 3 — React component tests

Render the component with `@testing-library/react`, query via accessible roles and text, simulate interactions with `userEvent`.

**Rendering and content:**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders the expected text', () => {
    render(<MyComponent prop="value" />);
    expect(screen.getByText('value')).toBeInTheDocument();
  });

  it('applies a dynamic class', () => {
    const { container } = render(<MyComponent color="teal" />);
    expect(container.firstChild).toHaveClass('border-teal-500');
  });
});
```

**User interactions:**

```tsx
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

it('calls the handler when clicked', async () => {
  const handler = vi.fn();
  render(<MyComponent onClick={handler} />);
  await userEvent.click(screen.getByRole('button'));
  expect(handler).toHaveBeenCalledOnce();
});
```

**Conditional rendering:**

```tsx
it('does not render the element when the condition is false', () => {
  render(<MyComponent show={false} />);
  expect(screen.queryByText('hidden content')).not.toBeInTheDocument();
});

it('renders the element when the condition is true', () => {
  render(<MyComponent show={true} />);
  expect(screen.getByText('hidden content')).toBeInTheDocument();
});
```

**State toggling:**

```tsx
it('reveals hidden items after clicking the toggle', async () => {
  render(<MyComponent items={manyItems} />);
  await userEvent.click(screen.getByRole('button', { name: /show all/i }));
  expect(screen.getByText('last item')).toBeInTheDocument();
});
```

---

## Step 2 — Run the tests

```bash
npm run test
```

All tests must pass before the implementation is considered done. If any test fails:

1. Read the error message carefully.
2. Determine whether the bug is in the test or the implementation.
3. Fix the root cause — do not weaken assertions to make tests pass.
4. Re-run until all pass.

---

## Conventions

- **Test files live in `__tests__/`** next to the module they test, not in a top-level `tests/` folder.
- **One `describe` block per module.** Use nested `describe` to group sub-units if needed.
- **Test names describe behaviour**, not implementation (`'shows "Present" when to is null'`, not `'tests the to field'`).
- **No snapshots.** Assert on specific text, roles, and classes — not serialised HTML.
- **No mocking of internal modules.** Only mock external dependencies (third-party libraries) if strictly necessary.
- **Import Zod from `astro/zod`** (not directly from `zod`) — this project uses Astro's re-export to keep versions in sync.
