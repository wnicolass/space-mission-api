import { signInFactory } from '../../../services/auth/signin/signin';
import { Controller } from '../../../interfaces/controllers.interfaces';
import userAuthRepositoryFactory from '../../../repositories/prisma/prisma-user-auth.repository';

export default (function signInController(): Controller {
  return {
    async exec(req, res, next) {
      try {
        const userAuthRepository = userAuthRepositoryFactory();
        const signInService = signInFactory(userAuthRepository);
        const { jwt, userId } = await signInService.exec(req.body);
        return res.status(200).json({
          access_token: jwt,
          userId,
        });
      } catch (err: unknown) {
        return next(err);
      }
    },
  };
})();
