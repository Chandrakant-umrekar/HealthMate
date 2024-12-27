import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  specialty: { type: String, required: true },
  consultationFee: { type: Number, required: true },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
