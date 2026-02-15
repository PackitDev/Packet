import { Command } from 'commander';
import { execa } from 'execa';
import { logger } from '../utils/logger.js';
import { withSpinner } from '../utils/spinner.js';

export function buildCommand(): Command {
  const command = new Command('build');

  command
    .description('Build for production')
    .action(async () => {
      try {
        logger.info('Building for production...');

        await withSpinner('Compiling TypeScript', async () => {
          await execa('npx', ['tsc', '--build'], {
            stdio: 'inherit',
          });
        });

        logger.success('Build completed successfully!');
        logger.log('Output: ./dist');
      } catch (error) {
        logger.error(`Build failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        process.exit(1);
      }
    });

  return command;
}
