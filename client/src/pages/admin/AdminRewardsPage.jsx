import React from 'react';
import { Gift, Plus, Edit, Trash2 } from 'lucide-react';
import { rewards } from '../../data/mockData';

export function AdminRewardsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Reward Shop Inventory</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1">Manage physical swag inventory, vouchers, and XP pricing.</p>
        </div>
        <button className="btn-primary text-xs font-bold"><Plus className="w-4 h-4" /> Add Reward Item</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {rewards.map((r) => (
          <div key={r.id} className="cyber-card p-4 flex flex-col justify-between">
            <div>
              <img src={r.image} alt={r.name} className="w-full h-32 object-cover rounded-lg mb-3" />
              <h4 className="font-bold text-white text-sm truncate">{r.name}</h4>
              <p className="text-xs text-gray-400 font-mono mt-1">Stock: {r.quantity} left</p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800">
              <span className="text-cyan-400 font-extrabold text-sm">{r.xpCost} XP</span>
              <div className="flex gap-1">
                <button className="p-1 bg-gray-800 rounded text-gray-300"><Edit className="w-3.5 h-3.5" /></button>
                <button className="p-1 bg-red-500/10 rounded text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
