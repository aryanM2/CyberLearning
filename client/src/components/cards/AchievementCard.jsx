import React from 'react';
import { Trophy, Lock, Zap, Flame, BookOpen, Key, GraduationCap, ShieldAlert } from 'lucide-react';

const iconMap = {
  BookOpen: BookOpen,
  Key: Key,
  Flame: Flame,
  GraduationCap: GraduationCap,
  ShieldAlert: ShieldAlert,
  Trophy: Trophy
};

export function AchievementCard({ achievement }) {
  const IconComponent = iconMap[achievement.icon] || Trophy;

  return (
    <div className={`cyber-card p-6 flex items-start gap-4 transition-all h-full ${
      achievement.unlocked 
        ? 'border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 via-[#0F1626] to-[#0F1626]' 
        : 'opacity-70 bg-[#0F1626]/60'
    }`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
        achievement.unlocked 
          ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-md shadow-cyan-500/10' 
          : 'bg-slate-800/80 border-slate-700/60 text-slate-500'
      }`}>
        {achievement.unlocked ? <IconComponent className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h4 className={`font-bold text-base truncate ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
              {achievement.title}
            </h4>
            {achievement.unlocked ? (
              <span className="badge badge-cyan shrink-0">UNLOCKED</span>
            ) : (
              <span className="badge badge-amber shrink-0">LOCKED</span>
            )}
          </div>

          <p className="text-xs text-gray-400 mb-4 leading-relaxed line-clamp-2">
            {achievement.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-gray-400 border-t border-white/5 pt-3 mt-auto">
          <span>Progress: <strong className="text-gray-200">{achievement.progress}</strong></span>
          <span className="text-cyan-400 font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" /> +{achievement.xpBonus} XP
          </span>
        </div>
      </div>
    </div>
  );
}
