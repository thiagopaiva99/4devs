import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { AddAccount } from '@/domain/usecases'
import { axiosHttpClientFactory } from '@/main/factories/http/axios-http-client.factory'
import { apiUrlFactory } from '../../http/api-url.factory'

export const remoteAddAccountFactory = (): AddAccount => {
  return new RemoteAddAccount(apiUrlFactory('/signup'), axiosHttpClientFactory())
}
