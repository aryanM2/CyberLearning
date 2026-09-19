import React, { useEffect, useState } from 'react';
import { FolderTree, Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { getCategoriesApi } from '../../services/articleService';

export function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await getCategoriesApi();
        if (res.success && res.data) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error('Error loading categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Content Categories</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1">Organize security domains and article categories.</p>
        </div>
      </div>

      <div className="cyber-card p-6 space-y-4">
        <h3 className="font-bold text-lg text-white">Active Database Categories ({categories.length})</h3>
        {categories.length === 0 ? (
          <div className="cyber-card p-8 text-center text-gray-400 text-sm">
            No categories found in the database.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat._id || cat.id} className="cyber-card p-5 flex items-center justify-between border-cyan-500/20">
                <div>
                  <h3 className="font-bold text-white text-base">{cat.name}</h3>
                  <p className="text-xs text-gray-400 font-mono mt-1">Slug: /{cat.slug}</p>
                  {cat.description && <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{cat.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
