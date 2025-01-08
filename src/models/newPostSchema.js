import mongoose, { Schema } from "mongoose";

const newPost = new Schema(
  {
    caption: { type: String, required: true },
    date: { type: Date, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true },
    react: { type: Number, default: 0 },
    // reactEmail: [
    //   {
    //     email: { type: String, required: true },  // Email of the user
    //     timestamp: { type: Date, required: true },  // Timestamp of when the reaction happened
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const post = mongoose.models.post || mongoose.model("post", newPost);
export default post;
