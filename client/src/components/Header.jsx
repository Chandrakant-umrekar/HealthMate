import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";

const Header = () => {
  const { setShowLogin, token, logout, wallet } = useApp();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <>
      <motion.header
        className={`bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 text-white shadow-lg sticky top-0 z-50`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div
          className={`container mx-auto flex items-center justify-between px-4 sm:px-6 py-4`}
        >
          <motion.h1
            className={`text-2xl font-extrabold tracking-wide`}
            whileHover={{ scale: 1.05 }}
          >
            HealthMate
          </motion.h1>
          <div className={`hidden sm:flex items-center space-x-6`}>
            <span className={`px-3 py-1 bg-white text-black rounded-full`}>
              Wallet: {wallet}
            </span>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `px-3 py-1 bg-blue-600 text-white rounded-full`
                  : `px-3 py-1 bg-white text-black rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200`
              }
            >
              Home
            </NavLink>
            {token && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? `px-3 py-1 bg-blue-600 text-white rounded-full`
                    : `px-3 py-1 bg-white text-black rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200`
                }
              >
                Dashboard
              </NavLink>
            )}
            {token ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className={`px-4 py-1 bg-white text-black rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200`}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className={`px-4 py-1 bg-white text-black rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200`}
              >
                Login
              </button>
            )}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`sm:hidden focus:outline-none`}
            aria-label="Toggle Menu"
          >
            <span className={`block w-6 h-1 bg-white mb-1`}></span>
            <span className={`block w-6 h-1 bg-white mb-1`}></span>
            <span className={`block w-6 h-1 bg-white`}></span>
          </button>
        </div>
        {menuOpen && (
          <nav
            className={`sm:hidden bg-white text-black rounded-b-lg shadow-lg`}
          >
            <ul className={`flex flex-col space-y-4 px-6 py-4`}>
              <li>
                <span
                  className={`block text-center px-3 py-2 bg-blue-100 rounded-full`}
                >
                  Wallet: {wallet}
                </span>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? `block text-center px-3 py-2 bg-blue-600 text-white rounded-full`
                      : `block text-center px-3 py-2 bg-blue-100 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200`
                  }
                >
                  Home
                </NavLink>
              </li>
              {token && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? `block text-center px-3 py-2 bg-blue-600 text-white rounded-full`
                        : `block text-center px-3 py-2 bg-blue-100 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              <li>
                {token ? (
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className={`block w-full text-center px-3 py-2 bg-blue-100 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200`}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => setShowLogin(true)}
                    className={`block w-full text-center px-3 py-2 bg-blue-100 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200`}
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
          </nav>
        )}
      </motion.header>
      {showLogoutModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
        >
          <div className={`bg-white p-6 rounded-lg shadow-lg max-w-sm w-full`}>
            <h2 className={`text-2xl font-bold mb-4`}>Confirm Logout</h2>
            <p className={`mb-4`}>Are you sure you want to logout?</p>
            <div className={`flex justify-end space-x-4`}>
              <button
                onClick={() => setShowLogoutModal(false)}
                className={`px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-all duration-200`}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className={`px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
