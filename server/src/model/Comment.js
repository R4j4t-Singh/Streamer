import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: String,
    userId: String,
    userName: String,
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
