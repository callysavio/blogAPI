import express from "express";
import { registerUser, fetchUsers } from "../controllers/userController.js";
import {
  addPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
} from "../controllers/postController.js";
import upload from "../middlewares/multerConfig.js";
import { verifyEmail } from "../middlewares/verifyEmail.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for managing users and posts
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               email:
 *                 type: string
 *               country:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.route("/register").post(registerUser);

/**
 * @swagger
 * /user/all-users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */
router.route("/all-users").get(fetchUsers);

/**
 * @swagger
 * /user/add-post:
 *   post:
 *     summary: Add a new post with multiple images
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum:
 *                   - Health
 *                   - Religion
 *                   - Finance
 *                   - Fashion
 *                 description: Categories MUST be one of Health, Religion, Finance, or Fashion.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload one or more image files
 *                 minItems: 1
 *     responses:
 *       201:
 *         description: Post created successfully with images
 *       400:
 *         description: Bad request
 */

router.post("/add-post", upload.array("images", 5), addPost);

/**
 * @swagger
 * /user/update-post/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum:
 *                   - Health
 *                   - Religion
 *                   - Finance
 *                   - Fashion
 *                 description: Categories MUST be one of Health, Religion, Finance, or Fashion.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 */
router.put("/update-post/:id", upload.array("images", 5), updatePost);

/**
 * @swagger
 * /user/delete-post/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */
router.delete("/delete-post/:id", deletePost);

/**
 * @swagger
 * /user/all-posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get("/all-posts", getAllPosts);

/**
 * @swagger
 * /user/post/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post details
 *       404:
 *         description: Post not found
 */
router.get("/post/:id", getPostById);

/**
 * @swagger
 * /user/verify-email:
 *   get:
 *     summary: Verify email using a token
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           description: The verification token sent to the user's email.
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Bad request, invalid or missing token
 *       404:
 *         description: Token not found
 */
router.get("/verify-email", verifyEmail);

export default router;
