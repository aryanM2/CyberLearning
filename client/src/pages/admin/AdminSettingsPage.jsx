import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, ShieldAlert } from 'lucide-react';

export function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Platform Configuration</h1>
        <p className="text-xs lg:text-sm text-gray-400 mt-1">Configure gamification rules, default XP multipliers, and system flags.</p>
      </div>

      <div className="cyber-card p-6 lg:p-8 space-y-6">
        <h3 className="font-bold text-lg text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" /> Gamification & Platform Settings
        </h3>

        {saved && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> System settings updated!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4 border-b border-gray-800 pb-6">
            <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider">XP & Multipliers</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Daily Login Bonus XP</label>
                <input type="number" defaultValue={50} className="input-cyber" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">7-Day Streak Bonus XP</label>
                <input type="number" defaultValue={300} className="input-cyber" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider">Security & Access Flags</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-xs text-gray-300 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-cyan-500" />
                Enable automatic fraud detection on duplicate XP claims
              </label>
              <label className="flex items-center gap-3 text-xs text-gray-300 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-cyan-500" />
                Require mandatory solution submission for challenge XP
              </label>
            </div>
          </div>

          <button type="submit" className="btn-primary py-2.5 px-6 font-bold text-xs">
            <Save className="w-4 h-4" /> Save System Configuration
          </button>
        </form>
      </div>

    </div>
  );
}
