import { Book, Terminal, Code, Database, Lock, Rocket, Copy, Check, ArrowRight, Zap, GitBranch, TestTube, ChevronRight, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function DocsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const sections = [
    {
      icon: <Terminal className="w-6 h-6" />,
      title: 'Getting Started',
      description: 'Install and create your first project in seconds',
      link: '#getting-started',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Auto-Routing',
      description: 'File-system based routing that just works',
      link: '#routing',
      color: 'from-orange-400 to-pink-500',
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Database',
      description: 'Type-safe ORM, migrations, and queries',
      link: '#database',
      color: 'from-pink-400 to-purple-500',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Authentication',
      description: 'JWT, OAuth, sessions - all pre-configured',
      link: '#auth',
      color: 'from-purple-400 to-indigo-500',
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: 'Git Workflows',
      description: 'Branch-to-environment mapping',
      link: '#git',
      color: 'from-indigo-400 to-blue-500',
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Deployment',
      description: 'One command to deploy anywhere',
      link: '#deployment',
      color: 'from-blue-400 to-cyan-500',
    },
  ]

  const codeExamples = [
    {
      title: 'Install the CLI',
      code: 'npm install -g @packet/cli',
    },
    {
      title: 'Create a new project',
      code: 'packet create my-app',
    },
    {
      title: 'Start development',
      code: 'cd my-app && npm run dev',
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-pink-500/5 pointer-events-none" />
        <div className="absolute inset-0 noise pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-full px-6 py-3"
            >
              <Book className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold uppercase tracking-wide">Documentation</span>
            </motion.div>

            <h1 className="text-huge font-black tracking-tighter leading-none">
              LEARN.
              <br />
              <span className="gradient-text glow">BUILD.</span>
              <br />
              SHIP.
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Everything you need to build production-ready apps with Packet SDK.
              <br />
              <span className="text-white font-semibold">From zero to deployed in minutes.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 relative">
        <div className="absolute inset-0 noise pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <motion.a
                key={index}
                href={section.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass rounded-2xl p-6 hover:border-yellow-500/30 transition-all group"
              >
                <div className={`bg-gradient-to-r ${section.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-black`}>
                  {section.icon}
                </div>
                <h3 className="text-xl font-black mb-2 uppercase tracking-tight">{section.title}</h3>
                <p className="text-white/60">{section.description}</p>
                <div className="flex items-center gap-2 mt-4 text-yellow-400 font-bold text-sm uppercase">
                  <span>Read More</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="getting-started" className="py-24 bg-gradient-to-b from-black to-yellow-500/5 relative overflow-hidden">
        <div className="absolute inset-0 noise pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tighter">
              QUICK
              <span className="gradient-text"> START</span>
            </h2>
            <p className="text-xl text-white/60">Get up and running in 3 commands</p>
          </motion.div>
          
          <div className="space-y-6">
            {codeExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong rounded-2xl overflow-hidden"
              >
                <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-black font-black text-sm">
                      {index + 1}
                    </span>
                    <span className="font-bold text-white">{example.title}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(example.code, index)}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors px-3 py-1 rounded-lg hover:bg-white/10"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-6 font-mono text-lg">
                  <span className="text-white/50">$ </span>
                  <span className="text-yellow-400">{example.code}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 glass rounded-2xl p-6 border-green-500/30"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-black text-green-400 mb-2">YOU'RE READY!</h3>
                <p className="text-white/70">
                  Your app is now running at <code className="bg-black/50 px-2 py-1 rounded text-yellow-400">http://localhost:3000</code>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* API Route Example */}
      <section id="routing" className="py-24 relative">
        <div className="absolute inset-0 noise pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tighter">
              FILE-BASED
              <span className="gradient-text"> ROUTING</span>
            </h2>
            <p className="text-xl text-white/60">Create a file. Get an API. That's it.</p>
          </motion.div>

          <div className="space-y-8">
            {/* File Path */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-5 h-5 text-yellow-400" />
                <span className="text-white/60">Create this file:</span>
              </div>
              <code className="text-lg font-mono text-yellow-400 bg-black/50 px-4 py-2 rounded-lg inline-block">
                src/routes/api/users.ts
              </code>
            </motion.div>

            {/* Code Example */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-strong rounded-2xl overflow-hidden"
            >
              <div className="flex items-center gap-2 px-6 py-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-white/60 font-mono text-sm">users.ts</span>
              </div>
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-white/90 leading-relaxed">
{`import { db } from '@packet/db'

const User = db.model('User', {
  name: { type: 'string', required: true },
  email: { type: 'string', required: true, unique: true }
})

export async function GET(req, res) {
  const users = await User.findAll()
  return res.json(users)
}

export async function POST(req, res) {
  const user = await User.create(req.body)
  return res.json(user)
}`}
                </pre>
              </div>
            </motion.div>

            {/* Result */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 border-green-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-green-400 mb-2">THAT'S IT!</h3>
                  <p className="text-white/70">
                    Your API is now live at <code className="bg-black/50 px-2 py-1 rounded text-yellow-400">/api/users</code>
                  </p>
                  <p className="text-white/50 mt-2 text-sm">
                    GET, POST, PUT, DELETE - all handled automatically based on your exports.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More Sections Preview */}
      <section className="py-24 bg-gradient-to-b from-black to-yellow-500/5 relative overflow-hidden">
        <div className="absolute inset-0 noise pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tighter">
              MORE
              <span className="gradient-text"> FEATURES</span>
            </h2>
            <p className="text-xl text-white/60">Everything you need, nothing you don't</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: 'database',
                icon: <Database className="w-6 h-6" />,
                title: 'Database',
                items: ['Type-safe ORM', 'Auto migrations', 'Seeding', 'Multiple DB support'],
                color: 'from-pink-400 to-purple-500',
              },
              {
                id: 'auth',
                icon: <Lock className="w-6 h-6" />,
                title: 'Authentication',
                items: ['JWT tokens', 'OAuth providers', 'Session management', 'Role-based access'],
                color: 'from-purple-400 to-indigo-500',
              },
              {
                id: 'git',
                icon: <GitBranch className="w-6 h-6" />,
                title: 'Git Workflows',
                items: ['Branch environments', 'Auto-deploy', 'PR previews', 'Rollbacks'],
                color: 'from-indigo-400 to-blue-500',
              },
              {
                id: 'deployment',
                icon: <Rocket className="w-6 h-6" />,
                title: 'Deployment',
                items: ['One command deploy', 'Docker support', 'Vercel/AWS/GCP', 'Edge functions'],
                color: 'from-blue-400 to-cyan-500',
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-8 hover:border-yellow-500/30 transition-all"
              >
                <div className={`bg-gradient-to-r ${section.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-black`}>
                  {section.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none">
              READY TO
              <br />
              <span className="gradient-text glow">BUILD?</span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-white/70 max-w-2xl mx-auto">
              Stop reading. Start shipping.
              <br />
              <span className="text-white font-bold">Your next project is one command away.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/pricing"
                className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-12 py-6 rounded-full font-black text-xl uppercase tracking-wide hover:scale-105 transition-all shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 overflow-hidden animate-pulse-glow"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
              
              <a
                href="https://github.com/packetsdk"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-10 py-6 rounded-full font-black text-xl uppercase tracking-wide hover:bg-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50 pt-4">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Free forever (v1.0)
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Full documentation
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
