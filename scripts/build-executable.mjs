#!/usr/bin/env node

/**
 * Packet SDK - Standalone Executable Builder
 * 
 * Creates self-contained executables that can be dropped into project folders.
 * 
 * Architecture:
 *   1. Bundle all SDK packages into single obfuscated file
 *   2. Use pkg to create Node.js + bundle executable
 *   3. Executable can run from any directory
 *   4. Includes auto-update mechanism
 * 
 * Output:
 *   dist/executables/
 *     ├── packet-win.exe      (Windows)
 *     ├── packet-macos        (macOS Intel)
 *     ├── packet-macos-arm64  (macOS Apple Silicon)
 *     └── packet-linux        (Linux)
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, rmSync, mkdirSync, cpSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist', 'executables');
const TEMP = join(ROOT, '.build-executable-tmp');

// Targets for pkg
const PKG_TARGETS = [
  'node18-win-x64',      // Windows
  'node18-macos-x64',    // macOS Intel
  'node18-macos-arm64',  // macOS Apple Silicon
  'node18-linux-x64',    // Linux
];

function run(cmd, cwd = ROOT) {
  try {
    console.log(`  $ ${cmd}`);
    return execSync(cmd, { cwd, stdio: 'inherit', encoding: 'utf-8' });
  } catch (e) {
    console.error(`\n  ✖ Command failed: ${cmd}`);
    console.error(e.message);
    process.exit(1);
  }
}

function banner(msg) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`  ${msg}`);
  console.log('═'.repeat(70));
}

function step(msg) {
  console.log(`\n  → ${msg}`);
}

// ═══════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════

banner('Packet SDK — Standalone Executable Builder');

const startTime = Date.now();

// Clean previous builds
step('Cleaning previous builds');
if (existsSync(DIST)) rmSync(DIST, { recursive: true });
if (existsSync(TEMP)) rmSync(TEMP, { recursive: true });
mkdirSync(DIST, { recursive: true });
mkdirSync(TEMP, { recursive: true });

// Step 1: Build obfuscated packages
banner('Step 1: Building obfuscated packages');
run('node scripts/build-obfuscated.mjs');

// Step 2: Create unified CLI bundle
banner('Step 2: Creating unified CLI bundle');

step('Bundling CLI with all dependencies');

const cliDir = join(ROOT, 'packages', 'cli');
const bundleOutput = join(TEMP, 'packet-bundle.js');

// Use tsup to create a single bundle with all dependencies
const tsupCmd = [
  'npx tsup',
  'src/index.ts',
  '--format esm',
  `--outDir "${TEMP}"`,
  '--minify',
  '--no-splitting',
  '--no-dts',
  '--target es2022',
  '--platform node',
  '--bundle',
  '--external none',  // Bundle everything
  '--out-extension .js',
].join(' ');

run(tsupCmd, cliDir);

// Rename output
const bundleFile = join(TEMP, 'index.js');
if (existsSync(bundleFile)) {
  let content = readFileSync(bundleFile, 'utf-8');
  
  // Add shebang
  if (!content.startsWith('#!')) {
    content = '#!/usr/bin/env node\n' + content;
  }
  
  writeFileSync(bundleOutput, content);
  console.log(`  ✓ Bundle created: ${(Buffer.byteLength(content) / 1024).toFixed(1)} KB`);
}

// Step 3: Create package.json for pkg
step('Creating package.json for pkg');

const pkgJson = {
  name: 'packet-executable',
  version: '1.0.0-beta.1',
  bin: 'packet-bundle.js',
  pkg: {
    assets: [
      'node_modules/**/*',
    ],
    targets: PKG_TARGETS,
    outputPath: DIST,
  },
};

writeFileSync(join(TEMP, 'package.json'), JSON.stringify(pkgJson, null, 2));

// Step 4: Install pkg if not available
banner('Step 3: Installing pkg');
run('npm install -g pkg');

// Step 5: Build executables for all platforms
banner('Step 4: Building executables for all platforms');

step('Building for all targets (this may take a few minutes)...');

const pkgCmd = [
  'pkg',
  'packet-bundle.js',
  '--targets', PKG_TARGETS.join(','),
  '--output', join(DIST, 'packet'),
  '--compress', 'Brotli',
].join(' ');

run(pkgCmd, TEMP);

// Step 6: Rename outputs to friendly names
banner('Step 5: Renaming executables');

const renames = [
  { from: 'packet-win-x64.exe', to: 'packet-win.exe' },
  { from: 'packet-macos-x64', to: 'packet-macos' },
  { from: 'packet-macos-arm64', to: 'packet-macos-arm64' },
  { from: 'packet-linux-x64', to: 'packet-linux' },
];

for (const { from, to } of renames) {
  const fromPath = join(DIST, from);
  const toPath = join(DIST, to);
  
  if (existsSync(fromPath)) {
    cpSync(fromPath, toPath);
    rmSync(fromPath);
    
    const size = (readFileSync(toPath).length / 1024 / 1024).toFixed(1);
    console.log(`  ✓ ${to} (${size} MB)`);
  }
}

// Step 7: Create README
step('Creating distribution README');

const readme = `# Packet SDK - Standalone Executables

## Installation

Download the appropriate executable for your platform:

- **Windows**: \`packet-win.exe\`
- **macOS (Intel)**: \`packet-macos\`
- **macOS (Apple Silicon)**: \`packet-macos-arm64\`
- **Linux**: \`packet-linux\`

## Usage

### Option 1: Global Installation

Place the executable in your PATH:

\`\`\`bash
# Windows (PowerShell as Admin)
Move-Item packet-win.exe C:\\Windows\\packet.exe

# macOS/Linux
sudo mv packet-macos /usr/local/bin/packet
sudo chmod +x /usr/local/bin/packet
\`\`\`

Then use anywhere:
\`\`\`bash
packet create my-app
cd my-app
packet dev
\`\`\`

### Option 2: Project-Local Installation

Drop the executable in your project folder:

\`\`\`bash
# Windows
.\\packet-win.exe dev

# macOS/Linux
chmod +x packet-macos
./packet-macos dev
\`\`\`

## Available Commands

- \`packet create <name>\` - Create new project
- \`packet dev\` - Start development server
- \`packet build\` - Build for production
- \`packet license <key>\` - Activate license
- \`packet version\` - Check version
- \`packet upgrade\` - View upgrade options

## Features

✓ No Node.js installation required
✓ No npm dependencies needed
✓ Works offline (after license activation)
✓ Self-contained (~40-50MB per platform)
✓ Can be placed anywhere

## License

Requires a valid Packet SDK license key.
Get yours at: https://packetsdk.dev/pricing

## Support

- Documentation: https://packetsdk.dev/docs
- Issues: https://github.com/packet/sdk/issues
- Email: support@packetsdk.dev
`;

writeFileSync(join(DIST, 'README.md'), readme);

// Cleanup
step('Cleaning up temporary files');
rmSync(TEMP, { recursive: true, force: true });

// Summary
const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

banner(`✓ Build Complete in ${elapsed}s`);

console.log('\n  Executables created in: dist/executables/\n');
console.log('  Next steps:');
console.log('    1. Test executables on each platform');
console.log('    2. Sign executables (Windows: signtool, macOS: codesign)');
console.log('    3. Upload to distribution server');
console.log('    4. Update download links on website\n');
