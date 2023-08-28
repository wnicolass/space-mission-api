import { Router } from 'express';
import getUserProfileController from '../../controllers/user/profile.controller';

export default (function userRouter(): Router {
  const router = Router();

  router.get('/:userId', getUserProfileController.exec);

  return router;
})();
