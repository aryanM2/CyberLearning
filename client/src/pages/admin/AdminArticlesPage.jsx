import React, { useEffect, useState } from 'react';
import { FileText, Plus, Edit, Trash2, Zap, Loader2, X } from 'lucide-react';
import { getArticlesApi } from '../../services/articleService';
import { createArticleApi, deleteArticleApi } from '../../services/adminService';

export function AdminArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Web Security',
    difficulty: 'Beginner',
    readTime: '5 min read',
    xpReward: 50,
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await getArticlesApi();
      if (res.success && res.data) {
        setArticles(res.data);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      const res = await deleteArticleApi(id);
      if (res.success) fetchArticles();
    } catch (err) {
      console.error('Delete article failed:', err);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await createArticleApi(formData);
      if (res.success) {
        setShowModal(false);
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          category: 'Web Security',
          difficulty: 'Beginner',
          readTime: '5 min read',
          xpReward: 50,
        });
        fetchArticles();
      }
    } catch (err) {
      console.error('Create article error:', err);
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
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Manage Articles</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1">Publish new cybersecurity articles, edit content, and assign XP rewards.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary text-xs font-bold">
          <Plus className="w-4 h-4" /> Create Article
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
                <th className="p-3">XP Reward</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {articles.map((art) => (
                <tr key={art._id || art.id} className="hover:bg-gray-800/40">
                  <td className="p-3 font-bold text-white max-w-xs truncate">{art.title}</td>
                  <td className="p-3 text-gray-300">{art.category}</td>
                  <td className="p-3">
                    <span className="badge badge-cyan">{art.difficulty}</span>
                  </td>
                  <td className="p-3 font-mono font-bold text-cyan-400">+{art.xpReward} XP</td>
                  <td className="p-3 text-right space-x-2">
                    <button 
                      onClick={() => handleDelete(art._id || art.id)} 
                      className="p-1.5 bg-red-500/10 hover:bg-red-500/30 rounded text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE ARTICLE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="cyber-card max-w-xl w-full p-6 space-y-4 relative bg-[#0F1626]">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-lg font-bold text-white">Create New Security Article</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Article Title</label>
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
                  <option value="Web Security">Web Security</option>
                  <option value="Network Security">Network Security</option>
                  <option value="Cryptography">Cryptography</option>
                  <option value="Defensive Security">Defensive Security</option>
                  <option value="Offensive Security">Offensive Security</option>
                  <option value="Cloud Security">Cloud Security</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Difficulty</label>
                  <select 
                    value={formData.difficulty}
                    onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                    className="input-cyber"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
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
                <label className="block text-xs font-bold text-gray-300 mb-1">Short Excerpt</label>
                <textarea 
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  required
                  className="input-cyber"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Article Content (Markdown supported)</label>
                <textarea 
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  required
                  className="input-cyber font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary text-xs">
                  {submitting ? 'Publishing...' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
