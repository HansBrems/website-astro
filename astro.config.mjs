import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://longville-software.be',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => page !== 'https://longville-software.be/dev/',
    }),
    partytown({ forward: ['dataLayer.push'] }),
  ],
});
