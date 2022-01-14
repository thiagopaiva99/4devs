import { LocalUpdateCurrentAccount } from '@/data/usecases/update-current-account/local-update-current-account'
import { UpdateCurrentAccount } from '@/domain/usecases'
import { localStorageAdapterFactory } from '../../cache/local-storage-adapter.factory'

export const localUpdateCurrentAccountFactory = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(localStorageAdapterFactory())
}
