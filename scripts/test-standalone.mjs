#!/usr/bin/env node

/**
 * Test Standalone Executables
 * 
 * Quick verification that standalone executables work correctly.
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist', 'standalone');

function run(cmd, silent = false) {
  try {
    return execSync(cmd, { 
      encoding: 'utf-8',
      stdio: silent ? 'pipe' : 'inherit'
    });
  } catch (e) {
    return null;
  }
}

function banner(msg) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`  ${msg}`);
  console.log('═'.repeat(70));
}

function test(name, fn) {
  process.stdout.write(`  ${name.padEnd(50)} `);
  try {
    const result = fn();
    if (result === false) {
      console.log('❌ FAIL');
      return false;
    }
    console.log('✅ PASS');
    return true;
  } catch (e) {
    console.log(`❌ ERROR: ${e.message}`);
    return false;
  }
}

banner('Packet SDK — Standalone Executable Tests');

// Check if executables exist
console.log('\n  Checking for executables...\n');

const executables = [
  { name: 'Windows', file: 'packet-windows-x64.exe' },
  { name: 'macOS Intel', file: 'packet-macos-x64' },
  { name: 'macOS ARM', file: 'packet-macos-arm64' },
  { name: 'Linux', file: 'packet-linux-x64' },
];

let allExist = true;

for (const { name, file } of executables) {
  const path = join(DIST, file);
  const exists = existsSync(path);
  
  console.log(`  ${name.padEnd(20)} ${file.padEnd(30)} ${exists ? '✅' : '❌'}`);
  
  if (!exists) allExist = false;
}

if (!allExist) {
  console.log('\n  ⚠ Some executables are missing!');
  console.log('  → Run: pnpm build:standalone\n');
  process.exit(1);
}

// Determine which executable to test based on platform
let testExecutable;
let executablePath;

if (process.platform === 'win32') {
  testExecutable = 'packet-windows-x64.exe';
} else if (process.platform === 'darwin') {
  testExecutable = process.arch === 'arm64' ? 'packet-macos-arm64' : 'packet-macos-x64';
} else {
  testExecutable = 'packet-linux-x64';
}

executablePath = join(DIST, testExecutable);

console.log(`\n  Testing: ${testExecutable}\n`);

// Make executable on Unix
if (process.platform !== 'win32') {
  run(`chmod +x "${executablePath}"`, true);
}

// Run tests
banner('Running Tests');

const results = [];

results.push(test('Executable exists', () => {
  return existsSync(executablePath);
}));

results.push(test('Executable is executable', () => {
  if (process.platform === 'win32') return true;
  const stat = require('fs').statSync(executablePath);
  return (stat.mode & 0o111) !== 0;
}));

results.push(test('--version flag works', () => {
  const output = run(`"${executablePath}" --version`, true);
  return output && output.includes('1.0.0');
}));

results.push(test('--help flag works', () => {
  const output = run(`"${executablePath}" --help`, true);
  return output && output.includes('Packet SDK');
}));

results.push(test('--info flag works', () => {
  const output = run(`"${executablePath}" --info`, true);
  return output && output.includes('Standalone');
}));

results.push(test('doctor command works', () => {
  const output = run(`"${executablePath}" doctor`, true);
  return output && output.includes('System Diagnostics');
}));

results.push(test('version command works', () => {
  const output = run(`"${executablePath}" version`, true);
  return output !== null;
}));

// Check installation scripts
banner('Checking Installation Scripts');

results.push(test('Windows installer exists', () => {
  return existsSync(join(DIST, 'install-windows.bat'));
}));

results.push(test('Unix installer exists', () => {
  return existsSync(join(DIST, 'install.sh'));
}));

results.push(test('Unix installer is executable', () => {
  if (process.platform === 'win32') return true;
  const path = join(DIST, 'install.sh');
  const stat = require('fs').statSync(path);
  return (stat.mode & 0o111) !== 0;
}));

// Check documentation
banner('Checking Documentation');

results.push(test('README.md exists', () => {
  return existsSync(join(DIST, 'README.md'));
}));

results.push(test('QUICKSTART.md exists', () => {
  return existsSync(join(DIST, 'QUICKSTART.md'));
}));

// Summary
banner('Test Summary');

const passed = results.filter(r => r).length;
const total = results.length;
const percentage = ((passed / total) * 100).toFixed(0);

console.log(`\n  Tests Passed: ${passed}/${total} (${percentage}%)\n`);

if (passed === total) {
  console.log('  ✅ All tests passed! Standalone executables are ready.\n');
  console.log('  Next steps:');
  console.log('    1. Test on different machines');
  console.log('    2. Run: pnpm package:standalone');
  console.log('    3. Create GitHub release\n');
  process.exit(0);
} else {
  console.log('  ❌ Some tests failed. Please fix the issues above.\n');
  process.exit(1);
}
