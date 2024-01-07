const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
      default: [],
    },
  ],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Likes", default: [] }],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
