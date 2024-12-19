import httpStatus from "http-status";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import { commentValidationSchema } from "../validations/commentValidation.js";

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;

    // Validate request body
    const { error } = commentValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: error.details[0].message });
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Post not found." });
    }

    // Create a new comment
    const { name, email, content } = req.body;
    const newComment = new Comment({ postId, name, email, content });

    // Save the comment to the database
    const savedComment = await newComment.save();

    res.status(httpStatus.CREATED).json({
      message: "Comment added successfully!",
      comment: savedComment,
    });
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error", details: err.message });
  }
};

const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Post not found." });
    }

    // Fetch all comments for the post
    const comments = await Comment.find({ postId });

    res.status(httpStatus.OK).json({
      message: "Comments retrieved successfully!",
      comments,
    });
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error", details: err.message });
  }
};



export { addComment, getCommentsByPostId };
