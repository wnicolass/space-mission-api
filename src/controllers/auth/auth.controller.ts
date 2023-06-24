import { Request, Response } from 'express';

type AuthController = {
  signUp(req: Request, res: Response): Response;
};

export default (function authController(): AuthController {
  return {
    signUp(req, res) {
      return res.status(200).json({
        sanityCheck: 'ok',
      });
    },
  };
})();
