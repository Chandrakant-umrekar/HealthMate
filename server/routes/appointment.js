import express from "express";
import {
  bookAppointment,
  getAppointments,
} from "../controllers/appointmentController.js";
import userAuth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", userAuth, bookAppointment);
router.get("/", userAuth, getAppointments);

export default router;
