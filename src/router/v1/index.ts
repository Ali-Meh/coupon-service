import express, { Request, Response } from 'express'
import productRouter from './products'
const router = express.Router()



router.get("/ping", (req: Request, res: Response) => {
    return res.json({
        pong: true
    })
})


router.use("/products",productRouter)

export default router