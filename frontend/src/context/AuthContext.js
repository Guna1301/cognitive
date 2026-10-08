import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set default configurations for Axios
  axios.defaults.withCredentials = true;

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/auth/me'); // Or use process.env.REACT_APP_BACKEND_URL
      setCurrentUser(data.user);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email);
    } catch (err) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post('http://localhost:5000/api/auth', { email, password });
    setCurrentUser(data.user);
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("email", data.user.email);
    return data;
  };

  const loginWithGoogle = async (credential) => {
    const { data } = await axios.post('http://localhost:5000/api/auth/google', { credential });
    setCurrentUser(data.user);
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("email", data.user.email);
    return data;
  };

  const logout = async () => {
    await axios.post('http://localhost:5000/api/auth/logout');
    setCurrentUser(null);
    // Clear any residual local storage items that the app might still rely on
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  };

  const value = {
    currentUser,
    login,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
