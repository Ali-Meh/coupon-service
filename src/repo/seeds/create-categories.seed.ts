import faker from 'faker'
import { Connection } from 'typeorm'
import { Seeder, Factory } from 'typeorm-seeding'
import { Category, Coupon, Product } from '../entity'

export default class CreateCategory implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    let categories =await factory(Category)().createMany(10)
    for (let i = 0; i < categories.length; i++) {
      const coupon =await factory(Coupon)().create()
      const cate = await categories[i].save();
      if(faker.datatype.boolean()){
        cate.coupons=[coupon]
      }
      cate.children=await factory(Category)().createMany(faker.datatype.number({min:1,max:4}))
      cate.save()
      await cate.children.forEach(async cc => {
        let product=await factory(Product)().create()
        cc.product=product
        product.category=cc
        cc.parent=cate
        if(faker.datatype.boolean()){
          cc.coupons=[coupon]
        }
        if(faker.datatype.boolean()){
          cc.product.coupons=[coupon]
        }

        await product.save()
        await cc.save()
      });
    }
  }
}