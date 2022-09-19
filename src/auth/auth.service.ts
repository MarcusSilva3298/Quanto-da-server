import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { BcryptService } from '../shared/bcrypt.service'
import { UsersRepository } from '../users/users.repository'
import { JwtPayload } from './dto/payload.dto'
import { SignInInput } from './dto/sign-in.input'

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UsersRepository,
    private bcryptService: BcryptService,
    private jwtService: JwtService
  ) {}

  async signIn({ email, password }: SignInInput): Promise<string> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new UnauthorizedException('Invalid Credentials')

    const passwordsMatch = await this.bcryptService.compareHash(
      password,
      user.password
    )

    if (!passwordsMatch) throw new UnauthorizedException('Invalid Credentials')

    const payload: JwtPayload = { id: user.id }
    const accessToken: string = this.jwtService.sign(payload)

    return accessToken
  }
}
