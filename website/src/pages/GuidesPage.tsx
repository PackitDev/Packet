import { Link } from 'react-router-dom'
import { BookOpen, Code, Database, Lock, Rocket, GitBranch, TestTube, Zap, ArrowRight, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function GuidesPage() {
  const guides = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of Packet SDK and create your first application in under 60 seconds.',
      icon: <Rocket className="w-8 h-8" />,
      duration: '10 min',
      level: 'Beginner',
      color: 'from-yellow-400 to-orange-500',
      topics: ['Installation', 'Project Setup', 'First App', 'Basic Routing']
    },
    {
      title: 'Authentication Guide',
      description: 'Implement secure authentication with JWT, OAuth, Sessions, and Magic Links.',
      icon: <Lock className="w-8 h-8" />,
      duration: '25 min',
      level: 'Intermediate',
      color: 'from-orange-500 to-pink-500',
      topics: ['JWT Setup', 'OAuth Integration', 'Session Management', 'Password Reset']
    },
    {
      title: 'Database Integration',
      description: 'Connect and work with PostgreSQL, MySQL, MongoDB, and SQLite databases.',
      icon: <Database className="w-8 h-8" />,
      duration: '30 min',
      level: 'Intermediate',
      color: 'from-pink-500 to-purple-500',
      topics: ['ORM Setup', 'Migrations', 'Queries', 'Relationships']
    },
    {
      title: 'API Development',
      description: 'Build RESTful and GraphQL APIs with automatic routing and type safety.',
      icon: <Code className="w-8 h-8" />,
      duration: '35 min',
      level: 'Intermediate',
      color: 'from-purple-500 to-blue-500',
      topics: ['REST APIs', 'GraphQL', 'Middleware', 'Validation']
    },
    {
      title: 'Testing Your App',
      description: 'Write comprehensive tests for your API, database, and authentication flows.',
      icon: <TestTube className="w-8 h-8" />,
      duration: '20 min',
      level: 'Intermediate',
      color: 'from-blue-500 to-cyan-500',
      topics: ['Unit Tests', 'Integration Tests', 'E2E Tests', 'Mocking']
    },
    {
      title: 'Deployment',
      description: 'Deploy your application to Vercel, AWS, Docker, Railway, or Fly.io.',
      icon: <Zap className="w-8 h-8" />,
      duration: '15 min',
      level: 'Beginner',
      color: 'from-cyan-500 to-green-500',
      topics: ['Vercel Deploy', 'AWS Setup', 'Docker Build', 'CI/CD']
    },
    {
      title: 'Git Workflows',
      description: 'Set up environment-branch mapping and automated feature branch workflows.',
      icon: <GitBranch className="w-8 h-8" />,
      duration: '20 min',
      level: 'Advanced',
      color: 'from-green-500 to-yellow-500',
      topics: ['Branch Strategy', 'Environments', 'Auto Deploy', 'Rollbacks']
    },
    {
      title: 'Advanced Patterns',
      description: 'Master advanced techniques for building scalable production applications.',
      icon: <BookOpen className="w-8 h-8" />,
      duration: '45 min',
      level: 'Advanced',
      color: 'from-yellow-500 to-orange-500',
      topics: ['Caching', 'Rate Limiting', 'Background Jobs', 'Monitoring']
    }
  ]

  const quickTips = [
    'Use `packet create` to scaffold a new project instantly',
    'File-based routing works for both frontend and backend',
    'Environment variables are auto-loaded from .env files',
    'Database migrations run automatically on deploy',
    'Built-in testing utilities require zero configuration'
  ]

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
              <span className="gradient-text">GUIDES</span>
            </h1>
            <p className="text-2xl text-white/70 font-semibold uppercase tracking-wide max-w-3xl mx-auto">
              STEP-BY-STEP TUTORIALS TO MASTER PACKET SDK
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-12 bg-black/50 backdrop-blur-sm border-y-2 border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-black uppercase tracking-tight text-white">Quick Tips</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickTips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <span className="text-yellow-400 font-black text-lg">→</span>
                <span className="text-white/80 text-sm font-medium">{tip}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guides.map((guide, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 hover:border-yellow-500/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`bg-gradient-to-r ${guide.color} w-16 h-16 rounded-2xl flex items-center justify-center text-black group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                    {guide.icon}
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-xs font-bold uppercase tracking-wide">
                      {guide.level}
                    </span>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.duration}
                    </span>
                  </div>
                </div>

                <h3 className="text-3xl font-black mb-4 group-hover:text-yellow-400 transition-colors uppercase tracking-tight">
                  {guide.title}
                </h3>
                
                <p className="text-white/70 text-lg mb-6 leading-relaxed">
                  {guide.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-bold uppercase tracking-wide text-white/60 mb-3">What You'll Learn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {guide.topics.map((topic, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-white/80"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-6 py-4 rounded-full font-black uppercase tracking-wide hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2 group-hover:gap-4">
                  Start Guide
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-20 bg-gradient-to-b from-black to-yellow-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">RECOMMENDED PATH</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide">
              Follow this order for the best learning experience
            </p>
          </motion.div>

          <div className="space-y-6">
            {['Getting Started', 'API Development', 'Database Integration', 'Authentication Guide', 'Testing Your App', 'Deployment', 'Git Workflows', 'Advanced Patterns'].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 glass-strong rounded-2xl p-6 hover:border-yellow-500/30 transition-all group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full flex items-center justify-center font-black text-black text-xl">
                  {i + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-yellow-400 transition-colors">
                    {step}
                  </h3>
                </div>
                <ArrowRight className="w-6 h-6 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
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
              <span className="gradient-text">READY TO START?</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide mb-8">
              Get Packet SDK and follow along with the guides
            </p>
            <Link
              to="/pricing"
              className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-12 py-6 rounded-full font-black text-xl uppercase tracking-wide hover:scale-105 transition-transform shadow-2xl"
            >
              Get Started Now →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
