# Components

## Key Components

### `Page.astro` (layout)

Root layout used by every page. Provides:

- HTML `<head>` with SEO meta, favicon, Inter Variable font, Google Analytics (via Partytown).
- Fixed `<Header>` with logo, social links, and theme toggle.
- `<Main>` content slot.
- `<Footer>` with copyright and social links.

### `Header.astro`

Fixed, full-width top bar with backdrop blur. Contains:

- Logo (links to `/`).
- Social icons (hidden on mobile, visible on `md+`).
- `ThemeToggle`.

### `ThemeToggle.astro`

Reads `localStorage` for a stored `theme` value; falls back to `prefers-color-scheme`. Toggles the `dark` class on `<html>` and persists the choice to `localStorage`.

### `Project.tsx` (React island)

Renders a project card with:

- Company name, date range (`MMM yyyy` format), and role title.
- Description paragraph.
- Tag pills with category-based colors.
- A "Show all / Show less" toggle button when there are more than 5 tags and `showAllTags` is not set.

Activated with `client:visible` (home page) or `client:load` (dev page).

### `Socials.astro`

Icon links to email (`info@longville-software.be`), LinkedIn (`hansbrems`), and GitHub (`HansBrems`).

---

## Component Dependency Map

Import relationships between files. Indentation = "imports".

```
Page.astro (layout)
  ├── Header.astro
  │     ├── Logo.astro
  │     ├── Socials.astro
  │     │     ├── Link.astro
  │     │     ├── GithubIcon.astro
  │     │     ├── LinkedInIcon.astro
  │     │     └── MailIcon.astro
  │     └── ThemeToggle.astro
  │           └── ThemeIcon.astro
  ├── Main.astro
  └── Footer.astro
        └── Socials.astro  (same as above)

index.astro
  ├── Page.astro
  ├── Prose.astro
  ├── Link.astro
  └── Project.tsx  (React island)
        ├── Tag.tsx
        ├── Button.tsx
        └── tag-helper.ts
              └── category.ts  (type only)

projects.astro
  ├── Page.astro
  ├── Prose.astro
  └── Project.tsx  (same as above)

dev.astro
  ├── Page.astro
  ├── Prose.astro
  └── MyFlow.tsx  (React island, experimental)
```

---

## Component Props Reference

### `Project.tsx`

| Prop          | Type         | Required | Default | Description                                                                  |
| ------------- | ------------ | -------- | ------- | ---------------------------------------------------------------------------- |
| `project`     | `Project`    | yes      | —       | Project data object (see Content Model)                                      |
| `categories`  | `Category[]` | yes      | —       | All categories, used to resolve tag colors                                   |
| `showAllTags` | `boolean`    | no       | `false` | When `true`, renders all tags without truncation and hides the toggle button |

### `Tag.tsx`

| Prop    | Type     | Required | Default | Description                                                                            |
| ------- | -------- | -------- | ------- | -------------------------------------------------------------------------------------- |
| `label` | `string` | yes      | —       | Text displayed inside the tag pill                                                     |
| `color` | `string` | yes      | —       | Tailwind color name (e.g. `"teal"`, `"pink"`, `"stone"`). Used as `border-{color}-500` |

### `Button.tsx`

| Prop      | Type         | Required | Default | Description   |
| --------- | ------------ | -------- | ------- | ------------- |
| `text`    | `string`     | yes      | —       | Button label  |
| `onClick` | `() => void` | yes      | —       | Click handler |

### `Link.astro`

| Prop       | Type      | Required | Default | Description                                                      |
| ---------- | --------- | -------- | ------- | ---------------------------------------------------------------- |
| `href`     | `string`  | yes      | —       | Target URL                                                       |
| `external` | `boolean` | no       | `false` | When `true`, sets `target="_blank"`                              |
| `icon`     | `boolean` | no       | `false` | When `true`, suppresses text color classes (for icon-only links) |
| `title`    | `string`  | no       | —       | HTML `title` attribute (tooltip on hover)                        |

### `Page.astro` (layout)

| Prop        | Type     | Required | Default | Description                                                 |
| ----------- | -------- | -------- | ------- | ----------------------------------------------------------- |
| `pageTitle` | `string` | yes      | —       | Appended to `<title>` as `Longville Software - {pageTitle}` |
