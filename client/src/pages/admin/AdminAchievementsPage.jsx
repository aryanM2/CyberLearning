import React, { useEffect, useState } from 'react';
import { Trophy, Plus, Edit, Trash2, Loader2, X } from 'lucide-react';
import { getAchievementsApi } from '../../services/achievementService';
import { createAchievementApi } from '../../services/adminService';

export function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Learning',
    xpReward: 100,
    requirementType: 'articles_read',
    requirementThreshold: 1,
  });

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const res = await getAchievementsApi();
      if (res.success && res.data) {
        setAchievements(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch achievements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await createAchievementApi(formData);
      if (res.success) {
        setShowModal(false);
        setFormData({
          title: '',
          description: '',
          category: 'Learning',
          xpReward: 100,
          requirementType: 'articles_read',
          requirementThreshold: 1,
        });
        fetchAchievements();
      }
    } catch (err) {
      console.error('Create achievement error:', err);
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
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Achievements & Badges</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1">Configure gamification badges and unlock milestones.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary text-xs font-bold">
          <Plus className="w-4 h-4" /> Add Achievement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((ach) => (
          <div key={ach._id || ach.id} className="cyber-card p-4 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white text-sm">{ach.title}</h4>
              <p className="text-xs text-gray-400 mt-0.5">{ach.description}</p>
              <div className="flex items-center gap-3 mt-2 text-xs font-mono">
                <span className="text-cyan-400 font-bold">+{ach.xpReward || ach.xpBonus || 50} XP Bonus</span>
                <span className="text-gray-400">({ach.requirementThreshold} {ach.requirementType})</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE ACHIEVEMENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="cyber-card max-w-md w-full p-6 space-y-4 relative bg-[#0F1626]">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-lg font-bold text-white">Add New Achievement Badge</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Badge Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  className="input-cyber"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Description</label>
                <input 
                  type="text" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  className="input-cyber"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Requirement Type</label>
                  <select 
                    value={formData.requirementType}
                    onChange={(e) => setFormData({...formData, requirementType: e.target.value})}
                    className="input-cyber"
                  >
                    <option value="articles_read">Articles Read</option>
                    <option value="challenges_solved">Challenges Solved</option>
                    <option value="streak_days">Streak Days</option>
                    <option value="total_xp">Total XP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Threshold</label>
                  <input 
                    type="number" 
                    value={formData.requirementThreshold}
                    onChange={(e) => setFormData({...formData, requirementThreshold: parseInt(e.target.value, 10)})}
                    className="input-cyber"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">XP Bonus Reward</label>
                <input 
                  type="number" 
                  value={formData.xpReward}
                  onChange={(e) => setFormData({...formData, xpReward: parseInt(e.target.value, 10)})}
                  className="input-cyber"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary text-xs">
                  {submitting ? 'Creating...' : 'Add Badge'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
