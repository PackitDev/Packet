import { Download, Apple, Monitor, Package, CheckCircle, Terminal, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardDownloads() {
  const downloads = [
    {
      platform: 'Windows',
      icon: <Monitor className="w-8 h-8" />,
      description: 'Windows 10 or later (64-bit)',
      file: 'packet-windows-x64.exe',
      size: '~45 MB',
      color: 'from-green-400 to-emerald-500',
    },
    {
      platform: 'macOS (Intel)',
      icon: <Apple className="w-8 h-8" />,
      description: 'macOS 10.15+ (Intel processors)',
      file: 'packet-macos-x64',
      size: '~45 MB',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      platform: 'macOS (Apple Silicon)',
      icon: <Apple className="w-8 h-8" />,
      description: 'macOS 11.0+ (M1/M2/M3 chips)',
      file: 'packet-macos-arm64',
      size: '~45 MB',
      color: 'from-purple-400 to-pink-500',
    },
    {
      platform: 'Linux',
      icon: <Package className="w-8 h-8" />,
      description: 'Ubuntu 18.04+, Debian 10+, etc.',
      file: 'packet-linux-x64',
      size: '~45 MB',
      color: 'from-orange-400 to-red-500',
    },
  ];

  const handleDownload = (file: string) => {
    window.location.href = `/downloads/standalone/${file}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-black mb-2">Downloads</h1>
        <p className="text-white/60 text-lg">Standalone executables - No Node.js or npm required!</p>
      </motion.div>

      {/* Features Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-strong rounded-2xl p-8 border-2 border-green-500/30"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-black text-green-400 mb-2 uppercase tracking-tight">Ready to Use!</h3>
            <p className="text-white/70 mb-4">
              Download a single file and start building. No installation, no dependencies, no hassle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">No Node.js needed</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">Works offline</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">Fully portable</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {downloads.map((item, index) => (
          <motion.div
            key={item.platform}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="glass rounded-2xl p-6 border-2 border-white/10 hover:border-white/30 transition-all"
          >
            <div className={`bg-gradient-to-r ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-black`}>
              {item.icon}
            </div>
            <h3 className="text-xl font-black mb-2 uppercase tracking-tight">{item.platform}</h3>
            <p className="text-white/60 mb-2 text-sm">{item.description}</p>
            <p className="text-white/40 mb-4 text-xs">{item.size}</p>
            <button
              onClick={() => handleDownload(item.file)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold uppercase tracking-wide hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
          </motion.div>
        ))}
      </div>

      {/* Quick Start Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-2xl p-8 border-2 border-white/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <Terminal className="w-6 h-6 text-green-400" />
          <h2 className="text-2xl font-black uppercase tracking-tight">Quick Start</h2>
        </div>

        <div className="space-y-6">
          {/* Windows */}
          <div>
            <h3 className="text-lg font-bold text-white/90 mb-3 flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Windows
            </h3>
            <div className="space-y-2">
              <div className="bg-black/50 rounded-lg p-4 border-2 border-white/10">
                <p className="text-white/60 text-sm mb-2">1. Download packet-windows-x64.exe</p>
                <p className="text-white/60 text-sm mb-2">2. Run as Administrator (optional for system-wide install)</p>
                <p className="text-white/60 text-sm">3. Or use directly:</p>
                <code className="text-green-400 font-mono text-sm block mt-2">
                  .\packet-windows-x64.exe create my-app
                </code>
              </div>
            </div>
          </div>

          {/* macOS/Linux */}
          <div>
            <h3 className="text-lg font-bold text-white/90 mb-3 flex items-center gap-2">
              <Apple className="w-5 h-5" />
              macOS / Linux
            </h3>
            <div className="space-y-2">
              <div className="bg-black/50 rounded-lg p-4 border-2 border-white/10">
                <p className="text-white/60 text-sm mb-2">1. Download the appropriate file for your system</p>
                <p className="text-white/60 text-sm mb-2">2. Make it executable:</p>
                <code className="text-green-400 font-mono text-sm block mb-3">
                  chmod +x packet-macos-arm64
                </code>
                <p className="text-white/60 text-sm mb-2">3. Use it:</p>
                <code className="text-green-400 font-mono text-sm block">
                  ./packet-macos-arm64 create my-app
                </code>
              </div>
            </div>
          </div>

          {/* System-wide installation */}
          <div className="bg-blue-500/10 rounded-lg p-4 border-2 border-blue-500/30">
            <h4 className="text-sm font-bold text-blue-400 mb-2">💡 Pro Tip: System-wide Installation</h4>
            <p className="text-white/70 text-sm mb-2">
              For easier access, copy the executable to your system PATH:
            </p>
            <div className="space-y-2">
              <div>
                <p className="text-white/60 text-xs mb-1">Windows:</p>
                <code className="text-blue-400 font-mono text-xs block">
                  copy packet-windows-x64.exe C:\Windows\System32\packet.exe
                </code>
              </div>
              <div>
                <p className="text-white/60 text-xs mb-1">macOS/Linux:</p>
                <code className="text-blue-400 font-mono text-xs block">
                  sudo cp packet-macos-arm64 /usr/local/bin/packet
                </code>
              </div>
            </div>
            <p className="text-white/60 text-xs mt-3">
              Then use <code className="text-blue-400">packet</code> from anywhere!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Available Commands */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass rounded-2xl p-8 border-2 border-white/10"
      >
        <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">Available Commands</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/30 rounded-lg p-4">
            <code className="text-yellow-400 font-mono text-sm">packet create &lt;name&gt;</code>
            <p className="text-white/60 text-sm mt-2">Create a new project</p>
          </div>
          <div className="bg-black/30 rounded-lg p-4">
            <code className="text-yellow-400 font-mono text-sm">packet dev</code>
            <p className="text-white/60 text-sm mt-2">Start development server</p>
          </div>
          <div className="bg-black/30 rounded-lg p-4">
            <code className="text-yellow-400 font-mono text-sm">packet build</code>
            <p className="text-white/60 text-sm mt-2">Build for production</p>
          </div>
          <div className="bg-black/30 rounded-lg p-4">
            <code className="text-yellow-400 font-mono text-sm">packet license &lt;key&gt;</code>
            <p className="text-white/60 text-sm mt-2">Activate your license</p>
          </div>
          <div className="bg-black/30 rounded-lg p-4">
            <code className="text-yellow-400 font-mono text-sm">packet doctor</code>
            <p className="text-white/60 text-sm mt-2">Check system status</p>
          </div>
          <div className="bg-black/30 rounded-lg p-4">
            <code className="text-yellow-400 font-mono text-sm">packet --help</code>
            <p className="text-white/60 text-sm mt-2">Show all commands</p>
          </div>
        </div>
      </motion.div>

      {/* Need Help? */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass rounded-2xl p-6 border-2 border-white/10 text-center"
      >
        <h3 className="text-lg font-bold mb-2">Need Help?</h3>
        <p className="text-white/60 text-sm mb-4">
          Check out our documentation or join the community
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/docs"
            className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-sm font-bold"
          >
            View Docs
          </a>
          <a
            href="https://discord.gg/packet"
            className="px-6 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-all text-sm font-bold"
          >
            Join Discord
          </a>
        </div>
      </motion.div>
    </div>
  );
}
