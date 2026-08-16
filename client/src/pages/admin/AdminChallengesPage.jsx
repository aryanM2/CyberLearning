import React from 'react';
import { Target, Plus, Edit, Trash2 } from 'lucide-react';
import { challenges } from '../../data/mockData';

export function AdminChallengesPage() {
  return (
    <div className="space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Challenge Labs Management</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1">Configure vulnerability snippets, flags, and XP rewards.</p>
        </div>
        <button className="btn-primary text-xs font-bold">
          <Plus className="w-4 h-4" /> Create New Lab
        </button>
      </div>

      <div className="cyber-card p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 uppercase font-extrabold font-mono">
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Difficulty</th>
                <th className="p-3">Correct Flag / Answer</th>
                <th className="p-3">XP</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {challenges.map((c) => (
                <tr key={c.id} className="hover:bg-gray-800/40">
                  <td className="p-3 font-bold text-white max-w-xs truncate">{c.title}</td>
                  <td className="p-3 text-gray-300">{c.category}</td>
                  <td className="p-3"><span className="badge badge-emerald">{c.difficulty}</span></td>
                  <td className="p-3 font-mono text-cyan-400 max-w-xs truncate">{c.correctAnswer}</td>
                  <td className="p-3 font-mono font-bold text-cyan-400">+{c.xp} XP</td>
                  <td className="p-3 text-right space-x-2">
                    <button className="p-1.5 bg-gray-800 rounded text-gray-300"><Edit className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 bg-red-500/10 rounded text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
