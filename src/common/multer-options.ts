import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FileFilterCallback } from 'multer';

export const multerConfig: MulterOptions = {
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 6,
  },
  fileFilter: (
    req: Express.Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (file.mimetype !== 'application/pdf') {
      cb(new Error('Only PDF files are allowed') as unknown as null, false);
    } else {
      cb(null, true);
    }
  },
};
