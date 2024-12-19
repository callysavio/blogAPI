import httpStatus from "http-status";
import Admin from "../models/admin.js";

const addAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the email is already in use
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(httpStatus.CONFLICT).json({ error: "Email already in use." });
    }

    // Create a new admin
    const newAdmin = new Admin({
      name,
      email,
      password,
      role: role || "admin", // Default to "admin" if no role is provided
    });

    // Save the new admin to the database
    const savedAdmin = await newAdmin.save();

    res.status(httpStatus.CREATED).json({
      message: "Admin added successfully!",
      admin: {
        id: savedAdmin._id,
        name: savedAdmin.name,
        email: savedAdmin.email,
        role: savedAdmin.role,
      },
    });
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error", details: err.message });
  }
};

// get all admin
const getAllAdmins = async (req, res) => {
  try {
    // Fetch all admins from the database
    const admins = await Admin.find({}, "-password"); // Exclude passwords for security

    if (!admins.length) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "No admins found." });
    }

    res.status(httpStatus.OK).json({
      message: "Admins retrieved successfully!",
      admins,
    });
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error", details: err.message });
  }
};

export { addAdmin, getAllAdmins };
