import { signInFactory } from '../../../services/auth/signin/signin';
import { Controller } from '../../../interfaces/controllers.interfaces';
import UserAuthRepositoryFactory from '../../../repositories/prisma/prisma-user-auth.repository';

export default (function signInController(): Controller {
  return {
    async exec(req, res, next) {
      try {
        const userAuthRepository = UserAuthRepositoryFactory();
        const signInService = signInFactory(userAuthRepository);
        const accessToken = await signInService.exec(req.body);
        return res.status(200).json({
          access_token: accessToken,
        });
      } catch (err: unknown) {
        return next(err);
      }
    },
  };
})();
