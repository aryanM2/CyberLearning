import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, CheckCircle2, ArrowLeft, Loader2, ExternalLink, AlertCircle, Sparkles, Key } from 'lucide-react';
import { forgotPasswordApi } from '../../services/authService';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await forgotPasswordApi(email);
      if (res.success) {
        setSubmitted(true);
        if (res.data?.resetToken) {
          setResetToken(res.data.resetToken);
        }
      } else {
        setErrorMsg(res.message || 'Unable to process reset request.');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setErrorMsg(err.message || 'Failed to dispatch password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 cyber-card p-8 bg-[#111726]/90 border-cyan-500/30">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Reset Password</h2>
          <p className="text-xs text-gray-400">Enter your registered email to receive reset instructions</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-xs text-rose-400 text-center font-medium flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
          </div>
        )}

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="font-extrabold text-white text-lg">Reset Request Processed</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              A password reset token has been generated for <strong className="text-white font-mono">{email}</strong>.
            </p>

            {resetToken && (
              <div className="p-4 bg-[#0B101D] border border-cyan-500/40 rounded-xl space-y-2 text-left">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-cyan-400">
                  <Key className="w-4 h-4 text-amber-400" /> Reset Password Link:
                </div>
                <p className="text-[11px] text-gray-300 leading-normal">
                  Click the button below to open your password reset page immediately:
                </p>
                <Link 
                  to={`/reset-password/${resetToken}`}
                  className="btn-primary text-xs w-full py-2.5 justify-center gap-2 font-extrabold shadow-lg shadow-cyan-500/20 mt-1"
                >
                  <ExternalLink className="w-4 h-4" /> Open Reset Password Page
                </Link>
              </div>
            )}

            <Link to="/login" className="btn-secondary text-xs w-full justify-center mt-2">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Email Address</label>
              <div className="relative">
                <span className="input-icon-left">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-cyber has-left-icon" 
                  placeholder="alex.vance@nextgen-sec.com" 
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-3 justify-center text-sm font-bold mt-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing Request...
                </>
              ) : (
                'Send Reset Instructions'
              )}
            </button>
          </form>
        )}

        <div className="text-center border-t border-gray-800 pt-4 text-xs">
          <Link to="/login" className="text-gray-400 hover:text-cyan-400 flex items-center justify-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}
