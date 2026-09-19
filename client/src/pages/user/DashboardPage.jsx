import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Flame, BookOpen, Target, Trophy, Gift, ArrowRight, ShieldCheck, ChevronRight, Loader2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserProfileApi } from '../../services/userService';
import { getArticlesApi } from '../../services/articleService';
import { getChallengesApi } from '../../services/challengeService';
import { getAchievementsApi } from '../../services/achievementService';
import { getRewardsApi } from '../../services/rewardService';
import { XPProgressBar } from '../../components/common/XPProgressBar';
import { AchievementCard } from '../../components/cards/AchievementCard';

export function DashboardPage() {
  const { user: authUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [recommendedArticle, setRecommendedArticle] = useState(null);
  const [featuredChallenge, setFeaturedChallenge] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [rewardsCount, setRewardsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [profileRes, articlesRes, challengesRes, achievementsRes, rewardsRes] = await Promise.allSettled([
          getUserProfileApi(),
          getArticlesApi({ limit: 5 }),
          getChallengesApi(),
          getAchievementsApi(),
          getRewardsApi(),
        ]);

        if (profileRes.status === 'fulfilled' && profileRes.value.success) {
          setProfileData(profileRes.value.data);
        }

        if (articlesRes.status === 'fulfilled' && articlesRes.value.success) {
          const arts = articlesRes.value.data || [];
          setRecommendedArticle(arts[0] || null);
        }

        if (challengesRes.status === 'fulfilled' && challengesRes.value.success) {
          const chs = challengesRes.value.data || [];
          const unsolved = chs.find(c => !c.solved) || chs[0];
          setFeaturedChallenge(unsolved || null);
        }

        if (achievementsRes.status === 'fulfilled' && achievementsRes.value.success) {
          setAchievements(achievementsRes.value.data || []);
        }

        if (rewardsRes.status === 'fulfilled' && rewardsRes.value.success) {
          const rws = rewardsRes.value.data?.rewards || [];
          setRewardsCount(rws.length);
        }
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const userData = profileData?.user || authUser || {};
  const levelInfo = profileData?.levelInfo || { level: userData.level || 1, currentXP: userData.xp || 0, nextLevelXP: 1000 };
  const stats = profileData?.stats || { completedArticlesCount: 0, solvedChallengesCount: 0 };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* WELCOME BANNER & GAMIFICATION SUMMARY */}
      <div className="cyber-card p-6 lg:p-8 bg-gradient-to-r from-cyan-950/40 via-[#0F1626] to-blue-950/40 border-cyan-500/30 relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" /> Security Operations Center
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-gradient">{userData.name || 'Agent'}</span>!
            </h1>
            <p className="text-xs lg:text-sm text-gray-400 mt-1">
              Level {userData.level || 1} • {userData.role === 'admin' ? 'Security Administrator' : 'Cyber Security Cadet'}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl px-4 py-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-extrabold text-base font-mono">
                <Flame className="w-4 h-4 fill-amber-400" /> {userData.streak || 0}
              </div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Day Streak</div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl px-4 py-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-cyan-400 font-extrabold text-base font-mono">
                <Zap className="w-4 h-4 fill-cyan-400 text-cyan-400" /> {userData.xp || 0}
              </div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total XP</div>
            </div>
          </div>
        </div>

        {/* Level XP Bar */}
        <div className="mt-6 pt-6 border-t border-white/5">
          <XPProgressBar 
            currentXp={levelInfo.currentXP || userData.xp || 0} 
            nextLevelXp={levelInfo.nextLevelXP || 1000} 
            level={levelInfo.level || userData.level || 1} 
          />
        </div>
      </div>

      {/* 4 STATS COUNTER CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="cyber-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">{stats.completedArticlesCount}</div>
            <div className="text-xs text-gray-400 font-medium">Articles Read</div>
          </div>
        </div>

        <div className="cyber-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">{stats.solvedChallengesCount}</div>
            <div className="text-xs text-gray-400 font-medium">Labs Solved</div>
          </div>
        </div>

        <div className="cyber-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">{userData.badges?.length || 0}</div>
            <div className="text-xs text-gray-400 font-medium">Badges Earned</div>
          </div>
        </div>

        <div className="cyber-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">{rewardsCount} Available</div>
            <div className="text-xs text-gray-400 font-medium">Reward Swag</div>
          </div>
        </div>
      </div>

      {/* TODAY'S FEATURED CHALLENGE & RECOMMENDED ARTICLE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recommended Article */}
        {recommendedArticle ? (
          <div className="cyber-card p-6 flex flex-col justify-between border-l-4 border-l-blue-500 h-full">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="badge badge-purple">Recommended Article</span>
                <span className="text-xs text-cyan-400 font-bold font-mono">+{recommendedArticle.xpReward} XP</span>
              </div>
              <h3 className="font-bold text-lg text-white mb-2 leading-snug">{recommendedArticle.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">{recommendedArticle.excerpt || recommendedArticle.description}</p>
            </div>
            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
              <span className="text-xs text-gray-400 font-mono">{recommendedArticle.readTime || '5 min read'}</span>
              <Link to={`/app/articles/${recommendedArticle._id || recommendedArticle.id}`} className="btn-primary text-xs">
                Continue Reading <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : null}

        {/* Today's Challenge */}
        {featuredChallenge ? (
          <div className="cyber-card p-6 flex flex-col justify-between border-l-4 border-l-cyan-500 h-full">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="badge badge-cyan">Today's Lab Challenge</span>
                <span className="text-xs text-cyan-400 font-bold font-mono">+{featuredChallenge.xpReward} XP</span>
              </div>
              <h3 className="font-bold text-lg text-white mb-2 leading-snug">{featuredChallenge.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">{featuredChallenge.description}</p>
            </div>
            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
              <span className="text-xs text-gray-400 font-mono">Difficulty: {featuredChallenge.difficulty}</span>
              <Link to={`/app/challenges/${featuredChallenge._id || featuredChallenge.id}`} className="btn-primary text-xs">
                Solve Lab Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : null}

      </div>

      {/* RECENT ACHIEVEMENTS PREVIEW */}
      <div className="space-y-4 pt-2">
        <div className="flex justify-between items-center">
          <h2 className="font-extrabold text-xl text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" /> Recent Badges & Achievements
          </h2>
          <Link to="/app/achievements" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.slice(0, 2).map((ach) => (
            <AchievementCard key={ach._id || ach.id} achievement={ach} />
          ))}
        </div>
      </div>

    </div>
  );
}
