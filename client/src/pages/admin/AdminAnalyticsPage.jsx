import React from 'react';
import { BarChart3, TrendingUp, Users, Zap, ShieldAlert, Award } from 'lucide-react';
import { adminStats } from '../../data/mockData';

export function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Platform Analytics & Metrics</h1>
        <p className="text-xs lg:text-sm text-gray-400 mt-1">Deep dive into user activity, challenge completion rates, and learning engagement.</p>
      </div>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="cyber-card p-6 border-cyan-500/30">
          <div className="flex justify-between items-center text-gray-400 text-xs mb-2">
            <span>Lab Completion Rate</span>
            <Award className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">78.4%</div>
          <p className="text-xs text-emerald-400 mt-1 font-medium">+4.2% from last week</p>
        </div>

        <div className="cyber-card p-6 border-cyan-500/30">
          <div className="flex justify-between items-center text-gray-400 text-xs mb-2">
            <span>Avg Daily Study Session</span>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">34 mins</div>
          <p className="text-xs text-gray-400 mt-1">Per active researcher</p>
        </div>

        <div className="cyber-card p-6 border-cyan-500/30">
          <div className="flex justify-between items-center text-gray-400 text-xs mb-2">
            <span>XP Redemption Efficiency</span>
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">92.1%</div>
          <p className="text-xs text-gray-400 mt-1">Claims processed smoothly</p>
        </div>
      </div>

      {/* DETAILED REPORT CARDS */}
      <div className="cyber-card p-6 space-y-4">
        <h3 className="font-bold text-lg text-white">Most Attempted Challenge Labs</h3>
        <div className="space-y-3">
          {[
            { title: "Bypass the Broken Auth Portal", attempts: 1240, solveRate: "85%" },
            { title: "Crack the Base64 & Rot13 Cipher Chain", attempts: 980, solveRate: "92%" },
            { title: "Identify the Command Injection Payload", attempts: 750, solveRate: "64%" },
            { title: "SQLi Blind Extraction Challenge", attempts: 420, solveRate: "41%" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/60 border border-gray-800 text-xs">
              <span className="font-bold text-white">{item.title}</span>
              <div className="flex items-center gap-6 font-mono">
                <span className="text-gray-400">{item.attempts} attempts</span>
                <span className="text-cyan-400 font-bold">Solve Rate: {item.solveRate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
