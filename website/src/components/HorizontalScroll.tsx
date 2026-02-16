import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Zap, Database, Lock, Rocket, GitBranch, TestTube } from 'lucide-react'

const features = [
  {
    icon: <Zap className="w-12 h-12" />,
    title: 'INSTANT SETUP',
    description: 'Zero config. One command. Ready to code.',
    color: 'from-yellow-400 to-orange-500',
    code: '$ packet create my-app',
  },
  {
    icon: <Database className="w-12 h-12" />,
    title: 'DATABASE READY',
    description: 'PostgreSQL, MySQL, MongoDB. Type-safe ORM included.',
    color: 'from-orange-400 to-pink-500',
    code: 'const users = await db.user.findMany()',
  },
  {
    icon: <Lock className="w-12 h-12" />,
    title: 'AUTH BUILT-IN',
    description: 'JWT, OAuth, Sessions. Secure by default.',
    color: 'from-pink-400 to-purple-500',
    code: 'const session = await auth.getSession()',
  },
  {
    icon: <GitBranch className="w-12 h-12" />,
    title: 'GIT WORKFLOWS',
    description: 'Branch-to-environment mapping. Auto-deploy.',
    color: 'from-purple-400 to-indigo-500',
    code: '$ packet deploy --branch main',
  },
  {
    icon: <TestTube className="w-12 h-12" />,
    title: 'TESTING INCLUDED',
    description: 'Unit, integration, E2E. All set up for you.',
    color: 'from-indigo-400 to-blue-500',
    code: '$ packet test --coverage',
  },
  {
    icon: <Rocket className="w-12 h-12" />,
    title: 'ONE-CLICK DEPLOY',
    description: 'Vercel, AWS, Docker. Ship anywhere.',
    color: 'from-blue-400 to-cyan-500',
    code: '$ packet deploy --prod',
  },
]

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.666%'])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-pink-500/5" />
        <div className="absolute inset-0 noise pointer-events-none" />
        
        {/* Header */}
        <motion.div
          style={{ opacity }}
          className="absolute top-20 left-0 right-0 text-center z-10 px-4"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mb-4">
            EVERYTHING YOU NEED.
            <span className="gradient-text"> NOTHING YOU DON'T.</span>
          </h2>
          <p className="text-white/60 text-lg">Scroll to explore →</p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <motion.div
          style={{ x }}
          className="flex gap-8 pl-[10vw] pr-[50vw]"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[80vw] sm:w-[60vw] lg:w-[40vw] h-[60vh] relative"
            >
              <div className="glass-strong rounded-3xl h-full p-8 sm:p-12 flex flex-col justify-between overflow-hidden group hover:border-yellow-500/50 transition-all">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 text-black group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-white/70 text-lg sm:text-xl">{feature.description}</p>
                </div>

                {/* Code Preview */}
                <div className="relative z-10 mt-8">
                  <div className="bg-black/50 rounded-2xl p-4 font-mono text-sm sm:text-base border border-white/10">
                    <span className="text-yellow-400">{feature.code}</span>
                  </div>
                </div>

                {/* Number */}
                <div className="absolute bottom-4 right-4 text-[150px] font-black text-white/5 leading-none pointer-events-none">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
          {features.map((_, index) => (
            <motion.div
              key={index}
              className="w-12 h-1 rounded-full bg-white/20 overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-pink-500"
                style={{
                  scaleX: useTransform(
                    scrollYProgress,
                    [index / features.length, (index + 1) / features.length],
                    [0, 1]
                  ),
                  transformOrigin: 'left',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
