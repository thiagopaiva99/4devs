import { LocalSAveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'
import { SaveAccessToken } from '@/domain/usecases'
import { localStorageAdapterFactory } from '../../cache/local-storage-adapter.factory'

export const localSaveAccessTokenFactory = (): SaveAccessToken => {
  return new LocalSAveAccessToken(localStorageAdapterFactory())
}
