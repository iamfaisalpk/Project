import React from 'react';
import { useAuth } from '../AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Welcome, {user?.email || 'Admin'}</span>
      </div>
    </header>
  );
};

export default Header;