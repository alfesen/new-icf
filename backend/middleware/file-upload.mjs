import multer from 'multer';
import { randomUUID } from 'crypto';
const MIME_TYPES = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
};
const fileUpload = multer({
    limits: { fileSize: 1000000 },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPES[file.mimetype];
            cb(null, randomUUID() + '.' + ext);
        },
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPES[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type');
        cb(error, isValid);
    },
});
export default fileUpload;
