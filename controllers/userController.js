const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // Destructure req.body object
  const { username, email, password } = req.body;

  // If required field empty
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill in required fields");
  }

  // Find user using email
  const user = await User.findOne({ email });

  // If user exists
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // Respond with created resource
  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      profilePic: newUser.profilePic,
      message: "Successfully registered! Please log in",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  // Destructure req.body object
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });

  // If user does not exist
  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  // If passwords match
  const isMatch = await bcrypt.compare(password, user.password);

  // If passwords do not match
  if (!isMatch) {
    res.status(401);
    throw new Error("Incorrect password");
  }

  // If user exists and passwords match
  if (user && isMatch) {
    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user
// @route   GET /api/users/:id
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  // Find user using id params (:id)
  const user = await User.findById(req.params.id).select("-password");

  // If user not found
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Respond with user
  res.status(200).json(user);
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  // Destructure req.body object
  const { username, email, password } = req.body;

  // If required field empty
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("To update please fill in required fields");
  }

  // Find user using id params (:id)
  const user = await User.findById(req.params.id);

  // If user not found
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // If id's do not match
  if (req.params.id !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to update this account");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Update user
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { ...req.body, password: hashedPassword },
    { new: true }
  );

  // Respond with updated user
  res.status(200).json({
    _id: updatedUser.id,
    username: updatedUser.username,
    email: updatedUser.email,
    profilePic: updatedUser.profilePic,
    message: "Account updated successfully!",
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  // Find user using id params (:id)
  const user = await User.findById(req.params.id);

  // If user not found
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // If id's do not match
  if (req.params.id !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to delete this account");
  }

  // Delete user
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  // console.log(deletedUser);

  // Respond with success message
  res.status(200).json({ message: "User deleted" });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser, getUser, updateUser, deleteUser };
