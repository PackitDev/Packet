import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, login } = useAuth()

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
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white/80 hover:text-white transition-colors font-bold uppercase tracking-wide text-sm">
              Home
            </Link>
            <Link to="/pricing" className="text-white/80 hover:text-white transition-colors font-bold uppercase tracking-wide text-sm">
              Pricing
            </Link>
            <Link to="/docs" className="text-white/80 hover:text-white transition-colors font-bold uppercase tracking-wide text-sm">
              Docs
            </Link>
            
            {user ? (
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-all border-2 border-white/20"
              >
                <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                <span className="font-bold uppercase tracking-wide text-sm">Dashboard</span>
              </Link>
            ) : (
              <button
                onClick={login}
                className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-8 py-3 rounded-full font-black uppercase tracking-wide text-sm hover:scale-105 transition-transform shadow-lg"
              >
                Sign In →
              </button>
            )}
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
            
            {user ? (
              <Link
                to="/dashboard"
                className="w-full block bg-white/10 border-2 border-white/20 text-white px-8 py-4 rounded-full font-black uppercase tracking-wide text-center"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  login();
                }}
                className="w-full block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-8 py-4 rounded-full font-black uppercase tracking-wide text-center"
              >
                Sign In →
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
