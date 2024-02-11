// Uncomment the code below and write your tests
import { readFileAsynchronously } from '06-mocking-node-api';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs', () => ({
  ...jest.requireActual<typeof fs>('fs'),
  existsSync: jest.fn(),
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  ...jest.requireActual<typeof path>('path'),
  join: jest.fn(),
}));

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join').mockReturnValue('/mocked/join/path');

    await readFileAsynchronously('test.txt');

    expect(path.join).toHaveBeenCalledWith(expect.any(String), 'test.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously('nonexistent.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValue(Buffer.from('Mocked file content'));

    const result = await readFileAsynchronously('existing.txt');

    expect(result).toBe('Mocked file content');
  });
});
