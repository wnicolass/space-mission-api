import { Router } from 'express';
import saveLaunchController from '../../controllers/launches/save/save-launch.controller';
import checkAuthStatus from '../../middlewares/check-auth-status';

export default (function launchesRouter(): Router {
  const router = Router();

  router.use(checkAuthStatus);
  router.post('/', saveLaunchController.exec);

  return router;
})();
