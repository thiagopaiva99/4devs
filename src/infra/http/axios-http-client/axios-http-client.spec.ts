import { AxiosHttpClient } from './axios-http-client'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import axios from 'axios'
import { httpPostMockFactory } from '@/data/test/mock-http'

jest.mock('axios')

type SutTypes = {
  axiosClient: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const axiosFactory = (): SutTypes => {
  const axiosClient = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return { axiosClient, mockedAxios }
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct URL, verb and body', async () => {
    const mockedPostParams = httpPostMockFactory()
    const { axiosClient, mockedAxios } = axiosFactory()
    await axiosClient.post(mockedPostParams)
    expect(mockedAxios.post).toHaveBeenCalledWith(mockedPostParams.url, mockedPostParams.body)
  })

  test('should return the correct status code and body', async () => {
    const { axiosClient, mockedAxios } = axiosFactory()
    const promiseResponse = axiosClient.post(httpPostMockFactory())
    expect(promiseResponse).toEqual(mockedAxios.post.mock.results[0].value)
  })

  test('should return the correct status code and body on failure', async () => {
    const { axiosClient, mockedAxios } = axiosFactory()
    mockedAxios.post.mockRejectedValueOnce({ response: mockHttpResponse() })
    const promiseResponse = axiosClient.post(httpPostMockFactory())
    expect(promiseResponse).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
