import validator from 'validator';
import type {
  UserAuthData,
  UserAuthRepository,
} from '../../repositories/auth.repository';
import {
  InvalidArgumentError,
  UserAlreadyExistsError,
} from '../../errors/auth.errors';
import hashPassword from '../security/hash-password';

export type UserAuthWithoutPassword = Pick<UserAuthData, 'email' | 'username'>;

export function createUserAuthData(userAuthRepository: UserAuthRepository) {
  return {
    async exec({
      username,
      email,
      password,
    }: UserAuthData): Promise<UserAuthWithoutPassword> {
      if (!username || !email || !password) {
        throw new InvalidArgumentError('Missing required field');
      }

      if (!validator.isEmail(email)) {
        throw new InvalidArgumentError('Invalid email');
      }

      const userAlreadyExists = await userAuthRepository.getUserByEmail(email);
      if (userAlreadyExists) {
        throw new UserAlreadyExistsError(
          `User with email "${email}" already exists`,
        );
      }

      const { hashedPassword } = await hashPassword(password);

      await userAuthRepository.signup({
        username,
        email,
        password: hashedPassword,
      });

      return {
        username,
        email,
      };
    },
  };
}
