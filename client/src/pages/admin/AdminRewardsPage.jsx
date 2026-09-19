import React, { useEffect, useState } from 'react';
import { Gift, Plus, Edit, Trash2, Loader2, X } from 'lucide-react';
import { getRewardsApi } from '../../services/rewardService';
import { createRewardApi } from '../../services/adminService';

export function AdminRewardsPage() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Voucher',
    xpCost: 300,
    stock: 10,
    codeFormat: 'CYBER-XXXX-XXXX',
  });

  const fetchRewards = async () => {
    try {
      setLoading(true);
      const res = await getRewardsApi();
      if (res.success && res.data) {
        setRewards(res.data.rewards || []);
      }
    } catch (err) {
      console.error('Failed to fetch rewards:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await createRewardApi(formData);
      if (res.success) {
        setShowModal(false);
        setFormData({
          title: '',
          description: '',
          category: 'Voucher',
          xpCost: 300,
          stock: 10,
          codeFormat: 'CYBER-XXXX-XXXX',
        });
        fetchRewards();
      }
    } catch (err) {
      console.error('Create reward error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Reward Shop Inventory</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1">Manage physical swag inventory, vouchers, and XP pricing.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary text-xs font-bold">
          <Plus className="w-4 h-4" /> Add Reward Item
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {rewards.map((r) => (
          <div key={r._id || r.id} className="cyber-card p-4 flex flex-col justify-between">
            <div>
              <div className="w-full h-28 bg-cyan-500/10 rounded-lg mb-3 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                <Gift className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-white text-sm truncate">{r.title || r.name}</h4>
              <p className="text-xs text-gray-400 line-clamp-2 mt-1">{r.description}</p>
              <p className="text-xs text-gray-400 font-mono mt-2">Stock: {r.stock || r.quantity || 10} left</p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800">
              <span className="text-cyan-400 font-extrabold text-sm">{r.xpCost} XP</span>
              <span className="badge badge-purple text-[10px]">{r.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE REWARD MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="cyber-card max-w-md w-full p-6 space-y-4 relative bg-[#0F1626]">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-lg font-bold text-white">Add New Reward Item</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Item Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  className="input-cyber"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="input-cyber"
                >
                  <option value="Voucher">Voucher</option>
                  <option value="Merch">Merch</option>
                  <option value="Certification">Certification</option>
                  <option value="Badge">Badge</option>
                  <option value="Perk">Perk</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">XP Cost</label>
                  <input 
                    type="number" 
                    value={formData.xpCost}
                    onChange={(e) => setFormData({...formData, xpCost: parseInt(e.target.value, 10)})}
                    className="input-cyber"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Stock Quantity</label>
                  <input 
                    type="number" 
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value, 10)})}
                    className="input-cyber"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Description</label>
                <textarea 
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  className="input-cyber"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Voucher Code Pattern</label>
                <input 
                  type="text" 
                  value={formData.codeFormat}
                  onChange={(e) => setFormData({...formData, codeFormat: e.target.value})}
                  className="input-cyber font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary text-xs">
                  {submitting ? 'Creating...' : 'Add Reward'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
