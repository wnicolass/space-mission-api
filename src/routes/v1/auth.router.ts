import { Router } from 'express';
import authController from '../../controllers/auth/auth.controller';

export default (function authRouter(): Router {
  const router = Router();

  router.post('/signup', authController.signUp);

  return router;
})();
