import * as jose from 'jose';
import type { JWTPayload } from '../../../interfaces/jwt-service.interfaces';

export async function encodeJWT({ userId, email }: JWTPayload) {
  const jwtSecret = jose.base64url.decode(process.env.JWT_SECRET as string);
  const jwtHeader = { alg: 'dir', typ: 'JWT', enc: 'A128CBC-HS256' };
  const jwt = await new jose.EncryptJWT({
    id: userId,
    email,
  })
    .setProtectedHeader(jwtHeader)
    .setIssuedAt()
    .setIssuer('nasa-ts.api.com')
    .setSubject(userId)
    .setExpirationTime('7d')
    .encrypt(jwtSecret);

  return jwt;
}
