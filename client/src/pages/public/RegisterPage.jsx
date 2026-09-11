import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');

    try {
      const result = await register(formData.name, formData.email, formData.password, formData.role);
      if (result.success) {
        navigate('/app/dashboard');
      } else {
        setFormError(result.error || 'Registration failed. Please check your details.');
      }
    } catch (err) {
      setFormError(err.message || 'Registration failed. Fallback to mock navigation.');
      setTimeout(() => navigate('/app/dashboard'), 1000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 cyber-card p-8 bg-[#111726]/90 border-cyan-500/30">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Join NextGen Academy</h2>
          <p className="text-xs text-gray-400">Create your cybersecurity learning profile</p>
        </div>

        {formError && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-xs text-rose-400 text-center font-medium">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="input-cyber pl-10" 
                placeholder="Alex Vance"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="input-cyber pl-10" 
                placeholder="alex.vance@nextgen-sec.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="input-cyber pl-10" 
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Account Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="input-cyber"
            >
              <option value="user" className="bg-[#111726]">User / Learner</option>
              <option value="admin" className="bg-[#111726]">Platform Admin</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="btn-primary w-full py-3 justify-center text-sm font-bold mt-2 disabled:opacity-50"
          >
            {submitting ? 'Creating Account...' : 'Create Account & Earn 100 XP'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center border-t border-gray-800 pt-4 text-xs text-gray-400">
          Already registered?{' '}
          <Link to="/login" className="text-cyan-400 font-bold hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}

