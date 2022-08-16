import { NestApplication } from '@nestjs/core'
import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import { PrismaService } from '../../../prisma/prisma.service'
import { UserMock } from '../mocks/users.entity'
import { User } from '../../entities/user.entity'

describe('Update User', () => {
  let app: NestApplication
  let prisma: PrismaService
  let user: User
  const mutation = () => `
    mutation updateUser(
      $updateUserInput: UpdateUserInput!
    ) {
      updateUser(updateUserInput: $updateUserInput) {
        id, first_name, last_name, phone
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

  it('Should be able to update user - only first name', async () => {
    const updateUserData = new UserMock().update({ first_name: true })

    const updateUserInput = {
      id: user.id,
      first_name: updateUserData.first_name
    }

    const result = await request(app.getHttpServer()).post('/graphql').send({
      query: mutation(),
      variables: { updateUserInput }
    })

    const { updateUser } = result.body.data

    expect(updateUser).toEqual(
      expect.objectContaining({
        id: user.id,
        first_name: updateUserData.first_name
      })
    )
  })

  it('Should be able to update user - only last name', async () => {
    const updateUserData = new UserMock().update({ last_name: true })

    const updateUserInput = {
      id: user.id,
      last_name: updateUserData.last_name
    }

    const result = await request(app.getHttpServer()).post('/graphql').send({
      query: mutation(),
      variables: { updateUserInput }
    })

    const { updateUser } = result.body.data

    expect(updateUser).toEqual(
      expect.objectContaining({
        id: user.id,
        last_name: updateUserData.last_name
      })
    )
  })

  it('Should be able to update user - only phone', async () => {
    const updateUserData = new UserMock().update({ phone: true })

    const updateUserInput = {
      id: user.id,
      phone: updateUserData.phone
    }

    const result = await request(app.getHttpServer()).post('/graphql').send({
      query: mutation(),
      variables: { updateUserInput }
    })

    const { updateUser } = result.body.data

    expect(updateUser).toEqual(
      expect.objectContaining({
        id: user.id,
        phone: updateUserData.phone
      })
    )
  })

  it('Should be able to update user - full', async () => {
    const updateUserData = new UserMock().update({
      phone: true,
      last_name: true,
      first_name: true
    })

    const updateUserInput = {
      id: user.id,
      first_name: updateUserData.first_name,
      last_name: updateUserData.last_name,
      phone: updateUserData.phone
    }

    const result = await request(app.getHttpServer()).post('/graphql').send({
      query: mutation(),
      variables: { updateUserInput }
    })

    const { updateUser } = result.body.data

    expect(updateUser).toEqual(
      expect.objectContaining({
        id: user.id,
        first_name: updateUserData.first_name,
        last_name: updateUserData.last_name,
        phone: updateUserData.phone
      })
    )
  })

  it('Should not be able to update user with wrong id', async () => {
    const updateUserInput = {
      id: '123'
    }

    const result = await request(app.getHttpServer()).post('/graphql').send({
      query: mutation(),
      variables: { updateUserInput }
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
