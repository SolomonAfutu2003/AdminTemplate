// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { TOKEN_KEY, USER_KEY } from "../constant";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem(USER_KEY)) || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Restore user from localStorage (no /auth/me call needed)
    const savedUser = localStorage.getItem(USER_KEY);
    const savedToken = localStorage.getItem(TOKEN_KEY);

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); // ensure loading finishes
  }, []);

  // ✅ Login — store token and user info
  const login = ({user, token}) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setUser(user);
  };

  // ✅ Logout — clear session
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
