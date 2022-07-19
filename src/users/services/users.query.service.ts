import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersQueryService {
  findAll() {
    return `This action returns all users`
  }

  findById(id: string) {
    return `This action returns a #${id} user`
  }

  findByEmail(email: string) {}

  findByCPF(cpf: string) {}
}
