import express from "express";
import { addAdmin, getAllAdmins } from "../controllers/adminController.js";
import verifyAdmin from "../middlewares/verifyAdminRole.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Endpoints for managing admin-related operations
 */

/**
 * @swagger
 * /admin/add-admin/{adminId}:
 *   post:
 *     summary: Add a new admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adminId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the super-admin or admin authorizing this request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the new admin
 *               email:
 *                 type: string
 *                 description: Email of the new admin
 *               password:
 *                 type: string
 *                 description: Password for the new admin
 *               role:
 *                 type: string
 *                 description: Role of the new admin (optional, default is "admin")
 *     responses:
 *       201:
 *         description: Admin successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 admin:
 *                   $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Invalid input or request
 *       401:
 *         description: Unauthorized access
 */
router.post("/add-admin/:adminId", addAdmin);

/**
 * @swagger
 * /admin/admins/{adminId}:
 *   get:
 *     summary: Get a list of all admins
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adminId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the super-admin authorizing this request. Note that only a default super admin can perform this action. Default super admin adminId is 67635a6d6a6581805c69d728
 *     responses:
 *       200:
 *         description: Successfully retrieved admin list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       401:
 *         description: Unauthorized access
 */
router.get("/admins/:adminId", verifyAdmin, getAllAdmins);

export default router;
