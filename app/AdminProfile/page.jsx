'use client';
import React from 'react';
import useAdmin from '../../hooks/useAdmin';

const AdminProfilePage = () => {
  const { users, loading, error, toggleVerification } = useAdmin();

  if (loading) return <div className="mt-40 text-center">Loading...</div>;
  if (error) return <div className="mt-40 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="mt-20 p-4 sm:p-6 dark:bg-slate-800">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 dark:text-white text-center">
        User Management
      </h2>

      {/* Scrollable container for user cards */}
      <div className="max-h-[600px] overflow-y-auto space-y-4 px-2">
        {users.map((user) => (
          <div 
            key={user._id} 
            className="bg-white dark:bg-slate-700 shadow-md rounded-lg p-6 sm:p-8 
            flex flex-col sm:flex-row items-center sm:justify-between transition-all 
            duration-300 ease-in-out hover:shadow-lg"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start w-full">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold dark:text-white">
                  {user.username}
                </h3>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-300">
                  {user.email}
                </p>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-300">
                  {user.userType}
                </p>
                <p className="text-sm sm:text-base mt-2 dark:text-gray-200">
                  Verified: <span className={user.isVerified ? "text-green-500" : "text-red-500"}>
                    {user.isVerified ? 'Yes' : 'No'}
                  </span>
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => toggleVerification(user._id, user.isVerified)}
                className={`w-full sm:w-auto px-6 py-2 sm:px-4 sm:py-1 rounded text-white 
                text-lg sm:text-sm transition-all duration-300 ${
                  user.isVerified 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {user.isVerified ? 'Revoke' : 'Verify'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProfilePage;