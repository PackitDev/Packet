import { Users, MessageCircle, Github, Twitter, Youtube, Heart, Star, GitBranch } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CommunityPage() {
  const stats = [
    { label: 'Beta Testers', value: '50+', icon: <Users className="w-8 h-8" /> },
    { label: 'Countries', value: '15+', icon: <Star className="w-8 h-8" /> },
    { label: 'Apps Built', value: '30+', icon: <MessageCircle className="w-8 h-8" /> },
    { label: 'Active Users', value: '40+', icon: <GitBranch className="w-8 h-8" /> }
  ]

  const channels = [
    {
      name: 'Email',
      description: 'Get in touch for beta access, support, and feature requests.',
      icon: <MessageCircle className="w-12 h-12" />,
      link: '/contact',
      color: 'from-indigo-500 to-purple-500',
      members: 'Direct support'
    },
    {
      name: 'Documentation',
      description: 'Comprehensive guides, API reference, and tutorials.',
      icon: <Github className="w-12 h-12" />,
      link: '/docs',
      color: 'from-gray-700 to-gray-900',
      members: 'Full docs'
    },
    {
      name: 'Twitter',
      description: 'Follow for updates, tips, and announcements about Packet SDK.',
      icon: <Twitter className="w-12 h-12" />,
      link: 'https://twitter.com/packetsdk',
      color: 'from-blue-400 to-blue-600',
      members: 'Latest updates'
    },
    {
      name: 'YouTube',
      description: 'Watch tutorials, demos, and learn advanced techniques from video guides.',
      icon: <Youtube className="w-12 h-12" />,
      link: 'https://youtube.com/@packetsdk',
      color: 'from-red-500 to-red-700',
      members: 'Video guides'
    }
  ]

  const contributors = [
    { name: 'Creator', role: 'Solo Developer', contributions: 'Building Packet SDK', avatar: '🚀' },
    { name: 'Alex M.', role: 'Beta Tester', contributions: 'Early adopter', avatar: 'A' },
    { name: 'Sarah K.', role: 'Beta Tester', contributions: 'Feature feedback', avatar: 'S' },
    { name: 'Mike R.', role: 'Beta Tester', contributions: 'Bug reports', avatar: 'M' },
    { name: 'Emma L.', role: 'Beta Tester', contributions: 'Testing & feedback', avatar: 'E' },
    { name: 'James P.', role: 'Beta Tester', contributions: 'Early adopter', avatar: 'J' }
  ]

  const events = [
    {
      title: 'Beta Program',
      date: 'Now Open',
      time: 'Limited spots',
      description: 'Join the beta program to get early access and help shape the future of Packet SDK.'
    },
    {
      title: 'V1.0 Launch',
      date: 'Coming 2026',
      time: 'Q2 2026',
      description: 'Working toward the official v1.0 release. Beta testers get lifetime access!'
    },
    {
      title: 'Feature Updates',
      date: 'Weekly',
      time: 'Ongoing',
      description: 'Regular updates and improvements based on beta tester feedback.'
    }
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
              <span className="gradient-text">COMMUNITY</span>
            </h1>
            <p className="text-2xl text-white/70 font-semibold uppercase tracking-wide max-w-3xl mx-auto">
              JOIN THE BETA AND HELP SHAPE PACKET SDK
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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

      {/* Community Channels */}
      <section className="py-20 bg-gradient-to-b from-black to-yellow-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">CONNECT WITH US</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide">
              Choose your preferred platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {channels.map((channel, i) => (
              <motion.a
                key={i}
                href={channel.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 hover:border-yellow-500/30 transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div className={`bg-gradient-to-r ${channel.color} w-20 h-20 rounded-2xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                    {channel.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-3xl font-black mb-3 group-hover:text-yellow-400 transition-colors uppercase tracking-tight">
                      {channel.name}
                    </h3>
                    <p className="text-white/70 mb-4 leading-relaxed">
                      {channel.description}
                    </p>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-bold text-white/80">
                      <Users className="w-4 h-4" />
                      {channel.members}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Top Contributors */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">BETA CONTRIBUTORS</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide">
              Thank you to everyone helping test and improve Packet SDK
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contributors.map((contributor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 text-center hover:border-yellow-500/30 transition-all"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full flex items-center justify-center font-black text-black text-4xl mx-auto mb-6">
                  {contributor.avatar}
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">{contributor.name}</h3>
                <p className="text-yellow-400 font-bold uppercase text-sm mb-3">{contributor.role}</p>
                <p className="text-white/60 font-semibold">{contributor.contributions}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 bg-gradient-to-b from-black to-yellow-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">BETA ROADMAP</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide">
              What's happening with the beta
            </p>
          </motion.div>

          <div className="space-y-6">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-strong rounded-2xl p-8 hover:border-yellow-500/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-grow">
                    <h3 className="text-2xl font-black mb-2 uppercase tracking-tight gradient-text">
                      {event.title}
                    </h3>
                    <p className="text-white/70 mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-2 text-white/60 font-semibold">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-2 text-white/60 font-semibold">
                        <span className="w-2 h-2 bg-pink-400 rounded-full" />
                        {event.time}
                      </span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black px-8 py-4 rounded-full font-black uppercase tracking-wide hover:scale-105 transition-transform shadow-lg whitespace-nowrap">
                    Learn More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributing */}
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">WANT TO HELP?</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide mb-8">
              Contributions of all kinds are welcome
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Beta Testing', desc: 'Test features, report bugs, provide feedback' },
              { title: 'Feature Requests', desc: 'Suggest new features and improvements' },
              { title: 'Documentation', desc: 'Help improve docs and write guides' },
              { title: 'Share Experience', desc: 'Share your success stories and use cases' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 hover:border-yellow-500/30 transition-all"
              >
                <h3 className="text-xl font-black mb-2 uppercase tracking-tight gradient-text">
                  {item.title}
                </h3>
                <p className="text-white/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-12 py-6 rounded-full font-black text-xl uppercase tracking-wide hover:scale-105 transition-transform shadow-2xl"
            >
              Get in Touch →
            </a>
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
            <Heart className="w-20 h-20 text-pink-500 mx-auto mb-6" />
            <h2 className="text-5xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">JOIN THE COMMUNITY</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide mb-8">
              Be part of something amazing
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-12 py-6 rounded-full font-black text-xl uppercase tracking-wide hover:scale-105 transition-transform shadow-2xl"
            >
              Join Beta Now →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
