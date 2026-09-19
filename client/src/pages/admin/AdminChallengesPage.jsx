import React, { useEffect, useState } from 'react';
import { Target, Plus, Edit, Trash2, Loader2, X } from 'lucide-react';
import { getChallengesApi } from '../../services/challengeService';
import { createChallengeApi, deleteChallengeApi } from '../../services/adminService';

export function AdminChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Security',
    difficulty: 'Easy',
    type: 'flag',
    xpReward: 100,
    flagSolution: '',
    hint: '',
  });

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const res = await getChallengesApi();
      if (res.success && res.data) {
        setChallenges(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch challenges:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this challenge lab?')) return;
    try {
      const res = await deleteChallengeApi(id);
      if (res.success) fetchChallenges();
    } catch (err) {
      console.error('Delete challenge error:', err);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await createChallengeApi(formData);
      if (res.success) {
        setShowModal(false);
        setFormData({
          title: '',
          description: '',
          category: 'Web Security',
          difficulty: 'Easy',
          type: 'flag',
          xpReward: 100,
          flagSolution: '',
          hint: '',
        });
        fetchChallenges();
      }
    } catch (err) {
      console.error('Create challenge error:', err);
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
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Challenge Labs Management</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1">Configure vulnerability snippets, flags, and XP rewards.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary text-xs font-bold">
          <Plus className="w-4 h-4" /> Create New Lab
        </button>
      </div>

      <div className="cyber-card p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 uppercase font-extrabold font-mono">
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Difficulty</th>
                <th className="p-3">Type</th>
                <th className="p-3">XP</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {challenges.map((c) => (
                <tr key={c._id || c.id} className="hover:bg-gray-800/40">
                  <td className="p-3 font-bold text-white max-w-xs truncate">{c.title}</td>
                  <td className="p-3 text-gray-300">{c.category}</td>
                  <td className="p-3"><span className="badge badge-emerald">{c.difficulty}</span></td>
                  <td className="p-3 font-mono text-cyan-400 max-w-xs truncate">{c.type ? c.type.toUpperCase() : 'LAB'}</td>
                  <td className="p-3 font-mono font-bold text-cyan-400">+{c.xpReward || c.xp || 100} XP</td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => handleDelete(c._id || c.id)} className="p-1.5 bg-red-500/10 hover:bg-red-500/30 rounded text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE LAB MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="cyber-card max-w-xl w-full p-6 space-y-4 relative bg-[#0F1626]">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-lg font-bold text-white">Create New Challenge Lab</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Challenge Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  className="input-cyber"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="input-cyber"
                  >
                    <option value="Web Security">Web Security</option>
                    <option value="Network Security">Network Security</option>
                    <option value="Cryptography">Cryptography</option>
                    <option value="Defensive Security">Defensive Security</option>
                    <option value="Offensive Security">Offensive Security</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Difficulty</label>
                  <select 
                    value={formData.difficulty}
                    onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                    className="input-cyber"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">XP Reward</label>
                  <input 
                    type="number" 
                    value={formData.xpReward}
                    onChange={(e) => setFormData({...formData, xpReward: parseInt(e.target.value, 10)})}
                    className="input-cyber"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Lab Description & Task Instructions</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  className="input-cyber"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Flag Solution String (e.g., FLAG&#123;...&#125;)</label>
                <input 
                  type="text" 
                  value={formData.flagSolution}
                  onChange={(e) => setFormData({...formData, flagSolution: e.target.value})}
                  required
                  placeholder="FLAG{SQLi_Master_2026}"
                  className="input-cyber font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Hint (Optional)</label>
                <input 
                  type="text" 
                  value={formData.hint}
                  onChange={(e) => setFormData({...formData, hint: e.target.value})}
                  className="input-cyber"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary text-xs">
                  {submitting ? 'Creating...' : 'Create Challenge'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
