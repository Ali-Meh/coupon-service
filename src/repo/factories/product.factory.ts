import Faker from 'faker'
import { define } from 'typeorm-seeding'
import { Product } from '../entity'

define(Product,(faker: typeof Faker,context:any) => {

  const product = new Product()
  product.name=Faker.commerce.productName();
  product.price=Faker.datatype.number({min:10,max:1000,precision:2})
  if (context&&context.hasCoupon){
    product.coupons.push(context.coupon)
  }
  product.save()
  return product
})