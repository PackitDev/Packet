import { Mail, MessageCircle, Twitter, Github, Send, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email',
      value: 'hello@packet.dev',
      link: 'mailto:hello@packet.dev',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Discord',
      value: 'Join our community',
      link: 'https://discord.gg/packetsdk',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: <Twitter className="w-8 h-8" />,
      title: 'Twitter',
      value: '@packetsdk',
      link: 'https://twitter.com/packetsdk',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: <Github className="w-8 h-8" />,
      title: 'GitHub',
      value: 'packetsdk/packet',
      link: 'https://github.com/packetsdk/packet',
      color: 'from-gray-700 to-gray-900'
    }
  ]

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Market Street, Suite 400',
      country: 'USA'
    },
    {
      city: 'London',
      address: '456 Tech Avenue, Floor 5',
      country: 'UK'
    },
    {
      city: 'Tokyo',
      address: '789 Innovation District',
      country: 'Japan'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
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
              <span className="gradient-text">CONTACT US</span>
            </h1>
            <p className="text-2xl text-white/70 font-semibold uppercase tracking-wide max-w-3xl mx-auto">
              GET IN TOUCH
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactMethods.map((method, i) => (
              <motion.a
                key={i}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : undefined}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 text-center hover:border-yellow-500/30 transition-all group"
              >
                <div className={`bg-gradient-to-r ${method.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-black mb-2 uppercase tracking-tight group-hover:text-yellow-400 transition-colors">
                  {method.title}
                </h3>
                <p className="text-white/60 font-semibold">{method.value}</p>
              </motion.a>
            ))}
          </div>

          {/* Contact Form & Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-strong rounded-3xl p-8"
            >
              <h2 className="text-3xl font-black mb-6 uppercase tracking-tight gradient-text">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wide text-white/80 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-white/50 font-semibold focus:outline-none focus:border-yellow-500/50 transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wide text-white/80 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-white/50 font-semibold focus:outline-none focus:border-yellow-500/50 transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-bold uppercase tracking-wide text-white/80 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-white/50 font-semibold focus:outline-none focus:border-yellow-500/50 transition-colors"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wide text-white/80 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-white/50 font-semibold focus:outline-none focus:border-yellow-500/50 transition-colors resize-none"
                    placeholder="Tell us more..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-8 py-4 rounded-full font-black uppercase tracking-wide hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Office Locations */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-strong rounded-3xl p-8"
              >
                <h2 className="text-3xl font-black mb-6 uppercase tracking-tight gradient-text">
                  Our Offices
                </h2>
                <div className="space-y-6">
                  {offices.map((office, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-yellow-400 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center text-black flex-shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black mb-1 uppercase tracking-tight">{office.city}</h3>
                        <p className="text-white/60 text-sm">{office.address}</p>
                        <p className="text-white/60 text-sm">{office.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Support Hours */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-strong rounded-3xl p-8"
              >
                <h2 className="text-3xl font-black mb-6 uppercase tracking-tight gradient-text">
                  Support Hours
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-bold">Monday - Friday</span>
                    <span className="text-yellow-400 font-bold">9 AM - 6 PM EST</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-bold">Saturday</span>
                    <span className="text-yellow-400 font-bold">10 AM - 4 PM EST</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-bold">Sunday</span>
                    <span className="text-white/40 font-bold">Closed</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-white/60 text-sm">
                    For urgent issues outside business hours, please send an email and I'll respond as soon as possible.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-20 bg-gradient-to-b from-black to-yellow-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4 tracking-tighter">
              <span className="gradient-text">LOOKING FOR QUICK ANSWERS?</span>
            </h2>
            <p className="text-lg text-white/70 font-semibold uppercase tracking-wide">
              Check out these resources first
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Documentation', desc: 'Comprehensive guides and API reference', link: '/docs' },
              { title: 'Guides', desc: 'Step-by-step tutorials', link: '/guides' },
              { title: 'Community', desc: 'Ask questions and get help', link: '/community' }
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 hover:border-yellow-500/30 transition-all group"
              >
                <h3 className="text-xl font-black mb-2 uppercase tracking-tight group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/60">{item.desc}</p>
              </motion.a>
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
              <span className="gradient-text">INTERESTED IN BETA?</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide mb-8">
              Get early access to Packet SDK
            </p>
            <a
              href="/pricing"
              className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-12 py-6 rounded-full font-black text-xl uppercase tracking-wide hover:scale-105 transition-transform shadow-2xl"
            >
              Join Beta →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
