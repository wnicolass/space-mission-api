import { Request } from 'express';
import multer, { memoryStorage, FileFilterCallback } from 'multer';
import {
  InvalidFileTypeError,
  InvalidFileSizeError,
} from '../errors/file-upload.errors';

function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
    return cb(new InvalidFileTypeError('Invalid extension type'));
  }

  if (file.size > 2 ** 20 * 20) {
    return cb(new InvalidFileSizeError('File size must be less than 20MB'));
  }

  return cb(null, true);
}

const storage = memoryStorage();
const upload = multer({ storage, fileFilter });

export { upload };
