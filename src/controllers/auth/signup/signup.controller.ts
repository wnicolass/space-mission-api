import { createUserAuthData } from '../../../services/auth/create-user';
import { SingUpController } from '../../../interfaces/controllers.interfaces';
import UserAuthRepositoryFactory from '../../../repositories/prisma/prisma-user-auth.repository';

export default (function signUpController(): SingUpController {
  return {
    async exec(req, res, next) {
      try {
        const userAuthRepository = UserAuthRepositoryFactory();
        const signUpService = createUserAuthData(userAuthRepository);
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
