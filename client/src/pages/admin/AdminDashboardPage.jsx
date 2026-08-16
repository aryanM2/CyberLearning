import React from 'react';
import { Users, FileText, Target, Zap, Gift, CheckCircle2, TrendingUp, Crown, BarChart3 } from 'lucide-react';
import { adminStats, leaderboardData, articles, challenges, rewards } from '../../data/mockData';

export function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Crown className="w-4 h-4" /> NextGen Securities Administration
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Overview Dashboard</h1>
        </div>

        <span className="badge badge-amber text-xs py-1.5 px-3">
          SYSTEM HEALTH: OPERATIONAL
        </span>
      </div>

      {/* 7 STATS CARDS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="cyber-card p-4 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Total Users</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{adminStats.totalUsers.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 mt-1 font-semibold">+12% this month</div>
        </div>

        <div className="cyber-card p-4 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Active Learners</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{adminStats.activeUsers.toLocaleString()}</div>
          <div className="text-[10px] text-gray-400 mt-1">Daily active accounts</div>
        </div>

        <div className="cyber-card p-4 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Total Articles</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{adminStats.totalArticles}</div>
          <div className="text-[10px] text-gray-400 mt-1">Published guides</div>
        </div>

        <div className="cyber-card p-4 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Total Labs</span>
            <Target className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{adminStats.totalChallenges}</div>
          <div className="text-[10px] text-gray-400 mt-1">Challenge instances</div>
        </div>

        <div className="cyber-card p-4 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Total XP Awarded</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{(adminStats.totalXpAwarded / 1000).toFixed(0)}k XP</div>
          <div className="text-[10px] text-gray-400 mt-1">Across all users</div>
        </div>

        <div className="cyber-card p-4 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Labs Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{adminStats.challengesCompleted.toLocaleString()}</div>
          <div className="text-[10px] text-gray-400 mt-1">Successful solutions</div>
        </div>

        <div className="cyber-card p-4 bg-gray-900/60 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Rewards Redeemed</span>
            <Gift className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{adminStats.rewardsRedeemed}</div>
          <div className="text-[10px] text-gray-400 mt-1">Fulfilled orders</div>
        </div>
      </div>

      {/* VISUAL MOCK CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* User Growth Bar Chart */}
        <div className="cyber-card p-6 space-y-4">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" /> Monthly User Growth
          </h3>
          
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-gray-800">
            {adminStats.userGrowthData.map((d) => {
              const heightPercent = (d.users / 1500) * 100;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-mono text-cyan-400">{d.users}</span>
                  <div 
                    className="w-full bg-gradient-to-t from-cyan-600 to-blue-500 rounded-t-md transition-all hover:brightness-125"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-xs text-gray-400 font-mono mt-1">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* XP Distribution */}
        <div className="cyber-card p-6 space-y-4">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" /> XP Category Distribution
          </h3>

          <div className="space-y-3 pt-2">
            {adminStats.xpDistribution.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-300">{item.category}</span>
                  <span className="text-cyan-400 font-mono">{(item.xp / 1000).toFixed(0)}k XP</span>
                </div>
                <div className="progress-container h-2 bg-gray-900">
                  <div 
                    className="progress-fill h-full bg-gradient-to-r from-amber-500 to-cyan-500 rounded-full"
                    style={{ width: `${(item.xp / 550000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RECENT REGISTERED USERS TABLE */}
      <div className="cyber-card p-6 space-y-4">
        <h3 className="font-bold text-lg text-white">Recent User Registrations</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 uppercase font-extrabold font-mono">
                <th className="p-3">User</th>
                <th className="p-3">Email</th>
                <th className="p-3">Level</th>
                <th className="p-3 text-right">XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {leaderboardData.slice(0, 4).map((u) => (
                <tr key={u.rank} className="hover:bg-gray-800/40">
                  <td className="p-3 font-bold text-white flex items-center gap-2">
                    <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full" /> {u.name}
                  </td>
                  <td className="p-3 text-gray-400 font-mono">{u.username}@nextgen.com</td>
                  <td className="p-3 text-gray-300">Level {u.level}</td>
                  <td className="p-3 text-right font-mono font-bold text-cyan-400">{u.xp} XP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
