import Faker from 'faker'
import { define } from 'typeorm-seeding'
import { Coupon } from '../entity'
import {Helper} from '../../components/util'

define(Coupon,(faker: typeof Faker,context:any) => {
  const coupon = new Coupon()
  Faker.seed(Math.random()*Date.now()*100000000000000000000)
  coupon.name=Faker.commerce.productName();
  Faker.seed(Math.random()*Date.now()*100000000000000000000)
  coupon.percent=Faker.random.number({min:0,max:100,precision:3})
  Faker.seed(Math.random()*Date.now()*100000000000000000000)
  coupon.code=Helper.StringGenerator()
  return coupon
})