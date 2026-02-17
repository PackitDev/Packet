import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Copy, Check, Apple, Monitor, Package, Terminal, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardEpoxy() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const copyEpoxyKey = () => {
    if (user?.epoxyLicenseKey) {
      navigator.clipboard.writeText(user.epoxyLicenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloads = [
    { platform: 'Windows', icon: <Monitor className="w-8 h-8" />, file: 'Epoxy-Setup.exe', color: 'from-yellow-400 via-orange-500 to-pink-500' },
    { platform: 'macOS', icon: <Apple className="w-8 h-8" />, file: 'Epoxy.dmg', color: 'from-yellow-400 via-orange-500 to-pink-500' },
    { platform: 'Linux', icon: <Package className="w-8 h-8" />, file: 'epoxy.AppImage', color: 'from-yellow-400 via-orange-500 to-pink-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Epoxy Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-6"
      >
        <img
          src="/epoxy-logo.png"
          alt="Epoxy"
          className="w-20 h-20 rounded-2xl"
        />
        <div>
          <h1 className="text-4xl font-black mb-2 gradient-text">Epoxy</h1>
          <p className="text-white/60 text-lg">
            The visual powerhouse of Packet — configure everything through the UI
          </p>
        </div>
      </motion.div>

      {/* Epoxy License Key Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-strong rounded-2xl p-8 border-2 border-pink-500/30"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Your Epoxy Key</h2>
            <p className="text-xs text-white/50 font-bold uppercase tracking-wider">Free for all Packet users</p>
          </div>
        </div>

        <div className="bg-black/50 rounded-xl p-6 mb-6 border-2 border-white/10">
          <code className="text-2xl font-mono block mb-4 break-all bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            {user?.epoxyLicenseKey || 'EPOXY-XXXX-XXXX-XXXX-XXXX'}
          </code>
          <button
            onClick={copyEpoxyKey}
            disabled={!user?.epoxyLicenseKey}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-pink-500/20 text-orange-400 rounded-lg hover:from-yellow-500/30 hover:via-orange-500/30 hover:to-pink-500/30 transition-all font-bold uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Epoxy Key
              </>
            )}
          </button>
        </div>

        <p className="text-white/50 text-sm">
          Use this key to activate Epoxy — the visual config tool that lets you toggle features, manage env vars, and configure Packet without touching text files.
        </p>
      </motion.div>

      {/* How to Use Epoxy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-8 border-2 border-white/10"
      >
        <h2 className="text-2xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
          <Terminal className="w-7 h-7 text-pink-400" />
          How to Use Epoxy
        </h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-black flex-shrink-0 text-lg border-2 border-pink-500/30">
              1
            </span>
            <div className="flex-1">
              <p className="font-bold text-white mb-2 uppercase tracking-wide">Download Epoxy</p>
              <p className="text-white/60 text-sm">Get the Epoxy desktop app for your platform below.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-black flex-shrink-0 text-lg border-2 border-pink-500/30">
              2
            </span>
            <div className="flex-1">
              <p className="font-bold text-white mb-2 uppercase tracking-wide">Activate with your key</p>
              <p className="text-white/60 text-sm">Paste your Epoxy key when the app prompts you.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-black flex-shrink-0 text-lg border-2 border-pink-500/30">
              3
            </span>
            <div className="flex-1">
              <p className="font-bold text-white mb-2 uppercase tracking-wide">Configure visually</p>
              <p className="text-white/60 text-sm">Toggle features, edit env vars, manage packages — all through the UI.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Download Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-black mb-6 uppercase tracking-tight">Download Epoxy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {downloads.map((item, index) => (
            <motion.div
              key={item.platform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="glass rounded-2xl p-6 border-2 border-white/10 hover:border-pink-500/30 transition-colors"
            >
              <div className={`bg-gradient-to-r ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-black`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-black mb-2 uppercase tracking-tight">{item.platform}</h3>
              <p className="text-white/60 mb-4 text-sm">Epoxy Desktop</p>
              <button
                disabled
                className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-pink-500/20 text-orange-400 font-bold uppercase tracking-wide hover:from-yellow-500/30 hover:via-orange-500/30 hover:to-pink-500/30 transition-all cursor-not-allowed opacity-70"
              >
                Coming Soon
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-2xl p-6 border-2 border-pink-500/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-pink-400" />
          </div>
          <div>
            <h3 className="text-xl font-black text-pink-400 mb-2 uppercase tracking-tight">Epoxy = Visual Packet</h3>
            <p className="text-white/70">
              Epoxy is the glue that holds Packet together. Don't want a database? Turn it off. Need to add env vars? Edit them in the UI. 
              No more config files — just point, click, and ship.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
