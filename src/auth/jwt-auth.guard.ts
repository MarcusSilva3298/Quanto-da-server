import {
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { verify } from 'jsonwebtoken'
import { authConfig } from '../config/auth'

interface TokenPayload {
  iat: number
  exp: number
  id: string
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req: request, res: response } =
      GqlExecutionContext.create(context).getContext()

    const authHeader = request.headers.authorization

    if (!authHeader) throw new UnauthorizedException('No authorization header')

    const [, token] = authHeader.split(' ')

    try {
      const decoded = verify(token, authConfig.jwt.secret)

      const { id } = decoded as TokenPayload

      request.user = {
        id: id
      }

      return true
    } catch {
      throw new UnauthorizedException('Invalid JWT')
    }
  }
}
