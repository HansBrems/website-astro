# Tailwind CSS Customizations

This document describes every customization made to Tailwind CSS defaults in this project. Customizations come from two files:

- **`tailwind.config.mjs`** — JS-based config (theme overrides, dark mode strategy, animations).
- **`src/styles/global.css`** — CSS entry point (plugins, source safelisting, font registration, base resets).

---

# Dark Mode Strategy

**File:** `tailwind.config.mjs`  
**Key:** `darkMode`  
**Value:** `'selector'`

```js
darkMode: 'selector',
```

**What changed:** Dark mode is activated by adding the `dark` class to the `<html>` element instead of relying on the `prefers-color-scheme` media query (the Tailwind v3 default strategy, `'media'`). In Tailwind v4 the default is already class-based, but `'selector'` is set explicitly here to be unambiguous.

**Why:** `ThemeToggle.astro` reads `localStorage` and `prefers-color-scheme` on the client and then sets or removes `class="dark"` on `<html>`. This gives the user manual control while still respecting their OS preference on first load.

---

# Font Family — Sans Override

**File:** `tailwind.config.mjs`  
**Key:** `theme.fontFamily.sans`  
**Value:** `['Inter Variable', 'sans-serif']`

```js
theme: {
  fontFamily: {
    sans: ['Inter Variable', 'sans-serif'],
  },
},
```

**What changed:** The default Tailwind `font-sans` stack (`ui-sans-serif, system-ui, …`) is **replaced** (not extended) with `Inter Variable` as the primary face, with `sans-serif` as the generic fallback. `Inter Variable` is loaded via the `@fontsource-variable/inter` npm package and imported in `Page.astro`.

**Why:** Provides a consistent, modern variable font across all devices rather than relying on OS system fonts.

---

# Custom Animation — `jiggle`

**File:** `tailwind.config.mjs`  
**Key:** `theme.extend.animation.jiggle`  
**Value:** `'jiggleFrames 1s ease-in-out'`

```js
extend: {
  animation: {
    jiggle: 'jiggleFrames 1s ease-in-out',
  },
},
```

**What changed:** Adds the utility class `animate-jiggle` to the Tailwind animation scale. It runs the `jiggleFrames` keyframes over 1 second with an ease-in-out timing function.

**Why:** Used on `Button.tsx` (`hover:animate-jiggle`) to give the button a subtle vertical bounce on hover, adding playful interactivity.

---

# Custom Keyframes — `jiggleFrames`

**File:** `tailwind.config.mjs`  
**Key:** `theme.extend.keyframes.jiggleFrames`

```js
extend: {
  keyframes: {
    jiggleFrames: {
      '0%':   { transform: 'translateY(0)' },
      '50%':  { transform: 'translateY(-3px)' },
      '100%': { transform: 'translateY(0)' },
    },
  },
},
```

**What changed:** Defines the `@keyframes jiggleFrames` rule. The element starts and ends at its natural position, peaking 3 px above at the midpoint.

**Why:** Required by the `jiggle` animation entry above. Keeping it in the config rather than in global CSS lets Tailwind tree-shake it if the animation class is never used.

---

# Typography Plugin

**File:** `src/styles/global.css`  
**Directive:** `@plugin '@tailwindcss/typography'`

```css
@plugin '@tailwindcss/typography';
```

**What changed:** Enables the official `@tailwindcss/typography` plugin, which adds the `prose` utility family. These classes apply opinionated typographic styles to long-form HTML content (headings, paragraphs, lists, code blocks, etc.).

**Why:** Used by `Prose.astro` (`class="prose prose-stone …"`) to style the About section and any other long-form text without writing custom CSS for every HTML element.

---

# Color Utility Safelist (`@source inline`)

**File:** `src/styles/global.css`

```css
@source inline("border-{pink,stone,teal}-{50,100,200,300,400,500,600,700,800,900,950}");
@source inline("bg-{pink,stone,teal}-{50,100,200,300,400,500,600,700,800,900,950}");
@source inline("text-{pink,stone,teal}-{50,100,200,300,400,500,600,700,800,900,950}");
```

**What changed:** Instructs the Tailwind v4 scanner to always emit the full set of `border-*`, `bg-*`, and `text-*` utilities for the `pink`, `stone`, and `teal` color palettes at every shade (50–950).

**Why:** `Tag.tsx` builds class names dynamically at runtime (e.g. `` `border-${color}-500` ``). Tailwind's JIT scanner cannot detect dynamically composed class strings, so these patterns would be tree-shaken out of the production bundle without an explicit safelist. The Tailwind v4 equivalent of the JS-config `safelist` array is `@source inline()` in CSS.

---

# Custom Font — Orbitron (`@font-face`)

**File:** `src/styles/global.css`

```css
@font-face {
  font-family: 'Orbitron';
  src: url('/fonts/Orbitron-Black.woff2') format('woff2');
  font-weight: 900;
  font-display: swap;
}
/* … repeated for weights 800, 700, 600, 500, 400 */
```

**What changed:** Registers the Orbitron typeface (six weights: 400–900) as a local web font served from `/public/fonts/`. All declarations use `font-display: swap` to avoid invisible text during load.

**Why:** Orbitron is used for the site logo and any headings styled with `.font-orbitron`. It is a self-hosted font rather than a third-party CDN to avoid external network requests and ensure availability.

---

# Custom Utility Class — `.font-orbitron`

**File:** `src/styles/global.css`

```css
.font-orbitron {
  font-family: 'Orbitron', sans-serif;
}
```

**What changed:** Adds a single global CSS class that applies the Orbitron font family. It is not a Tailwind arbitrary value or utility; it is a plain CSS class.

**Why:** Orbitron is not registered in `tailwind.config.mjs` under `fontFamily`, so `font-orbitron` cannot be generated by Tailwind. The standalone CSS class is the simplest way to apply the face without adding it to the Tailwind theme.

---

# Base Reset — Box Sizing

**File:** `src/styles/global.css`

```css
* {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
```

**What changed:** Forces `box-sizing: border-box` on every element (including prefixed variants for older Firefox and WebKit).

**Why:** Tailwind's Preflight already sets `box-sizing: border-box` on `*, ::before, ::after`. This rule reinforces that reset with vendor-prefixed equivalents for maximum browser compatibility.

---

# Base Reset — Text Size Adjust

**File:** `src/styles/global.css`

```css
html {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}
```

**What changed:** Prevents mobile browsers (iOS Safari, older Android/IE) from automatically inflating font sizes when the device orientation changes or when the viewport is narrow.

**Why:** Tailwind's Preflight already sets `-webkit-text-size-adjust: 100%` on `html`. The `-ms-text-size-adjust` rule extends that protection to Internet Explorer/Edge Legacy.
