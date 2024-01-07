const express = require("express");
const {
  getOneBlogData,
  PostBlogData,
  getAllBlogDetails,
  userBlogData,
  updateUserBlogData,
  userBlogDelete,
} = require("../controller/blogContonroller");
const Validation = require("../middelWare/validation");
const validation = require("../middelWare/validation");

const router = express.Router();

router.use(Validation);

router.post("/post-blog", PostBlogData);
router.get("/", getAllBlogDetails);
router.get("/user-post", userBlogData);
router.put("/user-post/:id", updateUserBlogData);
router.delete("/user-post/:id", userBlogDelete);
router.get("/:id", getOneBlogData);

module.exports = router;
