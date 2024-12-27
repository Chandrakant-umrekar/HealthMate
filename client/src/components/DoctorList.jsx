import React, { useState, useEffect } from "react";
import axios from "axios";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const { backendUrl } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/doctors/get`);
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [backendUrl]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Available Doctors</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.isArray(doctors) &&
          doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/appointment/${doctor._id}`)}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {doctor.name}
              </h3>
              <p className="text-gray-600">
                Specialty:{" "}
                <span className="font-medium">{doctor.specialty}</span>
              </p>
              <p className="text-gray-600">
                Fee:{" "}
                <span className="font-medium">₹{doctor.consultationFee}</span>
              </p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Select Doctor
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoctorList;
