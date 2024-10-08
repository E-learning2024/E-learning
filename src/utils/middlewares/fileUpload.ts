import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default function configureMulter(directory:string) {
  return {
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, '..','..','..',`./upload/${directory}`),
      filename(request, file, callback) {
        const hash = crypto.randomBytes(6).toString('hex');
        const filename = `${hash}-${file.originalname}`;
        callback(null, filename);
      },
    }),
  };
}