import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export interface AuthUser {
  id: string
}

export const GetUser = createParamDecorator(
  (_data, context: ExecutionContext): AuthUser => {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req

    return req.user
  }
)
