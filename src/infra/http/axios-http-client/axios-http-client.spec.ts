import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import { internet, random, datatype } from 'faker';
import { HttpPostParams, HttpStatusCode } from '@/data/protocols/http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = {
    data: random.objectElement(),
    status: datatype.number()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const axiosFactory = (): AxiosHttpClient => {
    return new AxiosHttpClient();
}

const httpPostMockFactory = (): HttpPostParams<any> => ({
    url: internet.url(),
    body: random.objectElement()
})

describe('AxiosHttpClient', () => {
    test('should call axios with correct URL, verb and body', async () => {
        const mockedPostParams = httpPostMockFactory()
        const axiosClient = axiosFactory();
        await axiosClient.post(mockedPostParams);
        expect(mockedAxios.post).toHaveBeenCalledWith(mockedPostParams.url, mockedPostParams.body);
    })

    test('should return the correct status code and body', async () => {
        const axiosClient = axiosFactory();
        const response = await axiosClient.post(httpPostMockFactory());
        expect(response).toEqual({
            statusCode: mockedAxiosResult.status,
            body: mockedAxiosResult.data
        })
    })
})