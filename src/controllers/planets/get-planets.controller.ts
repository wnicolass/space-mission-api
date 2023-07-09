import planetRepositoryFactory from '../../repositories/prisma/prisma-planet.repository';
import { Controller } from '../../interfaces/controllers.interfaces';
import { getAllPlanetsFactory } from '../../services/planets/get-planets';

export default (function getPlanetsController(): Controller {
  return {
    async exec(req, res, next) {
      try {
        const planetsRepository = planetRepositoryFactory();
        const getAllPlanetsService = getAllPlanetsFactory(planetsRepository);
        const planets = await getAllPlanetsService.exec();
        return res.status(200).json({ planets });
      } catch (err: unknown) {
        return next(err);
      }
    },
  };
})();
