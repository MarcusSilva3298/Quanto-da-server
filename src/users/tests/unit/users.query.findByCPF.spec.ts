import { NotFoundException } from '@nestjs/common'
import { TestingModule, Test } from '@nestjs/testing'
import { UsersQueryService } from '../../services/users.query.service'
import { UsersModule } from '../../users.module'
import { UsersRepository } from '../../users.repository'
import { UserMock } from '../mocks/users.entity'

describe('Users Query - find by cpf', () => {
  let repository: UsersRepository
  let query: UsersQueryService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule]
    }).compile()

    repository = moduleFixture.get<UsersRepository>(UsersRepository)
    query = moduleFixture.get<UsersQueryService>(UsersQueryService)
  })

  it('Should be defined', () => {
    expect(query).toBeDefined()
    expect(repository).toBeDefined()
  })

  it('Should not return user if id does not exist', async () => {
    jest.spyOn(repository, 'findByCPF').mockImplementationOnce(async () => null)

    await expect(query.findByCPF('123')).rejects.toThrowError(
      new NotFoundException(`User not found with cpf:123`)
    )
  })

  it('Should return user with same id', async () => {
    const user = new UserMock()
    jest.spyOn(repository, 'findByCPF').mockImplementationOnce(async () => user)

    expect(await query.findByCPF(user.cpf)).toEqual(
      expect.objectContaining({
        cpf: user.cpf
      })
    )
  })
})
