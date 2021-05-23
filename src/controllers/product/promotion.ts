import { getManager} from "typeorm";
import { Request, Response } from "express";
import {  Coupon, Product } from "../../repo/entity";
import message from '../../components/JoiErrorHandler'
import response from '../../components/responseHandler'
import joi from 'joi'



export class PromotionController {
    //Get Details of promotion
    static async GetPromotion(req: Request, res: Response) {
        try {
            const schema = joi.object().keys({
                //@ts-ignore
                product_price: joi.number().required().label("قیمت محصول").error(message),
                //@ts-ignore
                user_id: joi.number().required().label("ایدی کاربر").error(message),
            })
            let { error, value } = schema.validate(req.query, { abortEarly: false })
            if (error) {
                return response.validation(res, error)
            }

            let product = await getManager().createQueryBuilder(Product, "product")
                .where("product.id = :id",{id:req.params.product_id})
                .innerJoinAndSelect("product.category","category","category.id = product.categoryId")
                .innerJoinAndSelect("category.parent","parent","parent.id = category.parentId")
                .getOne();
            if(!product){
                return response.customError(res,"محصول پیدا نشد.",404)
            }


            let promotion = await getManager().createQueryBuilder(Coupon, "coupon")
                .where("coupon.code = :code",{code:req.params.promotion})
                .innerJoinAndSelect("coupon.products", "product", "product.id = :product_id", { product_id:req.params.product_id })
                .getOne();
            if(!promotion){
                promotion = await getManager().createQueryBuilder(Coupon, "coupon")
                .where("coupon.code = :code",{code:req.params.promotion})
                .innerJoinAndSelect("coupon.categories","category","category.id IN (:...ids)",{ids:[product.category.id,product.category.parent.id]})
                // .innerJoinAndSelect("category.parent","parent","parent.id = category.parentId")
                .getOne();

                if(!promotion)
                    return response.customError(res,"کد تخفیف پیدا نشد.",404)
            }

            return response.success(res,{
                percent:promotion.percent,
                value:(promotion.percent/100)*value.product_price
            },"کد  تخفیف معتبر است")
        } catch (error) {
            return response.catchError(res, error)
        }

    }
}