const User = require("../models/userSchema");
const Blog = require("../models/blogSchema");
const Likes = require("../models/likesSchema");
const Comments = require("../models/commentsSchema");
const mongoose = require("mongoose");
const { Types } = mongoose;

//handeling user Blog likes
//user sends blogId

//we get blogid and we have usr id
const userToggledLike = async (req, res) => {
  try {
    const { id } = req.params;

    const checkingLikes = await Likes.findOne({
      blog_id: id,
      user_id: req.payload.id,
    });

    ///console.log(checkingLikes);

    if (!checkingLikes) {
      const CreatingLikes = await Likes.create({
        blog_id: id,
        user_id: req.payload.id,
      });

      const n = await Blog.findByIdAndUpdate(
        id,
        { $push: { likes: CreatingLikes._id } },
        { new: true }
      );

      // console.log(n);
    } else {
      await Likes.findByIdAndDelete(checkingLikes._id);
      await Blog.findByIdAndUpdate(id, { $pull: { likes: checkingLikes._id } });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//user Commented

const userCommented = async (req, res) => {
  try {
    const { id } = req.params;
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

module.exports = { userToggledLike, userCommented };
