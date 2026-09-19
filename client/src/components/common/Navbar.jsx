import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Shield, Zap, Flame, User, Menu, X, LogIn, Crown, 
  LayoutDashboard, LogOut, ChevronDown, Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Navbar({ mode = "user" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const isAdminMode = mode === "admin" || location.pathname.startsWith('/admin');
  const isActive = (path) => location.pathname === path;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    await logout();
    navigate('/login');
  };

  const getAvatarUrl = () => {
    if (user?.avatar) return user.avatar;
    const nameSeed = encodeURIComponent(user?.name || 'CyberAgent');
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${nameSeed}`;
  };

  const learnerNavLinks = [
    { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { label: 'Articles', path: '/app/articles' },
    { label: 'Challenges', path: '/app/challenges' },
    { label: 'Achievements', path: '/app/achievements' },
    { label: 'Leaderboard', path: '/app/leaderboard' },
    { label: 'Rewards', path: '/app/rewards' },
  ];

  const adminNavLinks = [
    { label: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Users', path: '/admin/users' },
    { label: 'Articles', path: '/admin/articles' },
    { label: 'Categories', path: '/admin/categories' },
    { label: 'Challenges', path: '/admin/challenges' },
    { label: 'Achievements', path: '/admin/achievements' },
    { label: 'Rewards', path: '/admin/rewards' },
    { label: 'Analytics', path: '/admin/analytics' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-[var(--border-color)] px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              NEXTGEN <span className="text-cyan-400">SEC</span>
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 -mt-1">
              Cybersecurity Academy
            </span>
          </div>
        </Link>

        {/* Public Navigation Links */}
        {mode === "public" && (
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-300">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <a href="#features" className="hover:text-cyan-400 transition-colors">How It Works</a>
            <a href="#topics" className="hover:text-cyan-400 transition-colors">Topics</a>
            <a href="#rewards" className="hover:text-cyan-400 transition-colors">Rewards</a>
          </div>
        )}

        {/* ADMIN MODE Navigation Links */}
        {isAdminMode && isAuthenticated && (
          <div className="hidden lg:flex items-center gap-5 text-xs font-bold uppercase tracking-wider">
            {adminNavLinks.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`transition-colors py-1 px-2 rounded ${
                  isActive(item.path) 
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30' 
                    : 'text-gray-300 hover:text-amber-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* LEARNER MODE Navigation Links */}
        {!isAdminMode && mode === "user" && isAuthenticated && (
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold">
            {learnerNavLinks.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`hover:text-cyan-400 transition-colors ${
                  isActive(item.path) ? 'text-cyan-400 font-bold' : 'text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* Right Action Area */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/login" className="btn-secondary text-sm">
                <LogIn className="w-4 h-4" /> Sign In
              </Link>
              <Link to="/register" className="btn-primary text-sm hidden sm:inline-flex">
                Get Started
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">

              {/* ADMIN MODE STATUS BADGE */}
              {isAdminMode ? (
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1 text-xs text-amber-400 font-extrabold uppercase tracking-wider">
                    <Crown className="w-3.5 h-3.5 fill-amber-400" /> Admin Console
                  </div>
                </div>
              ) : (
                /* LEARNER MODE GAMIFICATION PILLS */
                user?.role !== 'admin' && (
                  <div className="hidden sm:flex items-center gap-3 bg-[#111726] border border-gray-800 rounded-full px-3 py-1 text-xs">
                    <span className="flex items-center gap-1 font-bold text-amber-400" title="Active Daily Streak">
                      <Flame className="w-4 h-4 fill-amber-400" /> {user?.streak || 0}d
                    </span>
                    <span className="w-px h-3 bg-gray-700"></span>
                    <span className="flex items-center gap-1 font-bold text-cyan-400" title="Total Experience Points">
                      <Zap className="w-4 h-4 fill-cyan-400" /> {user?.xp || 0} XP
                    </span>
                    <span className="w-px h-3 bg-gray-700"></span>
                    <span className="flex items-center gap-1 font-bold text-purple-400" title="User Level">
                      Lvl {user?.level || 1}
                    </span>
                  </div>
                )
              )}

              {/* Profile Avatar Button & Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 group p-1 rounded-full hover:bg-gray-800 transition-colors focus:outline-none"
                >
                  <div className="relative">
                    <img 
                      src={getAvatarUrl()} 
                      alt={user?.name || 'User'} 
                      className={`w-9 h-9 rounded-full object-cover border-2 transition-all ${
                        user?.role === 'admin' ? 'border-amber-400 group-hover:border-amber-300' : 'border-cyan-500/60 group-hover:border-cyan-400'
                      }`}
                    />
                    <span className={`absolute -bottom-1 -right-1 px-1 py-0.2 rounded-full text-[9px] font-black uppercase tracking-tighter text-black ${
                      user?.role === 'admin' ? 'bg-amber-400' : 'bg-cyan-400'
                    }`}>
                      {user?.role === 'admin' ? 'ADM' : 'CAD'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-white hidden sm:block" />
                </button>

                {/* Profile Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-[#0D1322] border border-gray-800 rounded-xl shadow-2xl p-2 z-50 space-y-1">
                    <div className="px-3 py-2 bg-gray-900/80 rounded-lg mb-1">
                      <div className="font-bold text-white text-sm truncate">{user?.name || 'Researcher'}</div>
                      <div className="text-xs text-gray-400 font-mono truncate">{user?.email}</div>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                          user?.role === 'admin' 
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                            : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                        }`}>
                          {user?.role === 'admin' ? 'Security Admin' : 'Cyber Cadet'}
                        </span>
                        {user?.role !== 'admin' && (
                          <span className="text-xs text-purple-400 font-bold">Lvl {user?.level || 1}</span>
                        )}
                      </div>
                    </div>

                    <Link 
                      to={isAdminMode ? "/admin/settings" : "/app/profile"} 
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4 text-cyan-400" /> My Profile
                    </Link>

                    {!isAdminMode && (
                      <Link 
                        to="/app/activity" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <Activity className="w-4 h-4 text-purple-400" /> My Activity
                      </Link>
                    )}

                    <div className="pt-1 border-t border-gray-800">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 text-gray-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-4 pb-2 border-t border-gray-800 space-y-2">
          {!isAuthenticated ? (
            <>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Home</Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Login</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Register</Link>
            </>
          ) : (
            <>
              {isAdminMode ? (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg mb-3 text-xs font-bold text-amber-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Crown className="w-4 h-4 fill-amber-400" /> Admin Console</span>
                </div>
              ) : (
                user?.role !== 'admin' && (
                  <div className="p-3 bg-gray-900 rounded-lg mb-3 flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-bold flex items-center gap-1"><Flame className="w-4 h-4" /> {user?.streak || 0} Day Streak</span>
                    <span className="text-cyan-400 font-bold flex items-center gap-1"><Zap className="w-4 h-4" /> {user?.xp || 0} XP</span>
                    <span className="text-purple-400 font-bold">Lvl {user?.level || 1}</span>
                  </div>
                )
              )}

              {isAdminMode ? (
                <>
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-amber-400 font-semibold">Admin Overview</Link>
                  <Link to="/admin/users" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Manage Users</Link>
                  <Link to="/admin/articles" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Manage Articles</Link>
                  <Link to="/admin/categories" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Categories</Link>
                  <Link to="/admin/challenges" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Challenges</Link>
                  <Link to="/admin/achievements" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Achievements</Link>
                  <Link to="/admin/rewards" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Rewards Shop</Link>
                  <Link to="/admin/analytics" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Analytics</Link>
                </>
              ) : (
                <>
                  <Link to="/app/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Dashboard</Link>
                  <Link to="/app/articles" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Articles</Link>
                  <Link to="/app/challenges" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Challenges</Link>
                  <Link to="/app/achievements" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Achievements</Link>
                  <Link to="/app/leaderboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Leaderboard</Link>
                  <Link to="/app/rewards" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Rewards</Link>
                  <Link to="/app/profile" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Profile</Link>
                </>
              )}

              <button 
                onClick={handleLogout} 
                className="w-full text-left py-2 px-3 hover:bg-rose-500/10 text-rose-400 rounded text-sm font-semibold flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
