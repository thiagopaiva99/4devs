import axios, { AxiosResponse } from 'axios'
import { random, datatype } from 'faker'

export const mockHttpResponse = (): AxiosResponse<any> => ({
  data: random.objectElement(),
  status: datatype.number()
} as AxiosResponse<any>)

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockClear().mockResolvedValue(mockHttpResponse())
  mockedAxios.get.mockClear().mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
