import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AppointmentPage from "./pages/Appointment";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import { useApp } from "./context/AppContext";

function App() {
  const { showLogin, token } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-orange-50/30 flex flex-col">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        className="sm:bottom-4 sm:right-4"
      />

      <Router>
        <Header />

        {showLogin && <Login />}

        <main className="flex-grow px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                token ? (
                  <Dashboard />
                ) : (
                  <div className="text-center text-lg font-semibold text-red-500 mt-10">
                    Please login to access the dashboard.
                  </div>
                )
              }
            />
            <Route path="/appointment/:id" element={<AppointmentPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
