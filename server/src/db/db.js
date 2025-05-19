import mongoose from "mongoose";

const uri =
  "mongodb+srv://root:root@streamer.yhlfkuh.mongodb.net/?retryWrites=true&w=majority&appName=streamer";

const connectDB = async () => {
  await mongoose.connect(uri);
  console.log("Mongoose connected to Atlas");
};

export default connectDB;
