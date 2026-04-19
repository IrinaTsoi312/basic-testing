// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: (fn: any) => fn,
}));

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: {} });
    mockedAxios.create.mockReturnValue({
      get: getMock,
    } as any);

    await throttledGetDataFromApi('/posts');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: {} });
    mockedAxios.create.mockReturnValue({
      get: getMock,
    } as any);

    await throttledGetDataFromApi('/users');

    expect(getMock).toHaveBeenCalledWith('/users');
  });

  test('should return response data', async () => {
    const fakeData = { id: 1, name: 'John' };
    const getMock = jest.fn().mockResolvedValue({ data: fakeData });
    mockedAxios.create.mockReturnValue({
      get: getMock,
    } as any);

    const result = await throttledGetDataFromApi('/users/1');

    expect(result).toEqual(fakeData);
  });
});
