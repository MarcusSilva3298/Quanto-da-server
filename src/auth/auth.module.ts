import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { SharedModule } from '../shared/shared.module'
import { UsersModule } from '../users/users.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { authConfig } from '../config/auth'

@Module({
  imports: [
    UsersModule,
    SharedModule,
    PassportModule,
    JwtModule.register({
      secret: authConfig.jwt.secret,
      signOptions: { expiresIn: '7d' }
    })
  ],
  providers: [AuthResolver, AuthService]
})
export class AuthModule {}
