import User from "../models/user.js";
import { registerUserSchema } from "../validations/userValidation.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import sendVerificationEmail from "../config/mail.js"; // Import the mail sending function
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { error, value } = registerUserSchema.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: error.details[0].message,
    });
  }
  const { firstName, email, country, password, role } = value;

  try {
    // Check if a user with the provided email already exists
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        message: "User with email already exists",
      });
    }

    // Generate a verification token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      firstName,
      email,
      country,
      password: hashedPassword,
      role,
      verificationToken, 
    });

    // Save the user to the database
    await user.save();

    // Send the email verification link
    await sendVerificationEmail(email, verificationToken);

    // Return a success response
    res.status(httpStatus.CREATED).json({
      status: "success",
      message: "Registration successful! Please verify your email.",
      data: { email, firstName, country, message: "A verification link has been sent to your email address." },
    });
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "An error occurred while registering the user",
    });
  }
};

// fetch all users
const fetchUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.log("Fetched users:", users); // Debug log
    res.status(httpStatus.OK).json({
      status: "success",
      message: "Successfully fetched all users",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Failed to fetch users",
    });
  }
};

export { registerUser, fetchUsers };
