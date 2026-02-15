import { Command } from 'commander';
import { getCachedLicense } from '@effec-t/license';
import { logger } from '../utils/logger.js';
import chalk from 'chalk';

export function upgradeCommand(): Command {
  const command = new Command('upgrade');

  command
    .description('View upgrade options for newer versions')
    .action(async () => {
      try {
        const cached = await getCachedLicense();

        logger.log('');
        logger.log(chalk.bold('Effec-t SDK Upgrade Options'));
        logger.log('');

        if (cached?.license.isEarlyAccess) {
          logger.success('You have early access!');
          logger.log('Benefits:');
          logger.log('  • Lifetime access to v1.0');
          logger.log('  • 50% discount on v2.0 ($49 instead of $99)');
          logger.log('');
        }

        logger.log('Available Versions:');
        logger.log('');
        logger.log(chalk.green('v1.0') + ' - FREE (Coming Soon)');
        logger.log('  All features included');
        logger.log('  Community support');
        logger.log('');
        logger.log(chalk.blue('v2.0') + ' - $99 (Future)');
        logger.log('  GraphQL support');
        logger.log('  Real-time WebSocket features');
        logger.log('  Advanced caching layer');
        logger.log('  Database GUI');
        logger.log('  Performance monitoring');
        logger.log(cached?.license.isEarlyAccess ? '  ' + chalk.yellow('Your price: $49') : '');
        logger.log('');
        logger.log('Visit https://effec-t.dev/upgrade for more information');
      } catch (error) {
        logger.error(`Failed to show upgrade options: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    });

  return command;
}
