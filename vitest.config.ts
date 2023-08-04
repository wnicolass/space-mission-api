import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    reporters: 'verbose',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
