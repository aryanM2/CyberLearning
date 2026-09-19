import React, { useEffect, useState } from 'react';
import { Trophy, Award, Flame, Zap, Crown, User as UserIcon, Shield, Loader2 } from 'lucide-react';
import { getLeaderboardApi } from '../../services/leaderboardService';
import { useAuth } from '../../context/AuthContext';

export function LeaderboardPage() {
  const { user: authUser } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await getLeaderboardApi();
        if (res.success && res.data) {
          setLeaderboard(res.data.leaderboard || []);
          setUserRank(res.data.currentUserRank);
        }
      } catch (err) {
        console.error('Failed to load leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Cyber Leaderboard</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1">
            Compete with NextGen Securities security researchers worldwide. Earn XP to climb the ranks.
          </p>
        </div>

        {userRank && (
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl px-5 py-3 text-center">
            <div className="text-xl font-extrabold text-cyan-400 font-mono">
              #{userRank}
            </div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Your Global Rank</div>
          </div>
        )}
      </div>

      {/* TOP 3 PODIUM */}
      {leaderboard.length >= 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          {/* 2nd Place */}
          {top2 ? (
            <div className="cyber-card p-6 text-center bg-gradient-to-b from-[#111726] to-[#0D1322] border-gray-800 flex flex-col justify-between order-2 md:order-1">
              <div>
                <div className="w-12 h-12 rounded-full bg-slate-700/50 text-slate-300 mx-auto flex items-center justify-center font-bold font-mono mb-3 border border-slate-500">
                  #2
                </div>
                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-400 mx-auto mb-2 flex items-center justify-center text-slate-300 font-bold text-xl overflow-hidden">
                  {top2.avatar ? <img src={top2.avatar} alt={top2.name} className="w-full h-full object-cover" /> : top2.name.charAt(0)}
                </div>
                <h3 className="font-bold text-white text-base">{top2.name}</h3>
                <p className="text-xs text-gray-400">Level {top2.level}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800 text-cyan-400 font-extrabold text-sm font-mono">
                {top2.xp.toLocaleString()} XP
              </div>
            </div>
          ) : <div />}

          {/* 1st Place - Champion */}
          {top1 && (
            <div className="cyber-card p-6 text-center bg-gradient-to-b from-cyan-950/40 via-[#111726] to-[#0D1322] border-amber-500/50 relative flex flex-col justify-between order-1 md:order-2 shadow-xl shadow-amber-500/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <Crown className="w-3.5 h-3.5 fill-black" /> CHAMPION
              </div>
              <div className="pt-2">
                <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center font-extrabold font-mono text-lg mb-3 border-2 border-amber-500">
                  #1
                </div>
                <div className="w-20 h-20 rounded-full bg-amber-500/20 border-4 border-amber-500 shadow-lg shadow-amber-500/20 mx-auto mb-2 flex items-center justify-center text-amber-400 font-bold text-2xl overflow-hidden">
                  {top1.avatar ? <img src={top1.avatar} alt={top1.name} className="w-full h-full object-cover" /> : top1.name.charAt(0)}
                </div>
                <h3 className="font-extrabold text-white text-lg">{top1.name}</h3>
                <p className="text-xs text-amber-400 font-semibold">Level {top1.level}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800 text-amber-400 font-extrabold text-base font-mono">
                {top1.xp.toLocaleString()} XP
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {top3 ? (
            <div className="cyber-card p-6 text-center bg-gradient-to-b from-[#111726] to-[#0D1322] border-gray-800 flex flex-col justify-between order-3">
              <div>
                <div className="w-12 h-12 rounded-full bg-amber-900/30 text-amber-600 mx-auto flex items-center justify-center font-bold font-mono mb-3 border border-amber-700">
                  #3
                </div>
                <div className="w-16 h-16 rounded-full bg-amber-900/20 border-2 border-amber-700 mx-auto mb-2 flex items-center justify-center text-amber-500 font-bold text-xl overflow-hidden">
                  {top3.avatar ? <img src={top3.avatar} alt={top3.name} className="w-full h-full object-cover" /> : top3.name.charAt(0)}
                </div>
                <h3 className="font-bold text-white text-base">{top3.name}</h3>
                <p className="text-xs text-gray-400">Level {top3.level}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800 text-cyan-400 font-extrabold text-sm font-mono">
                {top3.xp.toLocaleString()} XP
              </div>
            </div>
          ) : <div />}

        </div>
      )}

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
            {leaderboard.map((user) => {
              const isCurrent = authUser && (user._id === authUser.id || user._id === authUser._id);
              return (
                <tr 
                  key={user.rank}
                  className={`transition-colors ${
                    isCurrent 
                      ? 'bg-cyan-500/10 border-l-4 border-l-cyan-400 font-bold' 
                      : 'hover:bg-gray-800/40'
                  }`}
                >
                  <td className="p-4 text-center font-mono font-bold text-gray-400">
                    #{user.rank}
                  </td>
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center overflow-hidden shrink-0 border border-gray-700">
                      {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : user.name.charAt(0)}
                    </div>
                    <div>
                      <div className={`font-bold ${isCurrent ? 'text-cyan-400' : 'text-white'}`}>
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-400">{user.role === 'admin' ? 'Security Admin' : 'Cadet'}</div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-gray-300">
                    Level {user.level}
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                      <Flame className="w-3.5 h-3.5 fill-amber-400" /> {user.streak || 0}d
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono font-extrabold text-cyan-400">
                    {user.xp.toLocaleString()} XP
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
