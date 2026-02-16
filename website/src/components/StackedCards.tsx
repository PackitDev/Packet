import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Code, Layers, Cpu, Cloud } from 'lucide-react'

const cards = [
  {
    title: 'FRONTEND',
    description: 'React, Vue, or vanilla. Auto-routing included.',
    icon: <Code className="w-8 h-8" />,
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/50',
    textColor: 'text-yellow-400',
    features: ['File-based routing', 'Hot reload', 'TypeScript ready'],
  },
  {
    title: 'BACKEND',
    description: 'Express or Fastify. Your choice, our setup.',
    icon: <Layers className="w-8 h-8" />,
    color: 'from-orange-400 to-pink-500',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/50',
    textColor: 'text-orange-400',
    features: ['API routes', 'Middleware', 'Validation'],
  },
  {
    title: 'DATABASE',
    description: 'SQL or NoSQL. Type-safe queries everywhere.',
    icon: <Cpu className="w-8 h-8" />,
    color: 'from-pink-400 to-purple-500',
    bgColor: 'bg-pink-500/20',
    borderColor: 'border-pink-500/50',
    textColor: 'text-pink-400',
    features: ['Migrations', 'Seeding', 'ORM included'],
  },
  {
    title: 'DEPLOYMENT',
    description: 'One command. Any platform. Zero config.',
    icon: <Cloud className="w-8 h-8" />,
    color: 'from-purple-400 to-indigo-500',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/50',
    textColor: 'text-purple-400',
    features: ['Docker', 'Vercel', 'AWS'],
  },
]

export default function StackedCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section ref={containerRef} className="relative min-h-[200vh]">
      <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 noise pointer-events-none" />
        
        {/* Title */}
        <motion.div 
          className="text-center mb-12 relative z-20 px-4"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1], [1, 1]),
          }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter">
            FULL STACK.
            <span className="gradient-text"> FULLY LOADED.</span>
          </h2>
          <p className="text-white/60 mt-4">Scroll to reveal the stack</p>
        </motion.div>

        {/* Cards Grid - Reveal on Scroll */}
        <div className="relative w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <CardItem
              key={index}
              card={card}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CardItem({ 
  card, 
  index, 
  scrollYProgress
}: { 
  card: typeof cards[0]
  index: number
  scrollYProgress: any
}) {
  // Each card reveals at different scroll points
  const start = 0.1 + (index * 0.15)
  const end = start + 0.15
  
  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    [0, 1]
  )
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [60, 0]
  )
  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [0.9, 1]
  )

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="relative z-10"
    >
      <div className={`glass-strong rounded-3xl p-8 border-2 border-white/10 hover:border-yellow-500/30 transition-all h-full`}>
        <div className="flex items-start gap-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-black flex-shrink-0`}>
            {card.icon}
          </div>
          <div className="flex-grow">
            <h3 className="text-2xl font-black mb-2">{card.title}</h3>
            <p className="text-white/70 mb-4">{card.description}</p>
            <div className="flex flex-wrap gap-2">
              {card.features.map((feature, i) => (
                <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
