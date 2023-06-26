import { describe, it, expect } from 'vitest';
import hashPassword from './hash-password';

describe('Hash Password', () => {
  it('should create a hashed password', async () => {
    const password = 'randompass';
    const hashObject = await hashPassword(password);

    expect(hashObject).toEqual(
      expect.objectContaining({
        hashedPassword: expect.any(String),
        salt: expect.any(String),
      }),
    );
  });
});
