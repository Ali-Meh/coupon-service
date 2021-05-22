import Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import { Category, Coupon, Product } from '../entity'

define(Category,(faker: typeof Faker,context) => {

  const cat = new Category()
  cat.name = Faker.commerce.department()
  if (Faker.datatype.boolean()){
    cat.coupons=[factory(Coupon)() as any]
  }

  //child categories
  for (let i = 0; i < Faker.datatype.number({min:1,max:4}); i++) {
    const catchild = new Category()
    let coupon=factory(Coupon)() as any
    if(Faker.datatype.boolean()){
      catchild.coupons=[coupon]
    }
    catchild.name = Faker.commerce.department()
    catchild.product = factory(Product)({hasCoupon:Faker.datatype.boolean(),coupon}) as any
    catchild.parent = cat
    catchild.save()
    cat.children=[catchild]
  }


  return cat
})