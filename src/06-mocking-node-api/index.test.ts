// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import * as path from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 500);

    expect(setIntervalSpy).toHaveBeenCalledWith(callback, 500);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 500);
    jest.advanceTimersByTime(1500);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    await readFileAsynchronously('test.txt');

    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), 'test.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously('missing.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(Buffer.from('hello world'));
    const result = await readFileAsynchronously('file.txt');

    expect(result).toBe('hello world');
  });
});
