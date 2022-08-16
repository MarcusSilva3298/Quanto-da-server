import { NestApplication } from '@nestjs/core'
import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import { PrismaService } from '../../../prisma/prisma.service'
import { UsersRepository } from '../../users.repository'
import { UserMock } from '../mocks/users.entity'

describe('Update User', () => {
  let app: NestApplication
  let prisma: PrismaService
  let repository: UsersRepository
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
    repository = moduleFixture.get<UsersRepository>(UsersRepository)

    await prisma.clear()

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to update user - only first name', async () => {
    const user = new UserMock()
    jest.spyOn(repository, 'findById').mockImplementationOnce(async () => user)

    const updatedUser = user.update({ first_name: true })
    jest
      .spyOn(repository, 'update')
      .mockImplementationOnce(async () => updatedUser)

    const updateUserInput = {
      id: user.id,
      first_name: updatedUser.first_name
    }

    const result = await request(app.getHttpServer()).post('/graphql').send({
      query: mutation(),
      variables: { updateUserInput }
    })

    const { updateUser } = result.body.data

    expect(updateUser).toEqual(
      expect.objectContaining({
        id: user.id,
        first_name: updatedUser.first_name
      })
    )
  })

  it('Should be able to update user - only last name', async () => {
    const user = new UserMock()
    jest.spyOn(repository, 'findById').mockImplementationOnce(async () => user)

    const updatedUser = user.update({ last_name: true })
    jest
      .spyOn(repository, 'update')
      .mockImplementationOnce(async () => updatedUser)

    const updateUserInput = {
      id: user.id,
      last_name: updatedUser.last_name
    }

    const result = await request(app.getHttpServer()).post('/graphql').send({
      query: mutation(),
      variables: { updateUserInput }
    })

    const { updateUser } = result.body.data

    expect(updateUser).toEqual(
      expect.objectContaining({
        id: user.id,
        last_name: updatedUser.last_name
      })
    )
  })

  it('Should be able to update user - only phone', async () => {
    const user = new UserMock()
    jest.spyOn(repository, 'findById').mockImplementationOnce(async () => user)

    const updatedUser = user.update({ phone: true })
    jest
      .spyOn(repository, 'update')
      .mockImplementationOnce(async () => updatedUser)

    const updateUserInput = {
      id: user.id,
      phone: updatedUser.phone
    }

    const result = await request(app.getHttpServer()).post('/graphql').send({
      query: mutation(),
      variables: { updateUserInput }
    })

    const { updateUser } = result.body.data

    expect(updateUser).toEqual(
      expect.objectContaining({
        id: user.id,
        phone: updatedUser.phone
      })
    )
  })

  it('Should be able to update user - full', async () => {
    const user = new UserMock()
    jest.spyOn(repository, 'findById').mockImplementationOnce(async () => user)

    const updatedUser = user.update({
      first_name: true,
      last_name: true,
      phone: true
    })
    jest
      .spyOn(repository, 'update')
      .mockImplementationOnce(async () => updatedUser)

    const updateUserInput = {
      id: user.id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      phone: updatedUser.phone
    }

    const result = await request(app.getHttpServer()).post('/graphql').send({
      query: mutation(),
      variables: { updateUserInput }
    })

    const { updateUser } = result.body.data

    expect(updateUser).toEqual(
      expect.objectContaining({
        id: user.id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        phone: updatedUser.phone
      })
    )
  })
})
