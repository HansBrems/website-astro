---
description: 'Scaffold a new Astro page. Creates the page file, asks about sitemap and robots.txt inclusion, updates astro.config.mjs and robots.txt.ts accordingly, and runs the build.'
agent: 'agent'
argument-hint: "Page name and purpose (e.g. 'about — personal bio')"
---

Create a new Astro page using the following steps:

1. Ask:
   - What is the page's route name (e.g. `about`, `blog`, `contact`)?
   - Should it appear in the **sitemap**? (default: yes)
   - Should it be **blocked from crawlers** in robots.txt? (default: no)

2. Create `src/pages/<name>.astro` using this scaffold:

   ```astro
   ---
   import Page from '../layouts/Page.astro';
   import Prose from '../shared/components/layout/Prose.astro';
   ---

   <Page pageTitle="<Title>">
     <Prose>
       <h1>
         <Title />
         <p>Content here.</p>
       </h1>
     </Prose></Page
   >
   ```

3. If the page should be **excluded from the sitemap**, add a filter condition to [astro.config.mjs](../astro.config.mjs):

   ```js
   filter: (page) =>
     page !== 'https://longville-software.be/dev/' &&
     page !== 'https://longville-software.be/<name>/',
   ```

4. If the page should be **blocked from crawlers**, add a `Disallow` line to [src/pages/robots.txt.ts](../src/pages/robots.txt.ts).

5. Run `npm run build` and report the result. Fix any errors before finishing.
