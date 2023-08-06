import { Router } from 'express';
import { upload } from '../../config/multer-config';
import fileController from '../../controllers/files/file.controller';
import checkAuthStatus from '../../middlewares/check-auth-status';

export default (function fileRouter(): Router {
  const router = Router();

  router.use(checkAuthStatus);
  router.post('/', upload.single('profile_image'), fileController.exec);

  return router;
})();
