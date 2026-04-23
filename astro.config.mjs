import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://longville-software.be',
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://longville-software.be/dev/',
    }),
    partytown({ forward: ['dataLayer.push'] }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
