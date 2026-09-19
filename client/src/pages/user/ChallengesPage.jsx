import React, { useEffect, useState } from 'react';
import { Target, Search, Filter, ShieldAlert, Award, Loader2 } from 'lucide-react';
import { getChallengesApi } from '../../services/challengeService';
import { ChallengeCard } from '../../components/cards/ChallengeCard';

export function ChallengesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [filterCompleted, setFilterCompleted] = useState('All');
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        setLoading(true);
        const res = await getChallengesApi();
        if (res.success && res.data) {
          setChallenges(res.data);
        }
      } catch (err) {
        console.error('Failed to load challenges:', err);
      } finally {
        setLoading(false);
      }
    };

    loadChallenges();
  }, []);

  const filtered = challenges.filter((c) => {
    const titleMatch = (c.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    const descMatch = (c.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || descMatch;
    const matchesDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
    const isSolved = c.solved || c.completed;
    const matchesCompleted = filterCompleted === 'All' || 
                             (filterCompleted === 'Solved' && isSolved) ||
                             (filterCompleted === 'Unsolved' && !isSolved);
    return matchesSearch && matchesDifficulty && matchesCompleted;
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
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Cybersecurity Challenge Labs</h1>
        <p className="text-xs lg:text-sm text-gray-400 mt-1">
          Solve interactive cyber labs, uncover flags, bypass security vulnerabilities, and gain XP.
        </p>
      </div>

      {/* FILTER TOOLBAR */}
      <div className="cyber-card p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <span className="input-icon-left">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search challenges by title or keyword..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-cyber has-left-icon"
            />
          </div>

          <div className="w-full md:w-48">
            <select 
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="input-cyber"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="w-full md:w-48">
            <select 
              value={filterCompleted}
              onChange={(e) => setFilterCompleted(e.target.value)}
              className="input-cyber"
            >
              <option value="All">All Statuses</option>
              <option value="Solved">Solved Labs</option>
              <option value="Unsolved">Unsolved Labs</option>
            </select>
          </div>
        </div>
      </div>

      {/* CHALLENGES LIST */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Available Challenge Labs ({filtered.length})</h2>
        {filtered.length === 0 ? (
          <div className="cyber-card p-12 text-center text-gray-400 text-sm">
            No challenges found matching criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((chal) => (
              <ChallengeCard key={chal._id || chal.id} challenge={chal} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
