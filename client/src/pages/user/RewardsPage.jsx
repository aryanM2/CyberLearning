import React from 'react';
import { Gift, Zap, ShoppingBag, Info } from 'lucide-react';
import { rewards, currentUser } from '../../data/mockData';
import { RewardCard } from '../../components/cards/RewardCard';

export function RewardsPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">XP Reward Store</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1">
            Exchange your hard-earned experience points for physical gadgets, official exam vouchers, and exclusive swag.
          </p>
        </div>

        {/* User Current XP Counter */}
        <div className="bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500/40 rounded-xl px-5 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Zap className="w-6 h-6 fill-cyan-400" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-bold">Your Balance</div>
            <div className="text-xl font-extrabold text-white font-mono">{currentUser.xp.toLocaleString()} XP</div>
          </div>
        </div>
      </div>

      {/* REWARDS GRID */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Available Swag & Vouchers ({rewards.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      </div>

      {/* REDEMPTION POLICIES NOTE */}
      <div className="cyber-card p-6 bg-gray-900/50 border-gray-800 flex items-start gap-4">
        <Info className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-xs text-gray-400 space-y-1">
          <h4 className="font-bold text-white text-sm">Reward Fulfillment Information</h4>
          <p>
            Physical items are shipped directly to your NextGen Securities enterprise address. Digital exam vouchers are delivered to your registered corporate email address within 24 hours.
          </p>
        </div>
      </div>

    </div>
  );
}
