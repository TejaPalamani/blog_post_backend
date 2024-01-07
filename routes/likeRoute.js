const express = require("express");
const Validation = require("../middelWare/validation");

const {
  userToggledLike,
  userCommented,
} = require("../controller/LikesController");

const router = express.Router();

router.use(Validation);

router.post("/like/:id", userToggledLike);
router.post("/comments/:id", userCommented);

module.exports = router;
