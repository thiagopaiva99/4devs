import { UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { localStorageAdapterFactory } from '../factories/cache/local-storage-adapter.factory'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }

  localStorageAdapterFactory().set('account', account)
}
