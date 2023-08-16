import { Request } from 'express';
import { JWTPayload } from '../interfaces/jwt-service.interfaces';
import { validateIncomingJwt } from '../services/helpers/validate-incoming-jwt';

export type UserContext = {
  user?: JWTPayload;
};

export type ErrorExtensions = {
  http: Record<'status', number>;
};

export async function setContextUser(req: Request) {
  const user = await validateIncomingJwt(req);
  return { user };
}
