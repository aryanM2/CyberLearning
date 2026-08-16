import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Target, Clock, Zap, CheckCircle2, ShieldAlert, Terminal, HelpCircle } from 'lucide-react';
import { challenges } from '../../data/mockData';

export function ChallengeDetailPage() {
  const { id } = useParams();
  const challenge = challenges.find(c => c.id === id) || challenges[0];

  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(challenge.completed);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(challenge.completed ? 'Challenge Solved!' : '');

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (userAnswer.trim().toLowerCase() === challenge.correctAnswer.toLowerCase()) {
      setSubmitted(true);
      setSuccessMsg(`Correct Flag Identified! You earned +${challenge.xp} XP!`);
    } else {
      setErrorMsg('Incorrect answer or flag payload. Inspect the snippet instructions and try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Back Link */}
      <Link to="/app/challenges" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-cyan-400 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Challenges
      </Link>

      {/* CHALLENGE HEADER */}
      <div className="cyber-card p-6 lg:p-8 space-y-4 border-l-4 border-l-cyan-500">
        <div className="flex flex-wrap items-center gap-3">
          <span className="badge badge-emerald">{challenge.difficulty}</span>
          <span className="badge badge-purple">{challenge.category}</span>
          <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" /> {challenge.estimatedTime}
          </span>
        </div>

        <h1 className="text-2xl lg:text-3xl font-extrabold text-white">
          {challenge.title}
        </h1>

        <p className="text-sm text-gray-300 leading-relaxed">
          {challenge.description}
        </p>

        <div className="flex items-center justify-between border-t border-gray-800 pt-3 text-xs">
          <span className="text-cyan-400 font-extrabold text-sm flex items-center gap-1">
            <Zap className="w-4 h-4 fill-cyan-400" /> +{challenge.xp} XP Bounty
          </span>
          {submitted && (
            <span className="text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded">
              <CheckCircle2 className="w-4 h-4" /> Lab Completed
            </span>
          )}
        </div>
      </div>

      {/* LAB INSTRUCTIONS & CODE SNIPPET */}
      <div className="cyber-card p-6 space-y-4">
        <h3 className="font-bold text-lg text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-400" /> Lab Instructions & Code Snippet
        </h3>

        <p className="text-sm text-gray-300 leading-relaxed">
          {challenge.instructions}
        </p>

        {challenge.taskSnippet && (
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 overflow-x-auto text-xs font-mono text-cyan-300">
            <pre><code>{challenge.taskSnippet}</code></pre>
          </div>
        )}
      </div>

      {/* ANSWER SUBMISSION FORM */}
      <div className="cyber-card p-6 bg-gradient-to-r from-[#111726] to-[#0D1322] border-cyan-500/30 space-y-6">
        <div>
          <h3 className="font-bold text-lg text-white mb-1 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" /> Lab Verification Question
          </h3>
          <p className="text-sm text-gray-300">{challenge.question}</p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-xs font-semibold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" /> {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-lg text-sm font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" /> {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmitAnswer} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Input Answer or Flag String:</label>
            <input 
              type="text" 
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={`e.g. ${challenge.correctAnswer}`}
              className="input-cyber font-mono"
              disabled={submitted}
              required
            />
          </div>

          {!submitted && (
            <button type="submit" className="btn-primary w-full py-3 justify-center text-sm font-bold">
              Submit Flag & Validate Lab
            </button>
          )}
        </form>
      </div>

    </div>
  );
}
