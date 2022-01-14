import { SetStorageSpy } from '@/data/protocols/test/mock-storage'
import { mockAccountModel } from '@/domain/test'
import faker from 'faker'
import { LocalUpdateCurrentAccount } from './local-update-current-account'

type StorageFactoryType = {
  setStorageSpy: SetStorageSpy
  localUpdateCurrentAccount: LocalUpdateCurrentAccount
}

const storageFactory = (): StorageFactoryType => {
  const setStorageSpy = new SetStorageSpy()
  const localSaveAccessToken = new LocalUpdateCurrentAccount(setStorageSpy)

  return {
    setStorageSpy,
    localUpdateCurrentAccount: localSaveAccessToken
  }
}

describe('LocalUpdateCurrentAccount', () => {
  test('should call set storage with correct value', async () => {
    const { localUpdateCurrentAccount, setStorageSpy } = storageFactory()
    const accountModel = mockAccountModel()
    await localUpdateCurrentAccount.save(accountModel)
    expect(setStorageSpy.key).toBe('account')
    expect(setStorageSpy.value).toBe(JSON.stringify(accountModel))
  })

  test('should throw if set storage throws', async () => {
    const { localUpdateCurrentAccount, setStorageSpy } = storageFactory()
    jest.spyOn(setStorageSpy, 'set').mockRejectedValueOnce(new Error())
    const promise = localUpdateCurrentAccount.save(mockAccountModel())
    await expect(promise).rejects.toThrow(new Error())
  })
})
