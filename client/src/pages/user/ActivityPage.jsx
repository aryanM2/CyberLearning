import React, { useEffect, useState } from 'react';
import { Activity, Zap, Loader2 } from 'lucide-react';
import { getUserProfileApi } from '../../services/userService';

export function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        setLoading(true);
        const res = await getUserProfileApi();
        if (res.success && res.data?.activities) {
          setActivities(res.data.activities);
        }
      } catch (err) {
        console.error('Failed to fetch activity logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityLogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

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
          <Activity className="w-5 h-5 text-cyan-400" /> Learning Activity Stream ({activities.length})
        </h3>

        {activities.length === 0 ? (
          <div className="cyber-card p-8 text-center text-gray-400 text-sm">
            No activity recorded yet. Start reading articles or solving lab challenges to populate your stream!
          </div>
        ) : (
          <div className="relative pl-6 border-l-2 border-gray-800 space-y-6">
            {activities.map((log) => {
              const formattedDate = new Date(log.timestamp || log.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div key={log._id || log.id} className="relative group">
                  
                  {/* Dot */}
                  <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border-4 border-[#090D16] absolute -left-[31px] top-1 shadow-md shadow-cyan-400/50" />

                  <div className="cyber-card p-4 bg-gray-900/60 border-gray-800/80 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs mb-1">
                        <span className="badge badge-cyan text-[10px] uppercase">{log.type ? log.type.replace('_', ' ') : 'ACTIVITY'}</span>
                        <span className="text-gray-400 font-mono text-[11px]">{formattedDate}</span>
                      </div>
                      <h4 className="font-bold text-white text-sm">{log.title}</h4>
                    </div>

                    <div className="text-cyan-400 font-extrabold text-xs font-mono shrink-0 ml-4">
                      +{log.xpEarned || log.xp || 0} XP
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
