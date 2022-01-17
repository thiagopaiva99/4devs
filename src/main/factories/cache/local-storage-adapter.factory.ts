import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

export const localStorageAdapterFactory = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}
