#!/usr/bin/env node

/**
 * Package Standalone Executables for Distribution
 * 
 * Creates compressed archives for each platform:
 * - Windows: .zip
 * - macOS: .tar.gz
 * - Linux: .tar.gz
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, cpSync, mkdirSync, rmSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist', 'standalone');
const PACKAGES = join(ROOT, 'dist', 'packages');

function run(cmd, cwd = ROOT) {
  try {
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

banner('Packet SDK — Package Standalone Executables');

// Check if executables exist
if (!existsSync(DIST)) {
  console.error('\n  ✖ Standalone executables not found!');
  console.error('  → Run: pnpm build:standalone first\n');
  process.exit(1);
}

// Create packages directory
if (existsSync(PACKAGES)) rmSync(PACKAGES, { recursive: true });
mkdirSync(PACKAGES, { recursive: true });

const version = '1.0.0-beta.1';

// Package definitions
const packages = [
  {
    name: 'packet-windows-x64',
    files: ['packet-windows-x64.exe', 'install-windows.bat', 'README.md', 'QUICKSTART.md'],
    archive: `packet-windows-x64-v${version}.zip`,
    command: 'zip',
  },
  {
    name: 'packet-macos-x64',
    files: ['packet-macos-x64', 'install.sh', 'README.md', 'QUICKSTART.md'],
    archive: `packet-macos-x64-v${version}.tar.gz`,
    command: 'tar',
  },
  {
    name: 'packet-macos-arm64',
    files: ['packet-macos-arm64', 'install.sh', 'README.md', 'QUICKSTART.md'],
    archive: `packet-macos-arm64-v${version}.tar.gz`,
    command: 'tar',
  },
  {
    name: 'packet-linux-x64',
    files: ['packet-linux-x64', 'install.sh', 'README.md', 'QUICKSTART.md'],
    archive: `packet-linux-x64-v${version}.tar.gz`,
    command: 'tar',
  },
];

console.log('\n  Creating distribution packages...\n');

for (const pkg of packages) {
  const pkgDir = join(PACKAGES, pkg.name);
  mkdirSync(pkgDir, { recursive: true });
  
  // Copy files
  for (const file of pkg.files) {
    const src = join(DIST, file);
    if (existsSync(src)) {
      cpSync(src, join(pkgDir, file));
    }
  }
  
  // Create archive
  const archivePath = join(PACKAGES, pkg.archive);
  
  if (pkg.command === 'zip') {
    // Windows zip
    if (process.platform === 'win32') {
      run(`powershell Compress-Archive -Path "${pkg.name}\\*" -DestinationPath "${pkg.archive}" -Force`, PACKAGES);
    } else {
      run(`zip -r "${pkg.archive}" "${pkg.name}"`, PACKAGES);
    }
  } else {
    // tar.gz for Unix
    run(`tar -czf "${pkg.archive}" -C "${pkg.name}" .`, PACKAGES);
  }
  
  // Get size
  const size = (readFileSync(archivePath).length / 1024 / 1024).toFixed(1);
  console.log(`  ✓ ${pkg.archive.padEnd(45)} ${size.padStart(6)} MB`);
  
  // Clean up temp directory
  rmSync(pkgDir, { recursive: true });
}

// Create checksums
console.log('\n  → Generating checksums...\n');

const checksumFile = join(PACKAGES, 'SHA256SUMS.txt');
let checksums = '# Packet SDK v' + version + ' - SHA256 Checksums\n\n';

for (const pkg of packages) {
  const archivePath = join(PACKAGES, pkg.archive);
  
  if (existsSync(archivePath)) {
    let hash;
    
    if (process.platform === 'win32') {
      hash = run(`powershell "(Get-FileHash '${pkg.archive}' -Algorithm SHA256).Hash"`, PACKAGES, true).trim();
    } else {
      hash = run(`shasum -a 256 "${pkg.archive}" | cut -d' ' -f1`, PACKAGES, true).trim();
    }
    
    checksums += `${hash}  ${pkg.archive}\n`;
    console.log(`  ✓ ${pkg.archive}`);
  }
}

// Write checksums file
import { writeFileSync } from 'fs';
writeFileSync(checksumFile, checksums);

console.log('\n  ✓ SHA256SUMS.txt created');

// Create distribution info
const distInfo = `# Packet SDK v${version} - Distribution Packages

## Download Links

### Windows
- **packet-windows-x64-v${version}.zip** (${(readFileSync(join(PACKAGES, packages[0].archive)).length / 1024 / 1024).toFixed(1)} MB)
  - Includes: packet.exe, installer, documentation
  - Requires: Windows 10 or later (64-bit)

### macOS
- **packet-macos-x64-v${version}.tar.gz** (Intel Macs)
  - Requires: macOS 10.15 or later
  
- **packet-macos-arm64-v${version}.tar.gz** (Apple Silicon)
  - Requires: macOS 11.0 or later
  - Optimized for M1/M2/M3 chips

### Linux
- **packet-linux-x64-v${version}.tar.gz**
  - Requires: glibc 2.17 or later
  - Works on: Ubuntu 18.04+, Debian 10+, CentOS 7+, etc.

## Installation

### Windows
\`\`\`powershell
# Extract zip
Expand-Archive packet-windows-x64-v${version}.zip

# Run installer as Administrator
cd packet-windows-x64-v${version}
.\\install-windows.bat
\`\`\`

### macOS / Linux
\`\`\`bash
# Extract archive
tar -xzf packet-macos-arm64-v${version}.tar.gz
cd packet-macos-arm64-v${version}

# Run installer
chmod +x install.sh
./install.sh
\`\`\`

## Verification

Verify checksums before installation:

\`\`\`bash
# macOS/Linux
shasum -a 256 -c SHA256SUMS.txt

# Windows (PowerShell)
Get-FileHash packet-windows-x64-v${version}.zip -Algorithm SHA256
\`\`\`

## What's Included

Each package contains:
- ✅ Standalone executable (no Node.js required)
- ✅ Installation script
- ✅ Complete documentation
- ✅ Quick start guide

## Support

- Website: https://packetsdk.dev
- Docs: https://packetsdk.dev/docs
- Issues: https://github.com/packet/sdk/issues
- Email: support@packetsdk.dev

## License

Requires a valid Packet SDK license key.
Get yours at: https://packetsdk.dev/pricing
`;

writeFileSync(join(PACKAGES, 'DISTRIBUTION.md'), distInfo);

banner('✓ Packaging Complete');

console.log('\n  📦 Distribution packages created in: dist/packages/\n');
console.log('  Files:');
for (const pkg of packages) {
  console.log(`    • ${pkg.archive}`);
}
console.log('    • SHA256SUMS.txt');
console.log('    • DISTRIBUTION.md\n');

console.log('  Next steps:\n');
console.log('    1. Test packages on each platform');
console.log('    2. Upload to distribution server:');
console.log('       - AWS S3');
console.log('       - GitHub Releases');
console.log('       - CDN\n');
console.log('    3. Update website download links\n');
console.log('    4. Announce release\n');
