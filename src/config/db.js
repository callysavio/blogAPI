import mongoose from "mongoose";

const dbConnection = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined. Check your .env file.");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection successful".bgGreen);
  } catch (error) {
    console.error("Database connection failed:".bgRed, error.message);
    throw error;
  }
};

export default dbConnection;
