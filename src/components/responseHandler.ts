import { Response } from 'express';
import _ from 'lodash'

export class ErrorHandler extends Error {
    message: string
    status: number
    code: string
    /**
     *
     */
    constructor(msg: string, status?: number, code?: string) {
        super(msg);
        this.message = msg
        this.status = status || 500
        if (code) {
            this.code = code || "Crash"
        }
    }


}

export default class ResponseHandler {

    static messages = {
        Create: "با موفقیت ایجاد شد",
        Update: "با موفقیت ویرایش شد",
        NotFound: "پیدا نشد",
        Deleted: "با موفقیت حذف شد",
        Success: "عملیات با موفقیت انجام شد"
    }


    static customError(res: Response, message: string, code: number, data?: any, root: boolean = false) {
        if (root) {
            return res.status(code).json({
                message,
                ...data
            })
        } else {
            return res.status(code).json({
                message,
                data
            })
        }
    }

    static success(res: Response, data: any, message?: string) {
        return res.status(200).json({
            data,
            message
        })
    }

    static validation(res: Response, errors: any, field: string = "all") {//todo add fieldname in
        if (_.isString(errors)) {
            return res.status(400).json([{
                field,
                message: errors
            }])
        }
        let data = errors.details || errors

        return res.status(400).json(data.map((e: any) => {
            return {
                message: e.message,
                code: e.code,
                field: e.path.toString()
            }
        }))
    }

    static catchError(res: Response, err: any) {
        console.log("********************************")
        console.log(err)
        console.log("********************************")

        return ResponseHandler.customError(res, 'مشکلی از سمت سرور رخ داده است', 500, { name: err.name })
    }
}