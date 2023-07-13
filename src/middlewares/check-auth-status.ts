import { Request, Response, NextFunction } from 'express';
import {
  BrokenHeaderError,
  UnauthorizedUserError,
  UserNotFoundError,
} from '../errors/auth.errors';
import { decodeJWT } from '../services/security/jwt/decode';
import { JWTPayload } from '../interfaces/jwt-service.interfaces';
import userAuthRepositoryFactory from '../repositories/prisma/prisma-user-auth.repository';

export default async function checkAuthStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
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

    req.user = payload;
    return next();
  } catch (err: unknown) {
    return next(err);
  }
}
