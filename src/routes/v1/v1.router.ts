import { Router } from 'express';
import authRouter from './auth.router';

export default (function v1Router(): Router {
  const router = Router();

  router.use('/auth', authRouter);

  return router;
})();
