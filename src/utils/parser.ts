import multer from "multer";
import fs from "fs";
import path from "path";
import mime from "mime";
import { Request } from "express";

export const createMulterParser = (url: string, file_field: string, conditions: string[]) => {
    const config = {
        URL: path.basename(url),

        storage(): multer.StorageEngine {
            return multer.diskStorage({
                destination(req, file, cb) {
                    if(!fs.existsSync(config.URL)) {
                        fs.mkdirSync(config.URL);
                        fs.mkdirSync(path.join(config.URL, file_field));
                    }
                    cb(null, path.join(config.URL, file_field));
                },

                filename(req, file, cb) {
                    const file_type = mime.getExtension(file.mimetype);
                    const file_name = `${new Date().getTime()}.${file.originalname.split(".").pop()}`;
                    req.file_props = { file_name, file_type };
                    cb(null, file_name);
                }
            });
        },

        fileFilter() {
            return (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
                const file_type = mime.getExtension(file.mimetype);
                if(!conditions.includes(file_type)) {
                    return cb(new Error("File type not supported!"));
                }
                cb(null, true);
            }
        }
    }

    return multer({
        storage: config.storage(),
        fileFilter: config.fileFilter()
    }).single(file_field);
}
