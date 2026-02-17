import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, Key, Download, Book, Settings, LogOut } from 'lucide-react';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: Home },
    { name: 'Epoxy', href: '/dashboard/epoxy', icon: 'epoxy' as const },
    { name: 'License', href: '/dashboard/license', icon: Key },
    { name: 'Downloads', href: '/dashboard/downloads', icon: Download },
    { name: 'Docs', href: '/docs', icon: Book },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 glass border-r-2 border-white/10 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b-2 border-white/10">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Packet" className="w-10 h-10 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-black gradient-text uppercase tracking-tight">PACKET</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-6 border-b-2 border-white/10">
          <div className="flex items-center gap-3">
            <img 
              src={user?.avatar || '/logo.png'} 
              alt={user?.name || 'User'} 
              className="w-12 h-12 rounded-full border-2 border-yellow-400/30"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white truncate">{user?.name}</p>
              <p className="text-xs text-white/60 truncate">@{user?.githubUsername}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon === 'epoxy' ? null : item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold uppercase tracking-wide text-sm ${
                  isActive
                    ? item.icon === 'epoxy'
                      ? 'bg-pink-500/20 text-pink-400 border-2 border-pink-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border-2 border-yellow-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border-2 border-transparent'
                }`}
              >
                {item.icon === 'epoxy' ? (
                  <img src="/epoxy-logo.png" alt="Epoxy" className="w-6 h-6 rounded-lg" />
                ) : Icon ? (
                  <Icon className="w-5 h-5" />
                ) : null}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t-2 border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all w-full font-semibold uppercase tracking-wide text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
