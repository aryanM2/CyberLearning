import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, Target, Trophy, Award, Gift, 
  User, Activity, Crown, Users, FileText, FolderTree, BarChart3, Settings, ShieldAlert, LogOut 
} from 'lucide-react';
import { currentUser } from '../../data/mockData';

export function Sidebar({ isAdmin = false }) {
  const location = useLocation();

  const userNav = [
    { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { label: 'Articles', path: '/app/articles', icon: BookOpen },
    { label: 'Challenges', path: '/app/challenges', icon: Target },
    { label: 'Achievements', path: '/app/achievements', icon: Trophy },
    { label: 'Leaderboard', path: '/app/leaderboard', icon: Award },
    { label: 'Rewards Store', path: '/app/rewards', icon: Gift },
    { label: 'My Activity', path: '/app/activity', icon: Activity },
    { label: 'My Profile', path: '/app/profile', icon: User },
  ];

  const adminNav = [
    { label: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Manage Users', path: '/admin/users', icon: Users },
    { label: 'Manage Articles', path: '/admin/articles', icon: FileText },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Challenges', path: '/admin/challenges', icon: Target },
    { label: 'Achievements', path: '/admin/achievements', icon: Trophy },
    { label: 'Rewards Shop', path: '/admin/rewards', icon: Gift },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const navItems = isAdmin ? adminNav : userNav;

  return (
    <aside className="w-64 bg-[#0D1322] border-r border-[var(--border-color)] flex flex-col justify-between hidden lg:flex h-[calc(100vh-65px)] sticky top-[65px]">
      <div className="p-4 space-y-6 overflow-y-auto">
        
        {/* Profile Card Header */}
        {!isAdmin ? (
          <div className="bg-[#111726] border border-gray-800 rounded-xl p-4 flex items-center gap-3">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-11 h-11 rounded-full object-cover border-2 border-cyan-500/50"
            />
            <div className="overflow-hidden">
              <h4 className="text-white text-sm font-bold truncate">{currentUser.name}</h4>
              <p className="text-xs text-cyan-400 font-medium truncate">Lvl {currentUser.level} • {currentUser.title}</p>
            </div>
          </div>
        ) : (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center gap-3">
            <Crown className="w-8 h-8 text-amber-400" />
            <div>
              <h4 className="text-amber-400 text-sm font-extrabold uppercase tracking-wide">Admin Portal</h4>
              <p className="text-[11px] text-gray-400">NextGen Securities</p>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 px-3 mb-2">
            {isAdmin ? "Admin Controls" : "Navigation"}
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-400 border-l-4 border-cyan-400 font-bold' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

      </div>

      {/* Footer Switch Link */}
      <div className="p-4 border-t border-gray-800">
        {isAdmin ? (
          <Link to="/app/dashboard" className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-cyan-400 transition-colors">
            <LogOut className="w-4 h-4" /> Exit Admin View
          </Link>
        ) : (
          <Link to="/login" className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" /> Logout Session
          </Link>
        )}
      </div>
    </aside>
  );
}
