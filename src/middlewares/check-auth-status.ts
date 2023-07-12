import { Request, Response, NextFunction } from 'express';
import {
  BrokenHeaderError,
  UnauthorizedUserError,
} from '../errors/auth.errors';
import { decodeJWT } from '../services/security/jwt/decode';
import { JWTPayload } from '../interfaces/jwt-service.interfaces';

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
    req.user = payload;

    // TODO: check if user exists in database

    return next();
  } catch (err: unknown) {
    return next(err);
  }
}
