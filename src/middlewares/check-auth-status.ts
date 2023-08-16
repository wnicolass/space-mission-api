import { Request, Response, NextFunction } from 'express';
import { validateIncomingJwt } from '../services/helpers/validate-incoming-jwt';

export default async function checkAuthStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    req.user = await validateIncomingJwt(req);
    return next();
  } catch (err: unknown) {
    return next(err);
  }
}
