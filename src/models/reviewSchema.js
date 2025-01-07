import mongoose, { Schema } from "mongoose";
mongoose.Promise = global.Promise;
const reviewSchema = new Schema(
  {
    reviewStar: { type: Number, require: true },
    reviewDescription: { type: String, require: true },
    email: { type: String, require: true },
    displayName: { type: String, require: true },
    image: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);
const review = mongoose.models.review || mongoose.model("review", reviewSchema);
export default review;