import React, { useState } from 'react';
import { Zap, CheckCircle2, ShoppingBag, Loader2, Key, Ticket, Award, Package, Sparkles, Lock, Ban, Copy, Check } from 'lucide-react';
import { redeemRewardApi } from '../../services/rewardService';

export function RewardCard({ reward, userXp, onRedeemSuccess }) {
  const [redeeming, setRedeeming] = useState(false);
  const [redemptionCode, setRedemptionCode] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const rewardId = reward._id || reward.id;
  const rewardName = reward.title || reward.name;
  const stock = reward.stock !== undefined ? reward.stock : reward.quantity || 10;
  const canAfford = userXp >= reward.xpCost && stock > 0;
  const missingXp = Math.max(0, reward.xpCost - userXp);

  const getCategoryConfig = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('voucher') || cat.includes('discount')) {
      return {
        icon: Ticket,
        badgeClass: 'badge-cyan',
        glowClass: 'glow-card-cyan border-cyan-500/30',
        iconBg: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-cyan-500/20',
        pulseColor: 'bg-emerald-400',
      };
    }
    if (cat.includes('merch') || cat.includes('swag') || cat.includes('apparel')) {
      return {
        icon: Package,
        badgeClass: 'badge-purple',
        glowClass: 'glow-card-purple border-purple-500/30',
        iconBg: 'bg-purple-500/10 border-purple-500/40 text-purple-400 shadow-purple-500/20',
        pulseColor: 'bg-purple-400',
      };
    }
    if (cat.includes('cert') || cat.includes('exam')) {
      return {
        icon: Award,
        badgeClass: 'badge-amber',
        glowClass: 'glow-card-amber border-amber-500/30',
        iconBg: 'bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-amber-500/20',
        pulseColor: 'bg-amber-400',
      };
    }
    return {
      icon: Sparkles,
      badgeClass: 'badge-emerald',
      glowClass: 'glow-card-emerald border-emerald-500/30',
      iconBg: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-emerald-500/20',
      pulseColor: 'bg-emerald-400',
    };
  };

  const catConfig = getCategoryConfig(reward.category);
  const CategoryIcon = catConfig.icon;

  const handleRedeem = async () => {
    if (!canAfford || redeeming || redemptionCode) return;
    try {
      setRedeeming(true);
      setErrorMsg('');
      const res = await redeemRewardApi(rewardId);
      if (res.success && res.data) {
        setRedemptionCode(res.data.code);
        if (onRedeemSuccess) {
          onRedeemSuccess(res.data.updatedXP);
        }
      } else {
        setErrorMsg(res.message || 'Redemption failed');
      }
    } catch (err) {
      console.error('Redeem error:', err);
      setErrorMsg(err.message || 'Redemption error');
    } finally {
      setRedeeming(false);
    }
  };

  const handleCopyCode = () => {
    if (!redemptionCode) return;
    navigator.clipboard.writeText(redemptionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`cyber-card overflow-hidden flex flex-col justify-between h-full group transition-all duration-300 rounded-2xl bg-[#0F1626]/95 border ${catConfig.glowClass}`}>
      
      {/* CYBERPUNK HOLOGRAPHIC HEADER */}
      <div>
        <div className="h-48 relative overflow-hidden bg-grid-cyber bg-[#0B101D] flex flex-col justify-between p-4 border-b border-gray-800/80">
          
          {/* Ambient Glow Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none"></div>

          {/* Top Bar */}
          <div className="flex items-center justify-between z-10 w-full">
            <span className={`badge ${catConfig.badgeClass} backdrop-blur-md shadow-md`}>
              {reward.category || 'Swag'}
            </span>
            
            {/* Live Stock Indicator */}
            <div className="flex items-center gap-1.5 bg-[#090E1A]/80 border border-gray-800 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold">
              {stock > 0 ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${stock <= 3 ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${stock <= 3 ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                  </span>
                  <span className={stock <= 3 ? 'text-amber-400 font-bold' : 'text-gray-300'}>
                    {stock} Available
                  </span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  <span className="text-rose-400 font-bold">Sold Out</span>
                </>
              )}
            </div>
          </div>

          {/* Center 3D Icon Container */}
          <div className="flex items-center justify-center my-auto z-10">
            <div className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center font-bold shadow-2xl backdrop-blur-md group-hover:scale-110 group-hover:rotate-1 transition-all duration-300 ${catConfig.iconBg}`}>
              <CategoryIcon className="w-10 h-10 stroke-[1.75]" />
            </div>
          </div>
        </div>

        {/* CARD BODY CONTENT */}
        <div className="p-5 space-y-2">
          <h3 className="text-base lg:text-lg font-extrabold text-white group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2 min-h-[3rem] flex items-center">
            {rewardName}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {reward.description || 'Exclusive cybersecurity reward item available for top researchers.'}
          </p>
        </div>
      </div>

      {/* CARD FOOTER & PRICE CONTAINER */}
      <div className="p-5 pt-0 mt-auto">
        
        {/* Holographic XP Price Badge */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#090E1A] border border-gray-800/80 my-4">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Required XP</span>
          <div className="flex items-center gap-1.5 font-mono text-cyan-400 font-extrabold text-base">
            <Zap className="w-4 h-4 fill-cyan-400 text-cyan-400 animate-pulse" />
            <span>{reward.xpCost ? reward.xpCost.toLocaleString() : 0} XP</span>
          </div>
        </div>

        {errorMsg && (
          <div className="text-[11px] text-rose-400 font-bold mb-3 text-center bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
            {errorMsg}
          </div>
        )}

        {/* ACTION BUTTON STATES */}
        {redemptionCode ? (
          <div className="w-full bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Claimed Successfully!
              </span>
              <span className="text-[10px] text-emerald-300 font-mono">Code</span>
            </div>
            <div className="flex items-center justify-between bg-slate-950 px-3 py-2 rounded-lg border border-gray-800 text-xs font-mono text-cyan-300">
              <span className="truncate flex items-center gap-1.5 font-bold">
                <Key className="w-3.5 h-3.5 text-amber-400 shrink-0" /> {redemptionCode}
              </span>
              <button 
                onClick={handleCopyCode} 
                className="p-1 text-gray-400 hover:text-white transition-colors"
                title="Copy code"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ) : stock <= 0 ? (
          <button 
            disabled 
            className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 cursor-not-allowed uppercase tracking-wider"
          >
            <Ban className="w-4 h-4" /> Currently Out of Stock
          </button>
        ) : canAfford ? (
          <button 
            onClick={handleRedeem}
            disabled={redeeming}
            className="btn-primary w-full py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all uppercase tracking-wider disabled:opacity-50"
          >
            {redeeming ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Processing Claim...
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Redeem Swag Now
              </>
            )}
          </button>
        ) : (
          <button 
            disabled 
            className="w-full py-3 px-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed"
          >
            <Lock className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Need {missingXp.toLocaleString()} More XP</span>
          </button>
        )}

      </div>
    </div>
  );
}
