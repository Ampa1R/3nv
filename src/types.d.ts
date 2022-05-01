type EnvValues = Record<string, string>;

interface CommonConfig {
  readonly verbose: boolean;
}

interface ReadConfig extends CommonConfig {
  readonly copyFromExample: boolean;
  readonly modifyProcessEnv: boolean;
}

type InitConfig = ReadConfig &
  CommonConfig & {
    readonly path: string;
  };
