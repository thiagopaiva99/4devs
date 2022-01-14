import { AccountModel } from '@/domain/models'
import faker, { random } from 'faker'
import { LocalStorageAdapter } from './local-storage-adapter'

const localStorageAdapterFactory = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(localStorage.clear)

  test('should call localStorage.setItem with correct values', () => {
    const localStorageAdapter = localStorageAdapterFactory()
    const key = faker.database.column()
    const value = random.objectElement<AccountModel>()
    localStorageAdapter.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  test('should call localStorage.getItem with correct values', () => {
    const localStorageAdapter = localStorageAdapterFactory()
    const key = faker.database.column()
    const value = random.objectElement<AccountModel>()
    const getSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
    expect(localStorageAdapter.get(key)).toEqual(value)
    expect(getSpy).toHaveBeenCalledWith(key)
  })
})
