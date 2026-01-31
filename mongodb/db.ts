import mongoose from "mongoose";

const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";

if (!connectionString) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB : ", error);
  }
};
