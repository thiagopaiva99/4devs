import { HttpPostParams, HttpPostClient, HttpResponse, HttpStatusCode, HttpGetClient, HttpGetParams } from '../protocols/http'
import { internet, random } from 'faker'

export const httpPostMockFactory = (): HttpPostParams<any> => ({
  url: internet.url(),
  body: random.objectElement()
})

export const httpGetMockFactory = (): HttpGetParams => ({
  url: internet.url()
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

export class HttpGetClientSpy<Response> implements HttpGetClient<Response> {
  url: string

  response: HttpResponse<Response> = {
    statusCode: HttpStatusCode.OK
  }

  async get (params: HttpGetParams): Promise<HttpResponse<Response>> {
    this.url = params.url
    return this.response
  }
}
