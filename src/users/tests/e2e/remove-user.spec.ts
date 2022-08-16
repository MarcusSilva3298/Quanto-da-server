import { NestApplication } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../../../app.module'
import { PrismaService } from '../../../prisma/prisma.service'
import { User } from '../../entities/user.entity'
import { UserMock } from '../mocks/users.entity'

describe('Remove User', () => {
  let app: NestApplication
  let prisma: PrismaService
  let user: User
  const mutation = () => `
    mutation removeUser(
      $id: String!
    ) {
      removeUser(id: $id) {
        id
      }
    }
  `

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    prisma = moduleFixture.get<PrismaService>(PrismaService)

    await prisma.clear()

    user = await prisma.users.create({
      data: new UserMock()
    })

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should remove user', async () => {
    const result = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: mutation(),
        variables: { id: user.id }
      })

    const { removeUser } = result.body.data

    expect(removeUser).toEqual(
      expect.objectContaining({
        id: user.id
      })
    )
  })

  it('Should not be able to remove user with wrong id', async () => {
    const result = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: mutation(),
        variables: { id: '123' }
      })

    const { errors } = result.body

    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(
      expect.objectContaining({
        message: expect.stringMatching('User not found with id:123')
      })
    )
  })
})
