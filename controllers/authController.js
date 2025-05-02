const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// POST /api/auth/signup
const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existing = await User.findOne({ email });
  if (existing) {
    res.status(400); // Bad request if user exists
    throw new Error("User already exists");
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await User.create({ name, email, password: hashedPassword });

  // Generate JWT token for the newly created user
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  // Send success response with the JWT token
  res.status(201).json({
    message: "User created successfully",
    token, // Send the JWT token in response
  });
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401); // Unauthorized if user not found
      throw new Error("Invalid credentials");
    }
  
    // Compare the entered password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401); // Unauthorized if password doesn't match
      throw new Error("Invalid credentials");
    }
  
    // Generate JWT token for authenticated user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  
    // Send JWT token as response
    res.json({ token });
  });
  module.exports = { signup, login };
