import axios from 'axios';
import { random, datatype } from 'faker';

export const mockAxios = (): jest.Mocked<typeof axios> => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue({
        data: random.objectElement(),
        status: datatype.number()
    })

    return mockedAxios;
}