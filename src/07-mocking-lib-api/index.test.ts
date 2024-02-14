// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/posts/1');

    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValue({ data: {} });

    await throttledGetDataFromApi('/posts/1');

    expect(getSpy).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const responseData = { id: 1, title: 'Test Post' };
    jest.spyOn(axios, 'get').mockResolvedValue({ data: responseData });

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(responseData);
  });

  test('should throttle requests', async () => {
    jest.useFakeTimers();

    throttledGetDataFromApi('/posts/1');
    throttledGetDataFromApi('/posts/2');
    throttledGetDataFromApi('/posts/3');

    jest.advanceTimersByTime(THROTTLE_TIME - 1);

    expect(axios.get).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1);

    expect(axios.get).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(axios.get).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(axios.get).toHaveBeenCalledTimes(3);

    jest.useRealTimers();
  });
});
