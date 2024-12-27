import doctorModel from "../models/doctor.js";

export const addDoctor = async (req, res) => {
  try {
    const { name, email, specialty, consultationFee } = req.body;

    if (!name || !email || !specialty || !consultationFee) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res
        .status(409)
        .json({ success: false, message: "Doctor already exists" });
    }

    const newDoctor = await doctorModel.create({
      name,
      email,
      specialty,
      consultationFee,
    });

    return res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      data: newDoctor,
    });
  } catch (error) {
    console.error("Error adding doctor:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find();

    if (doctorModel.length < 1) {
      return res
        .status(404)
        .json({ success: false, message: "No doctors found" });
    }

    return res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await doctorModel.findById(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
