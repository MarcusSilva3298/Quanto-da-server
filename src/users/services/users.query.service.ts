import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '../entities/user.entity'
import { UsersRepository } from '../users.repository'

@Injectable()
export class UsersQueryService {
  constructor(private usersRepository: UsersRepository) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.list()
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id)

    if (!user) throw new NotFoundException(`User not found with id:${id}`)

    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new NotFoundException(`User not found with email:${email}`)

    return user
  }

  async findByCPF(cpf: string): Promise<User> {
    const user = await this.usersRepository.findByCPF(cpf)

    if (!user) throw new NotFoundException(`User not found with cpf:${cpf}`)

    return user
  }
}
