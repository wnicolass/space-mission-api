import { describe, it, expect } from 'vitest';
import inMemoryUserAuthRepository from './in-memory.user.repository';
import { validUser } from '../../tests/mocks/user';
import { InDatabaseUser } from '../../interfaces/user.interfaces';

describe('User Authentication Repository', () => {
  const sut = inMemoryUserAuthRepository();

  it('should create a user', async () => {
    await expect(sut.signup(validUser)).resolves.not.toThrow();

    expect(sut.users?.length).toBe(1);
  });

  it('should return false if does not find user by email', async () => {
    await expect(sut.getUserByEmail('test@test.com')).resolves.toBeFalsy();
  });

  it('should find an existing user by email', async () => {
    await sut.signup(validUser);
    await expect(sut.getUserByEmail(validUser.email)).resolves.toEqual(
      expect.objectContaining({
        userId: expect.any(String),
        email: validUser.email,
        username: validUser.username,
      }),
    );
  });

  it('should find an existing user by id', async () => {
    await sut.signup(validUser);
    const user = (await sut.getUserByEmail(validUser.email)) as InDatabaseUser;
    await expect(sut.getUserById(user.userId)).resolves.toEqual(
      expect.objectContaining({
        userId: expect.any(String),
        email: validUser.email,
        username: validUser.username,
      }),
    );
  });
});
