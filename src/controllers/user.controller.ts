import { Request, Response } from 'express';

type UserController = {
  create(req: Request, res: Response): Response;
};

export default (function userController(): UserController {
  return {
    create(req, res) {
      return res.status(200).json({
        sanityCheck: 'ok',
      });
    },
  };
})();
