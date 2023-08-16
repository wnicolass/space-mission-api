import { Request } from 'express';
import {
  BrokenHeaderError,
  UnauthorizedUserError,
  UserNotFoundError,
} from '../../errors/auth.errors';
import { JWTPayload } from '../../interfaces/jwt-service.interfaces';
import userAuthRepositoryFactory from '../../repositories/prisma/prisma-user-auth.repository';
import { decodeJWT } from '../security/jwt/decode';

export async function validateIncomingJwt(req: Request) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedUserError('Unauthorized user');
  }

  const authHeaderArray: string[] = authorization.split(/\s/);
  if (authHeaderArray.length !== 2) {
    throw new BrokenHeaderError('Authorization header in wrong format');
  }

  const [, token] = authHeaderArray;
  const payload: JWTPayload = await decodeJWT(token);

  const userRepository = userAuthRepositoryFactory();
  const userFound = await userRepository.getUserByEmail(payload.email);
  if (!userFound) {
    throw new UserNotFoundError('User does not exist');
  }

  return payload;
}
