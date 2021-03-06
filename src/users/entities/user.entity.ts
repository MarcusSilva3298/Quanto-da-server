import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  cpf: string

  @Field()
  email: string

  @Field()
  password: string

  @Field({ nullable: true })
  phone: string

  @Field({ nullable: true })
  first_name: string

  @Field({ nullable: true })
  last_name: string

  @Field()
  created_at: Date

  @Field()
  updated_at: Date
}
