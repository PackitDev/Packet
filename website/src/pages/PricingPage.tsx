import { Check, Zap, Star, Crown, Sparkles, ArrowRight, Shield, Clock, Users, Gift, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const plans = [
    {
      name: 'Early Access',
      price: '$49',
      originalPrice: '$99',
      period: 'one-time',
      badge: 'SAVE 50%',
      badgeColor: 'from-yellow-400 to-orange-500',
      icon: <Sparkles className="w-6 h-6" />,
      description: 'Lock in the best price forever',
      features: [
        { text: 'Full beta access', highlight: true },
        { text: 'Lifetime v1.0 access', highlight: true },
        { text: '50% off ALL future versions', highlight: true },
        { text: 'Priority support', highlight: false },
        { text: 'Early feature access', highlight: false },
        { text: 'Influence roadmap', highlight: false },
        { text: 'Discord community', highlight: false },
        { text: 'All v1.0 features', highlight: false },
      ],
      cta: 'Get Early Access',
      popular: true,
      gradient: 'from-yellow-400 via-orange-500 to-pink-500',
    },
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      badge: 'AFTER LAUNCH',
      badgeColor: 'from-green-400 to-emerald-500',
      icon: <Zap className="w-6 h-6" />,
      description: 'Full-featured, no strings attached',
      features: [
        { text: 'All core features', highlight: false },
        { text: 'CLI tools', highlight: false },
        { text: 'Auto-routing', highlight: false },
        { text: 'Authentication', highlight: false },
        { text: 'Database ORM', highlight: false },
        { text: 'Git workflows', highlight: false },
        { text: 'Deployment tools', highlight: false },
        { text: 'Community support', highlight: false },
      ],
      cta: 'Coming Soon',
      popular: false,
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      name: 'Pro',
      price: '$99',
      period: 'one-time',
      badge: 'v2.0',
      badgeColor: 'from-blue-400 to-indigo-500',
      icon: <Star className="w-6 h-6" />,
      description: 'Advanced features for power users',
      features: [
        { text: 'Everything in Free', highlight: false },
        { text: 'GraphQL support', highlight: true },
        { text: 'Real-time subscriptions', highlight: true },
        { text: 'Advanced monitoring', highlight: true },
        { text: 'Database GUI', highlight: false },
        { text: 'Team collaboration', highlight: false },
        { text: 'Priority support', highlight: false },
        { text: '$49 for early users', highlight: true },
      ],
      cta: 'View Roadmap',
      popular: false,
      gradient: 'from-blue-400 to-indigo-500',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      badge: 'TEAMS',
      badgeColor: 'from-purple-400 to-pink-500',
      icon: <Crown className="w-6 h-6" />,
      description: 'For teams that need more',
      features: [
        { text: 'Everything in Pro', highlight: false },
        { text: 'Custom integrations', highlight: true },
        { text: 'Dedicated support', highlight: true },
        { text: 'SLA guarantees', highlight: true },
        { text: 'Training & onboarding', highlight: false },
        { text: 'Custom deployment', highlight: false },
        { text: 'Security audits', highlight: false },
        { text: 'Volume licensing', highlight: false },
      ],
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-purple-400 to-pink-500',
    },
  ]

  const faqs = [
    {
      q: 'What happens after I buy early access?',
      a: 'You get immediate access to the beta, lifetime v1.0 access when it launches, and 50% off v2.0 ($49 instead of $99). You also get priority support and can influence the roadmap.',
    },
    {
      q: 'Is v1.0 really free?',
      a: 'Yes! After the early access period ends, v1.0 will be completely free with all features included. No limitations, no trial period, no credit card required.',
    },
    {
      q: 'Do I need to upgrade to v2.0?',
      a: 'No. v1.0 will continue to receive security updates and work perfectly. Upgrade only if you want the new v2.0 features like GraphQL, real-time, and advanced monitoring.',
    },
    {
      q: 'Can I use this commercially?',
      a: 'Absolutely! All licenses (including the free v1.0) can be used for commercial projects with no restrictions. Build and sell whatever you want.',
    },
    {
      q: 'What about team licenses?',
      a: 'Each developer needs their own license. For teams of 10+, contact us for volume pricing and enterprise features with dedicated support.',
    },
    {
      q: 'Is there a refund policy?',
      a: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund you in full, no questions asked.',
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-pink-500/5 pointer-events-none" />
        <div className="absolute inset-0 noise pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-full px-6 py-3"
            >
              <Gift className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold uppercase tracking-wide">Limited Time: 50% Off Early Access</span>
            </motion.div>

            <h1 className="text-huge font-black tracking-tighter leading-none">
              SIMPLE.
              <br />
              <span className="gradient-text glow">HONEST.</span>
              <br />
              PRICING.
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Pay once, own forever. No subscriptions. No hidden fees.
              <br />
              <span className="text-white font-semibold">Just software that works.</span>
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 pt-4">
              <div className="flex items-center gap-2 text-white/60">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm font-semibold">30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold">Instant Access</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-semibold">500+ Developers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative rounded-3xl overflow-hidden ${
                  plan.popular ? 'lg:scale-110 z-10' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-px -left-px -right-px h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500" />
                )}
                
                {/* Card Content */}
                <div className={`h-full p-8 ${plan.popular ? 'glass-strong' : 'glass'}`}>
                  {/* Badge */}
                  <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${plan.badgeColor} rounded-full px-4 py-1.5 text-xs font-black text-black mb-6`}>
                    {plan.icon}
                    <span>{plan.badge}</span>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">{plan.name}</h3>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-5xl font-black ${plan.popular ? 'gradient-text' : ''}`}>{plan.price}</span>
                      {plan.originalPrice && (
                        <span className="text-xl text-white/40 line-through">{plan.originalPrice}</span>
                      )}
                    </div>
                    <span className="text-white/50 text-sm font-semibold uppercase">{plan.period}</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-white/60 mb-6 text-sm">{plan.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${feature.highlight ? 'text-yellow-400' : 'text-green-400'}`} />
                        <span className={`text-sm ${feature.highlight ? 'text-white font-semibold' : 'text-white/70'}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-4 rounded-2xl font-black uppercase tracking-wide transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105'
                        : 'bg-white/10 text-white hover:bg-white/20 border-2 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-32 bg-gradient-to-b from-black to-yellow-500/5 relative overflow-hidden">
        <div className="absolute inset-0 noise pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-mega font-black mb-6 tracking-tighter">
              VERSION
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-yellow-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">LIFECYCLE.</span>
            </h2>
            <p className="text-xl text-white/60">
              Our unique pricing model rewards early adopters
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line with proper gradient stops */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-blue-500 via-30% via-purple-500 via-60% to-orange-500 hidden md:block rounded-full" />
            
            <div className="space-y-6">
              {/* v1.0 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
                className="flex gap-6 items-start"
              >
                <div className="w-16 h-16 rounded-2xl bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center flex-shrink-0 text-green-400 relative z-10">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="glass rounded-2xl p-6 flex-grow hover:border-green-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <h3 className="text-2xl font-black">v1.0</h3>
                    <span className="text-2xl font-black text-green-400">FREE</span>
                  </div>
                  <p className="text-white/60">Full-featured, completely free forever</p>
                </div>
              </motion.div>

              {/* v2.0 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center flex-shrink-0 text-blue-400 relative z-10">
                  <Star className="w-6 h-6" />
                </div>
                <div className="glass rounded-2xl p-6 flex-grow hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <h3 className="text-2xl font-black">v2.0</h3>
                    <span className="text-2xl font-black text-blue-400">$99</span>
                  </div>
                  <p className="text-white/60">Advanced features, GraphQL, real-time</p>
                </div>
              </motion.div>

              {/* v3.0 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex gap-6 items-start"
              >
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border-2 border-purple-500/50 flex items-center justify-center flex-shrink-0 text-purple-400 relative z-10">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="glass rounded-2xl p-6 flex-grow hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <h3 className="text-2xl font-black">v3.0</h3>
                    <span className="text-2xl font-black text-purple-400">$149</span>
                  </div>
                  <p className="text-white/60">When released, v2.0 gets security updates only</p>
                </div>
              </motion.div>

              {/* v4.0 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex gap-6 items-start"
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center flex-shrink-0 text-orange-400 relative z-10">
                  <Crown className="w-6 h-6" />
                </div>
                <div className="glass rounded-2xl p-6 flex-grow hover:border-orange-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <h3 className="text-2xl font-black">v4.0</h3>
                    <span className="text-2xl font-black text-orange-400">$199</span>
                  </div>
                  <p className="text-white/60">When released, v2.0 becomes FREE</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 glass-strong rounded-3xl p-8 border-yellow-500/30"
          >
            <h3 className="text-2xl font-black mb-4 gradient-text">EARLY ACCESS = 50% OFF FOREVER</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/80">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-yellow-400" />
                <span>v2.0 for $49 (instead of $99)</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-yellow-400" />
                <span>v3.0 for $75 (instead of $149)</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-yellow-400" />
                <span>v4.0 for $100 (instead of $199)</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-yellow-400" />
                <span>All future versions at 50% off</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 noise pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-mega font-black mb-6 tracking-tighter">
              GOT
              <br />
              <span className="gradient-text">QUESTIONS?</span>
            </h2>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-lg font-bold pr-4">{faq.q}</h3>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-white/60 flex-shrink-0" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-white/60 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-pink-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 noise pointer-events-none" />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl opacity-20 blur-sm"
        />
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full opacity-20 blur-sm"
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-mega font-black tracking-tighter leading-none">
              READY TO
              <br />
              <span className="gradient-text glow">START?</span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-white/70 max-w-2xl mx-auto">
              Join 500+ developers building faster with Packet.
              <br />
              <span className="text-white font-bold">Lock in early access pricing today.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/pricing"
                className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-12 py-6 rounded-full font-black text-xl uppercase tracking-wide hover:scale-105 transition-all shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 overflow-hidden animate-pulse-glow"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Early Access - $49
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50 pt-4">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                30-day money-back guarantee
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Instant access
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Lifetime updates
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
