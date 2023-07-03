import { describe, it, expect } from 'vitest';
import { encodeJWT } from './encode';

describe('Encoding JWT functionality', () => {
  it('should return an encrypted jwt of type string', async () => {
    const payload = {
      userId: 'fsdfsdfsd',
      email: 'jared@gmail.com',
    };
    const jwt = await encodeJWT(payload);
    expect(jwt).toBeTypeOf('string');
    expect(jwt.split('.').length).toBe(5);
  });
});
