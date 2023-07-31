import { Router } from 'express';
import saveLaunchController from '../../controllers/launches/save/save-launch.controller';
import joinLaunchController from '../../controllers/launches/join/join-launch.controller';
import getAllLaunchesController from '../../controllers/launches/get-all/get-all-launches.controller';
import checkAuthStatus from '../../middlewares/check-auth-status';

export default (function launchesRouter(): Router {
  const router = Router();

  router.get('/', getAllLaunchesController.exec);
  router.use(checkAuthStatus);
  router.post('/', saveLaunchController.exec);
  router.post('/:launchId', joinLaunchController.exec);

  return router;
})();
