import { Link } from 'react-router-dom'
import { Zap, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t-2 border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Effec-t SDK Logo" 
                className="w-12 h-12"
              />
              <span className="text-2xl font-black gradient-text uppercase tracking-tight">EFFEC-T</span>
            </div>
            <p className="text-white/60 text-sm font-medium uppercase tracking-wide leading-relaxed">
              THE WORLD'S FASTEST SDK FOR BUILDING PRODUCTION APPS.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-white/60 hover:text-yellow-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/60 hover:text-yellow-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/60 hover:text-yellow-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-black mb-6 uppercase tracking-wide text-sm">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/60 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/60 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-white/60 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide">
                  Docs
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-black mb-6 uppercase tracking-wide text-sm">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide">
                  Examples
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-black mb-6 uppercase tracking-wide text-sm">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t-2 border-white/10 text-center">
          <p className="text-white/60 text-sm font-bold uppercase tracking-wider">&copy; 2026 EFFEC-T SDK. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  )
}
