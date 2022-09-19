import { NotFoundException } from '@nestjs/common'
import { TestingModule, Test } from '@nestjs/testing'
import { UsersService } from '../../services/users.service'
import { UsersModule } from '../../users.module'
import { UsersRepository } from '../../users.repository'
import { UserMock } from '../mocks/users.entity'

describe('Users Query - findOne', () => {
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

  it('Should not return user if id does not exist', async () => {
    jest.spyOn(repository, 'findById').mockImplementationOnce(async () => null)

    await expect(service.findByID('123')).rejects.toThrowError(
      new NotFoundException(`User not found with id:123`)
    )
  })

  it('Should return user with same id', async () => {
    const user = new UserMock()
    jest.spyOn(repository, 'findById').mockImplementationOnce(async () => user)

    expect(await service.findByID(user.id)).toEqual(
      expect.objectContaining({
        id: user.id
      })
    )
  })
})
