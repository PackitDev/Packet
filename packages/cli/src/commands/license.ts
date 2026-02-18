import { Command } from 'commander';
import { activateLicense, getCachedLicense, deactivateLicense } from '@packet/license';
import { logger } from '../utils/logger.js';
import { withSpinner } from '../utils/spinner.js';

export function licenseCommand(): Command {
  const command = new Command('license');

  command
    .description('Manage license')
    .argument('[key]', 'License key to activate')
    .option('--deactivate', 'Deactivate current license')
    .option('--status', 'Show license status')
    .action(async (key: string | undefined, options) => {
      try {
        if (options.deactivate) {
          await deactivateLicense();
          logger.success('License deactivated successfully');
          return;
        }

        if (options.status) {
          const cached = await getCachedLicense();
          if (cached) {
            logger.info('License Status:');
            logger.log(`  Version: ${cached.version.version}`);
            logger.log(`  Status: ${cached.license.status}`);
            logger.log(`  Activations: ${cached.license.activations}/${cached.license.maxActivations}`);
            logger.log(`  Early Access: ${cached.license.isEarlyAccess ? 'Yes' : 'No'}`);
          } else {
            logger.info('No active license found');
            logger.log('Using free version');
          }
          return;
        }

        if (!key) {
          logger.error('Please provide a license key');
          logger.log('Usage: packet license <key>');
          process.exit(1);
        }

        const result = await withSpinner('Activating license', async () => {
          return await activateLicense(key);
        });

        if (result.success) {
          logger.success('License activated successfully!');
          if (result.license) {
            logger.log(`Version: ${result.license.version}`);
            logger.log(`Status: ${result.license.status}`);
          }
        } else {
          logger.error(`License activation failed: ${result.error}`);
          process.exit(1);
        }
      } catch (error) {
        logger.error(`License command failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        process.exit(1);
      }
    });

  return command;
}
