import { TestingModule, Test } from '@nestjs/testing'
import { UsersQueryService } from '../../services/users.query.service'
import { UsersService } from '../../services/users.service'
import { UsersModule } from '../../users.module'
import { UsersRepository } from '../../users.repository'
import { UserMock } from '../mocks/users.entity'

describe('Users Factory - Remove', () => {
  let query: UsersQueryService
  let repository: UsersRepository
  let service: UsersService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule]
    }).compile()

    query = moduleFixture.get<UsersQueryService>(UsersQueryService)
    repository = moduleFixture.get<UsersRepository>(UsersRepository)
    service = moduleFixture.get<UsersService>(UsersService)
  })

  it('Should be defined', () => {
    expect(query).toBeDefined()
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })

  it('Should complete', async () => {
    const user = new UserMock()
    jest.spyOn(query, 'findById').mockImplementationOnce(async () => user)

    jest.spyOn(repository, 'remove').mockImplementationOnce(async () => user)

    expect(await service.remove(user.id)).toBe(
      `User with id:${user.id} deleted`
    )
  })
})
