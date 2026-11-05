import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

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
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter-family',
      weights: ['100 900'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Orbitron',
      cssVariable: '--font-orbitron-family',
      weights: [700],
      subsets: ['latin'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
