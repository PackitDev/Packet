import { Command } from 'commander';
import { BranchManager, EnvironmentManager } from '@effec-t/git';
import { logger } from '../utils/logger.js';

export function envCommand(): Command {
  const command = new Command('env');

  command
    .description('Manage environments')
    .option('-l, --list', 'List all environments')
    .option('-c, --current', 'Show current environment')
    .action(async (options) => {
      try {
        const branchManager = new BranchManager();
        const envManager = new EnvironmentManager();

        if (options.list) {
          const environments = envManager.listEnvironments();
          logger.log('Environments:');
          environments.forEach(env => {
            logger.log(`  ${env.name} (${env.branch})${env.url ? ` - ${env.url}` : ''}`);
          });
          return;
        }

        if (options.current) {
          const currentBranch = await branchManager.getCurrentBranch();
          const env = envManager.getEnvironmentForBranch(currentBranch);
          
          if (env) {
            logger.log(`Current environment: ${env.name}`);
            logger.log(`Branch: ${env.branch}`);
            if (env.url) logger.log(`URL: ${env.url}`);
          } else {
            logger.warn(`No environment mapped for branch: ${currentBranch}`);
          }
          return;
        }

        // Default: show current
        const currentBranch = await branchManager.getCurrentBranch();
        const env = envManager.getEnvironmentForBranch(currentBranch);
        
        if (env) {
          logger.log(`Environment: ${env.name} (${env.branch})`);
        } else {
          logger.warn(`No environment mapped for branch: ${currentBranch}`);
        }
      } catch (error) {
        logger.error(`Failed to manage environments: ${error instanceof Error ? error.message : 'Unknown error'}`);
        process.exit(1);
      }
    });

  return command;
}
