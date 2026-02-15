import { Link } from 'react-router-dom'
import { Zap, Code, Database, Lock, Rocket, GitBranch, TestTube, Package } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HomePage() {
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2">
              <Package className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">Early Access Available</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Build Production Apps
              <br />
              <span className="gradient-text">10x Faster</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-slate-400">
              The ultimate full-stack SDK for developers and teams. Skip the boilerplate, 
              focus on building features. From idea to production in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                Get Early Access - $49
              </Link>
              <Link
                to="/docs"
                className="bg-slate-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-700 transition-colors"
              >
                View Documentation
              </Link>
            </div>

            {/* Code Example */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16 max-w-3xl mx-auto"
            >
              <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
                <div className="bg-slate-800 px-4 py-2 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-slate-400 text-sm ml-2">terminal</span>
                </div>
                <div className="p-6 font-mono text-sm">
                  <div className="text-slate-400">$ <span className="text-cyan-400">effec-t create</span> my-app</div>
                  <div className="text-slate-500 mt-2">✓ Template: Full-stack TypeScript</div>
                  <div className="text-slate-500">✓ Database: PostgreSQL</div>
                  <div className="text-slate-500">✓ Auth: JWT</div>
                  <div className="text-green-400 mt-2">✓ Project created successfully!</div>
                  <div className="text-slate-400 mt-4">$ <span className="text-cyan-400">cd</span> my-app</div>
                  <div className="text-slate-400">$ <span className="text-cyan-400">npm run dev</span></div>
                  <div className="text-blue-400 mt-2">→ Running on http://localhost:3000</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-slate-400">
              A complete toolkit for modern full-stack development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors"
              >
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Difference</h2>
            <p className="text-xl text-slate-400">
              See how Effec-t compares to traditional development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Traditional Way */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-red-400">Traditional Way</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-slate-300">Days of setup and configuration</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-slate-300">Manual routing and middleware setup</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-slate-300">Complex authentication implementation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-slate-300">Deployment headaches</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-slate-300">Testing from scratch</span>
                </li>
              </ul>
            </div>

            {/* With Effec-t */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text">With Effec-t</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-slate-300">Project ready in 60 seconds</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-slate-300">Auto-routing based on file structure</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-slate-300">Authentication built-in and secure</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-slate-300">One-command deployment</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-slate-300">Testing utilities included</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Build Faster?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Join early access and get lifetime v1.0 access plus 50% off v2.0
          </p>
          <Link
            to="/pricing"
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            View Pricing
          </Link>
        </div>
      </section>
    </div>
  )
}
