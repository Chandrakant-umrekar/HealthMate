import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [showLogin, setShowLogin] = useState(false);
  const [wallet, setWallet] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const fetchWallet = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/patients/info`, {
        headers: { token },
      });

      setWallet(data.walletBalance);
      setUser(data);

      localStorage.setItem("user", data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching wallet");
      console.error("Error fetching wallet:", error);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [token]);

  const value = {
    user,
    setUser,
    login,
    logout,
    setToken,
    token,
    showLogin,
    setShowLogin,
    backendUrl,
    wallet,
    fetchWallet,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  return useContext(AppContext);
};
