import { Connection } from 'typeorm'
import { Seeder, Factory } from 'typeorm-seeding'
import { Coupon } from '../entity'

export default class CreateCoupon implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // await factory(Coupon)().create()
    }
}