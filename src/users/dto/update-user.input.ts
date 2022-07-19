import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput {
  @Field()
  id: string

  @Field({ nullable: true })
  first_name?: string

  @Field({ nullable: true })
  last_name?: string

  @Field({ nullable: true })
  phone?: string
}
