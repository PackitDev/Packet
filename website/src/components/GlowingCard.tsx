import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'

interface GlowingCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function GlowingCard({ children, className = '', delay = 0 }: GlowingCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl ${className}`}
    >
      {/* Glow Effect */}
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(251, 191, 36, 0.15), transparent 40%)`,
            inset: 0,
          }}
        />
      )}
      
      {/* Border Glow */}
      <div
        className="absolute inset-0 rounded-3xl transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(251, 191, 36, 0.4), transparent 40%)`
            : 'transparent',
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-3xl p-8 h-full hover:border-yellow-500/30 transition-colors">
        {children}
      </div>
    </motion.div>
  )
}
