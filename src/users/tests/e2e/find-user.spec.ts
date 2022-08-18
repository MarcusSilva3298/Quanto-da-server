import { NestApplication } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import { PrismaService } from '../../../prisma/prisma.service'
import * as request from 'supertest'
import { UserMock } from '../mocks/users.entity'

describe('Find User', () => {
  let app: NestApplication
  let prisma: PrismaService
  const query = (id: string) => `{
    user(
      id: \"${id}\"
    ) {
      id, cpf, email, password
    }
  }`

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    prisma = moduleFixture.get<PrismaService>(PrismaService)

    await prisma.clear()

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should not complete - wrong id', async () => {
    const result = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: query('123')
      })

    const { errors } = result.body

    expect(errors).toHaveLength(1)
    expect(errors[0].message).toBe('User not found with id:123')
  })

  it('Should complete', async () => {
    const userData = await prisma.users.create({
      data: new UserMock()
    })

    const result = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: query(userData.id)
      })

    const { user } = result.body.data

    expect(user).toEqual(
      expect.objectContaining({
        id: user.id,
        cpf: user.cpf,
        email: user.email,
        password: expect.any(String)
      })
    )
  })
})
