import { Response } from "express";
export class ExpressError extends Error {
    statusCode: number;
    message: string;
    code: string;
    constructor(statusCode: number, code: string, message?: string) {
        super();
        this.statusCode = statusCode;
        this.code = code;
        this.message = message || code;
    }

    static handleError(err: ExpressError, res: Response) {
        if (err.name == "ExpressErrorHandler" || err.constructor.name == "ExpressError") {
            const { statusCode, code, message } = err;
            return res.status(statusCode).json({
                status: "error",
                code,
                message
            });
        }
        return res.status(500).json({
            status: "error",
            code: err.message,
            message: err.message
        });
    };


}