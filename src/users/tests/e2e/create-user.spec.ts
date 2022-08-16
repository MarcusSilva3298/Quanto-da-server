import { NestApplication } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../../../app.module'
import { PrismaService } from '../../../prisma/prisma.service'
import { UsersRepository } from '../../users.repository'
import { UserMock } from '../mocks/users.entity'

describe('Create User e2e', () => {
  let app: NestApplication
  let prisma: PrismaService
  let repository: UsersRepository
  const mutation = () => `
    mutation createUser(
      $createUserInput: CreateUserInput!
    ) {
      createUser(createUserInput: $createUserInput) {
        id, cpf, email, password
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

  it('Should be able to create user', async () => {
    const user = new UserMock()

    const createUserInput = {
      cpf: user.cpf,
      email: user.email,
      password: user.password
    }

    const result = await request(app.getHttpServer()).post('/graphql').send({
      query: mutation(),
      variables: { createUserInput }
    })

    const { createUser } = result.body.data

    expect(createUser).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        cpf: createUserInput.cpf,
        email: createUserInput.email,
        password: expect.any(String)
      })
    )
  })

  it('Should not complete - cpf already in use', async () => {
    const user = new UserMock()
    jest.spyOn(repository, 'findByCPF').mockImplementationOnce(async () => {
      return user
    })

    const createUserInput = {
      cpf: user.cpf,
      email: user.email,
      password: user.password
    }

    const result = await request(app.getHttpServer()).post('/graphql').send({
      query: mutation(),
      variables: { createUserInput }
    })

    const { errors } = result.body

    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(
      expect.objectContaining({
        message: expect.stringMatching('CPF already in use')
      })
    )
  })

  it('Should not complete - email already in use', async () => {
    const user = new UserMock()
    jest.spyOn(repository, 'findByEmail').mockImplementationOnce(async () => {
      return user
    })

    const createUserInput = {
      cpf: user.cpf,
      email: user.email,
      password: user.password
    }

    const result = await request(app.getHttpServer()).post('/graphql').send({
      query: mutation(),
      variables: { createUserInput }
    })

    const { errors } = result.body

    expect(errors).toHaveLength(1)
    expect(errors[0]).toEqual(
      expect.objectContaining({
        message: expect.stringMatching('Email already in use')
      })
    )
  })
})
