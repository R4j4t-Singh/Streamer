import mongoose from "mongoose";

const streamSchema = new mongoose.Schema(
  {
    title: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const Stream = mongoose.model("Stream", streamSchema);

export default Stream;
