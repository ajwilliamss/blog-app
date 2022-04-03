const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

// @desc    Add category
// @route   POST /api/categories
// @access  Private
const addCategory = asyncHandler(async (req, res) => {
  // Destructure req.body
  const { name } = req.body;

  // If required field empty
  if (!name) {
    res.status(400);
    throw new Error("Please add category name");
  }

  // Create category
  const category = await Category.create(req.body);

  // Respond with new category
  res.status(201).json(category);
});

// @desc    Get categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  // Find categories
  const categories = await Category.find();

  // Respond with categories
  res.status(200).json(categories);
});

module.exports = { addCategory, getCategories };
