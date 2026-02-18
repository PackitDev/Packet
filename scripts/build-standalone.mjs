#!/usr/bin/env node

/**
 * Packet SDK - Standalone Executable Builder (Simplified)
 * 
 * Uses pkg to create standalone executables with embedded Node.js runtime.
 * These executables can be dropped into any project folder and work independently.
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, rmSync, mkdirSync, cpSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist', 'standalone');
const CLI_DIR = join(ROOT, 'packages', 'cli');

function run(cmd, cwd = ROOT, silent = false) {
  try {
    return execSync(cmd, { 
      cwd, 
      stdio: silent ? 'pipe' : 'inherit', 
      encoding: 'utf-8' 
    });
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

console.log('\n');
banner('Packet SDK — Standalone Executable Builder');

const startTime = Date.now();

// Step 1: Clean and prepare
console.log('\n  → Cleaning previous builds...');
if (existsSync(DIST)) rmSync(DIST, { recursive: true });
mkdirSync(DIST, { recursive: true });

// Step 2: Build all packages normally first
banner('Step 1: Building SDK packages');
console.log('\n  → Building all packages with TypeScript...\n');
run('pnpm -r build');

// Step 3: Check if pkg is installed
banner('Step 2: Checking pkg installation');
try {
  run('pkg --version', ROOT, true);
  console.log('\n  ✓ pkg is installed');
} catch {
  console.log('\n  → Installing pkg globally...');
  run('npm install -g pkg');
}

// Step 4: Create pkg configuration
banner('Step 3: Creating executable configuration');

const pkgConfig = {
  name: 'packet',
  version: '1.0.0-beta.1',
  bin: './dist/index.js',
  pkg: {
    scripts: [
      'dist/**/*.js',
    ],
    assets: [
      'dist/**/*',
      'node_modules/**/*',
    ],
    targets: [
      'node18-win-x64',
      'node18-macos-x64', 
      'node18-macos-arm64',
      'node18-linux-x64',
    ],
    outputPath: DIST,
  },
};

// Read existing package.json and merge
const cliPkgPath = join(CLI_DIR, 'package.json');
const cliPkg = JSON.parse(readFileSync(cliPkgPath, 'utf-8'));

// Create temporary package.json with pkg config
const tempPkg = {
  ...cliPkg,
  pkg: pkgConfig.pkg,
};

const tempPkgPath = join(CLI_DIR, 'package.json.backup');
cpSync(cliPkgPath, tempPkgPath);
writeFileSync(cliPkgPath, JSON.stringify(tempPkg, null, 2));

console.log('\n  ✓ Configuration created');

// Step 5: Build executables
banner('Step 4: Building executables (this may take 3-5 minutes)');

console.log('\n  → Building for Windows, macOS, and Linux...\n');

const pkgCmd = [
  'pkg',
  '.',
  '--targets', 'node18-win-x64,node18-macos-x64,node18-macos-arm64,node18-linux-x64',
  '--output', join(DIST, 'packet'),
  '--compress', 'Brotli',
  '--no-bytecode',
  '--public',
].join(' ');

try {
  run(pkgCmd, CLI_DIR);
} finally {
  // Restore original package.json
  cpSync(tempPkgPath, cliPkgPath);
  rmSync(tempPkgPath);
}

// Step 6: Rename and organize outputs
banner('Step 5: Organizing executables');

const outputs = [
  { 
    from: 'packet-win-x64.exe', 
    to: 'packet-windows-x64.exe',
    platform: 'Windows (x64)'
  },
  { 
    from: 'packet-macos-x64', 
    to: 'packet-macos-x64',
    platform: 'macOS (Intel)'
  },
  { 
    from: 'packet-macos-arm64', 
    to: 'packet-macos-arm64',
    platform: 'macOS (Apple Silicon)'
  },
  { 
    from: 'packet-linux-x64', 
    to: 'packet-linux-x64',
    platform: 'Linux (x64)'
  },
];

console.log('\n');

for (const { from, to, platform } of outputs) {
  const fromPath = join(DIST, from);
  const toPath = join(DIST, to);
  
  if (existsSync(fromPath)) {
    if (from !== to) {
      cpSync(fromPath, toPath);
      rmSync(fromPath);
    }
    
    const size = (readFileSync(toPath).length / 1024 / 1024).toFixed(1);
    console.log(`  ✓ ${to.padEnd(30)} ${size.padStart(6)} MB  (${platform})`);
  } else {
    console.log(`  ⚠ ${from} not found`);
  }
}

// Step 7: Create installation scripts
banner('Step 6: Creating installation scripts');

// Windows installer script
const windowsInstaller = `@echo off
REM Packet SDK - Windows Installer
REM This script installs packet.exe to your system PATH

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║         Packet SDK - Windows Installation Script          ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check for admin privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo   ⚠ This script requires Administrator privileges.
    echo   → Right-click and select "Run as Administrator"
    echo.
    pause
    exit /b 1
)

echo   → Installing packet.exe to C:\\Windows\\System32\\
echo.

copy /Y packet-windows-x64.exe C:\\Windows\\System32\\packet.exe

if %errorLevel% equ 0 (
    echo   ✓ Installation successful!
    echo.
    echo   You can now use 'packet' from any directory:
    echo.
    echo     packet create my-app
    echo     packet dev
    echo     packet build
    echo.
) else (
    echo   ✖ Installation failed
    echo.
)

pause
`;

writeFileSync(join(DIST, 'install-windows.bat'), windowsInstaller);

// Unix installer script
const unixInstaller = `#!/bin/bash

# Packet SDK - Unix Installer (macOS/Linux)
# This script installs packet to /usr/local/bin

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║          Packet SDK - Installation Script                 ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Detect platform
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if [[ $(uname -m) == "arm64" ]]; then
        BINARY="packet-macos-arm64"
        PLATFORM="macOS (Apple Silicon)"
    else
        BINARY="packet-macos-x64"
        PLATFORM="macOS (Intel)"
    fi
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    BINARY="packet-linux-x64"
    PLATFORM="Linux"
else
    echo "  ✖ Unsupported platform: $OSTYPE"
    exit 1
fi

echo "  Platform: $PLATFORM"
echo "  Binary:   $BINARY"
echo ""

# Check if binary exists
if [ ! -f "$BINARY" ]; then
    echo "  ✖ Binary not found: $BINARY"
    echo "  → Make sure you're running this from the dist/standalone directory"
    exit 1
fi

# Install to /usr/local/bin
echo "  → Installing to /usr/local/bin/packet"
echo "  → This requires sudo privileges"
echo ""

sudo cp "$BINARY" /usr/local/bin/packet
sudo chmod +x /usr/local/bin/packet

if [ $? -eq 0 ]; then
    echo ""
    echo "  ✓ Installation successful!"
    echo ""
    echo "  You can now use 'packet' from any directory:"
    echo ""
    echo "    packet create my-app"
    echo "    packet dev"
    echo "    packet build"
    echo ""
else
    echo ""
    echo "  ✖ Installation failed"
    echo ""
    exit 1
fi
`;

writeFileSync(join(DIST, 'install.sh'), unixInstaller);

// Make install script executable
try {
  run('chmod +x install.sh', DIST, true);
} catch {
  // Windows - ignore
}

console.log('\n  ✓ install-windows.bat');
console.log('  ✓ install.sh');

// Step 8: Create README
console.log('\n  → Creating README...');

const readme = `# Packet SDK - Standalone Executables

Self-contained executables with embedded Node.js runtime.
No installation required - just download and run!

## 📦 What's Included

- **packet-windows-x64.exe** - Windows (64-bit)
- **packet-macos-x64** - macOS Intel (64-bit)
- **packet-macos-arm64** - macOS Apple Silicon (M1/M2/M3)
- **packet-linux-x64** - Linux (64-bit)

Each executable is ~40-50MB and includes:
- Complete Packet SDK
- Node.js runtime
- All dependencies
- License validation system

## 🚀 Quick Start

### Option 1: System-Wide Installation (Recommended)

**Windows:**
\`\`\`powershell
# Run as Administrator
.\\install-windows.bat
\`\`\`

**macOS/Linux:**
\`\`\`bash
chmod +x install.sh
./install.sh
\`\`\`

Then use from anywhere:
\`\`\`bash
packet create my-app
cd my-app
packet dev
\`\`\`

### Option 2: Project-Local Usage

Drop the executable in your project folder:

**Windows:**
\`\`\`powershell
.\\packet-windows-x64.exe create my-app
cd my-app
..\\packet-windows-x64.exe dev
\`\`\`

**macOS/Linux:**
\`\`\`bash
chmod +x packet-macos-arm64  # or packet-macos-x64 or packet-linux-x64
./packet-macos-arm64 create my-app
cd my-app
../packet-macos-arm64 dev
\`\`\`

### Option 3: Add to PATH Manually

**Windows:**
1. Copy \`packet-windows-x64.exe\` to \`C:\\Windows\\System32\\packet.exe\`
2. Or add the directory to your PATH

**macOS/Linux:**
\`\`\`bash
sudo cp packet-macos-arm64 /usr/local/bin/packet  # Choose your platform
sudo chmod +x /usr/local/bin/packet
\`\`\`

## 📋 Available Commands

\`\`\`bash
packet create <name>          # Create new project
packet dev                    # Start development server
packet build                  # Build for production
packet license <key>          # Activate license
packet license --status       # Check license status
packet version                # Show version
packet upgrade                # View upgrade options
packet feature <name>         # Create feature branch
packet env <environment>      # Switch environment
packet doctor                 # System diagnostics
packet --info                 # Show executable info
\`\`\`

## 🔑 License Activation

Before using Packet, activate your license:

\`\`\`bash
packet license YOUR-LICENSE-KEY
\`\`\`

Get your license at: https://packetsdk.dev/pricing

## ✨ Features

- ✅ **No Node.js Required** - Fully self-contained
- ✅ **No npm Installation** - Just download and run
- ✅ **Works Offline** - After initial license activation
- ✅ **Portable** - Copy to USB drive, cloud storage, etc.
- ✅ **Fast Startup** - Optimized for quick execution
- ✅ **Secure** - Hardware-locked licensing

## 🔧 Troubleshooting

### Windows: "Windows protected your PC"

This is normal for unsigned executables:
1. Click "More info"
2. Click "Run anyway"

To avoid this, the executable needs to be code-signed (coming soon).

### macOS: "Cannot be opened because the developer cannot be verified"

\`\`\`bash
sudo xattr -r -d com.apple.quarantine packet-macos-arm64
\`\`\`

Or: System Preferences → Security & Privacy → Allow

### Linux: Permission denied

\`\`\`bash
chmod +x packet-linux-x64
\`\`\`

### Check System Status

\`\`\`bash
packet doctor
\`\`\`

This will show:
- Executable version and platform
- Project detection status
- License status
- Environment information

## 📦 File Sizes

| Platform | Size | Compressed |
|----------|------|------------|
| Windows  | ~45 MB | ~15 MB (zip) |
| macOS Intel | ~45 MB | ~15 MB (zip) |
| macOS ARM | ~45 MB | ~15 MB (zip) |
| Linux | ~45 MB | ~15 MB (tar.gz) |

## 🔄 Updates

To update to a new version:

1. Download the latest executable
2. Replace the old one
3. Done!

Or check for updates:
\`\`\`bash
packet upgrade
\`\`\`

## 📚 Documentation

- Website: https://packetsdk.dev
- Docs: https://packetsdk.dev/docs
- GitHub: https://github.com/packet/sdk
- Support: support@packetsdk.dev

## 🏗️ Build Information

- Built with: pkg (Node.js binary compiler)
- Node.js: v18 LTS
- Compression: Brotli
- Build date: ${new Date().toISOString().split('T')[0]}
- Version: 1.0.0-beta.1

## 📄 License

Proprietary - Licensed Software
© 2026 Packet SDK. All rights reserved.

Requires a valid license key to use.
`;

writeFileSync(join(DIST, 'README.md'), readme);
console.log('  ✓ README.md');

// Step 9: Create quick start guide
const quickStart = `# Quick Start Guide

## 1. Choose Your Platform

- Windows: packet-windows-x64.exe
- macOS Intel: packet-macos-x64
- macOS Apple Silicon: packet-macos-arm64
- Linux: packet-linux-x64

## 2. Install

### Easy Way (Recommended):
- Windows: Run install-windows.bat as Administrator
- macOS/Linux: Run ./install.sh

### Manual Way:
- Windows: Copy to C:\\Windows\\System32\\packet.exe
- macOS/Linux: Copy to /usr/local/bin/packet

## 3. Activate License

\`\`\`bash
packet license YOUR-LICENSE-KEY
\`\`\`

## 4. Create Your First App

\`\`\`bash
packet create my-app
cd my-app
packet dev
\`\`\`

## 5. Start Building!

Your app is now running at http://localhost:3000

Edit files in:
- routes/ - API endpoints
- src/ - Application code

That's it! 🎉

For more help: packet --help
`;

writeFileSync(join(DIST, 'QUICKSTART.md'), quickStart);
console.log('  ✓ QUICKSTART.md');

// Final summary
const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

banner(`✓ Build Complete in ${elapsed}s`);

console.log('\n  📦 Standalone executables created in: dist/standalone/\n');
console.log('  Files:');
console.log('    • packet-windows-x64.exe');
console.log('    • packet-macos-x64');
console.log('    • packet-macos-arm64');
console.log('    • packet-linux-x64');
console.log('    • install-windows.bat');
console.log('    • install.sh');
console.log('    • README.md');
console.log('    • QUICKSTART.md\n');

console.log('  Next steps:\n');
console.log('    1. Test on each platform:');
console.log('       ./dist/standalone/packet-windows-x64.exe --info');
console.log('       ./dist/standalone/packet-macos-arm64 --info\n');
console.log('    2. Code sign executables (optional but recommended):');
console.log('       Windows: signtool sign /f cert.pfx packet-windows-x64.exe');
console.log('       macOS: codesign --sign "Developer ID" packet-macos-arm64\n');
console.log('    3. Create distribution packages:');
console.log('       zip packet-windows.zip packet-windows-x64.exe install-windows.bat');
console.log('       tar -czf packet-macos.tar.gz packet-macos-* install.sh\n');
console.log('    4. Upload to distribution server\n');
console.log('    5. Update website download links\n');
