import { BadRequestException, Injectable } from '@nestjs/common'

import { User } from '../entities/user.entity'
import { CreateUserInput } from '../dto/create-user.input'
import { UpdateUserInput } from '../dto/update-user.input'

import { UsersRepository } from '../users.repository'
import { UsersQueryService } from './users.query.service'
import { BcryptService } from '../../shared/bcrypt.service'

@Injectable()
export class UsersFactoryService {
  constructor(
    private usersQuery: UsersQueryService,
    private usersRepository: UsersRepository,
    private bcryptService: BcryptService
  ) {}

  async create({
    cpf,
    email,
    password,
    first_name,
    last_name,
    phone
  }: CreateUserInput): Promise<User> {
    const cpfInUse = await this.usersRepository.findByCPF(cpf)

    if (cpfInUse) throw new BadRequestException('CPF already in use')

    const emailInUse = await this.usersRepository.findByEmail(email)

    if (emailInUse) throw new BadRequestException('Email already in use')

    const hashedPassword = await this.bcryptService.hashPassword(password)

    return await this.usersRepository.create({
      cpf,
      email,
      password: hashedPassword,
      first_name,
      last_name,
      phone
    })
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    await this.usersQuery.findById(id)

    return await this.usersRepository.update(id, updateUserInput)
  }

  async remove(id: string) {
    await this.usersQuery.findById(id)

    await this.usersRepository.remove(id)

    return `User with id:${id} deleted`
  }
}
