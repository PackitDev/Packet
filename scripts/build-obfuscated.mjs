#!/usr/bin/env node

/**
 * Packet SDK - Obfuscated Release Build
 *
 * Pipeline:
 *   Phase 1: pnpm -r build  → normal tsc build (correct .js + .d.ts)
 *   Phase 2: per package:
 *     a) tsup → bundle src into single minified .js (temp dir)
 *     b) javascript-obfuscator → obfuscate the bundle
 *     c) Replace all .js in dist/ with the single obfuscated index.js
 *     d) .d.ts files are untouched
 */

import { execSync } from 'child_process';
import {
  readFileSync, writeFileSync, existsSync,
  rmSync, mkdirSync, readdirSync, statSync,
} from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const TEMP = join(ROOT, '.build-tmp');

const packages = [
  'license',
  'db',
  'router',
  'core',
  'auth',
  'deploy',
  'git',
  'testing',
  'cli',
];

// ── Obfuscator settings ─────────────────────────────────────────────
// Strong protection tuned for Node.js ESM code.
const obfuscatorConfig = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.5,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.3,
  debugProtection: false,
  disableConsoleOutput: false,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: true,
  renameGlobals: false,
  renameProperties: false,
  selfDefending: false,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 5,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayCallsTransformThreshold: 0.5,
  stringArrayEncoding: ['base64'],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 2,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 4,
  stringArrayWrappersType: 'function',
  stringArrayThreshold: 0.75,
  transformObjectKeys: true,
  unicodeEscapeSequence: false,
};

function run(cmd, cwd) {
  try {
    return execSync(cmd, { cwd, stdio: 'pipe', encoding: 'utf-8' });
  } catch (e) {
    console.error(`\n  ✖ Command failed: ${cmd}`);
    console.error(e.stderr?.slice(0, 2000) || e.stdout?.slice(0, 2000) || e.message);
    process.exit(1);
  }
}

function banner(msg) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  ${msg}`);
  console.log('═'.repeat(60));
}

function step(msg) {
  process.stdout.write(`  ${msg} ... `);
}

function done(extra) {
  console.log(`✓${extra ? ' ' + extra : ''}`);
}

/** Recursively delete all .js files in a directory, keep .d.ts */
function removeJsKeepDts(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      removeJsKeepDts(full);
      // Remove now-empty subdirs
      try {
        if (readdirSync(full).length === 0) rmSync(full);
      } catch { /* ignore */ }
    } else if (entry.endsWith('.js') || entry.endsWith('.mjs') || entry.endsWith('.js.map')) {
      rmSync(full);
    }
  }
}

// ═══════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════

banner('Packet SDK — Obfuscated Release Build');
console.log(`  Packages: ${packages.length}`);
const startAll = Date.now();

// ── Phase 1: Sequential TypeScript build (respects dependency order) ─
banner('Phase 1: TypeScript compilation (tsc)');

// Build order: leaf deps first, then dependents.
// This avoids the cyclic-dependency issue with pnpm -r build.
for (const pkg of packages) {
  const pkgDir = join(ROOT, 'packages', pkg);
  const distDir = join(pkgDir, 'dist');

  step(`@packet/${pkg}`);

  // Clean stale incremental cache
  const buildInfo = join(pkgDir, 'tsconfig.tsbuildinfo');
  if (existsSync(buildInfo)) rmSync(buildInfo);
  if (existsSync(distDir)) rmSync(distDir, { recursive: true });

  run('npx tsc', pkgDir);
  done();
}

// ── Phase 2: Bundle + obfuscate each package ────────────────────
banner('Phase 2: Bundle + Obfuscate');

if (existsSync(TEMP)) rmSync(TEMP, { recursive: true });
mkdirSync(TEMP, { recursive: true });

const obfConfigPath = join(TEMP, 'obfuscator.json');
writeFileSync(obfConfigPath, JSON.stringify(obfuscatorConfig));

const results = [];

for (const pkg of packages) {
  const pkgDir = join(ROOT, 'packages', pkg);
  const distDir = join(pkgDir, 'dist');
  const tmpDir = join(TEMP, pkg);
  const startPkg = Date.now();

  console.log(`\n── @packet/${pkg} ──`);
  mkdirSync(tmpDir, { recursive: true });

  // 2a) Bundle with tsup to temp dir
  step('Bundling');
  const tsupCmd = [
    'npx tsup',
    '"src/index.ts"',
    '--format esm',
    `--outDir "${tmpDir}"`,
    '--minify',
    '--no-splitting',
    '--no-dts',
    '--target es2022',
    '--platform node',
  ].join(' ');
  run(tsupCmd, pkgDir);
  done();

  // Find bundled file
  let bundledFile = join(tmpDir, 'index.mjs');
  if (!existsSync(bundledFile)) bundledFile = join(tmpDir, 'index.js');
  if (!existsSync(bundledFile)) {
    console.error(`  ✖ No bundled file found in ${tmpDir}`);
    process.exit(1);
  }

  const minifiedSize = readFileSync(bundledFile).length;

  // 2b) Obfuscate
  step('Obfuscating');
  const obfOutput = join(tmpDir, 'index.obf.js');
  run(
    `npx javascript-obfuscator "${bundledFile}" --output "${obfOutput}" --config "${obfConfigPath}"`,
    pkgDir
  );
  done();

  // 2c) Replace .js files in dist/ with single obfuscated bundle
  step('Replacing dist JS');
  removeJsKeepDts(distDir);

  let obfContent = readFileSync(obfOutput, 'utf-8');

  // CLI gets a shebang
  if (pkg === 'cli' && !obfContent.startsWith('#!')) {
    obfContent = '#!/usr/bin/env node\n' + obfContent;
  }

  writeFileSync(join(distDir, 'index.js'), obfContent);
  done();

  // Stats
  const obfSize = Buffer.byteLength(obfContent, 'utf-8');
  const sizeKB = (obfSize / 1024).toFixed(1);
  const bloat = ((obfSize / minifiedSize) * 100).toFixed(0);
  const elapsed = ((Date.now() - startPkg) / 1000).toFixed(1);
  console.log(`  → ${sizeKB} KB  (${bloat}% of minified, ${elapsed}s)`);

  results.push({ pkg, minifiedSize, obfSize, elapsed });
}

// Cleanup
rmSync(TEMP, { recursive: true, force: true });

// ── Summary ─────────────────────────────────────────────────────
const totalElapsed = ((Date.now() - startAll) / 1000).toFixed(1);

banner(`Build complete in ${totalElapsed}s`);

console.log('\n  Package               Minified    Obfuscated');
console.log('  ' + '─'.repeat(50));
for (const r of results) {
  const name = `@packet/${r.pkg}`.padEnd(22);
  const min = `${(r.minifiedSize / 1024).toFixed(1)} KB`.padStart(9);
  const obf = `${(r.obfSize / 1024).toFixed(1)} KB`.padStart(11);
  console.log(`  ${name} ${min}  → ${obf}`);
}
const totalMin = results.reduce((s, r) => s + r.minifiedSize, 0);
const totalObf = results.reduce((s, r) => s + r.obfSize, 0);
console.log('  ' + '─'.repeat(50));
console.log(`  ${'TOTAL'.padEnd(22)} ${(totalMin / 1024).toFixed(1).padStart(8)} KB  → ${(totalObf / 1024).toFixed(1).padStart(10)} KB`);

console.log('\n  Protection layers:');
console.log('    ✓ Single-file bundles (no source structure visible)');
console.log('    ✓ esbuild minification (variables shortened)');
console.log('    ✓ Control flow flattening');
console.log('    ✓ Dead code injection');
console.log('    ✓ String array with Base64 encoding');
console.log('    ✓ String splitting');
console.log('    ✓ Hexadecimal identifier names');
console.log('    ✓ Object key transformation');
console.log('    ✓ Numbers-to-expressions conversion');
console.log('    ✓ Type declarations (.d.ts) preserved for consumers');
console.log('');
