import { Injectable } from '@nestjs/common'
import { CreateUserInput } from '../dto/create-user.input'
import { UpdateUserInput } from '../dto/update-user.input'

@Injectable()
export class UsersFactoryService {
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user'
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`
  }

  remove(id: string) {
    return `This action removes a #${id} user`
  }
}
