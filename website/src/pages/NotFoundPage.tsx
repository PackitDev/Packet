import { Link } from 'react-router-dom'
import { Home, Search, ArrowLeft, Zap, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  const suggestions = [
    { title: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { title: 'Documentation', path: '/docs', icon: <Search className="w-5 h-5" /> },
    { title: 'Guides', path: '/guides', icon: <Zap className="w-5 h-5" /> },
    { title: 'Community', path: '/community', icon: <AlertTriangle className="w-5 h-5" /> }
  ]

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 noise opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-pink-500/10" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-12"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative"
          >
            <div className="text-[200px] sm:text-[300px] font-black leading-none tracking-tighter gradient-text opacity-20 select-none">
              404
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <AlertTriangle className="w-32 h-32 text-yellow-400" />
            </motion.div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter">
              <span className="gradient-text">PAGE NOT FOUND</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/70 font-semibold uppercase tracking-wide max-w-2xl mx-auto">
              Oops! Looks like this page took a wrong turn.
            </p>
            <p className="text-lg text-white/50 max-w-xl mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
          >
            <Link
              to="/"
              className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-12 py-6 rounded-full font-black text-xl uppercase tracking-wide hover:scale-105 transition-all shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <ArrowLeft className="w-6 h-6" />
                Go Home
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            <Link
              to="/docs"
              className="group bg-white/10 backdrop-blur-sm text-white px-12 py-6 rounded-full font-bold text-xl uppercase tracking-wide hover:bg-white/20 transition-all border-2 border-white/20 hover:border-white/40 hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Search className="w-6 h-6" />
                Browse Docs
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="pt-12"
          >
            <h2 className="text-2xl font-black uppercase tracking-tight mb-8 text-white/80">
              Or Try These Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestions.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={item.path}
                    className="glass rounded-2xl p-6 hover:border-yellow-500/30 transition-all group flex flex-col items-center gap-4"
                  >
                    <div className="bg-gradient-to-r from-yellow-400 to-pink-500 w-14 h-14 rounded-xl flex items-center justify-center text-black group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg">
                      {item.icon}
                    </div>
                    <span className="text-lg font-black uppercase tracking-tight group-hover:text-yellow-400 transition-colors">
                      {item.title}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Fun Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="pt-12"
          >
            <div className="glass-strong rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-white/60 text-sm font-semibold uppercase tracking-wide">
                💡 Pro Tip: If you think this page should exist, please{' '}
                <Link to="/contact" className="text-yellow-400 hover:text-yellow-300 transition-colors underline">
                  let us know
                </Link>
                {' '}so we can fix it!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
