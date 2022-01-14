import faker from 'faker'
import { LocalStorageAdapter } from './local-storage-adapter'

const localStorageAdapterFactory = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(localStorage.clear)

  test('should call localStorage with correct values', () => {
    const localStorageAdapter = localStorageAdapterFactory()
    const key = faker.database.column()
    const value = faker.random.word()
    localStorageAdapter.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
