const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const comments = require("../models/commentsSchema");

//post vadilate user blog data once at a time
//private

const PostBlogData = async (req, res) => {
  try {
    const { id, email } = req.payload;
    const { title, image, description } = req.body;
    if (!title || !image || !description) {
      res.status(400).json({ error: "all fileds are required!" });
    } else {
      const createBlog = await Blog.create({
        title,
        description,
        image,
        user_id: id,
      });
      res.status(201).json({ mesg: "Ur post Updated..", data: createBlog });
    }
  } catch (e) {
    console.log(e.message);
  }
};

//get allusers post just to view and like
//filterdata need to update
//private
//acess public
//adding likes by user or not value

const getAllBlogDetails = async (req, res) => {
  try {
    // You may want to dynamically calculate this based on user input

    const { skip = 0 } = req.query;

    const allDetails = await Blog.find({})
      .populate({
        path: "likes",
        select: ["user_id"],
      })
      .populate("user_id", ["name"])
      .skip(skip * 10)
      .limit(10);

    // Map over the array of blog posts
    const newDataWithLiked = allDetails.map((blog) => {
      // Check if the user has liked the current blog post
      const isLiked = blog.likes.some((like) =>
        like.user_id.equals(req.payload.id)
      );

      // Return a new object with the original blog post data and the 'status' property
      return {
        blog, // Convert Mongoose document to plain JavaScript object
        status: isLiked,
      };
    });

    res.status(200).json({ newDataWithLiked, total: newDataWithLiked.length });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//only user data
const userBlogData = async (req, res) => {
  try {
    const userBlog = await Blog.find({ user_id: req.payload.id });
    const userName = req.payload.user;
    let totalLike = 0;
    let totalComments = 0;
    userBlog.forEach((each) => {
      totalLike = totalLike + each.likes.length;
      totalComments = totalComments + each.comments.length;
    });
    console.log(req.payload);
    res.status(200).json({ userBlog, totalLike, totalComments, userName });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//update userData
const updateUserBlogData = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const check = await Blog.findById(id);
    if (!check) {
      res.status(401).json({ error: "Post with this Id not found!" });
      return;
    }
    if (check.user_id.toString() === req.payload.id) {
      const updateQuery = await Blog.findByIdAndUpdate(id, body);

      res.status(200).json({ mesg: "updated successfully..." });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//get details from blogs and populate with comment and profile details
//need to be tested
const getOneBlogData = async (req, res) => {
  try {
    const { id } = req.params;
    const singleData = await Blog.findById(id)
      .populate({
        path: "user_id",
        select: ["name"],
        options: { as: "userProfile" }, //not working
      })
      .populate({
        path: "comments",
        select: ["comment", "createdAt"],
        populate: {
          path: "user_id",
          select: ["name"],
        },
      })
      .populate({ path: "likes", select: ["user_id"] });

    const checkingLikedOrNot = await singleData.likes.some((each) =>
      each.user_id.equals(req.payload.id)
    );

    res
      .status(200)
      .json({ singleObjectData: singleData, isLiked: checkingLikedOrNot });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

//deleting user blog by id

const userBlogDelete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "parameter is required!" });
      return;
    }
    const check = await Blog.findById(id);
    if (!check) {
      res.status(400).json({ error: "NO post with this id found!" });
    } else {
      if (check.user_id.toString() === req.payload.id) {
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ mesg: "post deleted successFully ....." });
      } else {
        res.status(400).json({ error: "Not Authorized to do ---!" });
      }
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  PostBlogData,
  getAllBlogDetails,
  userBlogData,
  updateUserBlogData,
  userBlogDelete,
  getOneBlogData,
};
