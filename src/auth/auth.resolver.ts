import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { SignInInput } from './dto/sign-in.input'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  signIn(@Args('SignInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput)
  }
}
