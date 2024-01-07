const User = require("../models/userSchema");
const Blog = require("../models/blogSchema");
const Likes = require("../models/likesSchema");
const Comments = require("../models/commentsSchema");
const mongoose = require("mongoose");

//user Commented

const userCommented = async (req, res) => {
  try {
    const { id } = req.params; // blog id
    const body = req.body;
    if (!id || !body) {
      res.status(400).json({ error: "id field is required" });
    } else {
      const CreatingComment = await Comments.create({
        user_id: req.payload.id,
        blog_id: id,
        comment: body.comment,
      });

      const pushingData = await Blog.findByIdAndUpdate(
        id,
        {
          $push: { comments: CreatingComment._id },
        },
        { new: true }
      );
      res.status(200).json(pushingData);
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//user removed -comment

const userRemovedComment = async (req, res) => {
  try {
    const { id } = req.params;
    const checkComment = await Comments.findById(id);

    if (!checkComment) {
      res.status(400).json({ error: "comment details not found" });
    } else {
      //console.log(checkComment.user_id.toString());
      //console.log(req.payload.id);
      // if (checkComment.user_id.toString() !== req.payload.id) {
      //  res.status(401).json({ error: "user not authorized.." });
      //} else {
      await Blog.findByIdAndUpdate(checkComment.user_id, {
        $pull: { comments: id },
      });

      await Comments.findByIdAndDelete(id);

      res.status(200).json("successfully deleted....");
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { userRemovedComment, userCommented };
