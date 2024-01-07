const express = require("express");
const Validation = require("../middelWare/validation");

const {
  userCommented,
  userRemovedComment,
} = require("../controller/commentsController");

const router = express.Router();

router.use(Validation);

router.post("/comments/:id", userCommented);
router.delete("/comments-remove/:id", userRemovedComment);

module.exports = router;
