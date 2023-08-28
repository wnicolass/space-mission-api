import { beforeEach, describe, expect } from 'vitest';
import { AuthTestContext, it } from '../../../tests/utils/auth-test-context';
import inMemoryUserAuthRepository from '../../../repositories/in-memory/in-memory.user.repository';
import { signInFactory } from './signin';
import { createUserMock } from '../../../tests/mocks/user';
import hashPassword from '../../security/hash/hash-password';
import { UserAuthData } from '../../../interfaces/user.interfaces';

describe('Sign In Service', () => {
  beforeEach<AuthTestContext>(async (ctx) => {
    const inMemoryUserAuth = inMemoryUserAuthRepository();
    ctx.inMemoryUserAuth = inMemoryUserAuth;
    ctx.signIn = signInFactory(inMemoryUserAuth);
  });

  it('should throw an InvalidArgumentError if missing required fields', async ({
    signIn,
  }) => {
    const userMock = createUserMock(
      'tester',
      'jansen@gmail.com',
      '',
    ) as UserAuthData;
    await expect(signIn.exec(userMock)).rejects.toThrowError(
      'Missing required field',
    );
  });

  it('should throw an InvalidArgumentError if email is not valid', async ({
    signIn,
  }) => {
    const userMock = createUserMock('tester', 'jansen', 'test') as UserAuthData;
    await expect(signIn.exec(userMock)).rejects.toThrowError('Invalid email');
  });

  it('should throw a UserNotFoundError if does not find user by email', async ({
    signIn,
  }) => {
    const userMock = createUserMock(
      'tester',
      'jansen@gmail.com',
      'testpass',
    ) as UserAuthData;
    await expect(signIn.exec(userMock)).rejects.toThrowError(
      'User does not exist',
    );
  });

  it('should throw an InvalidPasswordError if passwords do not match', async ({
    signIn,
    inMemoryUserAuth,
  }) => {
    const { hashedPassword } = await hashPassword('John1#');
    const userMock = createUserMock(
      'tester',
      'jansen@gmail.com',
      'wrongpass',
      hashedPassword,
    );
    inMemoryUserAuth.users?.push(userMock);

    await expect(signIn.exec(userMock as UserAuthData)).rejects.toThrowError(
      'Invalid password',
    );
  });

  it('should return a jwt', async ({ signIn, inMemoryUserAuth }) => {
    const { hashedPassword } = await hashPassword('John1#');
    const userMock = createUserMock(
      'tester',
      'jansen@gmail.com',
      'John1#',
      hashedPassword,
    );
    inMemoryUserAuth.users?.push(userMock);

    const { jwt } = await signIn.exec(userMock as UserAuthData);
    expect(jwt).toBeTypeOf('string');
    expect(jwt.split('.').length).toBe(5);
  });
});
