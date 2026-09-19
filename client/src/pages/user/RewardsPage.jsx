import React, { useEffect, useState } from 'react';
import { Gift, Zap, ShoppingBag, Info, Loader2, Search, Ticket, CheckCircle2, Key, Copy, Check, Sparkles } from 'lucide-react';
import { getRewardsApi } from '../../services/rewardService';
import { getUserProfileApi } from '../../services/userService';
import { RewardCard } from '../../components/cards/RewardCard';
import { useAuth } from '../../context/AuthContext';

export function RewardsPage() {
  const { user: authUser } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [userXp, setUserXp] = useState(authUser?.xp || 0);
  const [myRedemptions, setMyRedemptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('store'); // 'store' | 'history'
  const [copiedCode, setCopiedCode] = useState(null);

  const fetchRewardsData = async () => {
    try {
      setLoading(true);
      const [rewardsRes, profileRes] = await Promise.allSettled([
        getRewardsApi(),
        getUserProfileApi(),
      ]);

      if (rewardsRes.status === 'fulfilled' && rewardsRes.value.success) {
        setRewards(rewardsRes.value.data?.rewards || []);
        setMyRedemptions(rewardsRes.value.data?.myRedemptions || []);
      }

      if (profileRes.status === 'fulfilled' && profileRes.value.success) {
        setUserXp(profileRes.value.data?.user?.xp || 0);
      }
    } catch (err) {
      console.error('Error fetching rewards:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewardsData();
  }, []);

  const handleRedeemSuccess = (updatedXP) => {
    if (updatedXP !== undefined) {
      setUserXp(updatedXP);
    }
    // Refresh redemptions list
    fetchRewardsData();
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Categories extraction
  const categories = ['All', ...new Set(rewards.map(r => r.category).filter(Boolean))];

  const filteredRewards = rewards.filter((r) => {
    const titleMatch = (r.title || r.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const descMatch = (r.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || descMatch;
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* HERO & HEADER SECTION */}
      <div className="cyber-card p-6 lg:p-8 bg-gradient-to-r from-[#0F172A] via-[#0D1527] to-[#111A2E] border-cyan-500/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5" /> Cyber Rewards Store
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Exchange XP for Swag & Vouchers
            </h1>
            <p className="text-xs lg:text-sm text-gray-300 leading-relaxed">
              Earn experience points by completing security articles and challenge labs, then redeem them for physical gadgets, certification exam vouchers, and exclusive perks.
            </p>
          </div>

          {/* USER BALANCE CARD */}
          <div className="w-full lg:w-auto bg-[#0B101D]/90 border border-cyan-500/40 rounded-2xl p-4 lg:p-5 flex items-center gap-4 shadow-xl shadow-cyan-500/10 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
              <Zap className="w-7 h-7 fill-white" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Your XP Balance</div>
              <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-1.5">
                {userXp.toLocaleString()} <span className="text-xs font-bold text-cyan-400">XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS & SEARCH BAR */}
      <div className="space-y-4">
        
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          
          {/* Main View Switcher Tabs */}
          <div className="flex bg-[#0B101D] p-1.5 rounded-xl border border-gray-800 self-start">
            <button 
              onClick={() => setActiveTab('store')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'store'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> Available Rewards ({rewards.length})
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Ticket className="w-4 h-4" /> My Redemptions ({myRedemptions.length})
            </button>
          </div>

          {/* Search Bar */}
          {activeTab === 'store' && (
            <div className="relative w-full md:w-72">
              <span className="input-icon-left">
                <Search className="w-4 h-4" />
              </span>
              <input 
                type="text" 
                placeholder="Search rewards or vouchers..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-cyber has-left-icon py-2 text-xs"
              />
            </div>
          )}
        </div>

        {/* Category Pills (Only in store mode) */}
        {activeTab === 'store' && categories.length > 1 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800/80">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-[#0B101D] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                }`}
              >
                {cat === 'All' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* STORE GRID VIEW */}
      {activeTab === 'store' && (
        <div>
          {filteredRewards.length === 0 ? (
            <div className="cyber-card p-12 text-center text-gray-400 text-sm space-y-3 bg-[#0F1626]/80 border-gray-800">
              <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto" />
              <div className="font-extrabold text-white text-lg">No Rewards Found</div>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                No rewards match your search query or selected category filter. Try resetting your search filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredRewards.map((reward) => (
                <RewardCard 
                  key={reward._id || reward.id} 
                  reward={reward} 
                  userXp={userXp}
                  onRedeemSuccess={handleRedeemSuccess}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* CLAIMED HISTORY TAB VIEW */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {myRedemptions.length === 0 ? (
            <div className="cyber-card p-12 text-center text-gray-400 text-sm space-y-3">
              <Ticket className="w-10 h-10 text-gray-600 mx-auto" />
              <div className="font-bold text-white text-base">No Claimed Rewards Yet</div>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                You haven't redeemed any rewards yet. Solve challenges and read articles to earn XP, then claim your first voucher!
              </p>
              <button onClick={() => setActiveTab('store')} className="btn-primary text-xs font-bold mt-2">
                Browse Reward Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myRedemptions.map((item) => {
                const rewardObj = item.reward || {};
                const code = item.redemptionCode || 'CODE-UNAVAILABLE';
                const dateStr = new Date(item.createdAt || Date.now()).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                return (
                  <div key={item._id || item.id} className="cyber-card p-5 bg-[#0F1626] border-emerald-500/30 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="badge badge-emerald text-[9px]">Claimed Voucher</span>
                        <h4 className="font-extrabold text-white text-base mt-1 line-clamp-1">
                          {rewardObj.title || rewardObj.name || 'Reward Item'}
                        </h4>
                        <span className="text-[11px] text-gray-400 font-mono">Claimed on {dateStr}</span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-gray-800 space-y-1">
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Voucher / Code</div>
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-300">
                        <span className="truncate flex items-center gap-1.5">
                          <Key className="w-3.5 h-3.5 text-amber-400 shrink-0" /> {code}
                        </span>
                        <button 
                          onClick={() => handleCopyCode(code)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                          title="Copy voucher code"
                        >
                          {copiedCode === code ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* FULFILLMENT INFORMATION NOTE */}
      <div className="cyber-card p-6 bg-[#0B101D]/70 border-gray-800/80 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-xs text-gray-300 space-y-1">
          <h4 className="font-extrabold text-white text-sm">Reward & Voucher Fulfillment Policies</h4>
          <p className="leading-relaxed text-gray-400">
            Digital exam vouchers and discount keys are generated immediately and displayed in your redemption card above. For physical merchandise or swag items, items will be dispatched to your registered address within 2-3 business days.
          </p>
        </div>
      </div>

    </div>
  );
}
