import {
  INestApplication,
  Injectable,
  InternalServerErrorException,
  OnModuleInit
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }

  async clear() {
    await this.$transaction([this.users.deleteMany()]).catch((err) => {
      throw new InternalServerErrorException(err)
    })
  }
}
