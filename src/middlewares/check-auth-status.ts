import { Request, Response, NextFunction } from 'express';
import {
  BrokenHeaderError,
  UnauthorizedUserError,
} from '../errors/auth.errors';

export default function checkAuthStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new UnauthorizedUserError('Unauthorized user');
    }

    const authHeaderArray = authorization.split(/\s/);
    if (authHeaderArray.length !== 2) {
      throw new BrokenHeaderError('Authorization header in wrong format');
    }

    return next();
  } catch (err: unknown) {
    return next(err);
  }
}
