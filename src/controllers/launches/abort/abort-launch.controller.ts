import { Controller } from '../../../interfaces/controllers.interfaces';
import { abortLaunchFactory } from '../../../services/launches/abort/abort-launch';
import launchRepositoryFactory from '../../../repositories/prisma/prisma-launch.repository';

export default (function abortLaunchController(): Controller {
  return {
    async exec(req, res, next) {
      try {
        const launchesRepository = launchRepositoryFactory();
        const abortLaunchService = abortLaunchFactory(launchesRepository);
        await abortLaunchService.exec(req.body.launchId, req.user.userId);
        return res.status(200).json({
          message: 'Successfully aborted launch',
        });
      } catch (err: unknown) {
        return next(err);
      }
    },
  };
})();
