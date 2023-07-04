import * as jose from 'jose';
import type { JWTPayload } from '../../../interfaces/jwt-service.interfaces';

export async function encodeJWT({ userId, email }: JWTPayload) {
  if (typeof userId !== 'string' || typeof email !== 'string') {
    throw new TypeError('Type of userId and email must be string');
  }

  const jwtSecret = jose.base64url.decode(process.env.JWT_SECRET as string);
  const jwtEncryptionAlgorithm = process.env.JWT_ENC_ALG as string;
  const jwtHeader = { alg: 'dir', typ: 'JWT', enc: jwtEncryptionAlgorithm };
  const jwt = await new jose.EncryptJWT({
    id: userId,
    email,
  })
    .setProtectedHeader(jwtHeader)
    .setIssuedAt()
    .setIssuer('nasa-ts.api')
    .setSubject(userId)
    .setExpirationTime('7d')
    .encrypt(jwtSecret);

  return jwt;
}
