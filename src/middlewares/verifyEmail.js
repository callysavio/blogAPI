import jwt from "jsonwebtoken";
import User from "../models/user.js";

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Verification token is required." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded); // Log decoded token for debugging

    // Find the user associated with the email in the token
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // If the user is already verified
    if (user.verified) {
      return res.status(200).json({ message: "Email is already verified." });
    }

    // Update the user to mark them as verified
    user.verified = true;
    user.verificationToken = null; // Clear the verification token after successful verification
    await user.save();

    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("JWT Verification Error:", error); // Log the error for debugging
    return res
      .status(400)
      .json({ error: "Invalid or expired verification token." });
  }
};

export { verifyEmail };
