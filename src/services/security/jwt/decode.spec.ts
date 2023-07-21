import { describe, it, expect } from 'vitest';
import { decodeJWT } from './decode';
import { encodeJWT } from './encode';
import { JWTPayload } from '../../../interfaces/jwt-service.interfaces';
import { payload } from '../../../tests/mocks/jwt';

describe('Decoding JWT functionality', () => {
  it('should throw a TypeError if JWT type is not string', async () => {
    expect(decodeJWT(1)).rejects.toThrowError(TypeError);
  });

  it('should return a valid payload from the decoding operation', async () => {
    const jwt = await encodeJWT(payload);
    const jwtPayload: JWTPayload = await decodeJWT(jwt);

    expect(jwtPayload).toStrictEqual(payload);
  });
});
