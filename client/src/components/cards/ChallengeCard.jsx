import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export function ChallengeCard({ challenge }) {
  const getDifficultyBadge = (diff) => {
    switch(diff) {
      case 'Easy': return 'badge-emerald';
      case 'Medium': return 'badge-amber';
      case 'Hard': return 'badge-red';
      default: return 'badge-cyan';
    }
  };

  return (
    <div className="cyber-card cyber-card-hover p-6 flex flex-col justify-between h-full group border-l-4 border-l-cyan-500">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`badge ${getDifficultyBadge(challenge.difficulty)}`}>
            {challenge.difficulty}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-gray-500" /> {challenge.estimatedTime}
          </span>
        </div>

        <h3 className="font-bold text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors leading-snug">
          {challenge.title}
        </h3>

        <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">
          {challenge.description}
        </p>
      </div>

      <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between text-xs">
        <span className="text-cyan-400 font-bold flex items-center gap-1 font-mono">
          <Zap className="w-4 h-4 fill-cyan-400 text-cyan-400" /> +{challenge.xp} XP
        </span>

        {challenge.completed ? (
          <span className="text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> Solved
          </span>
        ) : (
          <Link 
            to={`/app/challenges/${challenge.id}`} 
            className="btn-primary text-xs py-1.5 px-3.5"
          >
            Start Lab <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
