import { Command } from 'commander';
import { BranchManager } from '@effec-t/git';
import { logger } from '../utils/logger.js';

export function featureCommand(): Command {
  const command = new Command('feature');

  command
    .description('Create a new feature branch')
    .argument('<name>', 'Name of the feature')
    .action(async (name: string) => {
      try {
        const branchManager = new BranchManager();
        const branchName = await branchManager.createFeatureBranch(name);
        
        logger.success(`Created and switched to branch: ${branchName}`);
        logger.log('');
        logger.log('Next steps:');
        logger.log('  1. Make your changes');
        logger.log('  2. Commit your changes');
        logger.log(`  3. Push with: packet push`);
      } catch (error) {
        logger.error(`Failed to create feature branch: ${error instanceof Error ? error.message : 'Unknown error'}`);
        process.exit(1);
      }
    });

  return command;
}
