import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import { internet } from 'faker';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosHttpClient', () => {
    test('should call axios with correct URL', async () => {
        const url = internet.url();
        const axiosClient = new AxiosHttpClient();
        await axiosClient.post({ url });
        expect(mockedAxios).toHaveBeenCalledWith(url);
    })
})