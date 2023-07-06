import { Router } from 'express';
import signUpController from '../../controllers/auth/signup/signup.controller';
import signInController from '../../controllers/auth/signin/signin.controller';

export default (function authRouter(): Router {
  const router = Router();

  router.post('/signup', signUpController.exec);
  router.post('/signin', signInController.exec);

  return router;
})();
