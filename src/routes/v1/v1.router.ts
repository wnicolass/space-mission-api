import { Router } from 'express';
import authRouter from './auth.router';
import planetsRouter from './planets.router';

export default (function v1Router(): Router {
  const router = Router();

  router.use('/auth', authRouter);
  router.use('/planets', planetsRouter);

  return router;
})();
