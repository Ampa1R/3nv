import { existsSync, readFileSync, writeFileSync } from 'fs';
import { log } from './log';

const EXAMPLE_PATH = '.env.example';

export const readFile = (file = '.env', copyFromExample: boolean = true): Buffer => {
  if (existsSync(file)) {
    log(`Loading configuration from ${file}`);
    return readFileSync(file);
  }

  if (copyFromExample && existsSync(EXAMPLE_PATH)) {
    log(`Couldn't load configuration from ${file}. Copying from ${EXAMPLE_PATH}`);
    const exampleContent = readFileSync(EXAMPLE_PATH);
    writeFileSync(file, exampleContent);
    return exampleContent;
  }

  log(`Couldn't load configuration from ${file}`);
  writeFileSync(file, '');
  return Buffer.from('');
};

export const parse = (source: Buffer, modifyProcessEnv: boolean): Record<string, string> => {
  const res: Record<string, string> = {};
  source
    .toString()
    .split('\n')
    .filter((line) => Boolean(line))
    .forEach((line) => {
      const [key, value] = line.split('=').map((part) => part.trim());
      if (!key || !value) {
        return;
      }
      res[key] = value;

      if (modifyProcessEnv) {
        process.env[key] = value;
      }
    });
  return res;
};


const defaultConfig: ReadConfig = {
  copyFromExample: true,
  modifyProcessEnv: false,
  verbose: false,
}

export const read = (file: string, config: ReadConfig = defaultConfig): Record<string, string> => {
  const source = readFile(file, config.copyFromExample);
  const parsed = parse(source, config.modifyProcessEnv);
  // TODO: add warnings for missing vars from example
  return parsed;
};
