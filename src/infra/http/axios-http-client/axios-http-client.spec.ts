import { AxiosHttpClient } from './axios-http-client';
import { mockAxios } from '@/infra/test';
import axios from 'axios';
import { httpPostMockFactory } from '@/data/test/mock-http-post';

jest.mock('axios');

type SutTypes = {
    axiosClient: AxiosHttpClient;
    mockedAxios: jest.Mocked<typeof axios>
}

const axiosFactory = (): SutTypes => {
    const axiosClient = new AxiosHttpClient();
    const mockedAxios = mockAxios();

    return { axiosClient, mockedAxios };
}



describe('AxiosHttpClient', () => {
    test('should call axios with correct URL, verb and body', async () => {
        const mockedPostParams = httpPostMockFactory()
        const { axiosClient, mockedAxios } = axiosFactory();
        await axiosClient.post(mockedPostParams);
        expect(mockedAxios.post).toHaveBeenCalledWith(mockedPostParams.url, mockedPostParams.body);
    })

    test('should return the correct status code and body', async () => {
        const { axiosClient, mockedAxios } = axiosFactory();
        const promiseResponse = axiosClient.post(httpPostMockFactory());
        expect(promiseResponse).toEqual(mockedAxios.post.mock.results[0].value)
    })
})