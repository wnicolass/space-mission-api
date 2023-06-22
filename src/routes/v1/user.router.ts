import { Router, Request, Response } from 'express';

export default (function userRouter(): Router {
  const router = Router();

  router.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
      sanityCheck: 'ok',
    });
  });

  return router;
})();
