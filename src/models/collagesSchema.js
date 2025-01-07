import mongoose, { Schema } from "mongoose";

const collagesSchema = new Schema(
  {
    collageName: { type: String, require: true },
    collageEstablished: { type: String, require: true },
    description: { type: String, require: true },
    address: { type: String, require: true },
    educationalField: { type: String, require: true },
    date: { type: Date, require: true },
    image: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);
const collages = mongoose.models.collages || mongoose.model("collages", collagesSchema);
export default collages;
