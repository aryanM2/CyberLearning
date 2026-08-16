import React, { useState } from 'react';
import { Users, Search, Shield, Ban, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { leaderboardData } from '../../data/mockData';

export function AdminUsersPage() {
  const [usersList, setUsersList] = useState(leaderboardData);

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">User Management</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1">View, search, update roles, or suspend user accounts.</p>
        </div>
      </div>

      <div className="cyber-card p-6 space-y-4">
        <div className="flex justify-between items-center gap-4">
          <input 
            type="text" 
            placeholder="Search users by name or handle..." 
            className="input-cyber max-w-sm"
          />
          <button className="btn-primary text-xs font-bold">
            + Invite New Security Researcher
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 uppercase font-extrabold font-mono">
                <th className="p-3">User</th>
                <th className="p-3">Role</th>
                <th className="p-3">Level</th>
                <th className="p-3">XP</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {usersList.map((u) => (
                <tr key={u.rank} className="hover:bg-gray-800/40">
                  <td className="p-3 font-bold text-white flex items-center gap-2">
                    <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <div>{u.name}</div>
                      <div className="text-[10px] text-gray-400">@{u.username}</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`badge ${u.rank === 1 ? 'badge-amber' : 'badge-cyan'}`}>
                      {u.rank === 1 ? 'Admin' : 'Researcher'}
                    </span>
                  </td>
                  <td className="p-3 text-gray-300">Level {u.level}</td>
                  <td className="p-3 font-mono font-bold text-cyan-400">{u.xp} XP</td>
                  <td className="p-3 text-right space-x-2">
                    <button className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 hover:text-white">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 bg-red-500/10 hover:bg-red-500/30 rounded text-red-400">
                      <Ban className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
