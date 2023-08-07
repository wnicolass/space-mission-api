import { cloudinary } from '../../config/cloudinary-config';

export function cleanUpCloudinary(publicId: string) {
  cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
}
