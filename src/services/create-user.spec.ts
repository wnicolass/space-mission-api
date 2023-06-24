import { describe, test, expect, beforeEach } from 'vitest';
import { createUserAuthData } from './create-user';
import inMemoryUserAuthRepository from '../repositories/in-memory/in-memory.auth.repository';
import {
  UserAuthRepository,
  UserAuthData,
} from '../repositories/auth.repository';

describe('Create UserAuthData', () => {
  const validUser = {
    username: 'John Doe',
    email: 'johndoe@gmail.com',
    password: 'John1#',
  };

  const invalidUser = {
    username: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '',
  };

  type Context = {
    inMemoryUserAuth: UserAuthRepository;
    createUserAuth: { exec: (data: UserAuthData) => Promise<void> };
  };

  const it = test<Context>;

  beforeEach<Context>(async (ctx) => {
    const inMemoryUserAuth = inMemoryUserAuthRepository();
    ctx.inMemoryUserAuth = inMemoryUserAuth;
    ctx.createUserAuth = createUserAuthData(inMemoryUserAuth);
  });

  it('should create a user authentication data', async ({
    createUserAuth,
    inMemoryUserAuth,
  }) => {
    await expect(createUserAuth.exec(validUser)).resolves.not.toThrow();

    expect(inMemoryUserAuth.users).toEqual(
      expect.arrayContaining([expect.objectContaining({ ...validUser })]),
    );
  });

  it('should throw an InvalidArgumentError', async ({
    createUserAuth,
    inMemoryUserAuth,
  }) => {
    await expect(createUserAuth.exec(invalidUser)).rejects.toThrow();

    expect(inMemoryUserAuth.users).toEqual([]);
  });
});
