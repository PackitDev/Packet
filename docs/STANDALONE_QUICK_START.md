# Standalone Executable - Quick Start

> **TL;DR:** Download one file, run it. No Node.js or npm needed.

## 1. Download

Choose your platform:

| Platform | Download | Size |
|----------|----------|------|
| 🪟 **Windows** | [packet-windows-x64.zip](https://packetsdk.dev/download/windows) | ~15 MB |
| 🍎 **macOS (Intel)** | [packet-macos-x64.tar.gz](https://packetsdk.dev/download/macos-intel) | ~15 MB |
| 🍎 **macOS (M1/M2/M3)** | [packet-macos-arm64.tar.gz](https://packetsdk.dev/download/macos-arm) | ~15 MB |
| 🐧 **Linux** | [packet-linux-x64.tar.gz](https://packetsdk.dev/download/linux) | ~15 MB |

## 2. Install

### Windows

```powershell
# Extract the zip file
Expand-Archive packet-windows-x64.zip

# Run installer as Administrator (right-click → Run as Administrator)
cd packet-windows-x64
.\install-windows.bat
```

### macOS / Linux

```bash
# Extract the archive
tar -xzf packet-macos-arm64.tar.gz  # or your platform

# Run installer
chmod +x install.sh
./install.sh
```

**That's it!** Packet is now installed system-wide.

## 3. Activate License

```bash
packet license YOUR-LICENSE-KEY
```

Get your license at: [packetsdk.dev/pricing](https://packetsdk.dev/pricing)

## 4. Create Your First App

```bash
# Create a new app
packet create my-app

# Start development server
cd my-app
packet dev
```

Your app is now running at **http://localhost:3000** 🎉

## Alternative: Project-Local Usage

Don't want to install system-wide? Just drop the executable in your project:

```bash
# Windows
.\packet.exe create my-app
cd my-app
..\packet.exe dev

# macOS/Linux
./packet create my-app
cd my-app
../packet dev
```

## Common Commands

```bash
packet create <name>     # Create new project
packet dev               # Start dev server
packet build             # Build for production
packet license <key>     # Activate license
packet version           # Show version
packet doctor            # Check system status
packet --help            # Show all commands
```

## Troubleshooting

### Windows: "Windows protected your PC"

1. Click **"More info"**
2. Click **"Run anyway"**

This warning appears because the executable is not code-signed (yet).

### macOS: "Cannot be opened because the developer cannot be verified"

```bash
sudo xattr -r -d com.apple.quarantine packet-macos-arm64
```

Or: **System Preferences** → **Security & Privacy** → Click **"Allow"**

### Linux: "Permission denied"

```bash
chmod +x packet-linux-x64
```

### Still having issues?

```bash
packet doctor
```

This will check your system and show any problems.

## What's Included?

✅ **Complete Packet SDK** - All features, no limitations
✅ **Node.js Runtime** - Embedded, no installation needed
✅ **All Dependencies** - Everything bundled
✅ **Works Offline** - After initial license activation
✅ **Fast Startup** - Optimized for performance

## Need Help?

- 📚 [Full Documentation](https://packetsdk.dev/docs)
- 💬 [Discord Community](https://discord.gg/packet)
- 📧 [Email Support](mailto:support@packetsdk.dev)
- 🐛 [Report Issues](https://github.com/packet/sdk/issues)

## Next Steps

- [Getting Started Guide](./getting-started.md)
- [API Reference](./api/)
- [Deployment Guide](./deployment.md)
- [Examples](../examples/)

---

**Happy coding!** 🚀
