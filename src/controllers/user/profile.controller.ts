import { Controller } from '../../interfaces/controllers.interfaces';
import { getUserProfileFactory } from '../../services/user/profile';
import userAuthRepositoryFactory from '../../repositories/prisma/prisma-user-auth.repository';

export default (function getUserProfileController(): Controller {
  return {
    async exec(req, res, next) {
      try {
        const userRepository = userAuthRepositoryFactory();
        const getUserProfileService = getUserProfileFactory(userRepository);
        const user = await getUserProfileService.exec(req.params.userId);
        return res.status(200).json({ user });
      } catch (err: unknown) {
        return next(err);
      }
    },
  };
})();
