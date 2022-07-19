import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}
}
