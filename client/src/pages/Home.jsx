import React, { useState } from "react";
import DoctorList from "../components/DoctorList";
import { useApp } from "../context/AppContext";

const Home = () => {
  const { token } = useApp();

  return (
    <div className="container mx-auto p-4">
      <div className="bg-orange-800/90 text-white text-center py-2 rounded mb-4">
        <h2 className="text-xl font-bold">🎉 New Year Offer! 🎉</h2>
        <p className="text-lg">Get 10% off on all first appointments !</p>
      </div>
      <div className="flex flex-col sm:flex-row">
        {token ? (
          <div className="w-full p-2">
            <DoctorList />
          </div>
        ) : (
          <div className="w-full sm:w-1/2 p-2">
            <p className="text-center text-lg font-semibold text-red-500 mt-10">
              Please login to book an appointment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
