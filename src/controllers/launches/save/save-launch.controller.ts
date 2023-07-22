import { Controller } from '../../../interfaces/controllers.interfaces';
import { saveLaunchFactory } from '../../../services/launches/save/save';
import launchRepositoryFactory from '../../../repositories/prisma/prisma-launch.repository';
import planetRepositoryFactory from '../../../repositories/prisma/prisma-planet.repository';
import userAuthRepositoryFactory from '../../../repositories/prisma/prisma-user-auth.repository';

export default (function saveLaunchController(): Controller {
  return {
    async exec(req, res, next) {
      try {
        const launchRepository = launchRepositoryFactory();
        const userRepository = userAuthRepositoryFactory();
        const planetRepository = planetRepositoryFactory();
        const saveLaunchService = saveLaunchFactory(
          launchRepository,
          userRepository,
          planetRepository,
        );
        await saveLaunchService.exec(req.body);
        return res.status(201).json({
          message: 'Launch successfully created',
        });
      } catch (err: unknown) {
        return next(err);
      }
    },
  };
})();
