import React, { useEffect, useState } from 'react';
import { Users, FileText, Target, Zap, Gift, CheckCircle2, TrendingUp, Crown, BarChart3, Loader2 } from 'lucide-react';
import { getAdminAnalyticsApi, getAdminUsersApi } from '../../services/adminService';

export function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const [analyticsRes, usersRes] = await Promise.allSettled([
          getAdminAnalyticsApi(),
          getAdminUsersApi(),
        ]);

        if (analyticsRes.status === 'fulfilled' && analyticsRes.value.success) {
          setAnalytics(analyticsRes.value.data);
        }

        if (usersRes.status === 'fulfilled' && usersRes.value.success) {
          setRecentUsers(usersRes.value.data || []);
        }
      } catch (err) {
        console.error('Failed to load admin analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  const metrics = analytics || {
    totalUsers: recentUsers.length,
    totalArticles: 0,
    totalChallenges: 0,
    totalSubmissions: 0,
    solvedSubmissions: 0,
    completedArticles: 0,
    totalXpDistributed: 0,
    activeUsers7Days: 0,
    articleCategories: [],
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
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

      {/* STATS CARDS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="cyber-card p-4 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Total Registered Users</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{metrics.totalUsers}</div>
          <div className="text-[10px] text-emerald-400 mt-1 font-semibold">Active system users</div>
        </div>

        <div className="cyber-card p-4 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Active (7 Days)</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{metrics.activeUsers7Days}</div>
          <div className="text-[10px] text-gray-400 mt-1">Weekly active accounts</div>
        </div>

        <div className="cyber-card p-4 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Total Articles</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{metrics.totalArticles}</div>
          <div className="text-[10px] text-gray-400 mt-1">Published guides</div>
        </div>

        <div className="cyber-card p-4 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Total Challenge Labs</span>
            <Target className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{metrics.totalChallenges}</div>
          <div className="text-[10px] text-gray-400 mt-1">Interactive labs</div>
        </div>

        <div className="cyber-card p-4 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Total XP Distributed</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{metrics.totalXpDistributed.toLocaleString()} XP</div>
          <div className="text-[10px] text-gray-400 mt-1">Earned by users</div>
        </div>

        <div className="cyber-card p-4 bg-gray-900/60">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Labs Solved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{metrics.solvedSubmissions}</div>
          <div className="text-[10px] text-gray-400 mt-1">Out of {metrics.totalSubmissions} attempts</div>
        </div>

        <div className="cyber-card p-4 bg-gray-900/60 col-span-2 sm:col-span-2">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Completed Articles Read</span>
            <Gift className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{metrics.completedArticles}</div>
          <div className="text-[10px] text-gray-400 mt-1">Logged reads across platform</div>
        </div>
      </div>

      {/* RECENT REGISTERED USERS TABLE */}
      <div className="cyber-card p-6 space-y-4">
        <h3 className="font-bold text-lg text-white">Platform Registered Users ({recentUsers.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 uppercase font-extrabold font-mono">
                <th className="p-3">User Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Level</th>
                <th className="p-3 text-right">XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {recentUsers.slice(0, 8).map((u) => (
                <tr key={u._id || u.id} className="hover:bg-gray-800/40">
                  <td className="p-3 font-bold text-white flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-[10px] flex items-center justify-center">
                      {(u.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    {u.name}
                  </td>
                  <td className="p-3 text-gray-400 font-mono">{u.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.role === 'admin' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-gray-800 text-gray-300'}`}>
                      {u.role ? u.role.toUpperCase() : 'USER'}
                    </span>
                  </td>
                  <td className="p-3 text-gray-300">{u.role === 'admin' ? 'N/A' : `Level ${u.level || 1}`}</td>
                  <td className="p-3 text-right font-mono font-bold text-cyan-400">{u.role === 'admin' ? 'N/A' : `${(u.xp || 0).toLocaleString()} XP`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
