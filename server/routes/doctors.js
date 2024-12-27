import express from "express";
import {
  addDoctor,
  getDoctorById,
  getDoctors,
} from "../controllers/doctorController.js";

const router = express.Router();

router.post("/add", addDoctor);
router.get("/get", getDoctors);
router.get("/:id", getDoctorById);

export default router;
