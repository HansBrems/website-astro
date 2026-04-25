---
description: "Use when creating or editing React (.tsx) components. Covers islands hydration, props conventions, Tailwind styling, and dynamic class safety rules."
applyTo: "src/**/*.tsx"
---

# React Component Rules

## React is for interactive islands only

If a component has no interactivity (no state, no event handlers, no browser APIs), implement it as an `.astro` component instead.

## Props: always use `interface Props` + destructuring

```tsx
interface Props {
  label: string;
  onClick: () => void;
}

export default function MyButton({ label, onClick }: Props) { ... }
```

## Hydration directives

| Directive | When to use |
|-----------|-------------|
| `client:visible` | Below the fold; lazy-loads when the component enters the viewport |
| `client:load` | Above the fold; hydrates immediately on page load |

Default to `client:visible`. Only use `client:load` for components visible on first paint.

## Styling: Tailwind only

No CSS modules, no `styled-components`, no inline `style` attributes unless a value cannot be expressed as a Tailwind class.

## Dynamic Tailwind classes

Tailwind's JIT scanner cannot detect dynamically assembled class names. If you build a class string at runtime (e.g. `` `border-${color}-500` ``), the complete class string must appear somewhere in the source — in the component itself, in `src/data/categories.json`, or as a safelist entry in `tailwind.config.mjs`.

When introducing a new color, add it to the safelist:
```js
// tailwind.config.mjs
safelist: [
  { pattern: /border-(teal|pink|stone|<new-color>)-500/ }
]
```

## Experimental / WIP components

Place work-in-progress React components in `src/shared/components/ui/experimental/`. They must only be imported by `dev.astro`, never by production pages.
