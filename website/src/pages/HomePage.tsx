import { Link } from 'react-router-dom'
import { Zap, Code, Database, Lock, Rocket, GitBranch, TestTube, Package, Minimize2, Maximize2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function HomePage() {
  const [terminalVisible, setTerminalVisible] = useState(true)
  const [terminalMinimized, setTerminalMinimized] = useState(false)
  const [terminalMaximized, setTerminalMaximized] = useState(false)

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Auto-Routing',
      description: 'File-system based routing for both frontend and backend. No configuration needed.',
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Database Ready',
      description: 'Type-safe ORM with PostgreSQL, MySQL, MongoDB, and SQLite support out of the box.',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Authentication',
      description: 'JWT, OAuth, Sessions, and Magic Links built-in. Secure by default.',
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: 'Git Workflows',
      description: 'Environment-branch mapping and feature branch automation included.',
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'One-Click Deploy',
      description: 'Deploy to Vercel, AWS, Docker, Railway, or Fly.io with a single command.',
    },
    {
      icon: <TestTube className="w-6 h-6" />,
      title: 'Testing Built-in',
      description: 'Comprehensive testing utilities for API, database, and authentication.',
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-pink-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-12"
          >
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-6 py-3">
              <Package className="w-5 h-5 text-yellow-400" />
              <span className="text-base text-yellow-400 font-semibold uppercase tracking-wide">Early Access Open</span>
            </div>
            
            <h1 className="text-huge font-black tracking-tighter leading-none">
              THE WORLD'S
              <br />
              <span className="gradient-text">FASTEST</span>
              <br />
              SDK.
            </h1>
            
            <p className="max-w-3xl mx-auto text-2xl sm:text-3xl text-white/80 font-medium leading-relaxed uppercase tracking-wide">
              PACKET ISN'T JUST ABOUT BUILDING APPS (ALTHOUGH, LET'S BE HONEST, THAT'S AMAZING). 
              IT'S ABOUT TURNING DEVELOPMENT INTO A SUPERPOWER.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link
                to="/pricing"
                className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-12 py-6 rounded-full font-black text-xl uppercase tracking-wide hover:scale-105 transition-all shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 overflow-hidden"
              >
                <span className="relative z-10">Get Started →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/docs"
                className="group bg-white/10 backdrop-blur-sm text-white px-12 py-6 rounded-full font-bold text-xl uppercase tracking-wide hover:bg-white/20 transition-all border-2 border-white/20 hover:border-white/40 hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">Read Manifesto</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>

            {/* Interactive Terminal */}
            <AnimatePresence>
              {terminalVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: terminalMaximized ? 1.1 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-20 mx-auto ${terminalMaximized ? 'max-w-6xl' : 'max-w-4xl'}`}
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl border-2 border-white/10 overflow-hidden shadow-2xl hover:shadow-yellow-500/20 transition-shadow">
                    {/* Terminal Header */}
                    <div className="bg-gradient-to-r from-white/10 to-white/5 px-6 py-4 flex items-center justify-between border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setTerminalVisible(false)}
                          className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer hover:scale-110 active:scale-95"
                          title="Close"
                        />
                        <button
                          onClick={() => {
                            setTerminalMinimized(!terminalMinimized)
                            setTerminalMaximized(false)
                          }}
                          className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer hover:scale-110 active:scale-95"
                          title="Minimize"
                        />
                        <button
                          onClick={() => {
                            setTerminalMaximized(!terminalMaximized)
                            setTerminalMinimized(false)
                          }}
                          className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer hover:scale-110 active:scale-95 flex items-center justify-center"
                          title="Maximize"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-white/60 text-sm font-semibold uppercase tracking-wider">Terminal</span>
                        <div className="flex space-x-1">
                          {terminalMinimized && <Minimize2 className="w-4 h-4 text-white/40" />}
                          {terminalMaximized && <Maximize2 className="w-4 h-4 text-white/40" />}
                        </div>
                      </div>
                    </div>

                    {/* Terminal Content */}
                    <AnimatePresence>
                      {!terminalMinimized && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className={`p-8 font-mono ${terminalMaximized ? 'text-lg' : 'text-base'}`}>
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                              className="text-white/80"
                            >
                              $ <span className="text-yellow-400 font-bold">packet create</span> <span className="text-pink-400">my-app</span>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                              className="text-green-400 mt-3 font-semibold"
                            >
                              ✓ Template: Full-stack TypeScript
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 }}
                              className="text-green-400 font-semibold"
                            >
                              ✓ Database: PostgreSQL
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 }}
                              className="text-green-400 font-semibold"
                            >
                              ✓ Auth: JWT
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 }}
                              className="text-yellow-400 mt-4 font-bold text-lg"
                            >
                              ✓ PROJECT CREATED IN 8 SECONDS!
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.9 }}
                              className="text-white/80 mt-6"
                            >
                              $ <span className="text-yellow-400 font-bold">npm run dev</span>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.1 }}
                              className="text-orange-400 mt-3 font-bold"
                            >
                              → RUNNING ON http://localhost:3000
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.3 }}
                              className="text-white/60 mt-2"
                            >
                              → Ready to ship 🚀
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Minimized State */}
                    {terminalMinimized && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-6 py-3 text-center"
                      >
                        <span className="text-white/40 text-sm font-semibold uppercase tracking-wider">
                          Terminal Minimized
                        </span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Restore Terminal Button */}
            {!terminalVisible && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-20 text-center"
              >
                <button
                  onClick={() => setTerminalVisible(true)}
                  className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-8 py-4 rounded-full font-black uppercase tracking-wide hover:scale-105 transition-transform shadow-lg"
                >
                  Show Terminal Demo →
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-black to-yellow-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-mega font-black mb-6 tracking-tighter">
              EVERYTHING.
              <br />
              <span className="gradient-text">INCLUDED.</span>
            </h2>
            <p className="text-2xl text-white/70 font-semibold uppercase tracking-wide">
              NO SETUP. NO CONFIG. JUST BUILD.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-8 hover:border-yellow-500/50 hover:bg-white/10 transition-all group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 via-orange-500/0 to-pink-500/0 group-hover:from-yellow-500/5 group-hover:via-orange-500/5 group-hover:to-pink-500/5 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-3 uppercase tracking-tight group-hover:text-yellow-400 transition-colors">{feature.title}</h3>
                  <p className="text-white/70 text-lg leading-relaxed group-hover:text-white/90 transition-colors">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-32 bg-gradient-to-b from-yellow-500/5 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-mega font-black mb-6 tracking-tighter">
              THE
              <br />
              <span className="gradient-text">DIFFERENCE.</span>
            </h2>
            <p className="text-2xl text-white/70 font-semibold uppercase tracking-wide">
              OLD WAY VS. NEW WAY
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Traditional Way */}
            <div className="bg-red-500/5 backdrop-blur-sm border-2 border-red-500/30 rounded-3xl p-10">
              <h3 className="text-4xl font-black mb-8 text-red-400 uppercase tracking-tight">OLD WAY</h3>
              <ul className="space-y-5">
                <li className="flex items-start space-x-4">
                  <span className="text-red-400 text-3xl font-bold">✗</span>
                  <span className="text-white/80 text-xl font-medium">DAYS OF SETUP</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-red-400 text-3xl font-bold">✗</span>
                  <span className="text-white/80 text-xl font-medium">MANUAL EVERYTHING</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-red-400 text-3xl font-bold">✗</span>
                  <span className="text-white/80 text-xl font-medium">COMPLEX AUTH</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-red-400 text-3xl font-bold">✗</span>
                  <span className="text-white/80 text-xl font-medium">DEPLOYMENT HELL</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-red-400 text-3xl font-bold">✗</span>
                  <span className="text-white/80 text-xl font-medium">TESTING? LOL</span>
                </li>
              </ul>
            </div>

            {/* With Packet */}
            <div className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-pink-500/10 backdrop-blur-sm border-2 border-yellow-500/50 rounded-3xl p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-black px-6 py-2 font-black text-sm uppercase tracking-wider rotate-12 translate-x-8 -translate-y-2">
                NEW!
              </div>
              <h3 className="text-4xl font-black mb-8 gradient-text uppercase tracking-tight">WITH PACKET</h3>
              <ul className="space-y-5">
                <li className="flex items-start space-x-4">
                  <span className="text-green-400 text-3xl font-bold">✓</span>
                  <span className="text-white text-xl font-bold">60 SECONDS SETUP</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-green-400 text-3xl font-bold">✓</span>
                  <span className="text-white text-xl font-bold">AUTO-EVERYTHING</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-green-400 text-3xl font-bold">✓</span>
                  <span className="text-white text-xl font-bold">AUTH INCLUDED</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-green-400 text-3xl font-bold">✓</span>
                  <span className="text-white text-xl font-bold">ONE-CLICK DEPLOY</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-green-400 text-3xl font-bold">✓</span>
                  <span className="text-white text-xl font-bold">TESTING BUILT-IN</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-pink-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-mega font-black mb-8 tracking-tighter leading-none">
            READY TO
            <br />
            <span className="gradient-text">SHIP FASTER?</span>
          </h2>
          <p className="text-2xl sm:text-3xl text-white/80 font-bold uppercase tracking-wide mb-12 leading-relaxed">
            JOIN EARLY ACCESS.<br />GET LIFETIME V1.0.<br />SAVE 50% ON V2.0.
          </p>
          <Link
            to="/pricing"
            className="group relative inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-16 py-8 rounded-full font-black text-2xl uppercase tracking-wide hover:scale-110 transition-all shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/80 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              GET STARTED NOW 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
          <p className="text-white/60 mt-8 text-lg font-semibold uppercase tracking-wider">
            $49 ONE-TIME • NO SUBSCRIPTION • FOREVER
          </p>
        </div>
      </section>
    </div>
  )
}
