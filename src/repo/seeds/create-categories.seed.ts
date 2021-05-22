import { Connection } from 'typeorm'
import { Seeder, Factory } from 'typeorm-seeding'
import { Category } from '../entity'

export default class CreateCategory implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Category)().createMany(10)
  }
}