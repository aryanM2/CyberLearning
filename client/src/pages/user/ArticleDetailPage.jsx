import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Zap, CheckCircle2, Share2, Bookmark, User } from 'lucide-react';
import { articles } from '../../data/mockData';

export function ArticleDetailPage() {
  const { id } = useParams();
  const article = articles.find(a => a.id === id) || articles[0];
  const [completed, setCompleted] = useState(article.read);
  const [xpAwarded, setXpAwarded] = useState(false);

  const handleMarkComplete = () => {
    setCompleted(true);
    setXpAwarded(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Back Link */}
      <Link to="/app/articles" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-cyan-400 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Articles
      </Link>

      {/* ARTICLE HEADER */}
      <div className="cyber-card p-6 lg:p-8 space-y-4 border-cyan-500/30">
        <div className="flex flex-wrap items-center gap-3">
          <span className="badge badge-cyan">{article.category}</span>
          <span className="badge badge-amber">{article.difficulty}</span>
          <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" /> {article.readingTime}
          </span>
        </div>

        <h1 className="text-2xl lg:text-4xl font-extrabold text-white leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center justify-between border-t border-gray-800 pt-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <span>By <strong className="text-white">{article.author}</strong></span>
            <span>•</span>
            <span>{article.publishedDate}</span>
          </div>

          <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm">
            <Zap className="w-4 h-4 fill-cyan-400" /> +{article.xpReward} XP Reward
          </div>
        </div>
      </div>

      {/* ARTICLE CONTENT */}
      <div className="cyber-card p-6 lg:p-10 text-gray-300 leading-relaxed space-y-6 text-sm lg:text-base">
        {article.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('# ')) {
            return <h1 key={index} className="text-2xl lg:text-3xl font-extrabold text-white mt-4 border-b border-gray-800 pb-2">{paragraph.replace('# ', '')}</h1>;
          }
          if (paragraph.startsWith('## ')) {
            return <h2 key={index} className="text-xl font-bold text-cyan-400 mt-4">{paragraph.replace('## ', '')}</h2>;
          }
          if (paragraph.startsWith('```')) {
            return (
              <pre key={index} className="bg-gray-950 border border-gray-800 rounded-xl p-4 overflow-x-auto text-xs font-mono text-cyan-300">
                <code>{paragraph.replace(/```[a-z]*/g, '')}</code>
              </pre>
            );
          }
          return <p key={index}>{paragraph}</p>;
        })}
      </div>

      {/* COMPLETE ARTICLE ACTION BOX */}
      <div className="cyber-card p-6 bg-gradient-to-r from-cyan-950/40 via-[#111726] to-blue-950/40 border-cyan-500/40 text-center space-y-4">
        {xpAwarded && (
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-full font-bold text-xs animate-bounce">
            <Zap className="w-4 h-4 fill-emerald-400" /> Congratulations! You earned +{article.xpReward} XP!
          </div>
        )}

        <h3 className="text-xl font-bold text-white">Finished Reading This Security Guide?</h3>
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          Mark this article complete to claim your experience points and log your learning progress.
        </p>

        {completed ? (
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold px-6 py-3 rounded-xl">
            <CheckCircle2 className="w-5 h-5" /> Article Completed (+{article.xpReward} XP Logged)
          </div>
        ) : (
          <button 
            onClick={handleMarkComplete}
            className="btn-primary text-base py-3 px-8 mx-auto"
          >
            <CheckCircle2 className="w-5 h-5" /> Complete Article & Earn {article.xpReward} XP
          </button>
        )}
      </div>

    </div>
  );
}
