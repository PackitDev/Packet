import { Rocket, Bug, Sparkles, Zap, Shield, Database, Code } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ChangelogPage() {
  const releases = [
    {
      version: '0.9.5',
      date: 'Feb 15, 2026',
      title: 'Beta Release',
      type: 'minor',
      changes: [
        { type: 'feature', text: 'Beta release - testing and feedback welcome!' },
        { type: 'feature', text: 'Complete documentation and API reference' },
        { type: 'feature', text: 'Community Discord server launched' },
        { type: 'improvement', text: 'Performance optimizations across the board' },
        { type: 'improvement', text: 'Enhanced error messages and debugging tools' }
      ]
    },
    {
      version: '0.9.0',
      date: 'Feb 1, 2026',
      title: 'Release Candidate',
      type: 'minor',
      changes: [
        { type: 'feature', text: 'Added support for MongoDB and SQLite databases' },
        { type: 'feature', text: 'New deployment targets: Railway and Fly.io' },
        { type: 'feature', text: 'Magic link authentication support' },
        { type: 'improvement', text: 'Improved CLI with better progress indicators' },
        { type: 'fix', text: 'Fixed OAuth callback handling in production' },
        { type: 'fix', text: 'Resolved database migration race conditions' }
      ]
    },
    {
      version: '0.8.0',
      date: 'Jan 15, 2026',
      title: 'Beta Release',
      type: 'minor',
      changes: [
        { type: 'feature', text: 'GraphQL API support with Apollo integration' },
        { type: 'feature', text: 'Real-time subscriptions with WebSocket' },
        { type: 'feature', text: 'Built-in caching with Redis support' },
        { type: 'improvement', text: 'Faster project initialization (8s → 6s)' },
        { type: 'improvement', text: 'Better TypeScript type inference' },
        { type: 'fix', text: 'Fixed session management in serverless environments' }
      ]
    },
    {
      version: '0.7.0',
      date: 'Jan 1, 2026',
      title: 'Testing & CI/CD',
      type: 'minor',
      changes: [
        { type: 'feature', text: 'Comprehensive testing utilities built-in' },
        { type: 'feature', text: 'GitHub Actions integration for CI/CD' },
        { type: 'feature', text: 'Automated deployment previews' },
        { type: 'improvement', text: 'Enhanced Git workflow automation' },
        { type: 'fix', text: 'Fixed environment variable loading order' }
      ]
    },
    {
      version: '0.6.0',
      date: 'Dec 15, 2025',
      title: 'Authentication System',
      type: 'minor',
      changes: [
        { type: 'feature', text: 'JWT authentication with refresh tokens' },
        { type: 'feature', text: 'OAuth support (Google, GitHub, Twitter)' },
        { type: 'feature', text: 'Session-based authentication' },
        { type: 'feature', text: 'Password reset and email verification' },
        { type: 'security', text: 'Enhanced security with rate limiting' }
      ]
    },
    {
      version: '0.5.0',
      date: 'Dec 1, 2025',
      title: 'Database Integration',
      type: 'minor',
      changes: [
        { type: 'feature', text: 'Type-safe ORM with Prisma' },
        { type: 'feature', text: 'PostgreSQL and MySQL support' },
        { type: 'feature', text: 'Automatic database migrations' },
        { type: 'feature', text: 'Seeding and fixtures support' },
        { type: 'improvement', text: 'Better error handling for database operations' }
      ]
    },
    {
      version: '0.4.0',
      date: 'Nov 15, 2025',
      title: 'Deployment',
      type: 'minor',
      changes: [
        { type: 'feature', text: 'One-click deployment to Vercel' },
        { type: 'feature', text: 'AWS deployment support' },
        { type: 'feature', text: 'Docker containerization' },
        { type: 'improvement', text: 'Optimized build process' },
        { type: 'fix', text: 'Fixed production environment detection' }
      ]
    },
    {
      version: '0.3.0',
      date: 'Nov 1, 2025',
      title: 'Routing System',
      type: 'minor',
      changes: [
        { type: 'feature', text: 'File-system based routing for frontend' },
        { type: 'feature', text: 'API route auto-discovery' },
        { type: 'feature', text: 'Middleware support' },
        { type: 'improvement', text: 'Hot module replacement improvements' }
      ]
    },
    {
      version: '0.2.0',
      date: 'Oct 15, 2025',
      title: 'Alpha Release',
      type: 'minor',
      changes: [
        { type: 'feature', text: 'Initial project scaffolding' },
        { type: 'feature', text: 'Basic TypeScript setup' },
        { type: 'feature', text: 'React frontend template' },
        { type: 'feature', text: 'Development server with HMR' }
      ]
    },
    {
      version: '0.1.0',
      date: 'Oct 1, 2025',
      title: 'Initial Prototype',
      type: 'minor',
      changes: [
        { type: 'feature', text: 'CLI tool foundation' },
        { type: 'feature', text: 'Basic project creation' },
        { type: 'feature', text: 'Template system' }
      ]
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Sparkles className="w-4 h-4 text-green-400" />
      case 'improvement':
        return <Zap className="w-4 h-4 text-yellow-400" />
      case 'fix':
        return <Bug className="w-4 h-4 text-red-400" />
      case 'security':
        return <Shield className="w-4 h-4 text-blue-400" />
      default:
        return <Code className="w-4 h-4 text-white/60" />
    }
  }

  const getVersionBadgeColor = (type: string) => {
    switch (type) {
      case 'major':
        return 'from-yellow-400 to-orange-500'
      case 'minor':
        return 'from-blue-400 to-cyan-500'
      case 'patch':
        return 'from-green-400 to-emerald-500'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-pink-500/10 py-32">
        <div className="absolute inset-0 noise pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <h1 className="text-huge font-black tracking-tighter">
              <span className="gradient-text">CHANGELOG</span>
            </h1>
            <p className="text-2xl text-white/70 font-semibold uppercase tracking-wide max-w-3xl mx-auto">
              BETA UPDATES AND IMPROVEMENTS
            </p>
          </motion.div>
        </div>
      </section>

      {/* Legend */}
      <section className="py-12 bg-black/50 backdrop-blur-sm border-y-2 border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: <Sparkles className="w-5 h-5" />, label: 'New Feature', color: 'text-green-400' },
              { icon: <Zap className="w-5 h-5" />, label: 'Improvement', color: 'text-yellow-400' },
              { icon: <Bug className="w-5 h-5" />, label: 'Bug Fix', color: 'text-red-400' },
              { icon: <Shield className="w-5 h-5" />, label: 'Security', color: 'text-blue-400' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={item.color}>{item.icon}</span>
                <span className="text-white/70 font-semibold text-sm uppercase tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Releases Timeline */}
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {releases.map((release, i) => (
              <motion.article
                key={release.version}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 hover:border-yellow-500/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`bg-gradient-to-r ${getVersionBadgeColor(release.type)} w-16 h-16 rounded-2xl flex items-center justify-center text-black shadow-lg`}>
                      <Rocket className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black uppercase tracking-tight gradient-text">
                        v{release.version}
                      </h2>
                      <p className="text-white/60 font-semibold">{release.date}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full">
                    <span className="text-sm font-bold uppercase tracking-wide text-white/80">
                      {release.title}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {release.changes.map((change, j) => (
                    <div key={j} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                      <span className="flex-shrink-0 mt-0.5">
                        {getTypeIcon(change.type)}
                      </span>
                      <span className="text-white/80 leading-relaxed">{change.text}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-20 bg-gradient-to-b from-black to-yellow-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12 text-center"
          >
            <Database className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">STAY UPDATED</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide mb-8">
              Get notified about new releases and features
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full text-white placeholder-white/50 font-semibold uppercase tracking-wide focus:outline-none focus:border-yellow-500/50 transition-colors"
              />
              <button className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-8 py-4 rounded-full font-black uppercase tracking-wide hover:scale-105 transition-transform shadow-lg">
                Subscribe →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-pink-500/10 relative overflow-hidden">
        <div className="absolute inset-0 noise pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">JOIN THE BETA</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide mb-8">
              Help test and shape the future of Packet SDK
            </p>
            <a
              href="/pricing"
              className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-12 py-6 rounded-full font-black text-xl uppercase tracking-wide hover:scale-105 transition-transform shadow-2xl"
            >
              Get Started Now →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
