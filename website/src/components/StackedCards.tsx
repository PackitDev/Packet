import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Code, Layers, Cpu, Cloud } from 'lucide-react'

const cards = [
  {
    title: 'FRONTEND',
    description: 'React, Vue, or vanilla. Auto-routing included.',
    icon: <Code className="w-8 h-8" />,
    color: 'from-yellow-400 to-orange-500',
    features: ['File-based routing', 'Hot reload', 'TypeScript ready'],
  },
  {
    title: 'BACKEND',
    description: 'Express or Fastify. Your choice, our setup.',
    icon: <Layers className="w-8 h-8" />,
    color: 'from-orange-400 to-pink-500',
    features: ['API routes', 'Middleware', 'Validation'],
  },
  {
    title: 'DATABASE',
    description: 'SQL or NoSQL. Type-safe queries everywhere.',
    icon: <Cpu className="w-8 h-8" />,
    color: 'from-pink-400 to-purple-500',
    features: ['Migrations', 'Seeding', 'ORM included'],
  },
  {
    title: 'DEPLOYMENT',
    description: 'One command. Any platform. Zero config.',
    icon: <Cloud className="w-8 h-8" />,
    color: 'from-purple-400 to-indigo-500',
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
    <section ref={containerRef} className="relative" style={{ height: `${100 + cards.length * 50}vh` }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 noise pointer-events-none" />
        
        {/* Title */}
        <div className="absolute top-20 left-0 right-0 text-center z-20 px-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter">
            FULL STACK.
            <span className="gradient-text"> FULLY LOADED.</span>
          </h2>
        </div>

        {/* Stacked Cards */}
        <div className="relative w-full max-w-2xl mx-auto px-4">
          {cards.map((card, index) => {
            const start = index / cards.length
            const end = (index + 1) / cards.length
            
            return (
              <CardItem
                key={index}
                card={card}
                index={index}
                scrollYProgress={scrollYProgress}
                start={start}
                end={end}
                total={cards.length}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CardItem({ 
  card, 
  index, 
  scrollYProgress, 
  start, 
  end, 
  total 
}: { 
  card: typeof cards[0]
  index: number
  scrollYProgress: any
  start: number
  end: number
  total: number
}) {
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [100 + index * 20, -20 * (total - index - 1)]
  )
  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [0.9, 1]
  )
  const opacity = useTransform(
    scrollYProgress,
    [start, Math.min(end + 0.1, 1)],
    [0.5, 1]
  )

  return (
    <motion.div
      style={{ y, scale, opacity }}
      className="absolute inset-x-0"
    >
      <div className={`glass-strong rounded-3xl p-8 border-2 border-white/10 hover:border-yellow-500/30 transition-all`}>
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
