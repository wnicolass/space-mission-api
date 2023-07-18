import validator from 'validator';
import type {
  UserAuthData,
  UserAuthRepository,
  UserAuthWithoutPassword,
} from '../../../interfaces/user.interfaces';
import {
  InvalidArgumentError,
  UserAlreadyExistsError,
} from '../../../errors/auth.errors';
import hashPassword from '../../security/hash/hash-password';

export function signUpFactory(userAuthRepository: UserAuthRepository) {
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

      const foundUser = await userAuthRepository.getUserByEmail(email);
      if (foundUser) {
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
