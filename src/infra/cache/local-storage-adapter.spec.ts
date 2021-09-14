import faker from 'faker'
import { LocalStorageAdapter } from './local-storage-adapter'

describe('LocalStorageAdapter', () => {
  beforeEach(localStorage.clear)

  test('should call localStorage with correct values', async () => {
    const localStorageAdapter = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.random.word()
    await localStorageAdapter.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
