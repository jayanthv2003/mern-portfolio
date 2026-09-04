import { createContext, useEffect, useState } from 'react';
import api from '../api/axios.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('adminUser');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  // On first load, verify any stored token is still valid
  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get('/auth/me');
        setUser(data.data);
      } catch {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    const { token, ...userInfo } = data.data;
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(userInfo));
    setUser(userInfo);
    return userInfo;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
