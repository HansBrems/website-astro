---
description: 'Use when adding or editing typography, spacing, or layout in any .astro page, layout, or .tsx component. Covers vertical rhythm, leading, heading margins, and spacing rules.'
applyTo: '**/*.astro, **/*.tsx'
---

# Typography Rules

## Vertical Rhythm

Vertical rhythm is the primary typographic principle on this site. All vertical spacing — between lines, paragraphs, headings, images, and any block-level element — must be aligned to a single base unit derived from the body leading.

**References**: [§2.2.1 Choose a basic leading](https://webtypography.net/2.2.1) · [§2.2.2 Add and delete vertical space in measured intervals](https://webtypography.net/2.2.2) — _The Elements of Typographic Style Applied to the Web_

### Core formula

```
base unit = body font-size × line-height
```

Example: body at `1rem` (`16px`) with `leading-relaxed` (`1.625`) → base unit ≈ `26px`. All vertical spacing must be a whole multiple of that unit.

### Rules

1. **Establish one base leading for body text and never vary it per element.**
   Use a single `leading-*` class on the body or a wrapping prose container. Do not override `line-height` on individual paragraphs, list items, or inline elements.

2. **Heading margins must be multiples of the base unit.**
   The temptation is `mt-4` / `mb-2` etc., but those values must correspond to multiples of the base leading, not arbitrary Tailwind steps.

   ```html
   <!-- ✅ heading margins that sum to 2× the base unit -->
   <h2 class="mt-[1.625rem] mb-[1.625rem]">...</h2>

   <!-- ❌ arbitrary values that break the grid -->
   <h2 class="mt-5 mb-3">...</h2>
   ```

3. **Always override browser-default block margins.**
   Browsers insert `1em` top/bottom margin on `<p>`, `<blockquote>`, `<ul>`, `<ol>`, etc. These defaults rarely align to the base unit. Always set explicit margins using multiples of the base unit.

4. **Spacing between sections must also be multiples of the base unit.**
   Padding and margin applied to sections, cards, or layout containers are not exempt. Use `gap-*`, `py-*`, `my-*` values that stay on the grid.

5. **Size images in `em` units where possible.**
   An image height expressed in `em` scales with text size and keeps the image on-grid. A fixed `px` height will drift off the rhythm when the user's default font size changes — accept this only when image quality loss from `em` sizing is unacceptable.

6. **Do not mix arbitrary spacing values with a chosen rhythm grid.**
   Once a base unit is established, all vertical spacing decisions should be derivable from it. Mixing unrelated values (e.g., `mt-5`, `mt-7`, `mt-11`) is a signal that the rhythm has been broken.

### Tailwind implementation notes

- Tailwind's `leading-*` scale maps to unitless `line-height` values, which is the correct approach (avoids overlap when font size changes).
- Use Tailwind's arbitrary value syntax (`mt-[1.625rem]`) to express exact multiples of the base unit when no named utility matches.
- Headings with a different `text-*` size need a recalculated `leading-*` so that their line box height remains a multiple of the base unit: `line-height = base-unit ÷ heading-font-size`.
- `@tailwindcss/typography` (`prose`) provides reasonable defaults, but verify its heading margins are on-grid after any font-size or leading change.
