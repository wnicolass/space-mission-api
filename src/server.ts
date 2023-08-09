import { createServer } from 'node:https';
import { tlsConfig } from './config/https/server-config';
import app from './app';

(function startServer(): void {
  const { PORT } = process.env;

  const server = createServer(tlsConfig, app);
  server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
})();
