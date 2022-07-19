import { Injectable } from '@nestjs/common'
import { CreateUserInput } from '../dto/create-user.input'
import { UpdateUserInput } from '../dto/update-user.input'
import { UsersFactoryService } from './users.factory.service'
import { UsersQueryService } from './users.query.service'

@Injectable()
export class UsersService {
  constructor(
    private usersQueryService: UsersQueryService,
    private usersFactoryService: UsersFactoryService
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.usersFactoryService.create(createUserInput)
  }

  findAll() {
    return this.usersQueryService.findAll()
  }

  findOne(id: string) {
    return this.usersQueryService.findById(id)
  }

  update(updateUserInput: UpdateUserInput) {
    return this.usersFactoryService.update(updateUserInput.id, updateUserInput)
  }

  remove(id: string) {
    return this.usersFactoryService.remove(id)
  }
}
