import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppointmentForm from "../components/AppointmentForm";
import axios from "axios";
import { useApp } from "../context/AppContext";

const AppointmentPage = () => {
  const { id: doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);

  const { backendUrl, user } = useApp();
  let patientId = user?.id;

  useEffect(() => {
    async function getDoctor() {
      try {
        const response = await axios.get(
          `${backendUrl}/api/doctors/${doctorId}`
        );
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    }

    if (doctorId) getDoctor();
  }, [doctorId]);

  if (!doctor) {
    return <p>Loading doctor details...</p>;
  }
  return (
    <div className="appointment-page">
      <AppointmentForm patientId={patientId} doctor={doctor} />
    </div>
  );
};

export default AppointmentPage;
