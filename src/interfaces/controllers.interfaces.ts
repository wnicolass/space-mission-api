import { Request, Response } from 'express';

export type SingUpController = {
  exec(req: Request, res: Response): Promise<Response>;
};
