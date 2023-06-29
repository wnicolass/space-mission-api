import { Request, Response } from 'express';
import UserAuthRepositoryFactory from '../../repositories/prisma/prisma-user-auth.repository';
import { createUserAuthData } from '../../services/auth/create-user';

type AuthController = {
  signUp(req: Request, res: Response): Promise<Response>;
};

export default (function authController(): AuthController {
  return {
    async signUp(req, res) {
      const userAuthRepository = UserAuthRepositoryFactory();
      const signUpService = createUserAuthData(userAuthRepository);
      const newUser = await signUpService.exec(req.body);
      return res.status(201).json({
        user: newUser,
        message: 'User successfully created',
      });
    },
  };
})();
