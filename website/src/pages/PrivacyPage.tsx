import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Information We Collect',
      content: [
        'Account information (name, email, password)',
        'Usage data and analytics',
        'Device and browser information',
        'Payment information (processed securely via Stripe)',
        'Cookies and tracking technologies'
      ]
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'How We Use Your Information',
      content: [
        'Provide and improve our services',
        'Process transactions and send notifications',
        'Respond to customer support requests',
        'Send marketing communications (with your consent)',
        'Detect and prevent fraud and abuse',
        'Comply with legal obligations'
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Data Security',
      content: [
        'Industry-standard encryption (TLS/SSL)',
        'Secure data centers with 24/7 monitoring',
        'Regular security audits and penetration testing',
        'Access controls and authentication',
        'Encrypted backups and disaster recovery',
        'Employee training on data protection'
      ]
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: 'Your Rights',
      content: [
        'Access your personal data',
        'Correct inaccurate information',
        'Request data deletion',
        'Export your data',
        'Opt-out of marketing communications',
        'Lodge a complaint with authorities'
      ]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Data Sharing',
      content: [
        'We do not sell your personal information',
        'Service providers (hosting, analytics, payment processing)',
        'Legal requirements and law enforcement',
        'Business transfers (mergers, acquisitions)',
        'With your explicit consent'
      ]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Data Retention',
      content: [
        'Active accounts: data retained while account is active',
        'Deleted accounts: data removed within 30 days',
        'Legal obligations: retained as required by law',
        'Backups: securely deleted within 90 days',
        'Analytics: anonymized after 12 months'
      ]
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
              <span className="gradient-text">PRIVACY POLICY</span>
            </h1>
            <p className="text-2xl text-white/70 font-semibold uppercase tracking-wide max-w-3xl mx-auto">
              YOUR PRIVACY IS OUR PRIORITY
            </p>
            <p className="text-white/60 font-semibold">
              Last Updated: February 15, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12"
          >
            <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-8" />
            <p className="text-xl text-white/80 leading-relaxed text-center mb-6">
              At Packet SDK, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
            </p>
            <p className="text-lg text-white/60 leading-relaxed text-center">
              By using Packet SDK, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-20 bg-gradient-to-b from-black to-yellow-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 hover:border-yellow-500/30 transition-all"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center text-black mb-6">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-black mb-6 uppercase tracking-tight gradient-text">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.content.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="text-yellow-400 font-black text-lg flex-shrink-0">•</span>
                      <span className="text-white/70 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GDPR & CCPA Compliance */}
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4 tracking-tighter">
              <span className="gradient-text">COMPLIANCE</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide">
              We comply with international privacy regulations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-strong rounded-2xl p-8"
            >
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight gradient-text">
                GDPR (EU)
              </h3>
              <p className="text-white/70 leading-relaxed mb-4">
                We comply with the General Data Protection Regulation for users in the European Union.
              </p>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Right to access and portability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Right to rectification and erasure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Right to object and restrict processing</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-strong rounded-2xl p-8"
            >
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight gradient-text">
                CCPA (California)
              </h3>
              <p className="text-white/70 leading-relaxed mb-4">
                We comply with the California Consumer Privacy Act for California residents.
              </p>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Right to know what data we collect</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Right to delete personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Right to opt-out of data sales</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cookies */}
      <section className="py-20 bg-gradient-to-b from-black to-yellow-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12"
          >
            <h2 className="text-4xl font-black mb-8 tracking-tighter text-center">
              <span className="gradient-text">COOKIES & TRACKING</span>
            </h2>
            <div className="space-y-6 text-white/70 leading-relaxed">
              <p>
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-black mb-3 text-white uppercase">Essential Cookies</h3>
                  <p className="text-sm">Required for the website to function properly. Cannot be disabled.</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-black mb-3 text-white uppercase">Analytics Cookies</h3>
                  <p className="text-sm">Help us understand how visitors use our website. Can be disabled.</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-black mb-3 text-white uppercase">Marketing Cookies</h3>
                  <p className="text-sm">Used to deliver relevant ads. Can be disabled in settings.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12 text-center"
          >
            <h2 className="text-4xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">QUESTIONS?</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-4 text-white/80">
              <p>
                <strong>Email:</strong> privacy@packet.dev
              </p>
              <p>
                <strong>Address:</strong> 123 Market Street, Suite 400, San Francisco, CA 94103
              </p>
            </div>
            <div className="mt-8">
              <a
                href="/contact"
                className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-12 py-4 rounded-full font-black uppercase tracking-wide hover:scale-105 transition-transform shadow-lg"
              >
                Contact Us →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
