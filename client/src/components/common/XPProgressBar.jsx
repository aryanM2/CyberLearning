import React from 'react';
import { Zap } from 'lucide-react';

export function XPProgressBar({ currentXp, nextLevelXp, level }) {
  const percentage = Math.min(100, Math.round((currentXp / nextLevelXp) * 100));

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className="text-gray-300 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
          <span className="font-bold text-white">{currentXp.toLocaleString()}</span> / {nextLevelXp.toLocaleString()} XP
        </span>
        <span className="text-cyan-400 font-bold">{percentage}% to Level {level + 1}</span>
      </div>
      <div className="progress-container h-3 bg-gray-900 border border-gray-800 p-0.5 rounded-full">
        <div 
          className="progress-fill h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/30"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
