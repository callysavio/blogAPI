// models/user.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    verified: { type: Boolean, default: false },  
    verificationToken: { type: String, required: true },  
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
