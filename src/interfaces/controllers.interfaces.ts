import { Request, Response, NextFunction } from 'express';

export type SingUpController = {
  exec(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> | any;
};
