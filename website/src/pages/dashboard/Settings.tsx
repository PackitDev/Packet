import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Github, Calendar, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardSettings() {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-black mb-2">Settings</h1>
        <p className="text-white/60 text-lg">Manage your account preferences</p>
      </motion.div>

      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-8 border-2 border-white/10"
      >
        <h2 className="text-2xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
          <User className="w-7 h-7 text-yellow-400" />
          Profile Information
        </h2>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <img 
              src={user?.avatar || '/logo.png'} 
              alt={user?.name || 'User'} 
              className="w-20 h-20 rounded-full border-4 border-yellow-400/30"
            />
            <div>
              <p className="text-2xl font-black">{user?.name}</p>
              <p className="text-white/60">@{user?.githubUsername}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="font-bold text-white uppercase tracking-wide text-sm">Email</p>
                <p className="text-white/60">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Github className="w-5 h-5 text-purple-400 mt-1" />
              <div>
                <p className="font-bold text-white uppercase tracking-wide text-sm">GitHub</p>
                <p className="text-white/60">@{user?.githubUsername}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-green-400 mt-1" />
              <div>
                <p className="font-bold text-white uppercase tracking-wide text-sm">Member Since</p>
                <p className="text-white/60">February 2026</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-orange-400 mt-1" />
              <div>
                <p className="font-bold text-white uppercase tracking-wide text-sm">Account Type</p>
                <p className="text-white/60">Early Access</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-8 border-2 border-white/10"
      >
        <h2 className="text-2xl font-black mb-6 uppercase tracking-tight">Preferences</h2>
        <p className="text-white/60">Preference settings coming soon.</p>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-8 border-2 border-red-500/30"
      >
        <h2 className="text-2xl font-black mb-6 uppercase tracking-tight flex items-center gap-3 text-red-400">
          <AlertTriangle className="w-7 h-7" />
          Danger Zone
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-white mb-2 uppercase tracking-wide">Logout</h3>
            <p className="text-white/60 mb-4 text-sm">Sign out of your account on this device.</p>
            <button
              onClick={logout}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all font-bold uppercase tracking-wide"
            >
              Logout
            </button>
          </div>

          <div className="pt-4 border-t-2 border-white/10">
            <h3 className="font-bold text-red-400 mb-2 uppercase tracking-wide">Delete Account</h3>
            <p className="text-white/60 mb-4 text-sm">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button
              disabled
              className="px-6 py-3 bg-red-500/20 text-red-400 rounded-lg opacity-50 cursor-not-allowed font-bold uppercase tracking-wide"
            >
              Delete Account (Coming Soon)
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
