import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleBlock = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isBlocked: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user status');
      }
      
      setUsers(users.map(user => 
        user.id === id ? { ...user, isBlocked: newStatus } : user
      ));
    } catch (err) {
      setError('Failed to update user status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-orange-600 p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-orange-600">Manage Users</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
        <div className="mb-4">
          <p className="text-orange-700">View and manage users here</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-orange-200">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-orange-200">
              {users.map((user) => {
                const isAdmin = user.email.toLowerCase() === 'admin@gmail.com';
                
                return (
                  <tr key={user.id} className="hover:bg-orange-50">
                    <td className="px-6 py-4 whitespace-nowrap text-orange-600">
                      {isAdmin ? '-' : user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-orange-800">
                      {isAdmin ? '-' : user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-orange-700">
                      {isAdmin ? '-' : user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={user.isBlocked ? "text-red-600" : "text-green-600"}>
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => handleToggleBlock(user.id, user.isBlocked)}
                        className={`${user.isBlocked ? 
                          "text-green-600 hover:text-green-800" : 
                          "text-red-600 hover:text-red-800"} cursor-pointer`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;