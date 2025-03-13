import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAdmin', user.role === 'admin');
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`http://localhost:3000/users?email=${email}`);
      const users = await response.json();
      const foundUser = users.find(u => u.password === password && !u.isBlocked && u.isActive !== false);

      if (foundUser) {
        setUser(foundUser);
        return foundUser.role; 
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid email or password");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};