import appointmentModel from "../models/appointment.js";
import doctorModel from "../models/doctor.js";
import patientModel from "../models/patient.js";

export const bookAppointment = async (req, res) => {
  const { patientId, doctorId, date } = req.body;

  try {
    const patient = await patientModel.findById(patientId);
    const doctor = await doctorModel.findById(doctorId);

    let discountRate = 0;

    const discountEntry = patient.doctorDiscounts.find(
      (discount) => discount.doctorId.toString() === doctorId
    );

    if (!discountEntry) {
      discountRate = 0.1;
      patient.doctorDiscounts.push({ doctorId, discountUsed: true });
    }

    const discountAmount = doctor.consultationFee * discountRate;
    const finalAmount = doctor.consultationFee - discountAmount;

    if (patient.walletBalance < finalAmount) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    patient.walletBalance -= finalAmount;
    await patient.save();

    const newAppointment = new appointmentModel({
      patientId,
      doctorId,
      date,
      discount: discountRate,
      finalAmount,
      paymentStatus: "Pending",
    });

    await newAppointment.save();

    res
      .status(200)
      .json({ message: "Appointment booked successfully", newAppointment });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
};

export const getAppointments = async (req, res) => {
  const { userId } = req.body;

  try {
    const appointments = await appointmentModel
      .find({ patientId: userId })
      .populate("doctorId");

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};
