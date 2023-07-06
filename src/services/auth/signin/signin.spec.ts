import { beforeEach, describe, expect } from 'vitest';
import { AuthTestContext, it } from '../../../tests-data/common/test-context';
import inMemoryUserAuthRepository from '../../../repositories/in-memory/in-memory.auth.repository';
import { signInFactory } from './signin';
import {
  userWithEmptyField,
  validUser,
  userWithInvalidEmail,
} from '../../../tests-data/user';
import hashPassword from '../../security/hash/hash-password';

describe('Sign In Service', () => {
  beforeEach<AuthTestContext>(async (ctx) => {
    const inMemoryUserAuth = inMemoryUserAuthRepository();
    ctx.inMemoryUserAuth = inMemoryUserAuth;
    ctx.createUserAuth = signInFactory(inMemoryUserAuth);
  });

  it('should throw an InvalidArgumentError if missing required fields', async ({
    createUserAuth,
  }) => {
    await expect(createUserAuth.exec(userWithEmptyField)).rejects.toThrowError(
      'Missing required field',
    );
  });

  it('should throw an InvalidArgumentError if email is not valid', async ({
    createUserAuth,
  }) => {
    await expect(
      createUserAuth.exec(userWithInvalidEmail),
    ).rejects.toThrowError('Invalid email');
  });

  it('should throw a UserNotFoundError if does not find user by email', async ({
    createUserAuth,
  }) => {
    await expect(createUserAuth.exec(validUser)).rejects.toThrowError(
      'User does not exist',
    );
  });

  it('should throw an InvalidPasswordError if passwords do not match', async ({
    createUserAuth,
    inMemoryUserAuth,
  }) => {
    const { hashedPassword } = await hashPassword('John1#');
    expect(hashedPassword).toBeTypeOf('string');
    const user = {
      email: 'jansen@gmail.com',
      hashedPassword,
    };
    inMemoryUserAuth.users?.push(user);
    expect(inMemoryUserAuth.users?.length).toBe(1);

    await expect(
      createUserAuth.exec({
        username: 'random',
        email: 'jansen@gmail.com',
        password: 'wrong123',
      }),
    ).rejects.toThrowError('Invalid password');
  });

  it('should return a jwt', async ({ createUserAuth, inMemoryUserAuth }) => {
    const { hashedPassword } = await hashPassword('John1#');
    expect(hashedPassword).toBeTypeOf('string');
    const user = {
      userId: 'fdsfdsfsdfsd',
      email: 'jansen@gmail.com',
      hashedPassword,
    };
    inMemoryUserAuth.users?.push(user);
    expect(inMemoryUserAuth.users?.length).toBe(1);

    const jwt = (await createUserAuth.exec({
      username: 'random',
      email: 'jansen@gmail.com',
      password: 'John1#',
    })) as string;
    expect(jwt).toBeTypeOf('string');
    expect(jwt.split('.').length).toBe(5);
  });
});
