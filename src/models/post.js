import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 10,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
    },
    category: {
      type: String,
      enum: ["Health", "Religion", "Fashion", "Finance"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BlogPost", postSchema);
