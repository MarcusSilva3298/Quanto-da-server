import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { SharedModule } from '../shared/shared.module'
import { UsersFactoryService } from './services/users.factory.service'
import { UsersQueryService } from './services/users.query.service'
import { UsersService } from './services/users.service'
import { UsersRepository } from './users.repository'
import { UsersResolver } from './users.resolver'

@Module({
  imports: [PrismaModule, SharedModule],
  providers: [
    UsersResolver,
    UsersService,
    UsersQueryService,
    UsersFactoryService,
    UsersRepository
  ]
})
export class UsersModule {}
