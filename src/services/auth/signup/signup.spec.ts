import { describe, expect, beforeEach, vi } from 'vitest';
import { signUpFactory } from './signup';
import inMemoryUserAuthRepository from '../../../repositories/in-memory/in-memory.user.repository';
import { AuthTestContext, it } from '../../../tests-data/utils/test-context';
import {
  userWithEmptyField,
  userWithInvalidEmail,
  validUser,
  inDbUser,
} from '../../../tests-data/mocks/user';

describe('Sign Up Service', () => {
  beforeEach<AuthTestContext>(async (ctx) => {
    const inMemoryUserAuth = inMemoryUserAuthRepository();
    ctx.inMemoryUserAuth = inMemoryUserAuth;
    ctx.signUp = signUpFactory(inMemoryUserAuth);
  });

  it('should throw an InvalidArgumentError for empty fields', async ({
    signUp,
    inMemoryUserAuth,
  }) => {
    await expect(signUp.exec(userWithEmptyField)).rejects.toThrowError(
      'Missing required field',
    );

    expect(inMemoryUserAuth.users).toEqual([]);
  });

  it('should throw an InvalidArgumentError for invalid email', async ({
    signUp,
    inMemoryUserAuth,
  }) => {
    await expect(signUp.exec(userWithInvalidEmail)).rejects.toThrowError(
      'Invalid email',
    );

    expect(inMemoryUserAuth.users).toEqual([]);
  });

  it('should throw an UserAlreadyExistsError', async ({
    signUp,
    inMemoryUserAuth,
  }) => {
    inMemoryUserAuth.users?.push(inDbUser);
    await expect(signUp.exec(validUser)).rejects.toThrowError(
      `User with email "${validUser.email}" already exists`,
    );

    expect(inMemoryUserAuth.users?.length).toBe(1);
  });

  it('should create a user', async ({ signUp, inMemoryUserAuth }) => {
    const signUpSpy = vi.spyOn(signUp, 'exec');
    await signUp.exec(validUser);
    expect(signUpSpy).toHaveBeenCalledOnce();
    expect(inMemoryUserAuth.users).toHaveLength(1);
  });
});
