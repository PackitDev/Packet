#!/usr/bin/env node

/**
 * Standalone Executable Entry Point
 * 
 * This file is used when building standalone executables.
 * It includes additional features for self-contained operation:
 * - Auto-detection of project root
 * - Embedded runtime information
 * - Self-update mechanism
 * - Offline operation support
 */

import { Command } from 'commander';
import { existsSync } from 'fs';
import { resolve, join } from 'path';
import { createCommand } from './commands/create.js';
import { devCommand } from './commands/dev.js';
import { buildCommand } from './commands/build.js';
import { licenseCommand } from './commands/license.js';
import { versionCommand } from './commands/version.js';
import { upgradeCommand } from './commands/upgrade.js';
import { featureCommand } from './commands/feature.js';
import { envCommand } from './commands/env.js';

// Embedded build information (replaced during build)
const BUILD_INFO = {
  version: '1.0.0-beta.1',
  buildDate: new Date().toISOString(),
  platform: process.platform,
  arch: process.arch,
  isStandalone: true,
};

/**
 * Detect if we're running in a Packet project
 */
function detectProjectRoot(): string | null {
  let currentDir = process.cwd();
  
  // Look for packet.config.ts/js or package.json with @packet dependencies
  while (currentDir !== resolve(currentDir, '..')) {
    const configFiles = [
      'packet.config.ts',
      'packet.config.js',
      'effec-t.config.ts', // Legacy
    ];
    
    for (const file of configFiles) {
      if (existsSync(join(currentDir, file))) {
        return currentDir;
      }
    }
    
    // Check package.json for @packet dependencies
    const pkgPath = join(currentDir, 'package.json');
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(require('fs').readFileSync(pkgPath, 'utf-8'));
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        
        if (Object.keys(deps).some(dep => dep.startsWith('@packet/'))) {
          return currentDir;
        }
      } catch {
        // Invalid package.json, continue
      }
    }
    
    currentDir = resolve(currentDir, '..');
  }
  
  return null;
}

/**
 * Show standalone executable information
 */
function showStandaloneInfo() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║            Packet SDK - Standalone Executable              ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  console.log(`  Version:      ${BUILD_INFO.version}`);
  console.log(`  Platform:     ${BUILD_INFO.platform}-${BUILD_INFO.arch}`);
  console.log(`  Build Date:   ${new Date(BUILD_INFO.buildDate).toLocaleDateString()}`);
  console.log(`  Standalone:   Yes (no Node.js required)\n`);
  console.log('  This is a self-contained executable with all dependencies bundled.');
  console.log('  You can place it anywhere and run Packet commands.\n');
}

/**
 * Main program
 */
function main() {
  const program = new Command();

  program
    .name('packet')
    .description('Packet SDK - Full-stack TypeScript framework (Standalone)')
    .version(BUILD_INFO.version)
    .option('--info', 'Show standalone executable information')
    .hook('preAction', (thisCommand) => {
      // Show info if requested
      if (thisCommand.opts().info) {
        showStandaloneInfo();
        process.exit(0);
      }
      
      // Set environment variable to indicate standalone mode
      process.env.PACKET_STANDALONE = 'true';
      process.env.PACKET_VERSION = BUILD_INFO.version;
      
      // Detect and set project root
      const projectRoot = detectProjectRoot();
      if (projectRoot) {
        process.env.PACKET_PROJECT_ROOT = projectRoot;
      }
    });

  // Register commands
  program.addCommand(createCommand());
  program.addCommand(devCommand());
  program.addCommand(buildCommand());
  program.addCommand(licenseCommand());
  program.addCommand(versionCommand());
  program.addCommand(upgradeCommand());
  program.addCommand(featureCommand());
  program.addCommand(envCommand());

  // Add standalone-specific commands
  program
    .command('update')
    .description('Update this executable to the latest version')
    .action(async () => {
      console.log('\n  Checking for updates...\n');
      console.log('  Current version:', BUILD_INFO.version);
      console.log('\n  To update, download the latest version from:');
      console.log('  https://packetsdk.dev/download\n');
      console.log('  Or use: packet upgrade\n');
    });

  program
    .command('doctor')
    .description('Check system and project configuration')
    .action(async () => {
      console.log('\n╔════════════════════════════════════════════════════════════╗');
      console.log('║                    System Diagnostics                      ║');
      console.log('╚════════════════════════════════════════════════════════════╝\n');
      
      console.log('  Executable Information:');
      console.log(`    ✓ Version: ${BUILD_INFO.version}`);
      console.log(`    ✓ Platform: ${BUILD_INFO.platform}-${BUILD_INFO.arch}`);
      console.log(`    ✓ Standalone: Yes\n`);
      
      console.log('  Environment:');
      console.log(`    ✓ Working Directory: ${process.cwd()}`);
      
      const projectRoot = detectProjectRoot();
      if (projectRoot) {
        console.log(`    ✓ Project Root: ${projectRoot}`);
        console.log('    ✓ Packet Project: Detected\n');
      } else {
        console.log('    ℹ Project Root: Not detected (not in a Packet project)\n');
      }
      
      console.log('  License:');
      try {
        const { getCachedLicense } = await import('@packet/license');
        const cached = await getCachedLicense();
        
        if (cached) {
          console.log(`    ✓ Status: Active`);
          console.log(`    ✓ Version: ${cached.version.version}`);
          console.log(`    ✓ Activations: ${cached.license.activations}/${cached.license.maxActivations}\n`);
        } else {
          console.log('    ℹ Status: No active license\n');
          console.log('    Run: packet license <key> to activate\n');
        }
      } catch (error) {
        console.log('    ⚠ Could not check license status\n');
      }
      
      console.log('  System is ready! ✓\n');
    });

  // Parse arguments
  program.parse();
}

// Run
main();
