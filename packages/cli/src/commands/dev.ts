import { Command } from 'commander';
import { execa } from 'execa';
import { logger } from '../utils/logger.js';

export function devCommand(): Command {
  const command = new Command('dev');

  command
    .description('Start development server')
    .option('-p, --port <port>', 'Port to run on', '3000')
    .action(async (options) => {
      try {
        logger.info('Starting development server...');

        // Run the application with tsx for hot reloading
        const child = execa('npx', ['tsx', 'watch', 'src/index.ts'], {
          stdio: 'inherit',
          env: {
            ...process.env,
            PORT: options.port,
            NODE_ENV: 'development',
          },
        });

        // Handle process termination
        process.on('SIGINT', () => {
          child.kill('SIGINT');
          process.exit(0);
        });

        await child;
      } catch (error) {
        logger.error(`Failed to start dev server: ${error instanceof Error ? error.message : 'Unknown error'}`);
        process.exit(1);
      }
    });

  return command;
}
