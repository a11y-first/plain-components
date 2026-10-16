import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'testing',
  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    fs: {
      allow: [path.resolve(import.meta.dirname)],
    },
  },
});
