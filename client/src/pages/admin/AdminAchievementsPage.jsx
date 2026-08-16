import React from 'react';
import { Trophy, Plus, Edit, Trash2 } from 'lucide-react';
import { achievements } from '../../data/mockData';

export function AdminAchievementsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Achievements & Badges</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1">Configure gamification badges and unlock milestones.</p>
        </div>
        <button className="btn-primary text-xs font-bold"><Plus className="w-4 h-4" /> Add Achievement</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((ach) => (
          <div key={ach.id} className="cyber-card p-4 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white text-sm">{ach.title}</h4>
              <p className="text-xs text-gray-400 mt-0.5">{ach.description}</p>
              <span className="text-cyan-400 font-mono text-xs font-bold mt-2 block">+{ach.xpBonus} XP Bonus</span>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 bg-gray-800 rounded text-gray-300"><Edit className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 bg-red-500/10 rounded text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
