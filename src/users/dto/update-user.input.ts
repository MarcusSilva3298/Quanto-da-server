import { CreateUserInput } from './create-user.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string

  @Field({ nullable: true })
  first_name: string

  @Field({ nullable: true })
  last_name: string
}
