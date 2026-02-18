#!/usr/bin/env node

import { Command } from 'commander';
import { createCommand } from './commands/create.js';
import { devCommand } from './commands/dev.js';
import { buildCommand } from './commands/build.js';
import { licenseCommand } from './commands/license.js';
import { versionCommand } from './commands/version.js';
import { upgradeCommand } from './commands/upgrade.js';
import { featureCommand } from './commands/feature.js';
import { envCommand } from './commands/env.js';

const program = new Command();

program
  .name('packet')
  .description('Packet SDK - Full-stack TypeScript framework')
  .version('1.0.0-beta.1');

// Register commands
program.addCommand(createCommand());
program.addCommand(devCommand());
program.addCommand(buildCommand());
program.addCommand(licenseCommand());
program.addCommand(versionCommand());
program.addCommand(upgradeCommand());
program.addCommand(featureCommand());
program.addCommand(envCommand());

// Parse arguments
program.parse();
