import { HttpResponse } from '.'

export type HttpGetParams = {
  url: string
}

export interface HttpGetClient<Response = any> {
  get: (params: HttpGetParams) => Promise<HttpResponse<Response>>
}
