import { HttpResponse } from '.'

export type HttpPostParams<T> = {
  url: string
  body?: T
}

export interface HttpPostClient<R = any> {
  post: (params: HttpPostParams<any>) => Promise<HttpResponse<R>>
}
