import React, { useState } from 'react';
import { Search, Filter, BookOpen, Sparkles } from 'lucide-react';
import { articles, categories } from '../../data/mockData';
import { ArticleCard } from '../../components/cards/ArticleCard';

export function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredArticles = articles.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || art.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const featured = articles.filter(a => a.featured);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Cybersecurity Articles & Knowledge Base</h1>
        <p className="text-xs lg:text-sm text-gray-400 mt-1">
          Explore structured security learning paths, master core fundamentals, and earn XP upon completing articles.
        </p>
      </div>

      {/* FEATURED ARTICLES CAROUSEL/GRID */}
      {featured.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> Featured Reading Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </div>
      )}

      {/* SEARCH AND FILTERS TOOLBAR */}
      <div className="cyber-card p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
            <input 
              type="text" 
              placeholder="Search SQLi, XSS, Cryptography..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-cyber pl-10"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="w-full md:w-48">
            <select 
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="input-cyber"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800">
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === 'All' 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.name 
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ARTICLE GRID */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">All Articles ({filteredArticles.length})</h2>
        {filteredArticles.length === 0 ? (
          <div className="cyber-card p-12 text-center text-gray-400 text-sm">
            No articles match your search or filter criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
