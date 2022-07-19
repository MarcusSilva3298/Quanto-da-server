import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { UsersFactoryService } from './services/users.factory.service'
import { UsersQueryService } from './services/users.query.service'
import { UsersService } from './services/users.service'
import { UsersResolver } from './users.resolver'

@Module({
  imports: [PrismaModule],
  providers: [
    UsersResolver,
    UsersService,
    UsersQueryService,
    UsersFactoryService
  ]
})
export class UsersModule {}
