import { Book, Terminal, Code, Database, Lock, Rocket, Copy, Check, AlertTriangle, Package, Wrench, Zap, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function DocsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const platforms = [
    { name: 'Windows', code: '.\\packet-windows-x64.exe', icon: '🪟', file: 'packet-windows-x64.exe' },
    { name: 'macOS (Intel)', code: './packet-macos-x64', icon: '🍎', file: 'packet-macos-x64' },
    { name: 'macOS (M1/M2/M3)', code: './packet-macos-arm64', icon: '🍎', file: 'packet-macos-arm64' },
    { name: 'Linux', code: './packet-linux-x64', icon: '🐧', file: 'packet-linux-x64' },
  ]

  const quickStartSteps = [
    { title: 'Download executable', code: '# Get it from /dashboard/downloads' },
    { title: 'Make executable (Unix)', code: 'chmod +x packet-macos-arm64' },
    { title: 'Activate license', code: './packet-macos-arm64 license YOUR-KEY' },
    { title: 'Create project', code: './packet-macos-arm64 create my-app' },
    { title: 'Start dev server', code: 'cd my-app && ../packet-macos-arm64 dev' },
    { title: 'Open in browser', code: '# Visit http://localhost:3000' },
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
              REAL.
              <br />
              <span className="gradient-text glow">DOCS.</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              No fluff. Just the information you actually need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Installation */}
      <section id="installation" className="py-16 relative">
        <div className="absolute inset-0 noise pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl font-black tracking-tighter">INSTALLATION</h2>
            </div>
            <p className="text-white/60 text-lg">No Node.js or npm required - just download and run:</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-2xl p-8 border-2 border-green-500/30 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-black text-green-400 mb-2 uppercase tracking-tight">Standalone Executables</h3>
                <p className="text-white/70 mb-4">
                  Download a single file (~45 MB) with everything included. No installation, no dependencies.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="text-sm bg-green-500/10 text-green-400 px-3 py-1 rounded-full">✓ No Node.js</span>
                  <span className="text-sm bg-green-500/10 text-green-400 px-3 py-1 rounded-full">✓ No npm</span>
                  <span className="text-sm bg-green-500/10 text-green-400 px-3 py-1 rounded-full">✓ Works offline</span>
                  <span className="text-sm bg-green-500/10 text-green-400 px-3 py-1 rounded-full">✓ Portable</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all"
              >
                <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{platform.icon}</span>
                    <span className="font-bold text-white">{platform.name}</span>
                  </div>
                  <a
                    href={`/downloads/standalone/${platform.file}`}
                    download
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors px-3 py-1 rounded-lg hover:bg-white/10"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
                <div className="p-6 font-mono text-sm">
                  <span className="text-white/50">$ </span>
                  <span className="text-yellow-400">{platform.code} create my-app</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quick-start" className="py-24 bg-gradient-to-b from-black to-yellow-500/5 relative overflow-hidden">
        <div className="absolute inset-0 noise pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl font-black tracking-tighter">QUICK START</h2>
            </div>
            <p className="text-white/60 text-lg">From zero to deployed in 5 commands:</p>
          </motion.div>
          
          <div className="space-y-4">
            {quickStartSteps.map((step, index) => (
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
                    <span className="font-bold text-white">{step.title}</span>
                  </div>
                  {!step.code.startsWith('#') && (
                    <button
                      onClick={() => copyToClipboard(step.code, index + 100)}
                      className="flex items-center gap-2 text-white/60 hover:text-white transition-colors px-3 py-1 rounded-lg hover:bg-white/10"
                    >
                      {copiedIndex === index + 100 ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
                <div className="p-6 font-mono text-lg">
                  {step.code.startsWith('#') ? (
                    <span className="text-green-400">{step.code}</span>
                  ) : (
                    <>
                      <span className="text-white/50">$ </span>
                      <span className="text-yellow-400">{step.code}</span>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

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
                <h3 className="text-xl font-black text-green-400 mb-2">YOU'RE LIVE!</h3>
                <p className="text-white/70">
                  Your app is running with hot reload, TypeScript, and all modules enabled.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="py-24 relative">
        <div className="absolute inset-0 noise pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl font-black tracking-tighter">MODULES</h2>
            </div>
            <p className="text-white/60 text-lg">Everything you need, nothing you don't:</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Code className="w-6 h-6" />,
                name: '@packet/router',
                description: 'File-based routing',
                config: 'Auto-enabled. Drop files in src/routes/',
                color: 'from-yellow-400 to-orange-500',
              },
              {
                icon: <Database className="w-6 h-6" />,
                name: '@packet/db',
                description: 'Type-safe ORM',
                config: 'packet.config.js → db: { provider: "postgres" }',
                color: 'from-orange-400 to-pink-500',
              },
              {
                icon: <Lock className="w-6 h-6" />,
                name: '@packet/auth',
                description: 'Authentication',
                config: 'packet.config.js → auth: { jwt: true }',
                color: 'from-pink-400 to-purple-500',
              },
              {
                icon: <Rocket className="w-6 h-6" />,
                name: '@packet/deploy',
                description: 'One-click deploy',
                config: 'packet deploy <platform>',
                color: 'from-purple-400 to-indigo-500',
              },
            ].map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 hover:border-yellow-500/30 transition-all"
              >
                <div className={`bg-gradient-to-r ${module.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-black`}>
                  {module.icon}
                </div>
                <h3 className="text-xl font-black mb-2 font-mono">{module.name}</h3>
                <p className="text-white/60 mb-3">{module.description}</p>
                <code className="text-xs bg-black/50 px-3 py-2 rounded-lg block text-yellow-400">
                  {module.config}
                </code>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section id="examples" className="py-24 bg-gradient-to-b from-black to-yellow-500/5 relative overflow-hidden">
        <div className="absolute inset-0 noise pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl font-black tracking-tighter">CODE EXAMPLES</h2>
            </div>
            <p className="text-white/60 text-lg">What Packet code actually looks like:</p>
          </motion.div>

          <div className="space-y-8">
            {/* API Route */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-strong rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-white/60 font-mono text-sm">src/routes/api/users.ts</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold">API ROUTE</span>
              </div>
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-white/90 leading-relaxed">
{`import { db } from '@packet/db'

export async function GET(req, res) {
  const users = await db.users.findMany()
  return res.json(users)
}

export async function POST(req, res) {
  const user = await db.users.create(req.body)
  return res.json(user)
}`}
                </pre>
              </div>
            </motion.div>

            {/* Database Query */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-strong rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-white/60 font-mono text-sm">Type-safe database queries</span>
                <span className="text-xs bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full font-bold">DATABASE</span>
              </div>
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-white/90 leading-relaxed">
{`import { db } from '@packet/db'

// Find with filters
const activeUsers = await db.users.findMany({
  where: { active: true },
  include: { posts: true }
})

// Type-safe updates
await db.users.update({
  where: { id: 1 },
  data: { email: 'new@email.com' }
})`}
                </pre>
              </div>
            </motion.div>

            {/* Auth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-strong rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-white/60 font-mono text-sm">Protected routes</span>
                <span className="text-xs bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full font-bold">AUTH</span>
              </div>
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-white/90 leading-relaxed">
{`import { requireAuth } from '@packet/auth'

export const middleware = [requireAuth]

export async function GET(req, res) {
  // req.user is automatically populated
  const { user } = req
  return res.json({ message: \`Hello \${user.name}\` })
}`}
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deployment */}
      <section id="deployment" className="py-24 relative">
        <div className="absolute inset-0 noise pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl font-black tracking-tighter">DEPLOYMENT</h2>
            </div>
            <p className="text-white/60 text-lg">One command per platform:</p>
          </motion.div>

          <div className="space-y-4">
            {[
              { platform: 'Vercel', cmd: 'packet deploy vercel', note: 'Serverless, edge functions' },
              { platform: 'Railway', cmd: 'packet deploy railway', note: 'Full-stack, PostgreSQL included' },
              { platform: 'Fly.io', cmd: 'packet deploy fly', note: 'Global edge deployment' },
              { platform: 'Docker', cmd: 'packet deploy docker', note: 'Containerized, self-hosted' },
              { platform: 'AWS', cmd: 'packet deploy aws', note: 'Lambda + RDS setup' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-2xl p-6 hover:border-yellow-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black">{item.platform}</h3>
                  <button
                    onClick={() => copyToClipboard(item.cmd, index + 200)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {copiedIndex === index + 200 ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <code className="text-sm bg-black/50 px-3 py-2 rounded-lg block text-yellow-400 mb-2">
                  $ {item.cmd}
                </code>
                <p className="text-white/50 text-sm">{item.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section id="limitations" className="py-24 bg-gradient-to-b from-black to-red-500/5 relative overflow-hidden">
        <div className="absolute inset-0 noise pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <h2 className="text-4xl font-black tracking-tighter">LIMITATIONS</h2>
            </div>
            <p className="text-white/60 text-lg">When NOT to use Packet:</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                title: "You need GraphQL",
                reason: "Packet is REST-first. GraphQL support coming in v2.0",
              },
              {
                title: "You need real-time/WebSockets",
                reason: "No built-in WebSocket support yet. Use Socket.io separately",
              },
              {
                title: "You're building a static site",
                reason: "Use Next.js, Astro, or 11ty instead. Packet is for full-stack apps",
              },
              {
                title: "You need microservices",
                reason: "Packet is monolithic. For microservices, use separate services",
              },
              {
                title: "You need extreme customization",
                reason: "Packet is opinionated. If you need full control, use Express directly",
              },
              {
                title: "You're working with legacy code",
                reason: "Packet is for greenfield projects. Migration tools coming later",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-2xl p-6 border-red-500/20 hover:border-red-500/40 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 font-black">✗</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-red-400 mb-1">{item.title}</h3>
                    <p className="text-white/60">{item.reason}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 glass rounded-2xl p-8 border-yellow-500/30"
          >
            <h3 className="text-2xl font-black gradient-text mb-4">THE SWEET SPOT</h3>
            <p className="text-white/70 text-lg leading-relaxed">
              Packet is perfect for: <span className="text-white font-bold">SaaS apps, APIs, dashboards, CRUD apps, MVPs, side projects, and startups</span> that need to ship fast without sacrificing quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-pink-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 noise pointer-events-none" />
        
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
              Get early access and start shipping faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="/pricing"
                className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-12 py-6 rounded-full font-black text-xl uppercase tracking-wide hover:scale-105 transition-all shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 overflow-hidden animate-pulse-glow inline-flex items-center justify-center gap-2"
              >
                Get Early Access
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
