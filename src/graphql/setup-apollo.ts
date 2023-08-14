import { json } from 'body-parser';
import { Server } from 'node:https';
import { Express } from 'express';
import { ApolloServer } from '@apollo/server';
import { loadFilesSync } from '@graphql-tools/load-files';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

export async function setupApolloServer(
  httpServer: Server,
  app: Express,
): Promise<void> {
  const graphqlTypes = loadFilesSync('**/*', {
    extensions: ['graphql'],
  });
  const resolvers = loadFilesSync('**/*.resolvers.ts');
  const schema = makeExecutableSchema({
    typeDefs: graphqlTypes,
    resolvers,
  });
  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();
  app.use('/v1/graphql', json(), expressMiddleware(apolloServer));
}
