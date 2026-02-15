import { Book, Terminal, Code, Database, Lock, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DocsPage() {
  const sections = [
    {
      icon: <Terminal className="w-6 h-6" />,
      title: 'Getting Started',
      description: 'Install and create your first project',
      link: '#getting-started',
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Auto-Routing',
      description: 'File-system based routing guide',
      link: '#routing',
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Database',
      description: 'ORM, migrations, and queries',
      link: '#database',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Authentication',
      description: 'JWT, OAuth, and sessions',
      link: '#auth',
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Deployment',
      description: 'Deploy to any platform',
      link: '#deployment',
    },
    {
      icon: <Book className="w-6 h-6" />,
      title: 'API Reference',
      description: 'Complete API documentation',
      link: '#api',
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-500/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="gradient-text">Documentation</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need to build production-ready applications with Effec-t SDK
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <motion.a
                key={index}
                href={section.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors group"
              >
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-slate-400">{section.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section id="getting-started" className="py-24 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8">Getting Started</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Installation</h3>
              <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 font-mono text-sm">
                <div className="text-slate-400">$ <span className="text-cyan-400">npm install -g @effec-t/cli</span></div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Create a Project</h3>
              <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 font-mono text-sm">
                <div className="text-slate-400">$ <span className="text-cyan-400">effec-t create</span> my-app</div>
                <div className="text-slate-500 mt-2">? Select a template: <span className="text-white">Full-stack TypeScript</span></div>
                <div className="text-slate-500">? Choose a database: <span className="text-white">PostgreSQL</span></div>
                <div className="text-slate-500">? Choose authentication: <span className="text-white">JWT</span></div>
                <div className="text-green-400 mt-2">✓ Project created successfully!</div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Start Development</h3>
              <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 font-mono text-sm">
                <div className="text-slate-400">$ <span className="text-cyan-400">cd</span> my-app</div>
                <div className="text-slate-400">$ <span className="text-cyan-400">npm install</span></div>
                <div className="text-slate-400">$ <span className="text-cyan-400">npm run dev</span></div>
                <div className="text-blue-400 mt-2">→ Running on http://localhost:3000</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Code */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8">Quick Example</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-slate-300">Create an API Route</h3>
              <p className="text-slate-400 mb-4">
                Create a file at <code className="bg-slate-800 px-2 py-1 rounded">src/routes/api/users.ts</code>
              </p>
              <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-slate-300">
{`import { db } from '@effec-t/db'

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
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
              <p className="text-green-400 font-semibold mb-2">✓ That's it!</p>
              <p className="text-slate-300">
                Your API is now available at <code className="bg-slate-800 px-2 py-1 rounded">/api/users</code>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Get started with Effec-t SDK today
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all">
            Get Early Access
          </button>
        </div>
      </section>
    </div>
  )
}
