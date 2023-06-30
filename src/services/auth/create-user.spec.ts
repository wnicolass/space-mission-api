import { describe, test, expect, beforeEach } from 'vitest';
import { createUserAuthData } from './create-user';
import inMemoryUserAuthRepository from '../../repositories/in-memory/in-memory.auth.repository';
import {
  UserAuthRepository,
  UserAuthData,
  UserAuthWithoutPassword,
} from '../../interfaces/auth.interfaces';
import {
  userWithEmptyField,
  userWithInvalidEmail,
  validUser,
} from '../../tests-data/user';

describe('Create UserAuthData', () => {
  type Context = {
    inMemoryUserAuth: UserAuthRepository;
    createUserAuth: {
      exec: (data: UserAuthData) => Promise<UserAuthWithoutPassword>;
    };
  };

  const it = test<Context>;

  beforeEach<Context>(async (ctx) => {
    const inMemoryUserAuth = inMemoryUserAuthRepository();
    ctx.inMemoryUserAuth = inMemoryUserAuth;
    ctx.createUserAuth = createUserAuthData(inMemoryUserAuth);
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
    inMemoryUserAuth.users?.push(validUser);
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
