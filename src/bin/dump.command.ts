import { Command } from 'commander';
import { dump } from '../dump';
import { log } from '../log';

export const execDump = (source = '.env', destination = '.env.example') => {
  log(`Copying ${source} to ${destination}`);
  dump(source, destination);
};

export const initDumpCommand = (program: Command) => {
  program.command('dump [source] [destination]').description('Save .env template to .env.example').action(execDump);
};
