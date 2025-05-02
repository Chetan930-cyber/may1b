const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

// POST request to register new user (signup)
router.post("/signup", signup);

// POST request to login user
router.post("/login", login);

module.exports = router;
