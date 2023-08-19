import userAuthRepositoryFactory from '../../repositories/prisma/prisma-user-auth.repository';
import { Controller } from '../../interfaces/controllers.interfaces';
import { uploadFileFactory } from '../../services/files/upload-file';

export default (function uploadFileController(): Controller {
  return {
    async exec(req, res, next) {
      try {
        const userRepository = userAuthRepositoryFactory();
        const uploadFileService = uploadFileFactory(userRepository);
        const result = await uploadFileService.exec(
          req.user.userId,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          req.file!.buffer,
        );
        return res.status(200).json({
          message: 'Successfully updated profile image',
          publicId: result.public_id,
        });
      } catch (err: unknown) {
        return next(err);
      }
    },
  };
})();
