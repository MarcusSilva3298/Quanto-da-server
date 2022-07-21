import { TestingModule, Test } from '@nestjs/testing'
import { UsersQueryService } from '../../services/users.query.service'
import { UsersModule } from '../../users.module'
import { UsersRepository } from '../../users.repository'
import { UserMock } from '../mocks/users.entity'
import { UsersService } from '../../services/users.service'

describe('UsersFactory - Update User', () => {
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

  it('Should complete - only last name', async () => {
    const user = new UserMock()
    jest.spyOn(query, 'findById').mockImplementationOnce(async () => user)

    const updatedUser = user.update(true)
    jest
      .spyOn(repository, 'update')
      .mockImplementationOnce(async () => updatedUser)

    expect(
      await service.update({
        last_name: updatedUser.last_name,
        id: updatedUser.id
      })
    ).toEqual(
      expect.objectContaining({
        id: user.id,
        last_name: updatedUser.last_name
      })
    )
  })

  it('Should complete - only first name', async () => {
    const user = new UserMock()
    jest.spyOn(query, 'findById').mockImplementationOnce(async () => user)

    const updatedUser = user.update(false, true)
    jest
      .spyOn(repository, 'update')
      .mockImplementationOnce(async () => updatedUser)

    expect(
      await service.update({
        first_name: updatedUser.first_name,
        id: updatedUser.id
      })
    ).toEqual(
      expect.objectContaining({
        id: user.id,
        first_name: updatedUser.first_name
      })
    )
  })

  it('Should complete - only phone', async () => {
    const user = new UserMock()
    jest.spyOn(query, 'findById').mockImplementationOnce(async () => user)

    const updatedUser = user.update(false, false, true)
    jest
      .spyOn(repository, 'update')
      .mockImplementationOnce(async () => updatedUser)

    expect(
      await service.update({
        phone: updatedUser.phone,
        id: updatedUser.id
      })
    ).toEqual(
      expect.objectContaining({
        id: user.id,
        phone: updatedUser.phone
      })
    )
  })

  it('Should complete - all data', async () => {
    const user = new UserMock()
    jest.spyOn(query, 'findById').mockImplementationOnce(async () => user)

    const updatedUser = user.update(true, true, true)
    jest
      .spyOn(repository, 'update')
      .mockImplementationOnce(async () => updatedUser)

    expect(
      await service.update({
        phone: updatedUser.phone,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        id: updatedUser.id
      })
    ).toEqual(
      expect.objectContaining({
        id: user.id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        phone: updatedUser.phone
      })
    )
  })
})
