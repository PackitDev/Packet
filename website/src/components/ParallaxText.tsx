import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface ParallaxTextProps {
  children: string
  baseVelocity?: number
}

export default function ParallaxText({ children, baseVelocity = 5 }: ParallaxTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -1000 * baseVelocity])
  const springX = useSpring(x, { stiffness: 100, damping: 30 })

  return (
    <section ref={containerRef} className="py-16 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
      
      <motion.div
        style={{ x: springX }}
        className="flex whitespace-nowrap"
      >
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="text-6xl sm:text-8xl lg:text-9xl font-black text-white/10 mx-8 select-none"
          >
            {children}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
