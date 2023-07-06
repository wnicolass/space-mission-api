import { Request, Response, NextFunction } from 'express';

export type Controller = {
  exec(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;
};
