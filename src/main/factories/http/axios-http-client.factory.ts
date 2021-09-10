import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'

export const axiosHttpClientFactory = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
