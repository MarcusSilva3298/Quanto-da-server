import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const PORT = process.env.PORT || 3000
const logger = new Logger()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(PORT, () => {
    logger.verbose(`Server listening in port:${PORT}! 🚀`)
  })
}
bootstrap()
