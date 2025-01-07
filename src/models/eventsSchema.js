import mongoose, { Schema } from "mongoose";

const eventsSchema = new Schema(
  {
    title: { type: String, require: true },
    contentDurations: { type: String, require: true },
    description: { type: String, require: true },
    eventDate: { type: String, require: true },
    collageName: { type: String, require: true },
    date: { type: Date, require: true },
    image: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);
const events = mongoose.models.events || mongoose.model("events", eventsSchema);
export default events;
