import { readFileSync, existsSync, writeFileSync } from 'fs';
import { parse, readFile } from '../read';

jest.mock('fs', () => {
  return { readFileSync: jest.fn(), existsSync: jest.fn(), writeFileSync: jest.fn() };
});

const fileContent = `
API_KEY=111-2222-333

DB_HOST=127.0.0.1
DB_USER=root
`;

describe('read module', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('readFile tests', () => {
    test('read from existing file', () => {
      const fileValue = Buffer.from(fileContent);
      const mockedExists = jest.mocked(existsSync as jest.Mock).mockReturnValue(true);
      const mockerReadFile = jest.mocked(readFileSync as jest.Mock).mockReturnValueOnce(fileValue);
      const mockedWriteFile = jest.mocked(writeFileSync as jest.Mock);

      const res = readFile();
      expect(res).toStrictEqual(fileValue);
      expect(mockedExists).toBeCalledTimes(1);
      expect(mockerReadFile).toBeCalledTimes(1);
      expect(mockedWriteFile).not.toBeCalled();
    });

    test('copy from example', () => {
      const exampleFileValue = Buffer.from(fileContent);
      const filePath = '.env';
      const mockedExists = jest.mocked(existsSync as jest.Mock).mockImplementation((path: string) => path !== filePath);
      const mockerReadFile = jest.mocked(readFileSync as jest.Mock).mockReturnValueOnce(exampleFileValue);
      const mockedWriteFile = jest.mocked(writeFileSync as jest.Mock);

      const res = readFile(filePath, true);
      expect(res).toStrictEqual(exampleFileValue);
      expect(mockedExists).toBeCalledTimes(2);
      expect(mockerReadFile).toBeCalledTimes(1);
      expect(mockedWriteFile).toBeCalledWith(filePath, exampleFileValue);
    });

    test('file do not exists without copy from example', () => {
      const fileValue = Buffer.from('');
      const filePath = '.env';
      const mockedExists = jest.mocked(existsSync as jest.Mock).mockImplementation((path: string) => path !== filePath);
      const mockedWriteFile = jest.mocked(writeFileSync as jest.Mock);

      const res = readFile(filePath, false);
      expect(res).toStrictEqual(fileValue);
      expect(mockedExists).toBeCalledTimes(1);
      expect(mockedWriteFile).toBeCalledWith(filePath, '');
    });
  });
  describe('parse tests', () => {
    test('correct data', () => {
      const value = Buffer.from(fileContent);
      const parsedValue = {
        API_KEY: '111-2222-333',
        DB_HOST: '127.0.0.1',
        DB_USER: 'root',
      };

      const res = parse(value, false);
      expect(res).toStrictEqual(parsedValue);
      expect(process.env).not.toHaveProperty('API_KEY');
    });
    test('correct data with modifying process.env', () => {
      const value = Buffer.from(fileContent);
      const parsedValue = {
        API_KEY: '111-2222-333',
        DB_HOST: '127.0.0.1',
        DB_USER: 'root',
      };

      const res = parse(value, true);
      expect(res).toStrictEqual(parsedValue);
      expect(process.env).toHaveProperty('API_KEY');
      expect(process.env).toHaveProperty('DB_HOST');
      expect(process.env).toHaveProperty('DB_USER');
    });
    test('incorrect data / empty', () => {
      const value = Buffer.from('');

      const res = parse(value, false);
      expect(res).toStrictEqual({});
    });
    test('incorrect data / wrong format', () => {
      const value = Buffer.from('{"API_KEY": "xx-zz", "DB_HOST": "127.0.0.1"}');

      const res = parse(value, false);
      expect(res).toStrictEqual({});
    });
  });
});
