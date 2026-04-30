# Longville Software

## Node version

The required Node version for Netlify is specified in `.node-version`. Netlify reads this file automatically to determine which Node version to use during builds. Update this file if the Node version needs to change.

## Tailwind Customizations

See [`.github/docs/tailwind.md`](.github/docs/tailwind.md) for a full description of every customization made to the Tailwind CSS defaults (dark mode strategy, font overrides, animations, plugins, safelisted colors, and base resets).

## Colors

These are the colors in use.

| Color | 50  | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
| ----- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| stone |     |  x  |  x  |     |     |  x  |     |  x  |  x  |  x  |  x  |
| teal  |     |     |  x  |  x  |     |  x  |  x  |     |     |     |     |
| pink  |     |     |     |     |     |  x  |  x  |     |  x  |  x  |     |

These are the main accent colors. Hovered state changes the value by 200.

- Pink-800 (Hover: Pink-600)
- Teal-300 (Hover: Teal-500)
