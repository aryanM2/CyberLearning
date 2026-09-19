import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Flame, Trophy, Gift, ArrowRight, BookOpen } from 'lucide-react';
import { getArticlesApi } from '../../services/articleService';
import { getLeaderboardApi } from '../../services/leaderboardService';
import { getRewardsApi } from '../../services/rewardService';

export function LandingPage() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [topRankers, setTopRankers] = useState([]);
  const [storeRewards, setStoreRewards] = useState([]);

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const [artRes, leaderRes, rewRes] = await Promise.allSettled([
          getArticlesApi({ limit: 3 }),
          getLeaderboardApi(),
          getRewardsApi(),
        ]);

        if (artRes.status === 'fulfilled' && artRes.value.success) {
          setFeaturedArticles((artRes.value.data || []).slice(0, 3));
        }

        if (leaderRes.status === 'fulfilled' && leaderRes.value.success) {
          setTopRankers((leaderRes.value.data?.leaderboard || []).slice(0, 4));
        }

        if (rewRes.status === 'fulfilled' && rewRes.value.success) {
          setStoreRewards((rewRes.value.data?.rewards || []).slice(0, 2));
        }
      } catch (err) {
        console.error('Error loading landing page data from DB:', err);
      }
    };

    fetchLandingData();
  }, []);

  return (
    <div className="w-full space-y-16 pb-20">
      
      {/* HERO SECTION */}
      <section className="hero-container">
        
        <div className="hero-badge">
          <Shield className="w-4 h-4" /> NextGen Securities Academy
        </div>

        <h1 className="hero-title">
          Master Cybersecurity. <br />
          <span className="text-gradient">Solve Challenges. Earn XP. Level Up.</span>
        </h1>

        <p className="hero-description">
          The interactive security learning platform that turns cybersecurity education into a hands-on experience. Build real-world defensive and offensive skills.
        </p>

        <div className="hero-actions">
          <Link to="/register" className="btn-primary">
            Start Learning Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/login" className="btn-secondary">
            Sign In to Academy
          </Link>
        </div>

        {/* Hero Quick Features */}
        <div className="grid-layout-4">
          <div className="cyber-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xs">Interactive XP</div>
                <div className="text-[11px] text-gray-400">Earn per lab solved</div>
              </div>
            </div>
          </div>

          <div className="cyber-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xs">Daily Streaks</div>
                <div className="text-[11px] text-gray-400">Build learning habits</div>
              </div>
            </div>
          </div>

          <div className="cyber-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xs">Global Ranks</div>
                <div className="text-[11px] text-gray-400 font-medium">Learners Leaderboard</div>
              </div>
            </div>
          </div>

          <div className="cyber-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xs">Real Rewards</div>
                <div className="text-[11px] text-gray-400">Redeem swag & Vouchers</div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* HOW IT WORKS */}
      <section id="features" className="section-container">
        <div className="section-header">
          <h2 className="section-title">How The Ecosystem Works</h2>
          <p className="section-subtitle">A continuous progress loop designed to keep you motivated every step of the way.</p>
        </div>

        <div className="grid-layout-4">
          {[
            { step: "01", title: "Read Articles", desc: "Learn key concepts across SQLi, XSS, Network Analysis & Cryptography." },
            { step: "02", title: "Solve Challenges", desc: "Apply knowledge in hands-on simulated attack & defense labs." },
            { step: "03", title: "Earn XP & Badges", desc: "Gain experience points, advance levels, and unlock achievement badges." },
            { step: "04", title: "Claim Rewards", desc: "Redeem XP for physical gadgets, hoodies, and official exam vouchers." },
          ].map((item, idx) => (
            <div key={idx} className="cyber-card">
              <div className="flex justify-between items-center mb-4">
                <span className="badge badge-cyan font-mono">{item.step}</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              </div>
              <h3 className="font-bold text-base text-white mb-2">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOPICS PREVIEW */}
      <section id="topics" className="section-container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <h2 className="section-title text-left mb-1">Security Curriculum</h2>
            <p className="section-subtitle text-left">Core defensive & offensive security domains.</p>
          </div>
          <Link to="/register" className="btn-outline">Browse All Articles <ArrowRight className="w-4 h-4" /></Link>
        </div>

        {featuredArticles.length === 0 ? (
          <div className="cyber-card p-8 text-center text-gray-400 text-sm">
            No articles published yet. Check back soon!
          </div>
        ) : (
          <div className="grid-layout-3">
            {featuredArticles.map((art) => (
              <div key={art._id || art.id} className="cyber-card cyber-card-hover flex flex-col justify-between h-full">
                <div>
                  <span className="badge badge-cyan mb-3">{art.category}</span>
                  <h3 className="font-bold text-base text-white mb-2 leading-snug">{art.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-3 mb-4 leading-relaxed">{art.excerpt || art.description}</p>
                </div>
                <div className="flex justify-between items-center text-xs font-mono border-t border-white/10 pt-4 text-gray-400 mt-4">
                  <span>{art.readTime || '5 min read'}</span>
                  <span className="text-cyan-400 font-bold">+{art.xpReward || 50} XP</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* LEADERBOARD & REWARDS PREVIEW */}
      <section id="rewards" className="section-container">
        <div className="grid-layout-2">
          
          {/* Leaderboard Preview */}
          <div className="cyber-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" /> Leaderboard Top Rankers
              </h3>
              <Link to="/login" className="text-xs text-cyan-400 hover:underline">View All</Link>
            </div>
            {topRankers.length === 0 ? (
              <div className="p-6 text-center text-gray-400 text-xs">
                No active leaderboard rankers yet. Be the first to earn XP!
              </div>
            ) : (
              <div className="space-y-3">
                {topRankers.map((u) => (
                  <div key={u.rank} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 text-center font-mono font-bold text-xs ${u.rank === 1 ? 'text-amber-400' : 'text-gray-400'}`}>
                        #{u.rank}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center overflow-hidden shrink-0 border border-gray-700">
                        {u.avatar ? <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" /> : u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{u.name}</div>
                        <div className="text-[10px] text-gray-400">Level {u.level}</div>
                      </div>
                    </div>
                    <span className="text-cyan-400 font-bold text-xs font-mono">{u.xp.toLocaleString()} XP</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rewards Store Preview */}
          <div className="cyber-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-400" /> Redeemable Swag & Vouchers
              </h3>
              <Link to="/login" className="text-xs text-cyan-400 hover:underline">View Shop</Link>
            </div>
            {storeRewards.length === 0 ? (
              <div className="p-6 text-center text-gray-400 text-xs">
                No reward items added yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {storeRewards.map((r) => (
                  <div key={r._id || r.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-center flex flex-col justify-between">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-2 font-bold">
                      <Gift className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-white text-xs truncate">{r.title}</div>
                    <div className="text-cyan-400 font-extrabold text-xs font-mono mt-1">{r.xpCost} XP</div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="section-container">
        <div className="cyber-card p-10 text-center bg-gradient-to-br from-cyan-950/40 via-[#0F1626] to-blue-950/40 border-cyan-500/40 space-y-6 max-w-4xl mx-auto">
          <Shield className="w-12 h-12 text-cyan-400 mx-auto" />
          <h2 className="text-3xl font-extrabold text-white">Ready to Become a Cyber Defender?</h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto leading-relaxed">
            Join NextGen Securities Cybersecurity Academy today. Read articles, solve labs, and build real-world security skills.
          </p>
          <div>
            <Link to="/register" className="btn-primary py-3 px-8 text-sm">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
