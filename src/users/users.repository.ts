import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<User[]> {
    return await this.prisma.users.findMany()
  }

  async findById(id: string): Promise<User> {
    return await this.prisma.users.findUnique({ where: { id } })
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.users.findUnique({ where: { email } })
  }

  async findByCPF(cpf: string): Promise<User> {
    return await this.prisma.users.findUnique({ where: { cpf } })
  }

  async create({
    cpf,
    email,
    phone,
    password,
    last_name,
    first_name
  }: CreateUserInput): Promise<User> {
    return await this.prisma.users.create({
      data: {
        id: v4(),
        cpf,
        email,
        phone,
        password,
        last_name,
        first_name
      }
    })
  }

  async update(
    id: string,
    { first_name, last_name, phone }: UpdateUserInput
  ): Promise<User> {
    return await this.prisma.users.update({
      where: { id },
      data: { first_name, last_name, phone }
    })
  }

  async remove(id: string) {
    return await this.prisma.users.delete({ where: { id } })
  }
}
