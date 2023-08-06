import { Router } from 'express';
import authRouter from './auth.router';
import planetsRouter from './planets.router';
import launchesRouter from './launches.router';
import fileRouter from './file.router';

export default (function v1Router(): Router {
  const router = Router();

  router.use('/auth', authRouter);
  router.use('/planets', planetsRouter);
  router.use('/launches', launchesRouter);
  router.use('/files', fileRouter);

  return router;
})();
