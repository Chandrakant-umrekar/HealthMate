import express from "express";
import {
  getPatientInfo,
  registerPatient,
  loginPatient,
} from "../controllers/patientController.js";
import userAuth from "../middlewares/auth.js";

const router = express.Router();

router.get("/info", userAuth, getPatientInfo);
router.post("/register", registerPatient);
router.post("/login", loginPatient);

export default router;
