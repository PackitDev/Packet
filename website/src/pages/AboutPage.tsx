import { Target, Zap, User, Globe, Rocket, Heart, Code, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutPage() {
  const values = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Speed First',
      description: 'I believe developers should spend time building features, not configuring tools.'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Developer Experience',
      description: 'Every decision prioritizes making developers\' lives easier and more productive.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Quality First',
      description: 'Committed to delivering a polished, production-ready developer experience.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Constantly pushing boundaries to deliver cutting-edge solutions to modern problems.'
    }
  ]

  const milestones = [
    { year: '2024', title: 'Idea', description: 'Frustrated with setup overhead, decided to build a better solution' },
    { year: '2025', title: 'Alpha Release', description: 'Launched alpha version to select early testers for feedback' },
    { year: '2025', title: 'Beta Launch', description: 'Currently in beta with 50+ developers testing worldwide' },
    { year: '2026', title: 'V1.0 Coming', description: 'Working toward official v1.0 release with full feature set' }
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
              <span className="gradient-text">ABOUT</span>
            </h1>
            <p className="text-2xl text-white/70 font-semibold uppercase tracking-wide max-w-3xl mx-auto">
              BUILDING THE FUTURE OF FULL-STACK DEVELOPMENT
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12 text-center"
          >
            <Target className="w-20 h-20 text-yellow-400 mx-auto mb-8" />
            <h2 className="text-5xl font-black mb-8 tracking-tighter">
              <span className="gradient-text">THE MISSION</span>
            </h2>
            <p className="text-2xl text-white/80 leading-relaxed mb-6">
              To eliminate the friction between having an idea and shipping it to production.
            </p>
            <p className="text-xl text-white/60 leading-relaxed">
              Every developer should be able to go from zero to a production-ready application in under 60 seconds. No configuration. No boilerplate. No wasted time. Just pure building.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-gradient-to-b from-black to-yellow-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">THE STORY</span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight gradient-text">The Problem</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                After building my fifth startup, I realized I was spending days—sometimes weeks—on the same setup tasks: configuring authentication, setting up databases, implementing routing, configuring deployment pipelines. The actual product features? Those came later, if I had energy left.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight gradient-text">The Realization</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                Every modern web application needs the same core features: auth, database, routing, deployment, testing. Why was I rebuilding these from scratch every single time? Why wasn't there a tool that just gave me everything, configured and ready to go?
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight gradient-text">The Solution</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                I built Packet SDK—the tool I wished existed. One command to create a production-ready application with everything included. No configuration files. No setup guides. No wasted time. Just instant productivity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">CORE VALUES</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide">
              What drives this project
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 hover:border-yellow-500/30 transition-all"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center text-black mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{value.title}</h3>
                <p className="text-white/70 text-lg leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-b from-black to-yellow-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">THE JOURNEY</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide">
              From idea to beta
            </p>
          </motion.div>

          <div className="space-y-6">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl font-black text-black">{milestone.year}</span>
                </div>
                <div className="flex-grow glass rounded-2xl p-6">
                  <h3 className="text-2xl font-black mb-2 uppercase tracking-tight gradient-text">
                    {milestone.title}
                  </h3>
                  <p className="text-white/70 text-lg">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">SOLO DEVELOPER</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide">
              Built with passion by one developer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12 text-center"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full flex items-center justify-center font-black text-black text-6xl mx-auto mb-8">
              <User className="w-16 h-16" />
            </div>
            <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">INDIE DEVELOPER</h3>
            <p className="text-yellow-400 font-bold uppercase text-lg mb-6">Creator & Maintainer</p>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Full-stack developer with years of experience building production apps. Got tired of the setup overhead and decided to build the tool I always wished existed. Currently working on Packet SDK full-time to make developers' lives easier.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/60">
              <span className="px-4 py-2 bg-white/5 rounded-full text-sm font-bold">TypeScript</span>
              <span className="px-4 py-2 bg-white/5 rounded-full text-sm font-bold">React</span>
              <span className="px-4 py-2 bg-white/5 rounded-full text-sm font-bold">Node.js</span>
              <span className="px-4 py-2 bg-white/5 rounded-full text-sm font-bold">DevOps</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-b from-black to-yellow-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <User className="w-8 h-8" />, value: '50+', label: 'Beta Users' },
              { icon: <Globe className="w-8 h-8" />, value: '15+', label: 'Countries' },
              { icon: <Rocket className="w-8 h-8" />, value: '30+', label: 'Apps Built' },
              { icon: <Heart className="w-8 h-8" />, value: '100%', label: 'Passion' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 text-center hover:border-yellow-500/30 transition-all"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center text-black mx-auto mb-6">
                  {stat.icon}
                </div>
                <div className="text-5xl font-black gradient-text mb-2">{stat.value}</div>
                <div className="text-white/60 font-bold uppercase tracking-wide">{stat.label}</div>
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
              <span className="gradient-text">JOIN THE BETA</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide mb-8">
              Help shape the future of Packet SDK
            </p>
            <a
              href="/pricing"
              className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-12 py-6 rounded-full font-black text-xl uppercase tracking-wide hover:scale-105 transition-transform shadow-2xl"
            >
              Get Started Today →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
