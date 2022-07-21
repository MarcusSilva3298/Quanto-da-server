import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '../../services/users.service'
import { UsersModule } from '../../users.module'
import { UsersRepository } from '../../users.repository'
import { UserMock } from '../mocks/users.entity'

describe('UsersFactory - Create User', () => {
  let service: UsersService
  let repository: UsersRepository

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule]
    }).compile()

    repository = moduleFixture.get<UsersRepository>(UsersRepository)
    service = moduleFixture.get<UsersService>(UsersService)
  })

  it('Should be defined', () => {
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })

  it('Should fail - cpf already in use', async () => {
    const user = new UserMock()
    jest.spyOn(repository, 'findByCPF').mockImplementationOnce(async () => user)

    await expect(
      service.create({
        email: user.email,
        cpf: user.cpf,
        password: user.password
      })
    ).rejects.toThrowError(new BadRequestException('CPF already in use'))
  })

  it('Should fail - email already in use', async () => {
    const user = new UserMock()
    jest.spyOn(repository, 'findByCPF').mockImplementationOnce(async () => null)

    jest
      .spyOn(repository, 'findByEmail')
      .mockImplementationOnce(async () => user)

    await expect(
      service.create({
        email: user.email,
        cpf: user.cpf,
        password: user.password
      })
    ).rejects.toThrowError(new BadRequestException('Email already in use'))
  })

  it('Should create user', async () => {
    const user = new UserMock()
    jest.spyOn(repository, 'findByCPF').mockImplementationOnce(async () => null)

    jest
      .spyOn(repository, 'findByEmail')
      .mockImplementationOnce(async () => null)

    jest.spyOn(repository, 'create').mockImplementationOnce(async () => user)

    expect(
      await service.create({
        email: user.email,
        cpf: user.cpf,
        password: user.password
      })
    ).toEqual(
      expect.objectContaining({
        id: user.id,
        email: user.email,
        cpf: user.cpf
      })
    )
  })
})
