import React, { useEffect, useState } from 'react';
import { Trophy, Award, Lock, Zap, Loader2 } from 'lucide-react';
import { getAchievementsApi } from '../../services/achievementService';
import { AchievementCard } from '../../components/cards/AchievementCard';

export function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        setLoading(true);
        const res = await getAchievementsApi();
        if (res.success && res.data) {
          setAchievements(res.data);
        }
      } catch (err) {
        console.error('Failed to load achievements:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Badges & Achievements</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1">
            Unlock achievements as you read articles, complete lab challenges, and maintain daily learning streaks.
          </p>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl px-5 py-3 text-center">
          <div className="text-xl font-extrabold text-cyan-400 font-mono">
            {unlockedCount} / {achievements.length}
          </div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Unlocked Badges</div>
        </div>
      </div>

      {/* UNLOCKED SECTION */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" /> Unlocked Milestones ({unlockedCount})
        </h2>
        {unlockedCount === 0 ? (
          <div className="cyber-card p-6 text-center text-gray-400 text-sm">
            No achievements unlocked yet. Complete articles or lab challenges to earn your first badge!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.filter(a => a.unlocked).map((ach) => (
              <AchievementCard key={ach._id || ach.id} achievement={ach} />
            ))}
          </div>
        )}
      </div>

      {/* LOCKED SECTION */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-400 flex items-center gap-2">
          <Lock className="w-5 h-5 text-gray-500" /> In Progress / Locked ({achievements.length - unlockedCount})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.filter(a => !a.unlocked).map((ach) => (
            <AchievementCard key={ach._id || ach.id} achievement={ach} />
          ))}
        </div>
      </div>

    </div>
  );
}
