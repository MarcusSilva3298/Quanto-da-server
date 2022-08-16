import { Injectable } from '@nestjs/common'

import { User } from '../entities/user.entity'
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

  create(createUserInput: CreateUserInput): Promise<User> {
    return this.usersFactoryService.create(createUserInput)
  }

  findAll(): Promise<User[]> {
    return this.usersQueryService.findAll()
  }

  findOne(id: string): Promise<User> {
    return this.usersQueryService.findById(id)
  }

  update(updateUserInput: UpdateUserInput): Promise<User> {
    return this.usersFactoryService.update(updateUserInput.id, updateUserInput)
  }

  remove(id: string): Promise<User> {
    return this.usersFactoryService.remove(id)
  }
}
