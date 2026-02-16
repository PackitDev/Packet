import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Copy, Check, Key, Calendar, Shield, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardLicense() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const copyLicenseKey = () => {
    if (user?.licenseKey) {
      navigator.clipboard.writeText(user.licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-black mb-2">License Key</h1>
        <p className="text-white/60 text-lg">Manage your Packet SDK license</p>
      </motion.div>

      {/* License Key Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-strong rounded-2xl p-8 border-2 border-yellow-500/30"
      >
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-8 h-8 text-yellow-400" />
          <h2 className="text-2xl font-black uppercase tracking-tight">Your License Key</h2>
        </div>

        <div className="bg-black/50 rounded-xl p-6 mb-6 border-2 border-white/10">
          <code className="text-2xl text-yellow-400 font-mono block mb-4 break-all">
            {user?.licenseKey || 'PACKET-XXXX-XXXX-XXXX-XXXX'}
          </code>
          <button
            onClick={copyLicenseKey}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all font-bold uppercase tracking-wide"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy License Key
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-400 mt-1" />
            <div>
              <p className="font-bold text-white uppercase tracking-wide text-sm">Status</p>
              <p className="text-green-400 font-bold">Active</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <p className="font-bold text-white uppercase tracking-wide text-sm">Activated</p>
              <p className="text-white/60">Feb 16, 2026</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Key className="w-5 h-5 text-purple-400 mt-1" />
            <div>
              <p className="font-bold text-white uppercase tracking-wide text-sm">Type</p>
              <p className="text-white/60">Early Access</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Usage Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-8 border-2 border-white/10"
      >
        <h2 className="text-2xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
          <Terminal className="w-7 h-7 text-yellow-400" />
          How to Use Your License
        </h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-black flex-shrink-0 text-lg border-2 border-yellow-500/30">
              1
            </span>
            <div className="flex-1">
              <p className="font-bold text-white mb-2 uppercase tracking-wide">Install the CLI</p>
              <div className="bg-black/50 rounded-lg p-3 border-2 border-white/10">
                <code className="text-sm text-yellow-400 font-mono">
                  npm install -g @packet/cli
                </code>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-black flex-shrink-0 text-lg border-2 border-yellow-500/30">
              2
            </span>
            <div className="flex-1">
              <p className="font-bold text-white mb-2 uppercase tracking-wide">Activate your license</p>
              <div className="bg-black/50 rounded-lg p-3 border-2 border-white/10">
                <code className="text-sm text-yellow-400 font-mono">
                  packet license activate YOUR-LICENSE-KEY
                </code>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-black flex-shrink-0 text-lg border-2 border-yellow-500/30">
              3
            </span>
            <div className="flex-1">
              <p className="font-bold text-white mb-2 uppercase tracking-wide">Start building</p>
              <div className="bg-black/50 rounded-lg p-3 border-2 border-white/10">
                <code className="text-sm text-yellow-400 font-mono">
                  packet create my-app
                </code>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6 border-2 border-blue-500/30"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-black text-blue-400 mb-2 uppercase tracking-tight">Keep Your License Safe</h3>
            <p className="text-white/70">
              Your license key is unique to you. Don't share it publicly. If you believe your key has been compromised, contact support.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
