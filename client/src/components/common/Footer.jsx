import React from 'react';
import { Shield, Terminal, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#090D16] border-t border-[var(--border-color)] text-gray-400 py-12 px-4 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-white text-lg tracking-tight">
              NEXTGEN <span className="text-cyan-400">SEC</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            The premier cybersecurity learning & gamification platform. Read articles, solve challenges, earn XP, unlock achievements, and climb the leaderboard.
          </p>
        </div>

        {/* Learning Paths */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Learning Modules</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/app/articles" className="hover:text-cyan-400 transition-colors">Web Security (SQLi & XSS)</Link></li>
            <li><Link to="/app/articles" className="hover:text-cyan-400 transition-colors">Network & Protocol Analysis</Link></li>
            <li><Link to="/app/articles" className="hover:text-cyan-400 transition-colors">Cryptography & PKI</Link></li>
            <li><Link to="/app/challenges" className="hover:text-cyan-400 transition-colors">Ethical Hacking Labs</Link></li>
          </ul>
        </div>

        {/* Ecosystem */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Gamification</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/app/leaderboard" className="hover:text-cyan-400 transition-colors">Global Leaderboard</Link></li>
            <li><Link to="/app/achievements" className="hover:text-cyan-400 transition-colors">Badges & Achievements</Link></li>
            <li><Link to="/app/rewards" className="hover:text-cyan-400 transition-colors">XP Reward Store</Link></li>
            <li><Link to="/app/profile" className="hover:text-cyan-400 transition-colors">Developer Profile</Link></li>
          </ul>
        </div>

        {/* NextGen Info */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Platform</h4>
          <div className="bg-[#111726] border border-gray-800 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono">
              <Terminal className="w-4 h-4" /> System Status: Operational
            </div>
            <p className="text-gray-400">
              Built for NextGen Securities cybersecurity training and skill development.
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <p>© 2026 NextGen Securities. All rights reserved.</p>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
          <span>for Cyber Defenders</span>
        </div>
      </div>
    </footer>
  );
}
