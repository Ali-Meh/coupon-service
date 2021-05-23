import express, { Request, Response } from 'express'
import { PromotionController } from '../../controllers/product/promotion'

const router = express.Router()

router.get("/:product_id/promotion/:promotion", PromotionController.GetPromotion)


export default router
