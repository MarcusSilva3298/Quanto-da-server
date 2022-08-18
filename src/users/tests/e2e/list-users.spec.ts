import { NestApplication } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import { PrismaService } from '../../../prisma/prisma.service'
import * as request from 'supertest'
import { UserMock } from '../mocks/users.entity'
import { UsersRepository } from '../../users.repository'

describe('List Users', () => {
  let app: NestApplication
  let prisma: PrismaService
  let repository: UsersRepository
  const query = () => `{
    users {
      id, cpf, email, password
    }
  }`

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    prisma = moduleFixture.get<PrismaService>(PrismaService)
    repository = moduleFixture.get<UsersRepository>(UsersRepository)

    await prisma.clear()

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should complete - empty array', async () => {
    const result = await request(app.getHttpServer()).post('/graphql').send({
      query: query()
    })

    const { users } = result.body.data

    expect(users).toHaveLength(0)
  })

  it('Should complete - one user', async () => {
    const user = await prisma.users.create({
      data: new UserMock()
    })

    const result = await request(app.getHttpServer()).post('/graphql').send({
      query: query()
    })

    const { users } = result.body.data

    expect(users).toHaveLength(1)
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: user.id,
          cpf: user.cpf,
          email: user.email,
          password: expect.any(String)
        })
      ])
    )
  })

  it('Should complete - +one user', async () => {
    jest
      .spyOn(repository, 'list')
      .mockImplementationOnce(async () => [
        new UserMock(),
        new UserMock(),
        new UserMock()
      ])

    const result = await request(app.getHttpServer()).post('/graphql').send({
      query: query()
    })

    const { users } = result.body.data

    expect(users.length).toBeGreaterThan(1)
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          cpf: expect.any(String),
          email: expect.any(String),
          password: expect.any(String)
        })
      ])
    )
  })
})
