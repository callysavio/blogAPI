import express from "express";
import { addComment, getCommentsByPostId } from "../controllers/commentController.js";

const router = express.Router();

// Route to add a comment to a post
router.post("/post/:postId/comment", addComment);

// Route to get all comments for a specific post
router.get("/post/:postId/comments", getCommentsByPostId);

export default router;
