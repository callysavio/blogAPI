import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/admin.js";

dotenv.config();

const seedDefaultAdmin = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URI);

    // Check if an admin already exists
    const existingAdmin = await Admin.findOne({ email: "callistusanwara@gmail.com" });
    if (existingAdmin) {
      console.log("Default admin already exists.");
      return;
    }

    // Create a default admin
    const defaultAdmin = new Admin({
      name: "Default Admin",
      email: "callistusanwara@gmail.com",
      password: "admin123", // Use a secure password in production
      role: "super-admin", // Assign highest privileges
    });

    await defaultAdmin.save();
    console.log("Default admin created successfully.");
  } catch (err) {
    console.error("Error creating default admin:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

seedDefaultAdmin();
