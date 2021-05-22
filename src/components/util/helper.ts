
import crypto from 'crypto'
export class Helper {
    static CalcPage(page?: number, size = 20) {
        page = Number(page)
        page = (!page || page < 1) ? 1 : page
        let limit = Number(process.env.PAGE_SIZE) || size
        const offset = ((page - 1) * limit) < 0 ? 0 : (page - 1) * limit
        return { limit, offset, page }
    }
    static phoneRegex = new RegExp(/^\+(?:[0-9] ?){6,14}[0-9]$/);

    static StringGenerator(){
        return crypto.randomBytes(48).toString('hex').substr(10,20);
    }
}



