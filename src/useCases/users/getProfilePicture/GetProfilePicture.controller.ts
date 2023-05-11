import { Request, Response } from "express";
import { ReadStream } from "fs";
import { IGetProfilePictureDTO } from "./GetProfilePicture.dto";

export interface IGetProfilePictureService {
    execute(args: IGetProfilePictureDTO): Promise<ReadStream>;
}

export class GetProfilePictureController {
    constructor(
        private service: IGetProfilePictureService
    ) {}

    async handle(req: Request, res: Response) {
        const user_id = Number(req.params.id);
        const readStream = await this.service.execute({ user_id });
        readStream.pipe(res);
    }
}