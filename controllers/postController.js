const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");

// @desc    Create post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  // Destructure req.body object
  const { title, text, author, category } = req.body;

  // If required field empty
  if (!title || !text || !author || !category) {
    res.status(400);
    throw new Error("Please add a title, text, author, and category");
  }

  // Create post
  const newPost = await Post.create({
    ...req.body,
    user: req.user.id,
  });

  // Respond with new post
  res.status(201).json(newPost);
});

// @desc    Get posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  // Author query (?author=)
  const author = req.query.author;
  // Category query (?category=)
  const category = req.query.category;

  let posts;

  if (author) {
    // Find posts that matches the author
    posts = await Post.find({ author });
  } else if (category) {
    // Find posts that matches the category
    posts = await Post.find({ category });
  } else {
    // Find all posts
    posts = await Post.find();
  }

  // Respond with posts
  res.status(200).json(posts);
});

// @desc    Get post
// @route   GET /api/posts/:id
// @access  Public
const getPost = asyncHandler(async (req, res) => {
  // Find post using id params (:id)
  const post = await Post.findById(req.params.id);

  // If post not found
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Respond with post
  res.status(200).json(post);
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  // Destructure req.body object
  const { title, text, author } = req.body;

  // Find post using id params (:id)
  const post = await Post.findById(req.params.id);

  // If post not found
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // If user not found
  if (!req.user) {
    res.status(404);
    throw new Error("User not found");
  }

  // If post user does not match logged in user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to update this post");
  }

  // If required field empty
  if (!title || !text || !author) {
    res.status(400);
    throw new Error("Please add a title, text, and author");
  }

  // Update post
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  // Respond with updated post
  res.status(200).json(updatedPost);
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  // Find post using id params (:id)
  const post = await Post.findById(req.params.id);

  // If post not found
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // If user not found
  if (!req.user) {
    res.status(404);
    throw new Error("User not found");
  }

  // If post user does not match logged in user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to delete this post");
  }

  // Delete post
  const deletedPost = await Post.findByIdAndDelete(req.params.id);
  // console.log(deletedPost);

  // Respond with success message
  res.status(200).json({ message: "Post deleted" });
});

module.exports = { createPost, getPosts, getPost, updatePost, deletePost };
