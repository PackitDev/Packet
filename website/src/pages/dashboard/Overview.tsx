import { useAuth } from '../../contexts/AuthContext';
import { Key, Download, Book, CheckCircle, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DashboardOverview() {
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
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-black mb-2">
          Welcome back, <span className="gradient-text">{user?.name}!</span>
        </h1>
        <p className="text-white/60 text-lg">Here's your Packet SDK dashboard</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 border-2 border-white/10"
        >
          <CheckCircle className="w-10 h-10 text-green-400 mb-4" />
          <h3 className="text-2xl font-black mb-1">Active</h3>
          <p className="text-white/60 font-semibold uppercase tracking-wide text-sm">Early Access Status</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 border-2 border-white/10"
        >
          <Key className="w-10 h-10 text-yellow-400 mb-4" />
          <h3 className="text-2xl font-black mb-1">1 License</h3>
          <p className="text-white/60 font-semibold uppercase tracking-wide text-sm">Active License Keys</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 border-2 border-white/10"
        >
          <Download className="w-10 h-10 text-blue-400 mb-4" />
          <h3 className="text-2xl font-black mb-1">v1.0 Beta</h3>
          <p className="text-white/60 font-semibold uppercase tracking-wide text-sm">Current Version</p>
        </motion.div>
      </div>

      {/* License Key Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-strong rounded-2xl p-8 border-2 border-yellow-500/30"
      >
        <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
          <Key className="w-7 h-7 text-yellow-400" />
          Your License Key
        </h2>
        <div className="flex items-center justify-between bg-black/50 rounded-xl p-4 mb-4">
          <code className="text-yellow-400 font-mono text-lg">
            {user?.licenseKey || 'PACKET-XXXX-XXXX-XXXX'}
          </code>
          <button
            onClick={copyLicenseKey}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all font-bold uppercase tracking-wide text-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
        <p className="text-white/60 text-sm">
          Use this key to activate the Packet CLI on your machine
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            to="/dashboard/downloads" 
            className="glass rounded-2xl p-6 border-2 border-white/10 hover:border-yellow-500/30 transition-all group block h-full"
          >
            <Download className="w-10 h-10 text-yellow-400 mb-4" />
            <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Download CLI</h3>
            <p className="text-white/60 mb-4">Get the Packet CLI for your platform</p>
            <span className="text-yellow-400 font-bold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2 uppercase tracking-wide text-sm">
              Download →
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link 
            to="/docs" 
            className="glass rounded-2xl p-6 border-2 border-white/10 hover:border-yellow-500/30 transition-all group block h-full"
          >
            <Book className="w-10 h-10 text-yellow-400 mb-4" />
            <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Read Documentation</h3>
            <p className="text-white/60 mb-4">Learn how to use Packet SDK</p>
            <span className="text-yellow-400 font-bold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2 uppercase tracking-wide text-sm">
              View Docs →
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
