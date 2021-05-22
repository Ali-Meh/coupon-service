import Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import { Category, Coupon, Product } from '../entity'

define(Coupon,(faker: typeof Faker,context:any) => {
  Faker.seed(Math.random()*Date.now()*Faker.datatype.number(50000))

  const coupon = new Coupon()
  coupon.name=Faker.commerce.productName();
  coupon.percent=Faker.datatype.number({min:0,max:100,precision:3})
  coupon.code=Faker.random.alphaNumeric(8)
  coupon.save()
  return coupon
})