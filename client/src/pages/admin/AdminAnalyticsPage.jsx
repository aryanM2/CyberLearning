import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Users, Zap, ShieldAlert, Award, Loader2 } from 'lucide-react';
import { getAdminAnalyticsApi } from '../../services/adminService';

export function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await getAdminAnalyticsApi();
        if (res.success && res.data) {
          setAnalytics(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  const data = analytics || {};
  const solveRate = data.totalSubmissions > 0
    ? ((data.solvedSubmissions / data.totalSubmissions) * 100).toFixed(1)
    : '100';

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Platform Analytics & Metrics</h1>
        <p className="text-xs lg:text-sm text-gray-400 mt-1">Deep dive into user activity, challenge completion rates, and learning engagement.</p>
      </div>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="cyber-card p-6 border-cyan-500/30">
          <div className="flex justify-between items-center text-gray-400 text-xs mb-2">
            <span>Lab Success Rate</span>
            <Award className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{solveRate}%</div>
          <p className="text-xs text-emerald-400 mt-1 font-medium">{data.solvedSubmissions || 0} solved / {data.totalSubmissions || 0} attempts</p>
        </div>

        <div className="cyber-card p-6 border-cyan-500/30">
          <div className="flex justify-between items-center text-gray-400 text-xs mb-2">
            <span>Weekly Active Researchers</span>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{data.activeUsers7Days || 0}</div>
          <p className="text-xs text-gray-400 mt-1">Active in last 7 days</p>
        </div>

        <div className="cyber-card p-6 border-cyan-500/30">
          <div className="flex justify-between items-center text-gray-400 text-xs mb-2">
            <span>Total XP Awarded</span>
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{(data.totalXpDistributed || 0).toLocaleString()} XP</div>
          <p className="text-xs text-gray-400 mt-1">Distributed to users</p>
        </div>
      </div>

      {/* CATEGORY DISTRIBUTION REPORT */}
      <div className="cyber-card p-6 space-y-4">
        <h3 className="font-bold text-lg text-white">Articles Breakdown by Category</h3>
        <div className="space-y-3">
          {(data.articleCategories || []).map((cat, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/60 border border-gray-800 text-xs">
              <span className="font-bold text-white">{cat._id || 'Uncategorized'}</span>
              <div className="flex items-center gap-6 font-mono">
                <span className="text-cyan-400 font-bold">{cat.count} published articles</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
