import { Command } from 'commander';
import { initDumpCommand } from './dump.command';

const program = new Command();
program
  .version(require('../../package.json').version, '-v, --version', 'Output the current version.')
  .usage('<command> [options]')
  .helpOption('-h, --help', 'Output usage information.');

initDumpCommand(program);

program.parse();

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
