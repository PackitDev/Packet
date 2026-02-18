# Standalone Executables Guide

## Overview

Packet SDK can be distributed as **standalone executables** that include the Node.js runtime and all dependencies. Users can download a single file and start using Packet without installing Node.js or npm.

## Architecture

### Hybrid Approach

We use a **hybrid architecture** that combines:

1. **Node.js Runtime** - Embedded using `pkg`
2. **Bundled Code** - All SDK packages in a single obfuscated file
3. **Self-Contained** - No external dependencies required
4. **Portable** - Can be placed anywhere on the filesystem

### Benefits

✅ **No Installation Required** - Just download and run
✅ **No Node.js Needed** - Runtime is embedded
✅ **No npm Dependencies** - Everything is bundled
✅ **Works Offline** - After initial license activation
✅ **Portable** - Copy to USB, cloud storage, etc.
✅ **Fast Startup** - Optimized for quick execution
✅ **Secure** - Obfuscated code + hardware-locked licensing

### File Sizes

| Platform | Executable Size | Compressed |
|----------|----------------|------------|
| Windows x64 | ~45 MB | ~15 MB (zip) |
| macOS Intel | ~45 MB | ~15 MB (tar.gz) |
| macOS ARM64 | ~45 MB | ~15 MB (tar.gz) |
| Linux x64 | ~45 MB | ~15 MB (tar.gz) |

## Building Standalone Executables

### Prerequisites

```bash
# Install dependencies
pnpm install

# Install pkg globally (or it will be installed automatically)
npm install -g pkg
```

### Build Process

#### Step 1: Build Standalone Executables

```bash
pnpm build:standalone
```

This will:
1. Build all SDK packages with TypeScript
2. Check/install `pkg` if needed
3. Create executables for all platforms (Windows, macOS, Linux)
4. Generate installation scripts
5. Create documentation

**Output:** `dist/standalone/`
- `packet-windows-x64.exe`
- `packet-macos-x64`
- `packet-macos-arm64`
- `packet-linux-x64`
- `install-windows.bat`
- `install.sh`
- `README.md`
- `QUICKSTART.md`

**Time:** ~3-5 minutes

#### Step 2: Package for Distribution

```bash
pnpm package:standalone
```

This will:
1. Create compressed archives for each platform
2. Generate SHA256 checksums
3. Create distribution documentation

**Output:** `dist/packages/`
- `packet-windows-x64-v1.0.0-beta.1.zip`
- `packet-macos-x64-v1.0.0-beta.1.tar.gz`
- `packet-macos-arm64-v1.0.0-beta.1.tar.gz`
- `packet-linux-x64-v1.0.0-beta.1.tar.gz`
- `SHA256SUMS.txt`
- `DISTRIBUTION.md`

#### Step 3: Build Everything (One Command)

```bash
pnpm dist
```

Runs both `build:standalone` and `package:standalone`.

## Usage Scenarios

### Scenario 1: System-Wide Installation

**Best for:** Users who want to use Packet across multiple projects

**Windows:**
```powershell
# Extract zip
Expand-Archive packet-windows-x64-v1.0.0-beta.1.zip

# Run installer as Administrator
cd packet-windows-x64-v1.0.0-beta.1
.\install-windows.bat
```

**macOS/Linux:**
```bash
# Extract archive
tar -xzf packet-macos-arm64-v1.0.0-beta.1.tar.gz

# Run installer
chmod +x install.sh
./install.sh
```

Then use from anywhere:
```bash
packet create my-app
cd my-app
packet dev
```

### Scenario 2: Project-Local Executable

**Best for:** Teams who want version control over the Packet version

```bash
# Place executable in project root
my-project/
  ├── packet.exe          # Windows
  ├── packet              # macOS/Linux
  ├── src/
  ├── routes/
  └── package.json

# Use it
./packet.exe dev         # Windows
./packet dev             # macOS/Linux
```

**Benefits:**
- Each project can have its own Packet version
- No global installation conflicts
- Easy to commit to git (if desired)
- Team members get the same version

### Scenario 3: Portable Development Environment

**Best for:** Developers working on multiple machines

```bash
# Copy to USB drive or cloud storage
USB-Drive/
  ├── packet-windows.exe
  ├── packet-macos
  ├── my-projects/
  │   ├── project-1/
  │   └── project-2/
  └── README.txt

# Use on any machine
cd my-projects/project-1
../../packet-windows.exe dev
```

### Scenario 4: CI/CD Pipeline

**Best for:** Automated builds and deployments

```yaml
# .github/workflows/build.yml
- name: Download Packet
  run: |
    curl -L https://packetsdk.dev/download/packet-linux-x64 -o packet
    chmod +x packet

- name: Build
  run: ./packet build

- name: Deploy
  run: ./packet deploy
```

## Distribution

### Code Signing (Recommended)

#### Windows

```powershell
# Using signtool (requires code signing certificate)
signtool sign /f certificate.pfx /p password /t http://timestamp.digicert.com packet-windows-x64.exe
```

**Benefits:**
- Removes "Windows protected your PC" warning
- Builds trust with users
- Required for enterprise distribution

**Cost:** ~$100-500/year for code signing certificate

#### macOS

```bash
# Sign with Developer ID
codesign --sign "Developer ID Application: Your Name (TEAM_ID)" packet-macos-arm64

# Notarize (required for macOS 10.15+)
xcrun notarytool submit packet-macos-arm64.zip --apple-id your@email.com --password app-specific-password --team-id TEAM_ID

# Staple notarization
xcrun stapler staple packet-macos-arm64
```

**Benefits:**
- Removes "cannot be verified" warning
- Required for distribution outside App Store
- Builds trust with users

**Cost:** $99/year for Apple Developer Program

### Upload to Distribution Server

#### Option 1: GitHub Releases

```bash
# Create release
gh release create v1.0.0-beta.1 \
  dist/packages/*.zip \
  dist/packages/*.tar.gz \
  dist/packages/SHA256SUMS.txt \
  --title "Packet SDK v1.0.0-beta.1" \
  --notes "Release notes here"
```

#### Option 2: AWS S3 + CloudFront

```bash
# Upload to S3
aws s3 sync dist/packages/ s3://downloads.packetsdk.dev/v1.0.0-beta.1/ --acl public-read

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id DIST_ID --paths "/v1.0.0-beta.1/*"
```

#### Option 3: Self-Hosted Server

```bash
# Upload via SCP
scp dist/packages/* user@server.com:/var/www/downloads/

# Or use rsync
rsync -avz dist/packages/ user@server.com:/var/www/downloads/v1.0.0-beta.1/
```

### Update Website Download Links

```typescript
// website/src/config/downloads.ts
export const downloads = {
  version: '1.0.0-beta.1',
  windows: 'https://packetsdk.dev/download/packet-windows-x64-v1.0.0-beta.1.zip',
  macosIntel: 'https://packetsdk.dev/download/packet-macos-x64-v1.0.0-beta.1.tar.gz',
  macosArm: 'https://packetsdk.dev/download/packet-macos-arm64-v1.0.0-beta.1.tar.gz',
  linux: 'https://packetsdk.dev/download/packet-linux-x64-v1.0.0-beta.1.tar.gz',
};
```

## Testing

### Test on Each Platform

```bash
# Windows
.\packet-windows-x64.exe --info
.\packet-windows-x64.exe doctor
.\packet-windows-x64.exe create test-app

# macOS
./packet-macos-arm64 --info
./packet-macos-arm64 doctor
./packet-macos-arm64 create test-app

# Linux
./packet-linux-x64 --info
./packet-linux-x64 doctor
./packet-linux-x64 create test-app
```

### Verify Checksums

```bash
# macOS/Linux
shasum -a 256 -c SHA256SUMS.txt

# Windows (PowerShell)
Get-FileHash packet-windows-x64-v1.0.0-beta.1.zip -Algorithm SHA256
```

### Test Installation Scripts

```bash
# Windows (as Administrator)
.\install-windows.bat

# macOS/Linux
./install.sh
```

## Troubleshooting

### Windows: "Windows protected your PC"

**Cause:** Executable is not code-signed

**Solutions:**
1. Click "More info" → "Run anyway"
2. Code sign the executable (recommended)
3. Add to Windows Defender exclusions

### macOS: "Cannot be opened because the developer cannot be verified"

**Cause:** Executable is not notarized

**Solutions:**
```bash
# Remove quarantine attribute
sudo xattr -r -d com.apple.quarantine packet-macos-arm64

# Or: System Preferences → Security & Privacy → Allow
```

### Linux: "Permission denied"

**Cause:** Executable doesn't have execute permission

**Solution:**
```bash
chmod +x packet-linux-x64
```

### "pkg: Cannot find module"

**Cause:** Missing dependencies in bundle

**Solution:**
1. Check `pkg.assets` in package.json
2. Rebuild with `pnpm build:standalone`

### Large File Size

**Cause:** Node.js runtime is ~40MB

**Solutions:**
- This is normal for standalone executables
- Compression reduces download size to ~15MB
- Consider offering npm installation as alternative

## Advanced Configuration

### Custom Build Targets

Edit `scripts/build-standalone.mjs`:

```javascript
const pkgConfig = {
  pkg: {
    targets: [
      'node18-win-x64',
      'node18-win-arm64',      // Add Windows ARM
      'node18-macos-x64',
      'node18-macos-arm64',
      'node18-linux-x64',
      'node18-linux-arm64',    // Add Linux ARM (Raspberry Pi)
      'node18-alpine-x64',     // Add Alpine Linux
    ],
  },
};
```

### Custom Compression

```javascript
const pkgCmd = [
  'pkg',
  '.',
  '--compress', 'Brotli',  // or 'GZip' or 'None'
  // ...
];
```

### Include Additional Assets

```javascript
const pkgConfig = {
  pkg: {
    assets: [
      'dist/**/*',
      'node_modules/**/*',
      'templates/**/*',        // Add templates
      'config/**/*',           // Add config files
    ],
  },
};
```

## Comparison: npm vs Standalone

| Feature | npm Installation | Standalone Executable |
|---------|-----------------|----------------------|
| Installation | `npm install -g @packet/cli` | Download + run |
| Node.js Required | Yes (18+) | No (embedded) |
| npm Required | Yes | No |
| File Size | ~5 MB | ~45 MB |
| Download Size | ~2 MB | ~15 MB (compressed) |
| Updates | `npm update -g` | Download new version |
| Offline Usage | After install | After license activation |
| CI/CD | Easy | Very easy |
| Version Control | package.json | Commit executable |
| Startup Time | Fast | Very fast |
| Platform Support | All npm platforms | Windows, macOS, Linux |

## Best Practices

### For Users

1. **Verify checksums** before installation
2. **Use system-wide installation** for convenience
3. **Keep executables updated** for security
4. **Use project-local** for version control

### For Distributors

1. **Code sign executables** for trust
2. **Provide checksums** for verification
3. **Host on CDN** for fast downloads
4. **Version URLs** for stability
5. **Keep old versions** available

### For Developers

1. **Test on all platforms** before release
2. **Document changes** in release notes
3. **Update website** download links
4. **Announce releases** to users
5. **Monitor download stats**

## Future Improvements

### Planned Features

- [ ] **Auto-update mechanism** - Self-updating executables
- [ ] **Delta updates** - Download only changes
- [ ] **Plugin system** - Extend functionality
- [ ] **Telemetry** - Usage analytics (opt-in)
- [ ] **Crash reporting** - Automatic error reports

### Potential Optimizations

- [ ] **Smaller runtime** - Use Bun or Deno
- [ ] **Lazy loading** - Load modules on demand
- [ ] **Tree shaking** - Remove unused code
- [ ] **Custom Node.js build** - Strip unnecessary features

## Support

- **Documentation:** https://packetsdk.dev/docs
- **Issues:** https://github.com/packet/sdk/issues
- **Email:** support@packetsdk.dev
- **Discord:** https://discord.gg/packet

## License

Proprietary - Licensed Software
© 2026 Packet SDK. All rights reserved.
