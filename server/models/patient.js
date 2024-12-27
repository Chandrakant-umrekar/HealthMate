import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  walletBalance: { type: Number, default: 50000 },
  doctorDiscounts: [
    {
      doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
      },
      discountUsed: { type: Boolean, default: false },
    },
  ],
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
