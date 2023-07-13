import { describe, expect, beforeEach } from 'vitest';
import { signUpFactory } from './signup';
import inMemoryUserAuthRepository from '../../../repositories/in-memory/in-memory.auth.repository';
import { AuthTestContext, it } from '../../../tests-data/utils/test-context';
import {
  userWithEmptyField,
  userWithInvalidEmail,
  validUser,
  inDbUser,
} from '../../../tests-data/user';

describe('Sign Up Service', () => {
  beforeEach<AuthTestContext>(async (ctx) => {
    const inMemoryUserAuth = inMemoryUserAuthRepository();
    ctx.inMemoryUserAuth = inMemoryUserAuth;
    ctx.createUserAuth = signUpFactory(inMemoryUserAuth);
  });

  it('should throw an InvalidArgumentError for empty fields', async ({
    createUserAuth,
    inMemoryUserAuth,
  }) => {
    await expect(createUserAuth.exec(userWithEmptyField)).rejects.toThrowError(
      'Missing required field',
    );

    expect(inMemoryUserAuth.users).toEqual([]);
  });

  it('should throw an InvalidArgumentError for invalid email', async ({
    createUserAuth,
    inMemoryUserAuth,
  }) => {
    await expect(
      createUserAuth.exec(userWithInvalidEmail),
    ).rejects.toThrowError('Invalid email');

    expect(inMemoryUserAuth.users).toEqual([]);
  });

  it('should throw an UserAlreadyExistsError', async ({
    createUserAuth,
    inMemoryUserAuth,
  }) => {
    inMemoryUserAuth.users?.push(inDbUser);
    await expect(createUserAuth.exec(validUser)).rejects.toThrowError(
      `User with email "${validUser.email}" already exists`,
    );

    expect(inMemoryUserAuth.users?.length).toBe(1);
  });

  it('should create a user', async ({ createUserAuth, inMemoryUserAuth }) => {
    await expect(createUserAuth.exec(validUser)).resolves.not.toThrow();

    expect(inMemoryUserAuth.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
        }),
      ]),
    );
  });
});
