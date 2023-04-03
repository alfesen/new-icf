var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { validationResult } from 'express-validator';
import { HttpError } from '../models/shared/HttpError.model.mjs';
import Header from '../models/Header/Header.model.mjs';
import fs from 'fs';
export const postHeaderData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(401, 'Invalid inputs passed, please check your data'));
    }
    const { pagePath, pageTitle, pageSubtitle } = req.body;
    const { desktopImage, mobileImage } = req.files;
    const existingHeader = yield Header.findOne({ pagePath: pagePath });
    if (existingHeader) {
        const error = new HttpError(400, 'Header for this page already exists');
        return next(error);
    }
    const createdHeaderData = new Header({
        pagePath,
        pageTitle,
        pageSubtitle,
        desktopImage: desktopImage[0].path,
        mobileImage: mobileImage[0].path,
    });
    try {
        yield createdHeaderData.save();
    }
    catch (err) {
        const error = new HttpError(500, 'Something went wrong, please try again later');
        return next(error);
    }
    res
        .status(200)
        .json({ headerData: createdHeaderData.toObject({ getters: true }) });
});
export const getHeaderData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageId } = req.params;
    let headerData;
    try {
        headerData = yield Header.findOne({ pagePath: '/' + pageId });
    }
    catch (err) {
        const error = new HttpError(404, 'Header data not found on the server');
        return next(error);
    }
    if (!headerData) {
        const error = new HttpError(404, 'Header data not found on the server');
        return next(error);
    }
    res.status(200).json({ headerData: headerData.toObject({ getters: true }) });
});
export const updateHeaderData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(401, 'Invalid inputs passed, please check your data'));
    }
    const { pageId } = req.params;
    const { pageTitle, pageSubtitle } = req.body;
    // const { desktopImage, mobileImage } = req.files as MulterFiles
    let headerData;
    try {
        headerData = yield Header.findOne({ pagePath: '/' + pageId });
    }
    catch (err) {
        const error = new HttpError(404, 'Header data not found on the server');
        return next(error);
    }
    headerData.pageTitle = pageTitle;
    headerData.pageSubtitle = pageSubtitle;
    if (req.files) {
        const files = req.files;
        if (files.desktopImage) {
            fs.unlink(headerData.desktopImage, err => {
                console.log(err);
            });
            headerData.desktopImage = files.desktopImage[0].path;
        }
        if (files.mobileImage) {
            fs.unlink(headerData.mobileImage, err => {
                console.log(err);
            });
            headerData.mobileImage = files.mobileImage[0].path;
        }
    }
    try {
        yield headerData.save();
    }
    catch (err) {
        const error = new HttpError(500, 'Something went wrong, could not save data');
        return next(error);
    }
    res.status(200).json({ headerData: headerData.toObject({ getters: true }) });
});
