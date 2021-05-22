import Faker from 'faker'
import { define } from 'typeorm-seeding'
import { Coupon } from '../entity'
import {Helper} from '../../components/util'

define(Coupon,(faker: typeof Faker,context:any) => {
  faker.seed(Math.random()*Date.now()*100000000000000000000)
  const coupon = new Coupon()
  coupon.name=faker.commerce.productName();
  coupon.percent=faker.random.number({min:0,max:100,precision:3})
  coupon.code=Helper.StringGenerator()
  return coupon
})