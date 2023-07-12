import { JWTPayload } from '../interfaces/jwt-service.interfaces';

declare global {
  namespace Express {
    export interface Request {
      user: JWTPayload;
    }
  }
}
