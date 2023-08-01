import { Controller } from '../../../interfaces/controllers.interfaces';
import launchRepositoryFactory from '../../../repositories/prisma/prisma-launch.repository';
import { getAllLaunchesFactory } from '../../../services/launches/get-all/get-all-launches';

export default (function getAllLaunchesController(): Controller {
  return {
    async exec(req, res, next) {
      try {
        const launchesRepository = launchRepositoryFactory();
        const getAllLaunchesService = getAllLaunchesFactory(launchesRepository);
        const launches = await getAllLaunchesService.exec();
        return res.status(200).json({ launches });
      } catch (err: unknown) {
        return next(err);
      }
    },
  };
})();
