const { CreatingUser, LoggingInUser } = require("../controller/UserController");
const { validate } = require("../models/userSchema");

const express = require("express");

const router = express.Router();

router.post("/register", CreatingUser);
router.post("/login", LoggingInUser);
//router.get("/profile", validate, getUserProfile)

module.exports = router;
