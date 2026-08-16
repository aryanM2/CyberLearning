import React, { useState } from 'react';
import { Zap, CheckCircle2, ShoppingBag } from 'lucide-react';
import { currentUser } from '../../data/mockData';

export function RewardCard({ reward }) {
  const [redeemed, setRedeemed] = useState(false);
  const canAfford = currentUser.xp >= reward.xpCost;

  const handleRedeem = () => {
    if (!canAfford || redeemed) return;
    setRedeemed(true);
  };

  return (
    <div className="cyber-card cyber-card-hover overflow-hidden flex flex-col justify-between h-full group">
      <div>
        <div className="h-44 overflow-hidden relative bg-slate-900">
          <img 
            src={reward.image} 
            alt={reward.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span className="badge badge-purple backdrop-blur-md bg-purple-950/80">
              {reward.category}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-base text-white mb-1.5 group-hover:text-cyan-400 transition-colors line-clamp-1">
            {reward.name}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">
            {reward.description}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-white/5 mt-auto">
        <div className="flex items-center justify-between my-3 text-xs">
          <span className="text-cyan-400 font-extrabold text-base flex items-center gap-1 font-mono">
            <Zap className="w-4 h-4 fill-cyan-400 text-cyan-400" /> {reward.xpCost.toLocaleString()} XP
          </span>
          <span className="text-gray-400 font-mono text-[11px]">
            {reward.quantity} remaining
          </span>
        </div>

        {redeemed ? (
          <div className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold py-2 rounded-xl text-center flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Redeemed!
          </div>
        ) : (
          <button 
            onClick={handleRedeem}
            disabled={!canAfford}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              canAfford 
                ? 'btn-primary' 
                : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {canAfford ? 'Redeem Reward' : 'Insufficient XP'}
          </button>
        )}
      </div>
    </div>
  );
}
