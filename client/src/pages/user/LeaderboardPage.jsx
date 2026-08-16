import React, { useState } from 'react';
import { Trophy, Award, Flame, Zap, Crown, User, Shield } from 'lucide-react';
import { leaderboardData } from '../../data/mockData';

export function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState('Global');

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Cyber Leaderboard</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1">
            Compete with NextGen Securities security researchers worldwide. Earn XP to climb the ranks.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex bg-[#111726] border border-gray-800 p-1 rounded-xl">
          {['Global', 'Weekly', 'Monthly'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                timeframe === t 
                  ? 'bg-cyan-500 text-white shadow' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* TOP 3 PODIUM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* 2nd Place */}
        <div className="cyber-card p-6 text-center bg-gradient-to-b from-[#111726] to-[#0D1322] border-gray-800 flex flex-col justify-between order-2 md:order-1">
          <div>
            <div className="w-12 h-12 rounded-full bg-slate-700/50 text-slate-300 mx-auto flex items-center justify-center font-bold font-mono mb-3 border border-slate-500">
              #2
            </div>
            <img src={leaderboardData[1].avatar} alt={leaderboardData[1].name} className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-slate-400" />
            <h3 className="font-bold text-white text-base">{leaderboardData[1].name}</h3>
            <p className="text-xs text-gray-400">Level {leaderboardData[1].level}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-800 text-cyan-400 font-extrabold text-sm font-mono">
            {leaderboardData[1].xp.toLocaleString()} XP
          </div>
        </div>

        {/* 1st Place - Champion */}
        <div className="cyber-card p-6 text-center bg-gradient-to-b from-cyan-950/40 via-[#111726] to-[#0D1322] border-amber-500/50 relative flex flex-col justify-between order-1 md:order-2 shadow-xl shadow-amber-500/10">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Crown className="w-3.5 h-3.5 fill-black" /> CHAMPION
          </div>
          <div className="pt-2">
            <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center font-extrabold font-mono text-lg mb-3 border-2 border-amber-500">
              #1
            </div>
            <img src={leaderboardData[0].avatar} alt={leaderboardData[0].name} className="w-20 h-20 rounded-full object-cover mx-auto mb-2 border-4 border-amber-500 shadow-lg shadow-amber-500/20" />
            <h3 className="font-extrabold text-white text-lg">{leaderboardData[0].name}</h3>
            <p className="text-xs text-amber-400 font-semibold">Level {leaderboardData[0].level}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-800 text-amber-400 font-extrabold text-base font-mono">
            {leaderboardData[0].xp.toLocaleString()} XP
          </div>
        </div>

        {/* 3rd Place */}
        <div className="cyber-card p-6 text-center bg-gradient-to-b from-[#111726] to-[#0D1322] border-gray-800 flex flex-col justify-between order-3">
          <div>
            <div className="w-12 h-12 rounded-full bg-amber-900/30 text-amber-600 mx-auto flex items-center justify-center font-bold font-mono mb-3 border border-amber-700">
              #3
            </div>
            <img src={leaderboardData[2].avatar} alt={leaderboardData[2].name} className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-amber-700" />
            <h3 className="font-bold text-white text-base">{leaderboardData[2].name}</h3>
            <p className="text-xs text-gray-400">Level {leaderboardData[2].level}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-800 text-cyan-400 font-extrabold text-sm font-mono">
            {leaderboardData[2].xp.toLocaleString()} XP
          </div>
        </div>
      </div>

      {/* COMPLETE TABLE LISTING */}
      <div className="cyber-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900/80 border-b border-gray-800 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">
              <th className="p-4 text-center">Rank</th>
              <th className="p-4">User</th>
              <th className="p-4">Level</th>
              <th className="p-4 text-center">Streak</th>
              <th className="p-4 text-right">Total XP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60 text-sm">
            {leaderboardData.map((user) => (
              <tr 
                key={user.rank}
                className={`transition-colors ${
                  user.isCurrentUser 
                    ? 'bg-cyan-500/10 border-l-4 border-l-cyan-400 font-bold' 
                    : 'hover:bg-gray-800/40'
                }`}
              >
                <td className="p-4 text-center font-mono font-bold text-gray-400">
                  #{user.rank}
                </td>
                <td className="p-4 flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-gray-700" />
                  <div>
                    <div className={`font-bold ${user.isCurrentUser ? 'text-cyan-400' : 'text-white'}`}>
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-400">@{user.username}</div>
                  </div>
                </td>
                <td className="p-4 font-semibold text-gray-300">
                  Level {user.level}
                </td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <Flame className="w-3.5 h-3.5 fill-amber-400" /> {user.streak}d
                  </span>
                </td>
                <td className="p-4 text-right font-mono font-extrabold text-cyan-400">
                  {user.xp.toLocaleString()} XP
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
