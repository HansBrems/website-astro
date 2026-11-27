/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// getViteConfig applies the Astro config, including the @/ alias from tsconfig.json.
export default getViteConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
});
