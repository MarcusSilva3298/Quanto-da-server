import { TestingModule, Test } from '@nestjs/testing'
import { UsersService } from '../../services/users.service'
import { UsersModule } from '../../users.module'
import { UsersRepository } from '../../users.repository'
import { UserMock } from '../mocks/users.entity'

describe('Users Query - Find All', () => {
  let repository: UsersRepository
  let service: UsersService

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

  it('Should return an empty array', async () => {
    jest.spyOn(repository, 'list').mockImplementationOnce(async () => [])

    const resolved = await service.findAll()

    expect(resolved).toHaveLength(0)
  })

  it('Should return an array of users', async () => {
    const users = [new UserMock(), new UserMock()]

    jest.spyOn(repository, 'list').mockImplementationOnce(async () => users)

    const resolved = await service.findAll()

    expect(resolved).toHaveLength(2)
    expect(resolved).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
          cpf: expect.any(String)
        })
      ])
    )
  })
})
