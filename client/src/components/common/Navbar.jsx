import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Zap, Flame, Trophy, User, Menu, X, LogIn, Lock, LayoutDashboard, Crown } from 'lucide-react';
import { currentUser } from '../../data/mockData';

export function Navbar({ mode = "user" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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

        {/* Public Navigation */}
        {mode === "public" && (
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-300">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <a href="#features" className="hover:text-cyan-400 transition-colors">How It Works</a>
            <a href="#topics" className="hover:text-cyan-400 transition-colors">Topics</a>
            <a href="#rewards" className="hover:text-cyan-400 transition-colors">Rewards</a>
          </div>
        )}

        {/* User Navigation Stats */}
        {mode === "user" && (
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold">
            <Link to="/app/dashboard" className={`hover:text-cyan-400 transition-colors flex items-center gap-2 ${isActive('/app/dashboard') ? 'text-cyan-400' : 'text-gray-300'}`}>
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            <Link to="/app/articles" className={`hover:text-cyan-400 transition-colors ${isActive('/app/articles') ? 'text-cyan-400' : 'text-gray-300'}`}>Articles</Link>
            <Link to="/app/challenges" className={`hover:text-cyan-400 transition-colors ${isActive('/app/challenges') ? 'text-cyan-400' : 'text-gray-300'}`}>Challenges</Link>
            <Link to="/app/achievements" className={`hover:text-cyan-400 transition-colors ${isActive('/app/achievements') ? 'text-cyan-400' : 'text-gray-300'}`}>Achievements</Link>
            <Link to="/app/leaderboard" className={`hover:text-cyan-400 transition-colors ${isActive('/app/leaderboard') ? 'text-cyan-400' : 'text-gray-300'}`}>Leaderboard</Link>
            <Link to="/app/rewards" className={`hover:text-cyan-400 transition-colors ${isActive('/app/rewards') ? 'text-cyan-400' : 'text-gray-300'}`}>Rewards</Link>
          </div>
        )}

        {/* Right Action / Profile */}
        <div className="flex items-center gap-4">
          {mode === "public" ? (
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
              {/* Gamification Pill Indicators */}
              <div className="hidden sm:flex items-center gap-3 bg-[#111726] border border-gray-800 rounded-full px-3 py-1 text-xs">
                <span className="flex items-center gap-1 font-bold text-amber-400">
                  <Flame className="w-4 h-4 fill-amber-400" /> {currentUser.streakDays}d
                </span>
                <span className="w-px h-3 bg-gray-700"></span>
                <span className="flex items-center gap-1 font-bold text-cyan-400">
                  <Zap className="w-4 h-4 fill-cyan-400" /> {currentUser.xp} XP
                </span>
                <span className="w-px h-3 bg-gray-700"></span>
                <span className="flex items-center gap-1 font-bold text-purple-400">
                  Lvl {currentUser.level}
                </span>
              </div>

              {/* Profile Avatar Button */}
              <Link to="/app/profile" className="flex items-center gap-2 group p-1 rounded-full hover:bg-gray-800 transition-colors">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-9 h-9 rounded-full object-cover border-2 border-cyan-500/40 group-hover:border-cyan-400"
                />
              </Link>

              {/* Admin Portal Toggle Link */}
              <Link to="/admin" className="p-2 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-cyan-400 transition-colors text-xs font-semibold hidden md:flex items-center gap-1" title="Switch to Admin View">
                <Crown className="w-4 h-4 text-amber-400" /> Admin
              </Link>
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
          {mode === "public" ? (
            <>
              <Link to="/" className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Home</Link>
              <Link to="/login" className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Login</Link>
              <Link to="/register" className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Register</Link>
            </>
          ) : (
            <>
              <div className="p-3 bg-gray-900 rounded-lg mb-3 flex items-center justify-between text-xs">
                <span className="text-amber-400 font-bold flex items-center gap-1"><Flame className="w-4 h-4" /> {currentUser.streakDays} Day Streak</span>
                <span className="text-cyan-400 font-bold flex items-center gap-1"><Zap className="w-4 h-4" /> {currentUser.xp} XP</span>
                <span className="text-purple-400 font-bold">Lvl {currentUser.level}</span>
              </div>
              <Link to="/app/dashboard" className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Dashboard</Link>
              <Link to="/app/articles" className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Articles</Link>
              <Link to="/app/challenges" className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Challenges</Link>
              <Link to="/app/achievements" className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Achievements</Link>
              <Link to="/app/leaderboard" className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Leaderboard</Link>
              <Link to="/app/rewards" className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Rewards</Link>
              <Link to="/app/profile" className="block py-2 px-3 hover:bg-gray-800 rounded text-sm text-gray-200">Profile</Link>
              <Link to="/admin" className="block py-2 px-3 bg-amber-500/10 text-amber-400 rounded text-sm font-semibold">Admin Panel</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
