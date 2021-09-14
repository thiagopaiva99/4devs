import { SetStorageSpy } from '@/data/protocols/test/mock-storage'
import faker from 'faker'
import { LocalSAveAccessToken } from './local-save-access-token'

type StorageFactoryType = {
  setStorageSpy: SetStorageSpy
  localSaveAccessToken: LocalSAveAccessToken
}

const storageFactory = (): StorageFactoryType => {
  const setStorageSpy = new SetStorageSpy()
  const localSaveAccessToken = new LocalSAveAccessToken(setStorageSpy)

  return {
    setStorageSpy,
    localSaveAccessToken
  }
}

describe('LocalSAveAccessToken', () => {
  test('should call set storage with correct value', async () => {
    const { localSaveAccessToken, setStorageSpy } = storageFactory()
    const accessToken = faker.datatype.uuid()
    await localSaveAccessToken.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
