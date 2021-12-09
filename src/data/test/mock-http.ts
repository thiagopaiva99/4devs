import { HttpPostParams, HttpPostClient, HttpResponse, HttpStatusCode, HttpGetClient, HttpGetParams } from '../protocols/http'
import { internet, random } from 'faker'

export const httpPostMockFactory = (): HttpPostParams<any> => ({
  url: internet.url(),
  body: random.objectElement()
})

export class HttpPostClientSpy<Response> implements HttpPostClient<Response> {
  url?: string
  body?: any

  response: HttpResponse<Response> = {
    statusCode: HttpStatusCode.OK
  }

  async post (params: HttpPostParams<any>): Promise<HttpResponse<Response>> {
    this.url = params.url
    this.body = params.body

    return await Promise.resolve(this.response)
  }
}

export class HttpGetClientSpy implements HttpGetClient {
  url: string

  async get (params: HttpGetParams): Promise<void> {
    this.url = params.url
  }
}
