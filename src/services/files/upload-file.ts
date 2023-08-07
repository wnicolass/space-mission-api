import { Readable } from 'node:stream';
import { cloudinary } from '../../config/cloudinary-config';
import { UserAuthRepository } from '../../interfaces/user.interfaces';
import { UploadApiResponse } from 'cloudinary';

export function uploadFileFactory(userRepository: UserAuthRepository) {
  return {
    async exec(userId: string, fileBuffer: Buffer): Promise<UploadApiResponse> {
      return new Promise((res, rej) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          async (err, result) => {
            if (err) return rej(err);

            if (result) {
              await userRepository.updateProfile(userId, {
                profileImageUrl: result.secure_url,
              });

              return res(result as UploadApiResponse);
            }
          },
        );

        Readable.from(fileBuffer).pipe(uploadStream);
      });
    },
  };
}
