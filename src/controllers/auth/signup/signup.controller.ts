import { signUpFactory } from '../../../services/auth/signup/signup';
import { Controller } from '../../../interfaces/controllers.interfaces';
import userAuthRepositoryFactory from '../../../repositories/prisma/prisma-user-auth.repository';

export default (function signUpController(): Controller {
  return {
    async exec(req, res, next) {
      try {
        const userAuthRepository = userAuthRepositoryFactory();
        const signUpService = signUpFactory(userAuthRepository);
        const newUser = await signUpService.exec(req.body);
        return res.status(201).json({
          user: newUser,
          message: 'User successfully created',
        });
      } catch (err: unknown) {
        return next(err);
      }
    },
  };
})();
