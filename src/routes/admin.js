import express from "express";
import { addAdmin, getAllAdmins } from "../controllers/adminController.js";
import verifyAdmin from "../middlewares/verifyAdminRole.js";

const router = express.Router();

// Route to add a new admin
router.post("/add-admin", verifyAdmin, addAdmin);
router.get("/admins", verifyAdmin, getAllAdmins);


export default router;
