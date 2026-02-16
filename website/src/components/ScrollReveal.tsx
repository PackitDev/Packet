import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5])

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-yellow-500/5 to-black" />
      <div className="absolute inset-0 noise pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ y, opacity, scale }}
          className="text-center"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-8">
            BUILT FOR
            <br />
            <span className="gradient-text">SPEED.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { value: '8s', label: 'Project Setup', desc: 'From zero to coding' },
              { value: '0', label: 'Config Files', desc: 'Convention over configuration' },
              { value: '1', label: 'Command Deploy', desc: 'Ship to production' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                style={{ rotate: i === 1 ? 0 : rotate }}
                className="glass-strong rounded-3xl p-8 text-center"
              >
                <div className="text-6xl sm:text-7xl font-black gradient-text mb-2">{stat.value}</div>
                <div className="text-xl font-bold text-white mb-1">{stat.label}</div>
                <div className="text-white/60">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
