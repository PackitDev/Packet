import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import type { DeployConfig, DeployResult } from '../types.js';

const execAsync = promisify(exec);

export async function deployVercel(config: DeployConfig): Promise<DeployResult> {
  try {
    // Check if Vercel CLI is installed
    try {
      await execAsync('vercel --version');
    } catch {
      return {
        success: false,
        error: 'Vercel CLI not installed. Install with: npm install -g vercel',
      };
    }

    // Generate vercel.json configuration
    await generateVercelConfig(config);

    // Deploy to Vercel
    const deployCommand = config.production ? 'vercel --prod' : 'vercel';
    const { stdout } = await execAsync(deployCommand, {
      cwd: config.projectPath || process.cwd(),
    });

    // Extract deployment URL from output
    const urlMatch = stdout.match(/https:\/\/[^\s]+/);
    const url = urlMatch ? urlMatch[0] : undefined;

    return {
      success: true,
      url,
      logs: stdout,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Deployment failed',
    };
  }
}

async function generateVercelConfig(config: DeployConfig): Promise<void> {
  const vercelConfig = {
    version: 2,
    builds: [
      {
        src: 'dist/index.js',
        use: '@vercel/node',
      },
    ],
    routes: [
      {
        src: '/(.*)',
        dest: 'dist/index.js',
      },
    ],
    env: config.env || {},
  };

  const projectPath = config.projectPath || process.cwd();
  await writeFile(
    join(projectPath, 'vercel.json'),
    JSON.stringify(vercelConfig, null, 2)
  );
}
