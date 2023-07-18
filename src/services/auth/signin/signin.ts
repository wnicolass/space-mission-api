import validator from 'validator';
import {
  InvalidArgumentError,
  UserNotFoundError,
  InvalidPasswordError,
} from '../../../errors/auth.errors';
import {
  UserAuthData,
  UserAuthRepository,
} from '../../../interfaces/user.interfaces';
import checkPasswords from '../../security/hash/validate-password';
import { JWTPayload } from '../../../interfaces/jwt-service.interfaces';
import { encodeJWT } from '../../security/jwt/encode';

export function signInFactory(userAuthRepository: UserAuthRepository) {
  return {
    async exec({ email, password }: UserAuthData) {
      if (!email || !password) {
        throw new InvalidArgumentError('Missing required field');
      }

      if (!validator.isEmail(email)) {
        throw new InvalidArgumentError('Invalid email');
      }

      const user = await userAuthRepository.getUserByEmail(email);
      if (!user) {
        throw new UserNotFoundError('User does not exist');
      }

      const passwordsMatch = await checkPasswords(
        password,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        user.hashedPassword!,
      );
      if (!passwordsMatch) {
        throw new InvalidPasswordError('Invalid password');
      }

      const payload: JWTPayload = {
        userId: user.userId as string,
        email: user.email,
      };

      return await encodeJWT(payload);
    },
  };
}
