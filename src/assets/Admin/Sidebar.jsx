import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const HamburgerIcon = ({ isOpen, toggle }) => (
  <button onClick={toggle} className="focus:outline-none p-2">
    {isOpen ? <FaTimes className="w-6 h-6 text-black" /> : <FaBars className="w-6 h-6 text-black" />}
  </button>
);

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout(); // Clear auth state
    navigate('/home'); // Redirect to home page
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { to: '/admin/products', icon: '👟', label: 'Products' },
    { to: '/admin/orders', icon: '📦', label: 'Orders' },
    { to: '/admin/users', icon: '👥', label: 'Users' },
  ];

  if (!user || user.role !== 'admin') {
    return null; // Hide sidebar if not an admin
  }

  return (
    <>
      {/* Mobile Hamburger Icon */}
      <div className="lg:hidden fixed top-4 left-4 z-50 bg-white rounded-full shadow-md flex items-center justify-center w-12 h-12">
        <HamburgerIcon isOpen={isOpen} toggle={toggleSidebar} />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-72 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out z-40 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:static lg:w-72`}
      >
        <div>
          <h2 className="text-2xl font-extrabold mb-8 pb-4 border-b border-gray-700 tracking-wide text-center">
            Admin Panel
          </h2>
          <nav className="space-y-2">
            {menuItems.map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ease-in-out 
                  ${location.pathname === to ? 'bg-gray-700 text-white' : 'text-gray-200 hover:bg-gray-700/80 hover:text-white'}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{icon}</span>
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 ease-in-out font-semibold text-white shadow-md"
        >
          Logout
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 z-30 lg:hidden" onClick={toggleSidebar} />
      )}
    </>
  );
};

export default AdminSidebar;