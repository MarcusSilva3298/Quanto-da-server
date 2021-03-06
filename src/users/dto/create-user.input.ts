import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field()
  cpf: string

  @Field()
  email: string

  @Field()
  password: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  first_name?: string

  @Field({ nullable: true })
  last_name?: string
}
