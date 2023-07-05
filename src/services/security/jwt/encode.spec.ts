import { describe, it, expect } from 'vitest';
import { encodeJWT } from './encode';
import { badPayload, payload } from '../../../tests-data/jwt';

describe('Encoding JWT functionality', () => {
  it('should throw a TypeError if the payload values are not of type string', async () => {
    expect(encodeJWT(badPayload)).rejects.toThrowError(TypeError);
  });

  it('should return an encrypted jwt of type string', async () => {
    const jwt = await encodeJWT(payload);
    expect(jwt).toBeTypeOf('string');
    expect(jwt.split('.').length).toBe(5);
  });
});
