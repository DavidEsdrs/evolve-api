import { Request, Response } from "express";
import { IUploadProfilePictureDTO } from "./UploadProfilePicture.dto";

export interface IUploadProfilePictureService {
    execute(args: IUploadProfilePictureDTO): Promise<void>;
}

export class UploadProfilePictureController {
    constructor(
        private service: IUploadProfilePictureService
    ) {}

    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const { file_props: { file_name } } = req;
        await this.service.execute({ picture_file_path: file_name, user_id });
        return res.sendStatus(201);
    }
}