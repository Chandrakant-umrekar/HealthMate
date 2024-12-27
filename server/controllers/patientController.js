import patientModel from "../models/patient.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const getPatientInfo = async (req, res) => {
  try {
    const patient = await patientModel
      .findById(req.body.userId)
      .populate("doctorDiscounts.doctorId");

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }
    res.status(200).json({
      id: patient._id,
      name: patient.name,
      email: patient.email,
      walletBalance: patient.walletBalance,
      doctorDiscounts: patient.doctorDiscounts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

export const registerPatient = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingPatient = await patientModel.findOne({ email });
    if (existingPatient) {
      return res
        .status(409)
        .json({ success: false, message: "Patient already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newPatient = await patientModel.create({
      email,
      name,
      password: hashedPassword,
      doctorDiscounts: [],
    });
    let token = generateToken(newPatient);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        id: newPatient._id,
        name: newPatient.name,
        doctorDiscounts: newPatient.doctorDiscounts,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const patient = await patientModel
      .findOne({ email })
      .populate("doctorDiscounts.doctorId");
    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient does not exist" });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    let token = generateToken(patient);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: patient._id,
        name: patient.name,
        doctorDiscounts: patient.doctorDiscounts,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
