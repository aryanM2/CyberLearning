import React, { useEffect, useState } from 'react';
import { Search, Filter, BookOpen, Sparkles, Loader2 } from 'lucide-react';
import { getArticlesApi, getCategoriesApi, getCompletedArticlesListApi } from '../../services/articleService';
import { ArticleCard } from '../../components/cards/ArticleCard';

export function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [completedIds, setCompletedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticlesData = async () => {
      try {
        setLoading(true);
        const [artRes, catRes, compRes] = await Promise.allSettled([
          getArticlesApi(),
          getCategoriesApi(),
          getCompletedArticlesListApi(),
        ]);

        if (artRes.status === 'fulfilled' && artRes.value.success) {
          setArticles(artRes.value.data || []);
        }

        if (catRes.status === 'fulfilled' && catRes.value.success) {
          setCategories(catRes.value.data || []);
        }

        if (compRes.status === 'fulfilled' && compRes.value.success) {
          const completedList = compRes.value.data || [];
          const ids = new Set(completedList.map(item => item.article?.toString() || item.article));
          setCompletedIds(ids);
        }
      } catch (err) {
        console.error('Failed to load articles:', err);
      } finally {
        setLoading(false);
      }
    };

    loadArticlesData();
  }, []);

  const filteredArticles = articles.filter((art) => {
    const titleMatch = (art.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    const excerptMatch = (art.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || excerptMatch;
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || art.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Cybersecurity Articles & Knowledge Base</h1>
        <p className="text-xs lg:text-sm text-gray-400 mt-1">
          Explore structured security learning paths, master core fundamentals, and earn XP upon completing articles.
        </p>
      </div>

      {/* SEARCH AND FILTERS TOOLBAR */}
      <div className="cyber-card p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="input-icon-left">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search SQLi, XSS, Cryptography..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-cyber has-left-icon"
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
              key={cat._id || cat.id}
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
            {filteredArticles.map((article) => {
              const artId = article._id || article.id;
              const isCompleted = completedIds.has(artId.toString());
              return (
                <ArticleCard key={artId} article={{ ...article, read: isCompleted }} />
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
