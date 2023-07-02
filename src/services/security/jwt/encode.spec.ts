import { describe, it, expect } from 'vitest';
import { encodeJWT } from './encode';

describe('Encoding JWT functionality', () => {
  it('should return an encrypted jwt of type string', async () => {
    const user = {
      userId: 'fsdfsdfsd',
      email: 'jared@gmail.com',
    };
    const jwt = await encodeJWT(user);
    expect(jwt).toBeTypeOf('string');
  });
});
