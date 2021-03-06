import { AxiosHttpClient } from './axios-http-client'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import axios from 'axios'
import { httpPostMockFactory, httpGetMockFactory } from '@/data/test/mock-http'

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
  describe('Post', () => {
    test('should call axios.post with correct URL, verb and body', async () => {
      const mockedPostParams = httpPostMockFactory()
      const { axiosClient, mockedAxios } = axiosFactory()
      await axiosClient.post(mockedPostParams)
      expect(mockedAxios.post).toHaveBeenCalledWith(mockedPostParams.url, mockedPostParams.body)
    })

    test('should return the correct status code and body on axios.post', async () => {
      const { axiosClient, mockedAxios } = axiosFactory()
      const httpResponse = await axiosClient.post(httpPostMockFactory())
      const axiosResponse = await mockedAxios.post.mock.results[0].value
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    test('should return the correct status code and body on failure on axios.post', async () => {
      const { axiosClient, mockedAxios } = axiosFactory()
      mockedAxios.post.mockRejectedValueOnce({ response: mockHttpResponse() })
      const promiseResponse = axiosClient.post(httpPostMockFactory())
      expect(promiseResponse).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })

  describe('Get', () => {
    test('should call axios.get with correct URL, verb and body', async () => {
      const mockedGetParams = httpGetMockFactory()
      const { axiosClient, mockedAxios } = axiosFactory()
      await axiosClient.get(mockedGetParams)
      expect(mockedAxios.get).toHaveBeenCalledWith(mockedGetParams.url)
    })

    test('should return correct response on axios.get', async () => {
      const { axiosClient, mockedAxios } = axiosFactory()
      const httpResponse = await axiosClient.get(httpGetMockFactory())
      const axiosResponse = await mockedAxios.get.mock.results[0].value
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    test('should return the correct status code and body on failure on axios.post', async () => {
      const { axiosClient, mockedAxios } = axiosFactory()
      mockedAxios.get.mockRejectedValueOnce({ response: mockHttpResponse() })
      const promiseResponse = axiosClient.get(httpGetMockFactory())
      expect(promiseResponse).toEqual(mockedAxios.get.mock.results[0].value)
    })
  })
})
