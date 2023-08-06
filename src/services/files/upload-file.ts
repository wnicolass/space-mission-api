import { Readable } from 'node:stream';
import { cloudinary } from '../../config/cloudinary-config';
import { UserAuthRepository } from '../../interfaces/user.interfaces';

export function uploadFileFactory(userRepository: UserAuthRepository) {
  return {
    async exec(userId: string, fileBuffer: Buffer) {
      return new Promise((res, rej) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          async (err, result) => {
            if (err) return rej(err);

            if (result) {
              await userRepository.updateProfile(userId, {
                profileImageUrl: result.secure_url,
              });

              return res(result);
            }
          },
        );

        Readable.from(fileBuffer).pipe(uploadStream);
      });
    },
  };
}
