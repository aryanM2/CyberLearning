import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Target, Clock, Zap, CheckCircle2, ShieldAlert, Terminal, HelpCircle, Loader2 } from 'lucide-react';
import { getChallengeByIdApi, submitChallengeApi } from '../../services/challengeService';
import { LevelUpModal } from '../../components/gamification/LevelUpModal';

export function ChallengeDetailPage() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [levelUpData, setLevelUpData] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        const res = await getChallengeByIdApi(id);
        if (res.success && res.data) {
          setChallenge(res.data);
          if (res.data.solved) {
            setSubmitted(true);
            setSuccessMsg('Lab Challenge Already Solved!');
          }
        }
      } catch (err) {
        console.error('Error fetching challenge:', err);
        setErrorMsg('Failed to load lab challenge details');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!challenge) return;

    try {
      setSubmitting(true);
      const payload = {};
      if (challenge.type === 'mcq') {
        payload.selectedOption = selectedOption;
      } else if (challenge.type === 'flag') {
        payload.flag = userAnswer;
      } else {
        payload.answer = userAnswer;
      }

      const res = await submitChallengeApi(challenge.id || challenge._id || id, payload);
      if (res.success && res.data?.isCorrect) {
        setSubmitted(true);
        setSuccessMsg(res.message || 'Lab Challenge Solved Successfully!');

        if (res.data.leveledUp) {
          setLevelUpData(res.data);
        }
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg(err.message || 'Incorrect answer or invalid flag. Try again!');
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

  if (!challenge) {
    return (
      <div className="cyber-card p-12 text-center text-gray-400 text-sm">
        Challenge lab not found.
      </div>
    );
  }

  const xpReward = challenge.xpReward || challenge.xp || 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <LevelUpModal 
        isOpen={!!levelUpData}
        onClose={() => setLevelUpData(null)}
        levelData={levelUpData}
      />

      {/* Back Link */}
      <Link to="/app/challenges" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-cyan-400 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Challenges
      </Link>

      {/* CHALLENGE HEADER */}
      <div className="cyber-card p-6 lg:p-8 space-y-4 border-l-4 border-l-cyan-500">
        <div className="flex flex-wrap items-center gap-3">
          <span className="badge badge-emerald">{challenge.difficulty}</span>
          <span className="badge badge-purple">{challenge.category}</span>
          <span className="badge badge-cyan">{challenge.type ? challenge.type.toUpperCase() : 'LAB'}</span>
        </div>

        <h1 className="text-2xl lg:text-3xl font-extrabold text-white">
          {challenge.title}
        </h1>

        <p className="text-sm text-gray-300 leading-relaxed">
          {challenge.description}
        </p>

        <div className="flex items-center justify-between border-t border-gray-800 pt-3 text-xs">
          <span className="text-cyan-400 font-extrabold text-sm flex items-center gap-1">
            <Zap className="w-4 h-4 fill-cyan-400" /> +{xpReward} XP Bounty
          </span>
          {submitted && (
            <span className="text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded">
              <CheckCircle2 className="w-4 h-4" /> Lab Completed
            </span>
          )}
        </div>
      </div>

      {/* HINT BOX */}
      {challenge.hint && (
        <div className="cyber-card p-4 bg-amber-500/10 border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
          <HelpCircle className="w-5 h-5 shrink-0 text-amber-400" />
          <div>
            <strong className="font-bold">Security Analyst Hint:</strong> {challenge.hint}
          </div>
        </div>
      )}

      {/* ANSWER SUBMISSION FORM */}
      <div className="cyber-card p-6 bg-gradient-to-r from-[#111726] to-[#0D1322] border-cyan-500/30 space-y-6">
        <div>
          <h3 className="font-bold text-lg text-white mb-1 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" /> Lab Solution Verification
          </h3>
          <p className="text-sm text-gray-300">
            {challenge.type === 'mcq'
              ? 'Select the correct option below:'
              : challenge.type === 'flag'
              ? 'Enter the flag solution string extracted from your analysis:'
              : 'Enter your detailed scenario response:'}
          </p>
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
          {challenge.type === 'mcq' && challenge.options ? (
            <div className="space-y-2">
              {challenge.options.map((opt, idx) => (
                <label 
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer text-sm font-medium ${
                    selectedOption === idx
                      ? 'bg-cyan-500/20 border-cyan-500 text-white'
                      : 'bg-gray-900/50 border-gray-800 text-gray-300 hover:border-gray-700'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="mcq-option" 
                    checked={selectedOption === idx} 
                    onChange={() => setSelectedOption(idx)}
                    disabled={submitted}
                    className="accent-cyan-400"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                {challenge.type === 'flag' ? 'Flag Solution:' : 'Scenario Answer:'}
              </label>
              <input 
                type="text" 
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={challenge.type === 'flag' ? 'FLAG{...}' : 'Enter response...'}
                className="input-cyber font-mono"
                disabled={submitted}
                required
              />
            </div>
          )}

          {!submitted && (
            <button 
              type="submit" 
              disabled={submitting}
              className="btn-primary w-full py-3 justify-center text-sm font-bold disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />} Validate Solution & Claim XP
            </button>
          )}
        </form>
      </div>

    </div>
  );
}
