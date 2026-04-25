---
name: build-verify
description: 'Run the full Astro build (npm run build = astro check + astro build), interpret TypeScript and Astro diagnostics, and suggest targeted fixes. Use when the build is failing or after making a significant set of changes.'
argument-hint: 'Optional: paste specific error output to triage'
---

# Build Verify

Runs `npm run build` (`astro check && astro build`), interprets any TypeScript and Astro diagnostics, and proposes the minimal targeted fix for each error.

## Procedure

1. Run `npm run build` from the workspace root.
2. Capture the full output.
3. For each error or diagnostic:
   - Identify the file and line number.
   - Diagnose the root cause (type mismatch, missing prop, broken import, etc.).
   - Propose the minimal change to fix it — no unrelated refactoring.
4. Apply fixes and re-run `npm run build` to confirm it passes cleanly.

## Common Error Patterns

| Error                                    | Likely cause                                     | Fix                                                                           |
| ---------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------- |
| `Type 'X' is not assignable to type 'Y'` | Zod schema mismatch or prop type error           | Align the type with the schema in `src/domain/models/`                        |
| `Cannot find module '...'`               | Wrong import path                                | Use relative paths; check the file's location in the folder structure         |
| `Property 'X' does not exist`            | Missing prop in `interface Props`                | Add the prop to the interface or remove the usage                             |
| `Astro.glob is not defined`              | Wrong Astro API                                  | Use `getCollection()` from `astro:content`                                    |
| Dynamic class not applied                | Tailwind JIT can't detect assembled class string | Use complete class strings or add a safelist pattern in `tailwind.config.mjs` |
| `id` collision in collection             | Duplicate `id` in a JSON file                    | Use `max(id) + 1` for new entries                                             |
