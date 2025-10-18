import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // set axios base URL if needed
  axios.defaults.baseURL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const stored = localStorage.getItem("skillswap_user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
      setToken(parsed.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${parsed.token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("/api/users/login", { email, password });
    const data = res.data;
    setUser(data);
    setToken(data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    localStorage.setItem("skillswap_user", JSON.stringify({ user: data, token: data.token }));
    return data;
  };

  const signup = async (name, email, password) => {
    const res = await axios.post("/api/users/register", { name, email, password });
    const data = res.data;
    setUser(data);
    setToken(data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    localStorage.setItem("skillswap_user", JSON.stringify({ user: data, token: data.token }));
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("skillswap_user");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
