export * from './types.js';
export * from './platforms/docker.js';
export * from './platforms/vercel.js';
export * from './platforms/aws.js';
export * from './platforms/railway.js';
export * from './platforms/fly.js';

import type { DeployConfig, DeployResult } from './types.js';
import { deployDocker } from './platforms/docker.js';
import { deployVercel } from './platforms/vercel.js';
import { deployAWS } from './platforms/aws.js';
import { deployRailway } from './platforms/railway.js';
import { deployFly } from './platforms/fly.js';

export async function deploy(config: DeployConfig): Promise<DeployResult> {
  switch (config.platform) {
    case 'docker':
      return deployDocker(config);
    case 'vercel':
      return deployVercel(config);
    case 'aws':
      return deployAWS(config);
    case 'railway':
      return deployRailway(config);
    case 'fly':
      return deployFly(config);
    default:
      return {
        success: false,
        error: 'Unknown platform',
      };
  }
}
