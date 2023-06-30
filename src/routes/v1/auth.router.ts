import { Router } from 'express';
import signUpController from '../../controllers/auth/signup/signup.controller';

export default (function authRouter(): Router {
  const router = Router();

  router.post('/signup', signUpController.exec);

  return router;
})();
