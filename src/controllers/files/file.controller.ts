import userAuthRepositoryFactory from '../../repositories/prisma/prisma-user-auth.repository';
import { Controller } from '../../interfaces/controllers.interfaces';
import { uploadFileFactory } from '../../services/files/upload-file';

export default (function uploadFileController(): Controller {
  return {
    async exec({ body, file }, res, next) {
      try {
        const userRepository = userAuthRepositoryFactory();
        const uploadFileService = uploadFileFactory(userRepository);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        console.log(file);
        await uploadFileService.exec(body.userId, file!.buffer);
        return res
          .status(200)
          .json({ message: 'Successfully updated profile image' });
      } catch (err: unknown) {
        return next(err);
      }
    },
  };
})();
