import { postValidationSchema } from "../validations/postValidation.js";
import httpStatus from "http-status";
import Post from "../models/post.js";

const addPost = async (req, res) => {
  try {
    // Validate request body
    const { error } = postValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: error.details[0].message });
    }

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "At least one image is required." });
    }

    // Extract file paths
    const imagePaths = req.files.map((file) => file.path);

    // Create a new blog post
    const blogPost = new Post({
      images: imagePaths,
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
    });

    // Save to the database
    const savedPost = await blogPost.save();

    res
      .status(httpStatus.CREATED)
      .json({ message: "Post added successfully!", blogPost: savedPost });
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error", details: err.message });
  }
};

// update post controller
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error } = postValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: error.details[0].message });
    }

    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Post not found." });
    }

    // Check if new files are uploaded
    const imagePaths = req.files?.map((file) => file.path) || post.images;

    // Update post fields
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.category = req.body.category || post.category;
    post.images = imagePaths;

    // Save updated post
    const updatedPost = await post.save();

    res.status(httpStatus.OK).json({
      message: "Post updated successfully!",
      blogPost: updatedPost,
    });
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error", details: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Post not found." });
    }

    // Delete the post
    await post.deleteOne();

    res.status(httpStatus.OK).json({
      message: "Post deleted successfully!",
    });
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error", details: err.message });
  }
};

// getting all posts

const getAllPosts = async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.find();

    if (posts.length === 0) {
      return res.status(httpStatus.OK).json({ message: "No posts available." });
    }

    res.status(httpStatus.OK).json({
      message: "Posts retrieved successfully!",
      posts,
    });
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error", details: err.message });
  }
};

// get a single post by Id

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the post by ID
    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Post not found." });
    }

    res.status(httpStatus.OK).json({
      message: "Post retrieved successfully!",
      post,
    });
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error", details: err.message });
  }
};

export { addPost, updatePost, deletePost, getAllPosts, getPostById };
