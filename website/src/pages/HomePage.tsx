import { Link } from 'react-router-dom'
import { Zap, Code, Database, Lock, Rocket, GitBranch, TestTube, Package, Minimize2, Maximize2, X, ArrowRight, Star, Users, Globe, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import AnimatedCounter from '../components/AnimatedCounter'
import GlowingCard from '../components/GlowingCard'
import TypeWriter from '../components/TypeWriter'
import ParticleBackground from '../components/ParticleBackground'
import HorizontalScroll from '../components/HorizontalScroll'
import ScrollReveal from '../components/ScrollReveal'
import ParallaxText from '../components/ParallaxText'
import StackedCards from '../components/StackedCards'

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
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 noise pointer-events-none" />
        
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-pink-500/5 pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-pink-500/10 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-pink-500/10 via-orange-500/10 to-yellow-500/10 blur-3xl"
          />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-full px-6 py-3 backdrop-blur-sm hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all cursor-pointer group"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Package className="w-5 h-5 text-yellow-400" />
              </motion.div>
              <span className="text-base text-yellow-400 font-semibold uppercase tracking-wide group-hover:text-yellow-300 transition-colors">
                Early Access Open
              </span>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-huge font-black tracking-tighter leading-none"
            >
              <span className="inline-block hover:scale-105 transition-transform cursor-default">THE</span>{' '}
              <span className="inline-block hover:scale-105 transition-transform cursor-default">WORLD'S</span>
              <br />
              <span className="gradient-text glow inline-block hover:scale-110 transition-transform cursor-default">
                FASTEST
              </span>
              <br />
              <span className="inline-block hover:scale-105 transition-transform cursor-default">SDK.</span>
            </motion.h1>
            
            {/* Typewriter Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl sm:text-3xl font-mono glass inline-block px-6 py-3 rounded-2xl"
            >
              <span className="text-white/60">$</span>{' '}
              <span className="text-yellow-400 font-bold">packet</span>{' '}
              <span className="text-pink-400">create</span>{' '}
              <TypeWriter
                words={['my-saas', 'my-startup', 'my-api', 'my-app', 'my-mvp', 'my-project']}
                className="text-green-400 font-bold"
              />
            </motion.div>
            
            {/* Subheadline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <p className="text-xl sm:text-2xl text-white/60 font-medium leading-relaxed">
                Stop wasting time on boilerplate. Stop configuring. Stop debugging setup issues.
              </p>
              <p className="text-2xl sm:text-3xl text-white font-bold leading-relaxed">
                Start <span className="gradient-text">shipping</span>. Start <span className="gradient-text">building</span>. Start <span className="gradient-text">winning</span>.
              </p>
              <p className="text-lg text-white/50 font-medium">
                From zero to production in under 60 seconds. No joke.
              </p>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
            >
              <Link
                to="/pricing"
                className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-12 py-6 rounded-full font-black text-xl uppercase tracking-wide hover:scale-105 transition-all shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Building Free
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
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
              <Link
                to="/docs"
                className="group bg-white/10 backdrop-blur-sm text-white px-12 py-6 rounded-full font-bold text-xl uppercase tracking-wide hover:bg-white/20 transition-all border-2 border-white/20 hover:border-white/40 hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Watch Demo</span>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
            
            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-white/50 pt-4"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Free tier available
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Setup in 60 seconds
              </span>
            </motion.div>

            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-8 sm:gap-16 pt-12">
              <AnimatedCounter end={8} suffix="s" label="Setup Time" />
              <AnimatedCounter end={10} suffix="x" label="Faster Dev" />
              <AnimatedCounter end={0} suffix="" label="Config Files" />
              <AnimatedCounter end="∞" label="Possibilities" />
            </div>
            
            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
            >
              <div className="flex items-center gap-2 text-white/60">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 border-2 border-black flex items-center justify-center"
                    >
                      <Users className="w-4 h-4 text-black" />
                    </div>
                  ))}
                </div>
                <span className="font-semibold">500+ developers</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-white/60 font-semibold ml-2">4.9/5 rating</span>
              </div>
            </motion.div>

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
                          className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-all cursor-pointer hover:scale-110 active:scale-95 flex items-center justify-center group"
                          title="Close"
                        >
                          <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button
                          onClick={() => {
                            setTerminalMinimized(!terminalMinimized)
                            setTerminalMaximized(false)
                          }}
                          className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all cursor-pointer hover:scale-110 active:scale-95 flex items-center justify-center group"
                          title="Minimize"
                        >
                          <Minimize2 className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button
                          onClick={() => {
                            setTerminalMaximized(!terminalMaximized)
                            setTerminalMinimized(false)
                          }}
                          className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 transition-all cursor-pointer hover:scale-110 active:scale-95 flex items-center justify-center group"
                          title="Maximize"
                        >
                          <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-white/60 text-sm font-semibold uppercase tracking-wider">Terminal</span>
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
                            <div className="text-white/80">
                              $ <span className="text-yellow-400 font-bold">packet create</span> <span className="text-pink-400">my-app</span>
                            </div>
                            
                            <div className="text-green-400 mt-3 font-semibold">
                              ✓ Template: Full-stack TypeScript
                            </div>
                            
                            <div className="text-green-400 font-semibold">
                              ✓ Database: PostgreSQL
                            </div>
                            
                            <div className="text-green-400 font-semibold">
                              ✓ Auth: JWT
                            </div>
                            
                            <div className="text-yellow-400 mt-4 font-bold text-lg">
                              ✓ PROJECT CREATED IN 8 SECONDS!
                            </div>
                            
                            <div className="text-white/80 mt-6">
                              $ <span className="text-yellow-400 font-bold">npm run dev</span>
                            </div>
                            
                            <div className="text-orange-400 mt-3 font-bold">
                              → RUNNING ON http://localhost:3000
                            </div>
                            
                            <div className="text-white/60 mt-2">
                              → Ready to ship 🚀
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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

      {/* Parallax Text Banner */}
      <ParallaxText baseVelocity={0.5}>SHIP FASTER • BUILD BETTER • SCALE EASIER •</ParallaxText>

      {/* Horizontal Scroll Section */}
      <HorizontalScroll />

      {/* Stacked Cards Section */}
      <StackedCards />

      {/* Scroll Reveal Stats */}
      <ScrollReveal />

      {/* Another Parallax Text */}
      <ParallaxText baseVelocity={-0.3}>PACKET SDK • PACKET SDK • PACKET SDK •</ParallaxText>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-black via-black to-yellow-500/5 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-mega font-black mb-6 tracking-tighter">
              EVERYTHING.
              <br />
              <span className="gradient-text">INCLUDED.</span>
            </h2>
            <p className="text-2xl text-white/70 font-semibold uppercase tracking-wide">
              NO SETUP. NO CONFIG. JUST BUILD.
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {['Auth', 'Database', 'Routing', 'Deploy', 'Testing', 'Git Flow'].map((feature, i) => (
                <motion.span
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold uppercase tracking-wide text-white/80 hover:bg-white/10 hover:border-yellow-500/50 transition-all cursor-default"
                >
                  {feature}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <GlowingCard key={index} delay={index * 0.1}>
                <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black mb-3 uppercase tracking-tight group-hover:text-yellow-400 transition-colors">{feature.title}</h3>
                <p className="text-white/70 text-lg leading-relaxed group-hover:text-white/90 transition-colors">{feature.description}</p>
              </GlowingCard>
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

      {/* Testimonials Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 noise pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-mega font-black mb-6 tracking-tighter">
              DEVELOPERS
              <br />
              <span className="gradient-text">LOVE IT.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Packet saved me weeks of setup time. I shipped my SaaS in a weekend.",
                author: "Alex Chen",
                role: "Indie Hacker",
                avatar: "A"
              },
              {
                quote: "The best DX I've ever experienced. It just works, exactly how you'd expect.",
                author: "Sarah Miller",
                role: "Senior Developer",
                avatar: "S"
              },
              {
                quote: "We migrated our entire stack to Packet. 10x productivity is not an exaggeration.",
                author: "Mike Johnson",
                role: "CTO @ StartupXYZ",
                avatar: "M"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 hover:border-yellow-500/30 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-pink-500 flex items-center justify-center font-black text-black">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-white/60 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-gradient-to-b from-black to-yellow-500/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-mega font-black mb-6 tracking-tighter">
              THREE STEPS.
              <br />
              <span className="gradient-text">THAT'S IT.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'INSTALL', desc: 'One command. No dependencies. No config files.', icon: <Package className="w-8 h-8" /> },
              { step: '02', title: 'CREATE', desc: 'Pick your stack. We handle the rest automatically.', icon: <Sparkles className="w-8 h-8" /> },
              { step: '03', title: 'SHIP', desc: 'Deploy anywhere with a single command.', icon: <Rocket className="w-8 h-8" /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative"
              >
                <div className="text-8xl font-black text-white/5 absolute -top-8 -left-4">{item.step}</div>
                <div className="relative z-10 glass-strong rounded-3xl p-8">
                  <div className="bg-gradient-to-br from-yellow-400 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-black">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-black mb-4 gradient-text">{item.title}</h3>
                  <p className="text-white/70 text-lg">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2">
                    <ArrowRight className="w-8 h-8 text-yellow-500/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-pink-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 noise pointer-events-none" />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl opacity-20 blur-sm"
        />
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full opacity-20 blur-sm"
        />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-mega font-black mb-8 tracking-tighter leading-none">
              READY TO
              <br />
              <span className="gradient-text glow">SHIP FASTER?</span>
            </h2>
            <p className="text-2xl sm:text-3xl text-white/80 font-bold uppercase tracking-wide mb-12 leading-relaxed">
              JOIN EARLY ACCESS.<br />GET LIFETIME V1.0.<br />SAVE 50% ON V2.0.
            </p>
            <Link
              to="/pricing"
              className="group relative inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-16 py-8 rounded-full font-black text-2xl uppercase tracking-wide hover:scale-110 transition-all shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/80 overflow-hidden animate-pulse-glow"
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
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-white/40">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase">Used Worldwide</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase">Instant Access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
