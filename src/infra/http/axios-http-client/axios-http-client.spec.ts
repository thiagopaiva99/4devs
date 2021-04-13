import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import { internet, random } from 'faker';
import { HttpPostParams } from '@/data/protocols/http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
})