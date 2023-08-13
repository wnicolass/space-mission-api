import { createServer } from 'node:https';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { loadFilesSync } from '@graphql-tools/load-files';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { tlsConfig } from './config/https/server-config';
import app from './app';

(async function startServer() {
  const { PORT } = process.env;
  const graphqlTypes = loadFilesSync('**/*', {
    extensions: ['graphql'],
  });
  const resolvers = loadFilesSync('**/*.resolvers.ts');
  const schema = makeExecutableSchema({
    typeDefs: graphqlTypes,
    resolvers,
  });
  const httpServer = createServer(tlsConfig, app);
  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();

  app.use('/graphql', bodyParser.json(), expressMiddleware(apolloServer));
  httpServer.listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`),
  );
})();
