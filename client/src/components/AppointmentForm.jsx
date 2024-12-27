import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const AppointmentForm = ({ patientId, doctor }) => {
  const [date, setDate] = useState("");
  const [finalAmount, setFinalAmount] = useState(doctor.data.consultationFee);
  const [discountUsed, setDiscountUsed] = useState(false);
  const [error, setError] = useState("");

  const { token, backendUrl, fetchWallet } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const calculateDiscount = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/patients/info`, {
          headers: { token },
        });
        console.log(data);
        console.log("doctor", doctor);

        const usedDiscount = data.doctorDiscounts.find(
          (discount) =>
            discount.doctorId._id.toString() === doctor.data._id.toString() &&
            discount.discountUsed
        );
        console.log(usedDiscount);

        if (!usedDiscount) {
          const discount = 0.1;
          const discountAmount = doctor.data.consultationFee * discount;
          setFinalAmount(doctor.data.consultationFee - discountAmount);
          setDiscountUsed(false);
        } else {
          setFinalAmount(doctor.data.consultationFee);
          setDiscountUsed(true);
        }
      } catch (err) {
        console.error("Error fetching patient data:", err);
      }
    };

    calculateDiscount();
  }, [patientId, doctor, backendUrl, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/api/appointments`,
        {
          patientId,
          doctorId: doctor.data._id,
          date,
        },
        { headers: { token } }
      );

      toast.success(response.data.message);
      setError("");

      fetchWallet();
      navigate("/");
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Error booking appointment"
      );
    }
  };

  return (
    <motion.div
      className="p-4 border rounded-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-xl font-semibold mb-2">
        Book Appointment with {doctor.data.name}
      </h2>
      <p className="mb-2">
        <strong>Consultation Fee:</strong> ₹{doctor.data.consultationFee}
      </p>

      {!discountUsed ? (
        <>
          <span className="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
            10% OFF
          </span>
          <p className="mb-2 text-green-500">
            <strong>Discounted Amount:</strong> ₹{finalAmount}
          </p>
        </>
      ) : (
        <p className="mb-2 text-gray-500">
          <strong>Consultation Fee:</strong> ₹{finalAmount}
        </p>
      )}

      {discountUsed && (
        <p className="mb-2 text-gray-500">
          <strong>No discounts available.</strong>
        </p>
      )}

      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Book Now
        </button>
      </form>
    </motion.div>
  );
};

export default AppointmentForm;
