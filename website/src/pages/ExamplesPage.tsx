import { Code, GitBranch, ExternalLink, Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ExamplesPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const examples = [
    {
      id: 1,
      title: 'Todo App with Auth',
      description: 'Full-stack todo application with JWT authentication, PostgreSQL database, and React frontend.',
      tech: ['TypeScript', 'React', 'PostgreSQL', 'JWT'],
      repo: 'https://github.com/packetsdk/example-todo',
      demo: 'https://todo.packet.dev',
      command: 'packet create my-todo --template=todo-auth'
    },
    {
      id: 2,
      title: 'E-Commerce Store',
      description: 'Complete e-commerce platform with product catalog, shopping cart, checkout, and payment integration.',
      tech: ['TypeScript', 'React', 'MongoDB', 'Stripe'],
      repo: 'https://github.com/packetsdk/example-ecommerce',
      demo: 'https://store.packet.dev',
      command: 'packet create my-store --template=ecommerce'
    },
    {
      id: 3,
      title: 'Blog Platform',
      description: 'Modern blogging platform with markdown support, comments, tags, and author profiles.',
      tech: ['TypeScript', 'React', 'PostgreSQL', 'OAuth'],
      repo: 'https://github.com/packetsdk/example-blog',
      demo: 'https://blog.packet.dev',
      command: 'packet create my-blog --template=blog'
    },
    {
      id: 4,
      title: 'Real-Time Chat',
      description: 'WebSocket-based chat application with rooms, direct messages, and online presence.',
      tech: ['TypeScript', 'React', 'MongoDB', 'WebSocket'],
      repo: 'https://github.com/packetsdk/example-chat',
      demo: 'https://chat.packet.dev',
      command: 'packet create my-chat --template=chat'
    },
    {
      id: 5,
      title: 'SaaS Starter',
      description: 'Production-ready SaaS boilerplate with subscriptions, billing, team management, and admin dashboard.',
      tech: ['TypeScript', 'React', 'PostgreSQL', 'Stripe'],
      repo: 'https://github.com/packetsdk/example-saas',
      demo: 'https://saas.packet.dev',
      command: 'packet create my-saas --template=saas'
    },
    {
      id: 6,
      title: 'REST API',
      description: 'RESTful API with CRUD operations, pagination, filtering, and comprehensive documentation.',
      tech: ['TypeScript', 'PostgreSQL', 'JWT', 'Swagger'],
      repo: 'https://github.com/packetsdk/example-api',
      demo: 'https://api.packet.dev/docs',
      command: 'packet create my-api --template=rest-api'
    },
    {
      id: 7,
      title: 'GraphQL API',
      description: 'GraphQL server with type-safe queries, mutations, subscriptions, and Apollo integration.',
      tech: ['TypeScript', 'GraphQL', 'PostgreSQL', 'Apollo'],
      repo: 'https://github.com/packetsdk/example-graphql',
      demo: 'https://graphql.packet.dev',
      command: 'packet create my-graphql --template=graphql'
    },
    {
      id: 8,
      title: 'Social Network',
      description: 'Social media platform with posts, likes, comments, follows, and activity feeds.',
      tech: ['TypeScript', 'React', 'MongoDB', 'Redis'],
      repo: 'https://github.com/packetsdk/example-social',
      demo: 'https://social.packet.dev',
      command: 'packet create my-social --template=social'
    },
    {
      id: 9,
      title: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard with charts, metrics, and data visualization.',
      tech: ['TypeScript', 'React', 'PostgreSQL', 'Chart.js'],
      repo: 'https://github.com/packetsdk/example-analytics',
      demo: 'https://analytics.packet.dev',
      command: 'packet create my-analytics --template=analytics'
    }
  ]

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
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
              <span className="gradient-text">EXAMPLES</span>
            </h1>
            <p className="text-2xl text-white/70 font-semibold uppercase tracking-wide max-w-3xl mx-auto">
              PRODUCTION-READY TEMPLATES TO KICKSTART YOUR PROJECT
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-black/50 backdrop-blur-sm border-y-2 border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-black gradient-text mb-2">{examples.length}+</div>
              <div className="text-white/60 font-bold uppercase tracking-wide">Templates</div>
            </div>
            <div>
              <div className="text-5xl font-black gradient-text mb-2">100%</div>
              <div className="text-white/60 font-bold uppercase tracking-wide">Production Ready</div>
            </div>
            <div>
              <div className="text-5xl font-black gradient-text mb-2">60s</div>
              <div className="text-white/60 font-bold uppercase tracking-wide">Setup Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {examples.map((example, i) => (
              <motion.article
                key={example.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 hover:border-yellow-500/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-gradient-to-r from-yellow-400 to-pink-500 w-14 h-14 rounded-2xl flex items-center justify-center text-black group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg">
                    <Code className="w-7 h-7" />
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={example.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                      title="View Repository"
                    >
                      <GitBranch className="w-5 h-5 text-white/70" />
                    </a>
                    <a
                      href={example.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                      title="View Demo"
                    >
                      <ExternalLink className="w-5 h-5 text-white/70" />
                    </a>
                  </div>
                </div>

                <h3 className="text-2xl font-black mb-3 group-hover:text-yellow-400 transition-colors uppercase tracking-tight">
                  {example.title}
                </h3>
                
                <p className="text-white/70 mb-6 leading-relaxed">
                  {example.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {example.tech.map((tech, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-wide text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="bg-black/50 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <code className="text-yellow-400 font-mono text-sm flex-grow overflow-x-auto">
                      {example.command}
                    </code>
                    <button
                      onClick={() => copyToClipboard(example.command, example.id)}
                      className="flex-shrink-0 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                      title="Copy command"
                    >
                      {copiedId === example.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-white/70" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 bg-gradient-to-b from-black to-yellow-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">HOW TO USE</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'COPY COMMAND', desc: 'Click the copy button on any example above' },
              { step: '02', title: 'RUN IN TERMINAL', desc: 'Paste and run the command in your terminal' },
              { step: '03', title: 'START BUILDING', desc: 'Your project is ready with everything configured' }
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
                <div className="relative z-10 glass-strong rounded-3xl p-8 text-center">
                  <h3 className="text-2xl font-black mb-4 gradient-text">{item.title}</h3>
                  <p className="text-white/70 text-lg">{item.desc}</p>
                </div>
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
              <span className="gradient-text">WANT MORE EXAMPLES?</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide mb-8">
              Check out our GitHub for more templates and examples
            </p>
            <a
              href="https://github.com/packetsdk/examples"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-12 py-6 rounded-full font-black text-xl uppercase tracking-wide hover:scale-105 transition-transform shadow-2xl"
            >
              Browse All Examples →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
