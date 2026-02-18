import { Download, Apple, Monitor, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardDownloads() {
  const downloads = [
    {
      platform: 'Windows',
      icon: <Monitor className="w-8 h-8" />,
      description: 'For Windows 10 or later',
      file: 'packet-cli-windows.exe',
      color: 'from-green-400 to-emerald-500',
    },
    {
      platform: 'macOS',
      icon: <Apple className="w-8 h-8" />,
      description: 'For macOS 10.15 or later',
      file: 'packet-cli-macos.pkg',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      platform: 'Linux',
      icon: <Package className="w-8 h-8" />,
      description: 'For Ubuntu, Debian, Fedora',
      file: 'packet-cli-linux.tar.gz',
      color: 'from-orange-400 to-pink-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-black mb-2">Downloads</h1>
        <p className="text-white/60 text-lg">Get the Packet CLI for your platform</p>
      </motion.div>

      {/* Coming Soon Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-strong rounded-2xl p-8 border-2 border-yellow-500/30"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
            <Download className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-xl font-black text-yellow-400 mb-2 uppercase tracking-tight">CLI Coming Soon</h3>
            <p className="text-white/70 mb-4">
              The Packet CLI is currently in development. You'll be notified via email when it's ready for download.
            </p>
            <p className="text-white/60 text-sm">
              In the meantime, check out the documentation to learn what you'll be able to build with Packet.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {downloads.map((item, index) => (
          <motion.div
            key={item.platform}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="glass rounded-2xl p-6 border-2 border-white/10 opacity-50"
          >
            <div className={`bg-gradient-to-r ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-black`}>
              {item.icon}
            </div>
            <h3 className="text-xl font-black mb-2 uppercase tracking-tight">{item.platform}</h3>
            <p className="text-white/60 mb-4 text-sm">{item.description}</p>
            <button
              disabled
              className="w-full py-3 rounded-xl bg-white/5 text-white/40 font-bold uppercase tracking-wide cursor-not-allowed"
            >
              Coming Soon
            </button>
          </motion.div>
        ))}
      </div>

      {/* Installation via NPM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-2xl p-8 border-2 border-white/10"
      >
        <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">Install via NPM (Coming Soon)</h2>
        <p className="text-white/60 mb-4">
          Once available, you'll be able to install the Packet CLI globally using npm:
        </p>
        <div className="bg-black/50 rounded-lg p-4 border-2 border-white/10">
          <code className="text-yellow-400 font-mono">
            npm install -g @packet/cli
          </code>
        </div>
      </motion.div>
    </div>
  );
}
