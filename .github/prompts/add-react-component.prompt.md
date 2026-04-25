---
description: 'Create a new React component or interactive island. Determines placement, applies island hydration and Tailwind conventions, and runs the build.'
agent: 'agent'
argument-hint: 'Component name and what it does'
---

> Expected input: component name and what it does.

Create a new React component using the following steps:

1. Ask to clarify the component's purpose and determine the right placement:

   | Placement                                | When                                                               |
   | ---------------------------------------- | ------------------------------------------------------------------ |
   | `src/features/<feature>/`                | Feature-specific UI tied to a domain concept (e.g. projects, blog) |
   | `src/shared/components/ui/`              | Generic, reusable across multiple features                         |
   | `src/shared/components/ui/experimental/` | Work-in-progress, not ready for production                         |

2. Create `<ComponentName>.tsx` in the chosen folder using this template:

   ```tsx
   interface Props {
     // props here
   }

   export default function ComponentName({ ... }: Props) {
     return (
       // JSX here — Tailwind classes only
     );
   }
   ```

3. If the component will be used in a page, use the correct hydration directive at the call site:
   - `client:visible` — default; lazy-loads when the component enters the viewport
   - `client:load` — only for components visible immediately on first paint

4. If the component introduces new dynamic Tailwind color classes (e.g. `` `bg-${color}-500` ``), add complete class strings or safelist patterns to [tailwind.config.mjs](../tailwind.config.mjs).

5. Run `npm run build` and report the result. Fix any errors before finishing.
