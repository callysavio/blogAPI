import express from "express";
import { addComment, getCommentsByPostId } from "../controllers/commentController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Endpoints for managing comments on posts
 */

/**
 * @swagger
 * /post/{postId}/comment:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the person adding the comment
 *               email:
 *                 type: string
 *                 description: Email of the person adding the comment
 *               content:
 *                 type: string
 *                 description: Content of the comment
 *                 minlength: 1
 *     responses:
 *       201:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 content:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /post/{postId}/comments:
 *   get:
 *     summary: Get all comments for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the post
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   postId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   content:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Post not found
 */

router.post("/post/:postId/comment", addComment);
router.get("/post/:postId/comments", getCommentsByPostId);

export default router;
