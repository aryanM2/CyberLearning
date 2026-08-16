import React from 'react';
import { FolderTree, Plus, Edit, Trash2 } from 'lucide-react';
import { categories } from '../../data/mockData';

export function AdminCategoriesPage() {
  return (
    <div className="space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Content Categories</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1">Organize security domains and article categories.</p>
        </div>
        <button className="btn-primary text-xs font-bold">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="cyber-card p-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">{cat.name}</h3>
              <p className="text-xs text-gray-400 font-mono mt-1">Slug: /{cat.slug}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 bg-gray-800 rounded text-gray-300"><Edit className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 bg-red-500/10 rounded text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
