import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentSchema);
