import { describe, it, expect } from 'vitest';
import inMemoryUserAuthRepository from './in-memory.auth.repository';
import { validUser } from '../../tests-data/user';

describe('User Authentication Repository', () => {
  const userAuthRepository = inMemoryUserAuthRepository();

  it('should create a user', async () => {
    await expect(userAuthRepository.signup(validUser)).resolves.not.toThrow();

    expect(userAuthRepository.users?.length).toBe(1);
  });

  it('should return false if does not find user by email', async () => {
    await expect(
      userAuthRepository.getUserByEmail('test@test.com'),
    ).resolves.toBe(false);
  });

  it('should find an existing user', async () => {
    await expect(
      userAuthRepository.getUserByEmail(validUser.email),
    ).resolves.toStrictEqual(validUser);
  });
});
