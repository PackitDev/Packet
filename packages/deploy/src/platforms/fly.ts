import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import type { DeployConfig, DeployResult } from '../types.js';

const execAsync = promisify(exec);

export async function deployFly(config: DeployConfig): Promise<DeployResult> {
  try {
    // Check if Fly CLI is installed
    try {
      await execAsync('flyctl version');
    } catch {
      return {
        success: false,
        error: 'Fly CLI not installed. Install from: https://fly.io/docs/hands-on/install-flyctl/',
      };
    }

    // Generate fly.toml configuration
    await generateFlyConfig(config);

    const projectPath = config.projectPath || process.cwd();
    const appName = config.name || 'packet-app';

    // Check if app exists, if not create it
    try {
      await execAsync(`flyctl status -a ${appName}`, { cwd: projectPath });
    } catch {
      // App doesn't exist, create it
      await execAsync(`flyctl apps create ${appName}`, { cwd: projectPath });
    }

    // Deploy to Fly.io
    const { stdout } = await execAsync('flyctl deploy', { cwd: projectPath });

    // Get app URL
    const { stdout: infoOutput } = await execAsync(`flyctl info -a ${appName}`, { cwd: projectPath });
    const urlMatch = infoOutput.match(/Hostname\s*=\s*([^\s]+)/);
    const url = urlMatch ? `https://${urlMatch[1]}` : undefined;

    return {
      success: true,
      url,
      logs: stdout,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Fly.io deployment failed',
    };
  }
}

async function generateFlyConfig(config: DeployConfig): Promise<void> {
  const appName = config.name || 'packet-app';
  
  const flyConfig = `app = "${appName}"
primary_region = "iad"

[build]
  [build.args]
    NODE_VERSION = "18"

[env]
  PORT = "8080"
  NODE_ENV = "production"

[[services]]
  internal_port = 8080
  protocol = "tcp"

  [[services.ports]]
    port = 80
    handlers = ["http"]
    force_https = true

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]

  [[services.http_checks]]
    interval = "10s"
    timeout = "2s"
    grace_period = "5s"
    method = "GET"
    path = "/health"
`;

  const projectPath = config.projectPath || process.cwd();
  await writeFile(join(projectPath, 'fly.toml'), flyConfig);
}
