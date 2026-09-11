import React from 'react';
import { Award, Zap, CheckCircle, X } from 'lucide-react';

export function LevelUpModal({ isOpen, onClose, levelData }) {
  if (!isOpen || !levelData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md p-8 bg-[#111726] border-2 border-cyan-400/80 rounded-2xl shadow-2xl shadow-cyan-500/30 text-center overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Icon Badge */}
        <div className="relative w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50 animate-bounce">
          <Award className="w-10 h-10 text-white" />
        </div>

        {/* Header */}
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
          Level Up Reached!
        </span>

        <h3 className="text-3xl font-black text-white mt-3">
          Level {levelData.newLevel}
        </h3>
        
        <p className="text-sm font-semibold text-cyan-300 mt-1">
          {levelData.levelInfo?.title || 'Cyber Explorer'}
        </p>

        <div className="my-6 p-4 bg-[#0a0d14]/80 border border-cyan-500/20 rounded-xl space-y-2 text-left">
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Zap className="w-4 h-4 fill-cyan-400" /> Total XP Earning
            </span>
            <span className="font-mono font-bold text-white">{levelData.totalXP} XP</span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-300">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle className="w-4 h-4" /> Next Milestone
            </span>
            <span className="font-mono text-gray-400">Level {levelData.newLevel + 1}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-primary w-full py-3 justify-center text-sm font-bold shadow-lg shadow-cyan-500/30"
        >
          Claim Level Rewards
        </button>

      </div>
    </div>
  );
}
