import { Router } from 'express';
import getPlanetsController from '../../controllers/planets/get-planets.controller';

export default (function planetsRouter(): Router {
  const router = Router();

  router.get('/', getPlanetsController.exec);

  return router;
})();
