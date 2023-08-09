import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

export const tlsConfig = {
  cert: readFileSync(resolve('src', 'config', 'https', 'cert.pem')),
  key: readFileSync(resolve('src', 'config', 'https', 'keys', 'key.pem')),
};
