import httpStatus from "http-status";
import mongoose from "mongoose";
import Admin from "../models/admin.js";

const verifyAdmin = async (req, res, next) => {
  try {
    // Check for adminId in both the request body and request parameters
    const adminId = req.body.adminId || req.params.adminId;

    // If adminId is not provided, return a Bad Request error
    if (!adminId) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: "Admin ID is required in request body or parameters.",
      });
    }

    // Validate if adminId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Invalid admin ID format." });
    }

    // Check if the admin exists in the database
    const admin = await Admin.findById(adminId);
    if (!admin || admin.role !== "super-admin") {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: "Access denied. Only super-admins can perform this action." });
    }

    next(); // Proceed to the next middleware or controller
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error", details: err.message });
  }
};

export default verifyAdmin;
