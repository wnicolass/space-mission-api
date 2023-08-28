import { Router } from 'express';
import authRouter from './auth.router';
import fileRouter from './file.router';
import userRouter from './user.router';
import planetsRouter from './planets.router';
import launchesRouter from './launches.router';

export default (function v1Router(): Router {
  const router = Router();

  router.use('/auth', authRouter);
  router.use('/user', userRouter);
  router.use('/files', fileRouter);
  router.use('/planets', planetsRouter);
  router.use('/launches', launchesRouter);

  return router;
})();
