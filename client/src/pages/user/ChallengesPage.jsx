import React, { useState } from 'react';
import { Target, Search, Filter, ShieldAlert, Award } from 'lucide-react';
import { challenges } from '../../data/mockData';
import { ChallengeCard } from '../../components/cards/ChallengeCard';

export function ChallengesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [filterCompleted, setFilterCompleted] = useState('All');

  const filtered = challenges.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
    const matchesCompleted = filterCompleted === 'All' || 
                             (filterCompleted === 'Solved' && c.completed) ||
                             (filterCompleted === 'Unsolved' && !c.completed);
    return matchesSearch && matchesDifficulty && matchesCompleted;
  });

  return (
    <div className="space-y-8">
      
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
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
            <input 
              type="text" 
              placeholder="Search challenges by title or keyword..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-cyber pl-10"
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
              <ChallengeCard key={chal.id} challenge={chal} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
