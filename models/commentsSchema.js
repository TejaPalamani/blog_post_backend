const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comments", commentsSchema);
