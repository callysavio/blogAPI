import express from "express";
const router = express.Router();
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



// import { authorizeUser } from "../middlewares/authentication.js";

router.route("/register").post(registerUser);
router.route("/all-users").get(fetchUsers);
router.post("/add-post", upload.array("images", 5), addPost);
router.put("/update-post/:id", upload.array("images", 5), updatePost);
router.delete("/delete-post/:id", deletePost);
router.get("/all-posts", getAllPosts);
router.get("/post/:id", getPostById);
router.get("/verify-email", verifyEmail);

// router.route("/all-users").get(fetchUsers);
// router.route("/login").post(loginUser);

export default router;
