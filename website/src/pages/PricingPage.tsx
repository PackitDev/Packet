import { Check, Zap, Star, Crown, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PricingPage() {
  const plans = [
    {
      name: 'Early Access',
      price: '$49',
      period: 'one-time',
      badge: 'Limited Time',
      badgeColor: 'bg-purple-500',
      icon: <Sparkles className="w-6 h-6" />,
      description: 'Get in early and save big on future versions',
      features: [
        'Full beta access',
        'Lifetime v1.0 access',
        '50% discount on v2.0 ($49 instead of $99)',
        'Priority support',
        'Early feature access',
        'Influence roadmap',
        'All v1.0 features included',
        'Community Discord access',
      ],
      cta: 'Get Early Access',
      popular: true,
    },
    {
      name: 'v1.0',
      price: 'FREE',
      period: 'forever',
      badge: 'After Launch',
      badgeColor: 'bg-green-500',
      icon: <Zap className="w-6 h-6" />,
      description: 'Full-featured, completely free after early access',
      features: [
        'All core features',
        'CLI tools',
        'Auto-routing',
        'Authentication (JWT, OAuth)',
        'Database ORM',
        'Git workflows',
        'Deployment tools',
        'Testing framework',
        'Community support',
      ],
      cta: 'Coming Soon',
      popular: false,
    },
    {
      name: 'v2.0',
      price: '$99',
      period: 'one-time',
      badge: 'Future',
      badgeColor: 'bg-blue-500',
      icon: <Star className="w-6 h-6" />,
      description: 'Next generation features and capabilities',
      features: [
        'Everything in v1.0',
        'GraphQL support',
        'Real-time subscriptions',
        'Advanced monitoring',
        'Database GUI',
        'Team collaboration tools',
        'Advanced deployment options',
        'Priority support',
        '$49 for early access users',
      ],
      cta: 'Roadmap',
      popular: false,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      badge: 'Custom',
      badgeColor: 'bg-orange-500',
      icon: <Crown className="w-6 h-6" />,
      description: 'Tailored solutions for large teams',
      features: [
        'All features from latest version',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantees',
        'Training & onboarding',
        'Custom deployment',
        'Security audits',
        'Volume licensing',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  const versionLifecycle = [
    {
      version: 'v1.0',
      status: 'FREE',
      description: 'Fully featured, completely free',
      color: 'text-green-400',
    },
    {
      version: 'v2.0',
      status: 'PAID ($99)',
      description: 'Latest features and updates',
      color: 'text-blue-400',
    },
    {
      version: 'v3.0',
      status: 'PAID ($149)',
      description: 'When released, v2.0 gets security updates',
      color: 'text-purple-400',
    },
    {
      version: 'v4.0',
      status: 'PAID ($199)',
      description: 'When released, v2.0 becomes FREE, v1.0 becomes LEGACY ($29)',
      color: 'text-orange-400',
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-32 min-h-[60vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-huge font-black mb-8 tracking-tighter leading-none">
              SIMPLE.
              <br />
              <span className="gradient-text">TRANSPARENT.</span>
              <br />
              PRICING.
            </h1>
            <p className="text-2xl sm:text-3xl text-white/70 max-w-3xl mx-auto font-bold uppercase tracking-wide leading-relaxed">
              PAY ONCE. OWN FOREVER.<br />NO SUBSCRIPTIONS. NO HIDDEN FEES.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-slate-800/50 border rounded-lg p-8 ${
                  plan.popular
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20 scale-105'
                    : 'border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Best Value
                    </span>
                  </div>
                )}

                <div className={`inline-flex items-center space-x-2 ${plan.badgeColor} rounded-full px-3 py-1 text-xs font-semibold mb-4`}>
                  {plan.icon}
                  <span>{plan.badge}</span>
                </div>

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-400 ml-2">{plan.period}</span>
                </div>
                <p className="text-slate-400 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50'
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Version Lifecycle */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Version Lifecycle</h2>
            <p className="text-xl text-slate-400">
              Understand how our perpetual licensing model works
            </p>
          </div>

          <div className="space-y-6">
            {versionLifecycle.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.version}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                  <div className={`text-2xl font-bold ${item.color}`}>
                    {item.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2 text-blue-400">How It Works</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• <strong>Current Version:</strong> Always paid (except v1.0 which is free)</li>
              <li>• <strong>Previous Version:</strong> Receives security and maintenance updates</li>
              <li>• <strong>Two Versions Back:</strong> Becomes completely FREE</li>
              <li>• <strong>Three Versions Back:</strong> Moves to LEGACY status ($29 one-time)</li>
              <li>• <strong>Early Access Users:</strong> Get 50% off ALL future versions forever</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: 'What happens after I buy early access?',
                a: 'You get immediate access to the beta, lifetime v1.0 access when it launches, and 50% off v2.0 ($49 instead of $99). You also get priority support and can influence the roadmap.',
              },
              {
                q: 'Is v1.0 really free?',
                a: 'Yes! After the early access period ends, v1.0 will be completely free with all features included. No limitations, no trial period.',
              },
              {
                q: 'Do I need to upgrade to v2.0?',
                a: 'No. v1.0 will continue to receive security updates and work perfectly. Upgrade only if you want the new v2.0 features like GraphQL, real-time, and advanced monitoring.',
              },
              {
                q: 'What is the legacy version?',
                a: 'When a version becomes three releases old (e.g., v1.0 when v4.0 releases), it moves to legacy status. You can still download and use it for a one-time $29 fee.',
              },
              {
                q: 'Can I use this commercially?',
                a: 'Yes! All licenses (including the free v1.0) can be used for commercial projects with no restrictions.',
              },
              {
                q: 'What about team licenses?',
                a: 'Each developer needs their own license. For teams of 10+, contact us for volume pricing and enterprise features.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2">{faq.q}</h3>
                <p className="text-slate-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Join early access now and lock in the best pricing forever
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            Get Early Access - $49
          </button>
          <p className="text-slate-400 mt-4 text-sm">
            One-time payment • No subscription • Lifetime access
          </p>
        </div>
      </section>
    </div>
  )
}
