const express = require("express");
const router = express.Router();
const {
  addCategory,
  getCategories,
} = require("../controllers/categoryController");
const { auth } = require("../middleware/authMiddleware");

// Add category
router.post("/", auth, addCategory);
// Get categories
router.get("/", getCategories);

module.exports = router;
