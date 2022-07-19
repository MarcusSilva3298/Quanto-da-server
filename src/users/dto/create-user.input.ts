import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field()
  cpf: string

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  phone: string

  @Field()
  first_name: string

  @Field({ nullable: true })
  last_name: string
}
