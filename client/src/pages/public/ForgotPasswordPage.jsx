import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, CheckCircle2, ArrowLeft } from 'lucide-react';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-white text-base">Reset Link Sent</h4>
            <p className="text-xs text-gray-300">
              We've dispatched password reset instructions to <strong className="text-white">{email}</strong>. Please check your inbox.
            </p>
            <Link to="/login" className="btn-secondary text-xs w-full justify-center mt-4">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-cyber pl-10" 
                  placeholder="alex.vance@nextgen-sec.com" 
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-3 justify-center text-sm font-bold mt-2">
              Send Reset Instructions
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
