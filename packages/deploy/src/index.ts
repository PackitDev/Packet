export * from './types.js';
export * from './platforms/docker.js';

import type { DeployConfig, DeployResult } from './types.js';
import { deployDocker } from './platforms/docker.js';

export async function deploy(config: DeployConfig): Promise<DeployResult> {
  switch (config.platform) {
    case 'docker':
      return deployDocker(config);
    case 'vercel':
    case 'aws':
    case 'railway':
    case 'fly':
      return {
        success: false,
        error: `${config.platform} deployment coming soon`,
      };
    default:
      return {
        success: false,
        error: 'Unknown platform',
      };
  }
}
