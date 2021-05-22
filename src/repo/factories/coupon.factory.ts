import Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import { Category, Coupon, Product } from '../entity'

define(Coupon,(faker: typeof Faker,context:any) => {

  const coupon = new Coupon()
  coupon.name=faker.commerce.productName();
  coupon.percent=faker.datatype.number({min:0,max:1,precision:2})
  coupon.code=faker.random.alphaNumeric(6)
  return coupon
})