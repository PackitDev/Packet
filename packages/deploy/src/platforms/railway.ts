import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import type { DeployConfig, DeployResult } from '../types.js';

const execAsync = promisify(exec);

export async function deployRailway(config: DeployConfig): Promise<DeployResult> {
  try {
    // Check if Railway CLI is installed
    try {
      await execAsync('railway --version');
    } catch {
      return {
        success: false,
        error: 'Railway CLI not installed. Install with: npm install -g @railway/cli',
      };
    }

    // Generate railway.json configuration
    await generateRailwayConfig(config);

    // Initialize Railway project if needed
    const projectPath = config.projectPath || process.cwd();
    
    try {
      await execAsync('railway status', { cwd: projectPath });
    } catch {
      // Project not initialized, initialize it
      await execAsync('railway init', { cwd: projectPath });
    }

    // Deploy to Railway
    const { stdout } = await execAsync('railway up', { cwd: projectPath });

    // Get deployment URL
    const { stdout: urlOutput } = await execAsync('railway domain', { cwd: projectPath });
    const url = urlOutput.trim();

    return {
      success: true,
      url: url || undefined,
      logs: stdout,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Railway deployment failed',
    };
  }
}

async function generateRailwayConfig(config: DeployConfig): Promise<void> {
  const railwayConfig = {
    build: {
      builder: 'NIXPACKS',
    },
    deploy: {
      startCommand: 'node dist/index.js',
      restartPolicyType: 'ON_FAILURE',
      restartPolicyMaxRetries: 10,
    },
  };

  const projectPath = config.projectPath || process.cwd();
  await writeFile(
    join(projectPath, 'railway.json'),
    JSON.stringify(railwayConfig, null, 2)
  );
}
