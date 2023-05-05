import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return res.status(400).json({ error: err.message });
    } else {
        return res.status(500).json({ error: "Internal server error!" });
    }
}