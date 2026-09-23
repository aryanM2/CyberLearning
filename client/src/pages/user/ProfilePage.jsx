import React, { useEffect, useState } from 'react';
import { User as UserIcon, Mail, Shield, Zap, Flame, Calendar, Edit3, Save, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserProfileApi, updateUserProfileApi } from '../../services/userService';

export function ProfilePage() {
  const { user: authUser, updateUser } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: '',
  });
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await getUserProfileApi();
        if (res.success && res.data?.user) {
          const u = res.data.user;
          setProfile({
            name: u.name || '',
            email: u.email || '',
            bio: u.bio || '',
            avatar: u.avatar || '',
          });
          setUserStats(res.data);
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setErrorMsg(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setErrorMsg('');
      const res = await updateUserProfileApi({
        name: profile.name,
        email: profile.email,
        bio: profile.bio,
        avatar: profile.avatar,
      });

      if (res.success) {
        setSaved(true);
        if (res.data?.user) {
          updateUser(res.data.user);
        } else {
          updateUser({ name: profile.name, email: profile.email, bio: profile.bio, avatar: profile.avatar });
        }
        setTimeout(() => setSaved(false), 3000);
      } else {
        setErrorMsg(res.message || 'Failed to update profile');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  const u = userStats?.user || authUser || {};

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Security Researcher Profile</h1>
        <p className="text-xs lg:text-sm text-gray-400 mt-1">Manage your account information, public bio, and avatar.</p>
      </div>

      {/* PROFILE HEADER CARD */}
      <div className="cyber-card p-6 lg:p-8 bg-gradient-to-r from-cyan-950/30 to-[#111726] border-cyan-500/30 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-cyan-500/10 border-4 border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold text-3xl overflow-hidden shrink-0 shadow-xl shadow-cyan-500/20">
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            (u.name || 'U').charAt(0).toUpperCase()
          )}
        </div>
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-2xl font-extrabold text-white">{u.name}</h2>
          <p className="text-xs text-cyan-400 font-mono">{u.email}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
            {u.role === 'admin' ? (
              <span className="badge badge-amber font-extrabold uppercase">Platform Administrator</span>
            ) : (
              <>
                <span className="badge badge-purple">Level {u.level || 1} Security Analyst</span>
                <span className="badge badge-amber flex items-center gap-1"><Flame className="w-3 h-3 fill-amber-400" /> {u.streak || 0} Day Streak</span>
                <span className="badge badge-cyan flex items-center gap-1"><Zap className="w-3 h-3 fill-cyan-400" /> {u.xp || 0} XP</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* EDIT FORM */}
      <div className="cyber-card p-6 lg:p-8 space-y-6">
        <h3 className="font-bold text-lg text-white flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-cyan-400" /> Account Settings & Bio
        </h3>

        {saved && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {errorMsg}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Full Name</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="input-cyber" 
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Avatar Image URL</label>
              <input 
                type="url" 
                value={profile.avatar}
                onChange={(e) => setProfile({...profile, avatar: e.target.value})}
                placeholder="https://example.com/avatar.png"
                className="input-cyber" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Email Address</label>
            <input 
              type="email" 
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              className="input-cyber" 
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Bio / Security Interests</label>
            <textarea 
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              placeholder="Share your cybersecurity specializations, certifications, or goals..."
              className="input-cyber" 
            />
          </div>

          <button type="submit" disabled={saving} className="btn-primary py-2.5 px-6 font-bold text-xs">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Profile Changes
          </button>
        </form>
      </div>

    </div>
  );
}
