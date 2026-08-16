import React from 'react';
import { Activity, Zap, CheckCircle2, Trophy, Flame, BookOpen, Clock } from 'lucide-react';
import { activityLogs } from '../../data/mockData';

export function ActivityPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Recent Activity History</h1>
        <p className="text-xs lg:text-sm text-gray-400 mt-1">Audit log of your completed challenges, read articles, daily check-ins, and XP gains.</p>
      </div>

      {/* ACTIVITY TIMELINE */}
      <div className="cyber-card p-6 space-y-6">
        <h3 className="font-bold text-lg text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" /> Learning Activity Stream
        </h3>

        <div className="relative pl-6 border-l-2 border-gray-800 space-y-6">
          {activityLogs.map((log) => (
            <div key={log.id} className="relative group">
              
              {/* Dot */}
              <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border-4 border-[#090D16] absolute -left-[31px] top-1 shadow-md shadow-cyan-400/50" />

              <div className="cyber-card p-4 bg-gray-900/60 border-gray-800/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs mb-1">
                    <span className="badge badge-cyan text-[10px]">{log.action}</span>
                    <span className="text-gray-400 font-mono text-[11px]">{log.timestamp}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{log.title}</h4>
                </div>

                <div className="text-cyan-400 font-extrabold text-xs font-mono shrink-0 ml-4">
                  +{log.xp} XP
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
