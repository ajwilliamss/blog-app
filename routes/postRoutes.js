const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { auth } = require("../middleware/authMiddleware");

// Create post
router.post("/", auth, createPost);
// Get posts
router.get("/", getPosts);
// Get post
router.get("/:id", getPost);
// Update post
router.put("/:id", auth, updatePost);
// Delete post
router.delete("/:id", auth, deletePost);

module.exports = router;
