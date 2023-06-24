import type {
  UserAuthData,
  UserAuthRepository,
} from '../repositories/auth.repository';
import { InvalidArgumentError } from '../errors/auth.errors';

export function createUserAuthData(userAuthRepository: UserAuthRepository) {
  return {
    async exec({ username, email, password }: UserAuthData) {
      if (!username || !email || !password) {
        throw new InvalidArgumentError('Missing required field');
      }

      userAuthRepository.signup({ username, email, password });
    },
  };
}
