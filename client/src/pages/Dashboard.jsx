import React, { useEffect, useState } from "react";
import Wallet from "../components/Wallet";
import { useApp } from "../context/AppContext";
import axios from "axios";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const { backendUrl, token } = useApp();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/appointments`, {
          headers: { token },
        });
        setAppointments(data.appointments);
        console.log(data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [backendUrl, token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Your Dashboard
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full p-2">
          <Wallet />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          Your Appointments
        </h2>
        {appointments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {appointment.doctorName}
                </h3>
                <p className="text-gray-600">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(appointment.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Fee:</span> ₹
                  {appointment.finalAmount}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      appointment.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {appointment.paymentStatus}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
