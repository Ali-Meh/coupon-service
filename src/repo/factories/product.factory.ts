import Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import { Category, Coupon, Product } from '../entity'

define(Product,(faker: typeof Faker,context:any) => {

  const product = new Product()
  product.name=faker.commerce.productName();
  product.price=faker.datatype.number({min:10,max:1000,precision:2})
  if (context.hasCoupon){
    product.coupons.push(context.coupon)
  }
  return product
})