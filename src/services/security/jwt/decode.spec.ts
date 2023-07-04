import { describe, it, expect } from 'vitest';
import { decodeJWT } from './decode';
import { encodeJWT } from './encode';
import { JWTPayload } from '../../../interfaces/jwt-service.interfaces';

describe('Decoding JWT functionality', () => {
  it('should throw a TypeError if JWT type is not string', async () => {
    expect(decodeJWT(1)).rejects.toThrowError(TypeError);
  });

  it('should return a valid payload from the decoding operation', async () => {
    const payload = {
      userId: 'fsdfsdfsd',
      email: 'jared@gmail.com',
    };
    const jwt = await encodeJWT(payload);
    const jwtPayload: JWTPayload = await decodeJWT(jwt);

    expect(jwtPayload).toStrictEqual(payload);
  });
});
