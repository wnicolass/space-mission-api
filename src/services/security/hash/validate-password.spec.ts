import { expect, it, describe } from 'vitest';
import hashPassword from './hash-password';
import { user } from '../../../tests/mocks/user';
import checkPasswords from './validate-password';

describe('Password validation', () => {
  it('should return true if password matches', async () => {
    const dbPwd = await hashPassword(user.password);
    const passwordMatches = await checkPasswords(
      user.password,
      dbPwd.hashedPassword,
    );

    expect(passwordMatches).toBe(true);
  });

  it('should return false if password does not match', async () => {
    const dbPwd = await hashPassword(user.password);
    const passwordMatches = await checkPasswords(
      'somerandomtext',
      dbPwd.hashedPassword,
    );

    expect(passwordMatches).toBe(false);
  });
});
