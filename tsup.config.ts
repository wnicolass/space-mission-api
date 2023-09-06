import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src', '!src/**/*.spec.*', '!src/tests'],
  loader: {
    '.pem': 'file',
    '.graphql': 'file',
  },
});
