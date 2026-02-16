import { Link } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b-2 border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/logo.png" 
              alt="Packet SDK Logo" 
              className="w-12 h-12 group-hover:scale-110 transition-transform"
            />
            <span className="text-2xl font-black gradient-text uppercase tracking-tight">PACKET</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-white/80 hover:text-white transition-colors font-bold uppercase tracking-wide text-sm">
              Home
            </Link>
            <Link to="/pricing" className="text-white/80 hover:text-white transition-colors font-bold uppercase tracking-wide text-sm">
              Pricing
            </Link>
            <Link to="/docs" className="text-white/80 hover:text-white transition-colors font-bold uppercase tracking-wide text-sm">
              Docs
            </Link>
            <a
              href="https://github.com/packetsdk/packet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors font-bold uppercase tracking-wide text-sm"
            >
              GitHub
            </a>
            <button className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-8 py-3 rounded-full font-black uppercase tracking-wide text-sm hover:scale-105 transition-transform shadow-lg">
              Get Started →
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-yellow-400 transition-colors"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 space-y-6 border-t-2 border-white/10">
            <Link
              to="/"
              className="block text-white/80 hover:text-white transition-colors font-bold uppercase tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className="block text-white/80 hover:text-white transition-colors font-bold uppercase tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/docs"
              className="block text-white/80 hover:text-white transition-colors font-bold uppercase tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              Docs
            </Link>
            <a
              href="https://github.com/packetsdk/packet"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white/80 hover:text-white transition-colors font-bold uppercase tracking-wide"
            >
              GitHub
            </a>
            <button className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-8 py-4 rounded-full font-black uppercase tracking-wide">
              Get Started →
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
