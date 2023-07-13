import { Server } from 'node:http';
import app from './app';

(function createServer(): void {
  const { PORT } = process.env;

  const server: Server = app.listen(PORT);
  server.once('listening', () =>
    console.log(`Server listening on port ${PORT}`),
  );
})();
