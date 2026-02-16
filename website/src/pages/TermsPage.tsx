import { FileText, Scale, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing and using Packet SDK, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.'
    },
    {
      title: 'Use License',
      content: 'Permission is granted to temporarily download one copy of Packet SDK per license purchased for personal or commercial use. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose without a valid license; attempt to decompile or reverse engineer any software contained in Packet SDK; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or "mirror" the materials on any other server.'
    },
    {
      title: 'Account Responsibilities',
      content: 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.'
    },
    {
      title: 'Payment Terms',
      content: 'All fees are exclusive of taxes, levies, or duties imposed by taxing authorities. You are responsible for payment of all such taxes, levies, or duties. Refunds are available within 30 days of purchase if you are not satisfied with the product. After 30 days, all sales are final.'
    },
    {
      title: 'Intellectual Property',
      content: 'The service and its original content, features, and functionality are and will remain the exclusive property of Packet SDK and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks may not be used in connection with any product or service without our prior written consent.'
    },
    {
      title: 'User Content',
      content: 'You retain all rights to any content you submit, post, or display on or through the service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content.'
    },
    {
      title: 'Prohibited Uses',
      content: 'You may not use Packet SDK: for any unlawful purpose or to solicit others to perform unlawful acts; to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances; to infringe upon or violate our intellectual property rights or the intellectual property rights of others; to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate; to submit false or misleading information; to upload or transmit viruses or any other type of malicious code; to collect or track the personal information of others; to spam, phish, pharm, pretext, spider, crawl, or scrape; for any obscene or immoral purpose; or to interfere with or circumvent the security features of the service.'
    },
    {
      title: 'Service Availability',
      content: 'We strive to provide 99.9% uptime but do not guarantee that the service will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the service, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the service at any time without notice.'
    },
    {
      title: 'Disclaimer of Warranties',
      content: 'The service is provided on an "as is" and "as available" basis. Packet SDK makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.'
    },
    {
      title: 'Limitation of Liability',
      content: 'In no event shall Packet SDK or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Packet SDK, even if we have been notified of the possibility of such damage.'
    },
    {
      title: 'Indemnification',
      content: 'You agree to defend, indemnify, and hold harmless Packet SDK and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses arising from: your use of and access to the service; your violation of any term of these Terms; your violation of any third-party right, including without limitation any copyright, property, or privacy right.'
    },
    {
      title: 'Termination',
      content: 'We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease. If you wish to terminate your account, you may simply discontinue using the service.'
    },
    {
      title: 'Governing Law',
      content: 'These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.'
    },
    {
      title: 'Changes to Terms',
      content: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.'
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
              <span className="gradient-text">TERMS OF SERVICE</span>
            </h1>
            <p className="text-2xl text-white/70 font-semibold uppercase tracking-wide max-w-3xl mx-auto">
              PLEASE READ THESE TERMS CAREFULLY
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
            <Scale className="w-16 h-16 text-yellow-400 mx-auto mb-8" />
            <p className="text-xl text-white/80 leading-relaxed text-center mb-6">
              These Terms of Service ("Terms") govern your access to and use of Packet SDK's services, including our website, applications, and any related services (collectively, the "Service").
            </p>
            <p className="text-lg text-white/60 leading-relaxed text-center">
              By using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-20 bg-gradient-to-b from-black to-yellow-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4 tracking-tighter">
              <span className="gradient-text">QUICK SUMMARY</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide">
              Key points you should know
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 border-l-4 border-green-500"
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-black mb-2 text-white uppercase">You Can</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• Use Packet SDK for personal and commercial projects</li>
                    <li>• Deploy applications built with Packet SDK</li>
                    <li>• Modify your own application code</li>
                    <li>• Get support from our community and team</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 border-l-4 border-red-500"
            >
              <div className="flex items-start gap-4">
                <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-black mb-2 text-white uppercase">You Cannot</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• Reverse engineer or decompile Packet SDK</li>
                    <li>• Resell or redistribute Packet SDK</li>
                    <li>• Remove copyright or proprietary notices</li>
                    <li>• Use for illegal or harmful purposes</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4 tracking-tighter">
              <span className="gradient-text">FULL TERMS</span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-8 hover:border-yellow-500/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-pink-500 w-10 h-10 rounded-xl flex items-center justify-center text-black font-black flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight gradient-text">
                      {section.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-20 bg-gradient-to-b from-black to-yellow-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12 border-l-4 border-yellow-500"
          >
            <div className="flex items-start gap-6">
              <AlertTriangle className="w-12 h-12 text-yellow-400 flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-black mb-4 tracking-tighter gradient-text">
                  IMPORTANT NOTICE
                </h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  These terms constitute a legally binding agreement between you and Packet SDK. By using our service, you acknowledge that you have read, understood, and agree to be bound by these terms.
                </p>
                <p className="text-white/60 leading-relaxed">
                  If you have any questions about these Terms, please contact us at legal@packet.dev before using the service.
                </p>
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
            <FileText className="w-16 h-16 text-yellow-400 mx-auto mb-8" />
            <h2 className="text-4xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">QUESTIONS?</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="space-y-4 text-white/80">
              <p>
                <strong>Email:</strong> legal@packet.dev
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
