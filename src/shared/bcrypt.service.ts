import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'

@Injectable()
export class BcryptService {
  async hashPassword(password: string) {
    return await hash(password, 6)
  }

  async compareHash(string: string, hash: string) {
    return await compare(string, hash)
  }
}
