import { Request, Response } from "express";
import { ReadStream } from "fs";
import { IGetPostImageDTO } from "./GetPostImage.dto";
import { Readable } from "stream";

export interface IGetPostImageService {
    execute(args: IGetPostImageDTO): Promise<{ fileType: string, readStream: ReadStream }>;
}

export class GetPostImageController {
    private videoTypes: string[] = ["mp4", "ogg"]

    constructor(
        private service: IGetPostImageService
    ) {}

    async handle(req: Request, res: Response) {
        const { post_id } = req.params;
        const { start, end } = this.parseRequestHeader(req) ?? { start: undefined, end: undefined };
        const { fileType, readStream } = await this.service.execute({ post_id: Number(post_id), start, end });
        this.writeResponseHeaders(fileType, res);
        readStream.pipe(res);
    }

    private parseRequestHeader(req: Request) {
        if (req.headers.range) {
            const range = req.headers.range.split('=')[1];
            const startEnd = range.split('-').map(Number);
            return {
                start: startEnd[0],
                end: startEnd[1]
            };
        }

        return undefined;
    }

    private writeResponseHeaders(fileType: string, res: Response) {
        let mimeType: string;
        switch(fileType) {
            case "mp4":
                mimeType = "video/mp4";
                break;
            case "png":
                mimeType = "image/png";
                break;
            case "jpg":
                mimeType = "image/jpg";
                break;
            case "jpeg":
                mimeType = "image/jpeg";
                break;
        }
        res.setHeader("Content-Type", mimeType);
    }
}