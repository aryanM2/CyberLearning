import React, { useState } from 'react';
import { User, Mail, Shield, Zap, Flame, Calendar, Edit3, Save, CheckCircle2 } from 'lucide-react';
import { currentUser } from '../../data/mockData';

export function ProfilePage() {
  const [profile, setProfile] = useState({
    name: currentUser.name,
    username: currentUser.username,
    email: currentUser.email,
    bio: currentUser.bio,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Security Researcher Profile</h1>
        <p className="text-xs lg:text-sm text-gray-400 mt-1">Manage your account information, public handle, and bio.</p>
      </div>

      {/* PROFILE HEADER CARD */}
      <div className="cyber-card p-6 lg:p-8 bg-gradient-to-r from-cyan-950/30 to-[#111726] border-cyan-500/30 flex flex-col sm:flex-row items-center gap-6">
        <img 
          src={currentUser.avatar} 
          alt={currentUser.name} 
          className="w-24 h-24 rounded-full object-cover border-4 border-cyan-500/50 shadow-xl shadow-cyan-500/20"
        />
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-2xl font-extrabold text-white">{currentUser.name}</h2>
          <p className="text-xs text-cyan-400 font-mono">@{currentUser.username}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
            <span className="badge badge-purple">Lvl {currentUser.level} {currentUser.title}</span>
            <span className="badge badge-amber flex items-center gap-1"><Flame className="w-3 h-3 fill-amber-400" /> {currentUser.streakDays} Day Streak</span>
            <span className="badge badge-cyan flex items-center gap-1"><Zap className="w-3 h-3 fill-cyan-400" /> {currentUser.xp} XP</span>
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
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Username Handle</label>
              <input 
                type="text" 
                value={profile.username}
                onChange={(e) => setProfile({...profile, username: e.target.value})}
                className="input-cyber" 
                required
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
              className="input-cyber" 
            />
          </div>

          <button type="submit" className="btn-primary py-2.5 px-6 font-bold text-xs">
            <Save className="w-4 h-4" /> Save Profile Changes
          </button>
        </form>
      </div>

    </div>
  );
}
