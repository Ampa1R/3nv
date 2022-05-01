import { Command } from 'commander';
import { dump } from '../dump';

export const execDump = (source: string, destination: string) => {
  console.log({ source, destination });
  dump(source, destination);
};

export const initDumpCommand = (program: Command) => {
  program.command('dump [source] [destination]').description('Save .env template to .env.example').action(execDump);
};
