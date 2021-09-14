import { SetStorageSpy } from '@/data/protocols/test/mock-storage'
import faker from 'faker'
import { LocalSAveAccessToken } from './local-save-access-token'

describe('LocalSAveAccessToken', () => {
  test('should call set storage with correct value', async () => {
    const setStorage = new SetStorageSpy()
    const localSAveAccessToken = new LocalSAveAccessToken(setStorage)
    const accessToken = faker.datatype.uuid()
    await localSAveAccessToken.save(accessToken)
    expect(setStorage.key).toBe('accessToken')
    expect(setStorage.value).toBe(accessToken)
  })
})
