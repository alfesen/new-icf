import { validationResult } from 'express-validator';
import { HttpError } from '../models/shared/HttpError.model.mjs';
export const postHeaderData = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(401, 'Invalid inputs passed, please check your data'));
    }
    res.status(200).json({ message: 'done' });
};
