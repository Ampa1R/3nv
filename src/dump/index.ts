import { writeFileSync } from "fs";
import { read } from "../read";

export const dump = (path: string = '.env', examplePath: string = '.env.example') => {
  const data = read(path);
  const formattedData = Object.entries(data).map(([k, v]) => `${k}=`).join('\n')
  writeFileSync(examplePath, formattedData)
}

export const parse = (source: Buffer, modifyProcessEnv: boolean): Record<string, string> => {
  const res: Record<string, string> = {};
  source
    .toString()
    .split('\n')
    .filter((line) => Boolean(line))
    .map((line) => {
      const [key, value] = line.split('=').map((part) => part.trim());
      res[key] = value;

      if (modifyProcessEnv) {
        process.env[key] = value;
      }
    });
  return res;
};
