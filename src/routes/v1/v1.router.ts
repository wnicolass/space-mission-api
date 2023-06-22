import { Router } from 'express';
import userRouter from './user.router';

export default (function v1Router(): Router {
  const router = Router();

  router.use('/users', userRouter);

  return router;
})();
