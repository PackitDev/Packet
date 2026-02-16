import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedCounterProps {
  end: number | string
  suffix?: string
  duration?: number
  label: string
}

export default function AnimatedCounter({ end, suffix = '', duration = 2, label }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (!isInView) return
    if (typeof end === 'string') return
    
    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration, isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center group"
    >
      <div className="text-5xl sm:text-6xl font-black gradient-text glow group-hover:scale-110 transition-transform">
        {typeof end === 'string' ? end : count}{suffix}
      </div>
      <div className="text-sm text-white/60 uppercase tracking-wider mt-2 group-hover:text-white/80 transition-colors">
        {label}
      </div>
    </motion.div>
  )
}
