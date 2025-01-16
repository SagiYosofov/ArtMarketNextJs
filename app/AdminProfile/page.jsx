'use client';
import React, { useState, useEffect } from 'react';

const AdminProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/AdminRoutes/userManager');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle verification status
  const toggleVerification = async (userId, currentStatus) => {
    try {
      const response = await fetch('/api/AdminRoutes/userManager', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          isVerified: !currentStatus,
        }),
      });

      if (!response.ok) throw new Error('Failed to update user');
      
      // Update local state
      setUsers(users.map(user => 
        user._id === userId 
          ? { ...user, isVerified: !user.isVerified }
          : user
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div className="mt-40">Loading...</div>;
  if (error) return <div className="mt-40">Error: {error}</div>;

  return (
    <div className="mt-40 p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">User Type</th>
              <th className="px-4 py-2">Verified</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.userType}</td>
                <td className="px-4 py-2">
                  {user.isVerified ? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleVerification(user._id, user.isVerified)}
                    className={`px-4 py-1 rounded ${
                      user.isVerified 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-green-500 hover:bg-green-600'
                    } text-white`}
                  >
                    {user.isVerified ? 'Revoke' : 'Verify'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProfilePage;