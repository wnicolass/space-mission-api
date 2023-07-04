import * as jose from 'jose';
import type { JWTPayload } from '../../../interfaces/jwt-service.interfaces';

export async function decodeJWT(jwt: string): Promise<JWTPayload> {
  if (typeof jwt !== 'string') {
    throw new TypeError('JWT must be of type string');
  }

  const jwtSecret = jose.base64url.decode(process.env.JWT_SECRET as string);
  const { payload } = await jose.jwtDecrypt(jwt, jwtSecret, {
    issuer: 'nasa-ts.api',
  });
  console.log(payload);
  return { userId: payload.sub as string, email: payload.email as string };
}
