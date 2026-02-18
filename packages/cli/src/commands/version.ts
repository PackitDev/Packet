import { Command } from 'commander';
import { checkVersion } from '@packet/license';
import { logger } from '../utils/logger.js';

export function versionCommand(): Command {
  const command = new Command('version');

  command
    .description('Show version and check for updates')
    .action(async () => {
      try {
        const version = await checkVersion();

        logger.info(`Packet v${version.version}`);

        if (version.status === 'free') {
          logger.log('Status: Free version');
        } else if (version.status === 'licensed') {
          logger.log('Status: Licensed');
        } else if (version.status === 'upgrade_available') {
          logger.warn(`New version available: v${version.latest}`);
          logger.log('Upgrade at: https://packet-site.vercel.app/pricing');
        }
      } catch (error) {
        logger.error(`Failed to check version: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    });

  return command;
}
