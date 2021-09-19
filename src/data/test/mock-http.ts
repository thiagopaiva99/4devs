import { HttpPostParams, HttpPostClient, HttpResponse, HttpStatusCode } from '../protocols/http'
import { internet, random } from 'faker'

export const httpPostMockFactory = (): HttpPostParams<any> => ({
  url: internet.url(),
  body: random.objectElement()
})

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.OK
  }

  async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body

    return await Promise.resolve(this.response)
  }
}
