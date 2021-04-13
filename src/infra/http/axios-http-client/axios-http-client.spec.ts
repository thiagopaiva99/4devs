import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import { internet } from 'faker';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const axiosFactory = (): AxiosHttpClient => {
    return new AxiosHttpClient();
}

describe('AxiosHttpClient', () => {
    test('should call axios with correct URL and verb', async () => {
        const url = internet.url();
        const axiosClient = axiosFactory();
        await axiosClient.post({ url });
        expect(mockedAxios.post).toHaveBeenCalledWith(url);
    })
})