import { Router } from 'express';
import userController from '../../controllers/user.controller';

export default (function userRouter(): Router {
  const router = Router();

  router.get('/', userController.create);

  return router;
})();
