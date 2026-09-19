import React, { useEffect, useState } from 'react';
import { Users, Search, Shield, Ban, CheckCircle, Edit, Trash2, Loader2 } from 'lucide-react';
import { getAdminUsersApi, updateUserRoleApi, deleteUserApi } from '../../services/adminService';

export function AdminUsersPage() {
  const [usersList, setUsersList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAdminUsersApi();
      if (res.success && res.data) {
        setUsersList(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleRole = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    try {
      const res = await updateUserRoleApi(user._id || user.id, { role: newRole });
      if (res.success) {
        fetchUsers();
      }
    } catch (err) {
      console.error('Error updating role:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await deleteUserApi(userId);
      if (res.success) {
        fetchUsers();
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const filteredUsers = usersList.filter(u => 
    (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">User Management</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1">View, search, update roles, or delete user accounts.</p>
        </div>
      </div>

      <div className="cyber-card p-6 space-y-4">
        <div className="flex justify-between items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <span className="input-icon-left">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-cyber has-left-icon"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 uppercase font-extrabold font-mono">
                <th className="p-3">User</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Level</th>
                <th className="p-3">XP</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredUsers.map((u) => (
                <tr key={u._id || u.id} className="hover:bg-gray-800/40">
                  <td className="p-3 font-bold text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center">
                      {(u.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <span>{u.name}</span>
                  </td>
                  <td className="p-3 text-gray-400 font-mono">{u.email}</td>
                  <td className="p-3">
                    <span className={`badge ${u.role === 'admin' ? 'badge-amber' : 'badge-cyan'}`}>
                      {u.role ? u.role.toUpperCase() : 'USER'}
                    </span>
                  </td>
                  <td className="p-3 text-gray-300">{u.role === 'admin' ? 'N/A' : `Level ${u.level || 1}`}</td>
                  <td className="p-3 font-mono font-bold text-cyan-400">{u.role === 'admin' ? 'N/A' : `${(u.xp || 0).toLocaleString()} XP`}</td>
                  <td className="p-3 text-right space-x-2">
                    <button 
                      onClick={() => handleToggleRole(u)}
                      title="Toggle Admin Role"
                      className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 hover:text-white font-mono text-[11px]"
                    >
                      {u.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(u._id || u.id)}
                      title="Delete User"
                      className="p-1.5 bg-red-500/10 hover:bg-red-500/30 rounded text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
