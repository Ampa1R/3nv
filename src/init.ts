import { Env } from "./env";
import { read } from "./read"
import { enableLogger } from "./log";

const defaultConfig: InitConfig = {
  copyFromExample: true,
  modifyProcessEnv: false,
  path: '.env',
  verbose: false,
}

export const init = <T = Record<string, string>>(userConfig: Partial<InitConfig> = {}): Env<T> => {
  const config = Object.assign({}, defaultConfig, userConfig);

  if (config.verbose) {
    enableLogger();
  }

  const data = read(config.path, config) as any as T;
  return new Env<T>(data);
}
