import {createConnection} from "typeorm"


let PromotionController: any


describe("[Promotion]", () => {
    beforeAll(async () => {
        await createConnection()
        PromotionController = require('./promotion')
    })
    it("will pass",()=>{})
})