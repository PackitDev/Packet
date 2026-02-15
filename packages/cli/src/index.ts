#!/usr/bin/env node

import { Command } from 'commander';
import { createCommand } from './commands/create.js';
import { devCommand } from './commands/dev.js';
import { buildCommand } from './commands/build.js';
import { licenseCommand } from './commands/license.js';
import { versionCommand } from './commands/version.js';
import { upgradeCommand } from './commands/upgrade.js';

const program = new Command();

program
  .name('effec-t')
  .description('Effec-t SDK - Full-stack TypeScript framework')
  .version('1.0.0-beta.1');

// Register commands
program.addCommand(createCommand());
program.addCommand(devCommand());
program.addCommand(buildCommand());
program.addCommand(licenseCommand());
program.addCommand(versionCommand());
program.addCommand(upgradeCommand());

// Parse arguments
program.parse();
