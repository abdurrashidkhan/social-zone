import mongoose, { Schema } from "mongoose";

const admissionInfoSchema = new Schema(
  {
    firstName: { type: String, require: true },
    middleInitial: { type: String, require: true },
    lastName: { type: String, require: true },
    dateOfBirth: { type: String, require: true },
    gender: { type: String, require: true },
    citizenship: { type: String, require: true },
    phone: { type: Number, require: true },
    email: { type: String, require: true },
    city: { type: String, require: true },
    state: { type: String, require: true },
    zipCode: { type: Number, require: true },
    emergencyFirstName: { type: String, require: true },
    emergencyLastName: { type: String, require: true },
    relationship: { type: String, require: true },
    emergencyEmail: { type: String, require: true },
    emergencyPhone: { type: Number, require: true },
    otherLanguages: { type: String, require: true },
    date: { type: Date, require: true },
  },
  {
    timestamps: true,
  }
);
const admissionInfo = mongoose.models.admissionInfo || mongoose.model("admissionInfo", admissionInfoSchema);
export default admissionInfo;
