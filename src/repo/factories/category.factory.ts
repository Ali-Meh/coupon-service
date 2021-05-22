import Faker from 'faker'
import { define } from 'typeorm-seeding'
import { Category } from '../entity'

define(Category,(faker: typeof Faker,context) => {

  const cat = new Category()
  cat.name = Faker.commerce.department()
  cat.children=[]
  return cat
})