import { User } from '../../entities/user.entity'
import { faker } from '@faker-js/faker'
import { v4 } from 'uuid'

const cpfs = [
  '62488162043',
  '82908483076',
  '45860529023',
  '33686936038',
  '44000402080',
  '58549023035',
  '18846671040',
  '56141739008',
  '59711612020',
  '49602994010'
]

export class UserMock extends User {
  constructor() {
    super()
    this.id = v4()
    this.email = faker.internet.email()
    this.password = faker.internet.password()
    this.cpf = cpfs[faker.random.numeric()]
    this.created_at = new Date()
    this.updated_at = new Date()
  }

  update({ last_name = false, first_name = false, phone = false }) {
    if (last_name === true) this.last_name = faker.name.lastName()
    if (first_name === true) this.first_name = faker.name.firstName()
    if (phone === true) this.phone = faker.phone.number()

    return this
  }
}
