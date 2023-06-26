import { Request, Response } from 'express';
import SignUpRepositoryFactory from '../../repositories/prisma/signup.repository';
import { createUserAuthData } from '../../services/auth/create-user';

type AuthController = {
  signUp(req: Request, res: Response): Promise<Response>;
};

export default (function authController(): AuthController {
  return {
    async signUp(req, res) {
      const signUpRepository = SignUpRepositoryFactory();
      const signUpService = createUserAuthData(signUpRepository);
      const newUser = await signUpService.exec(req.body);
      return res.status(201).json({
        user: newUser,
        message: 'User successfully created',
      });
    },
  };
})();
