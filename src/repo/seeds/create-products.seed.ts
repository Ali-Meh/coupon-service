import { Connection } from 'typeorm'
import { Seeder, Factory } from 'typeorm-seeding'
import { Product } from '../entity'

export default class CreateProducts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // await factory(Product)().create()
    }
}