import { cloudinary } from '../../config/cloudinary-config';
import { UserAuthRepository } from '../../interfaces/user.interfaces';

export function uploadFileFactory(userRepository: UserAuthRepository) {
  return {
    async exec(userId: string, fileBuffer: Buffer) {
      const { secure_url: secureUrl } = await cloudinary.uploader.upload(
        fileBuffer.toString(),
      );
      await userRepository.updateProfile(userId, {
        profileImageUrl: secureUrl,
      });
      return secureUrl;
    },
  };
}
