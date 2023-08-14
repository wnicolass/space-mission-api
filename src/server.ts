import { createServer } from 'node:https';
import { tlsConfig } from './config/https/server-config';
import { setupApolloServer } from './graphql/setup-apollo';
import app from './app';

(async function startServer() {
  const { PORT } = process.env;
  const httpServer = createServer(tlsConfig, app);
  await setupApolloServer(httpServer, app);
  httpServer.listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`),
  );
})();
