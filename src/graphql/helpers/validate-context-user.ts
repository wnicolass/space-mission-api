import { GraphQLError } from 'graphql';
import { UserContext } from '../context';

export function ensureUserInContext(context: UserContext): void {
  if (!context.user) {
    throw new GraphQLError('Unauthenticated user', {
      extensions: {
        statusCode: 401,
      },
    });
  }
}
