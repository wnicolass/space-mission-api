import { Controller } from '../../../interfaces/controllers.interfaces';
import userLaunchRepositoryFactory from '../../../repositories/prisma/prisma-userlaunch.repository';
import { joinLaunchFactory } from '../../../services/launches/join/join-launch';

export default (function joinLaunchController(): Controller {
  return {
    async exec({ params, body }, res, next) {
      try {
        const userLaunchRepository = userLaunchRepositoryFactory();
        const joinLaunchService = joinLaunchFactory(userLaunchRepository);
        await joinLaunchService.exec({
          launchId: params.launchId,
          userId: body.userId,
        });
        return res.status(200).json({
          message: 'Successfully joined launch',
        });
      } catch (err: unknown) {
        return next(err);
      }
    },
  };
})();
