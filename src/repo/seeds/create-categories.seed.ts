import faker from 'faker'
import { Connection } from 'typeorm'
import { Seeder, Factory } from 'typeorm-seeding'
import { Category, Coupon, Product } from '../entity'

export default class CreateCategory implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    let categories =await factory(Category)().createMany(10)
    for (let i = 0; i < categories.length; i++) {
      const coupon=await (await factory(Coupon)().create()).save()
      const cate = await categories[i].save();
      if(faker.datatype.boolean()){
        cate.coupons=[coupon]
      }
      cate.children=await factory(Category)().createMany(faker.datatype.number({min:1,max:4}))
      await cate.children.forEach(async cc => {
        cc.product=await (await factory(Product)().create()).save()


        if(faker.datatype.boolean()){
          cc.coupons=[coupon]
        }
        if(faker.datatype.boolean()){
          cc.product.coupons=[coupon]
        }
      });
    }
  }
}