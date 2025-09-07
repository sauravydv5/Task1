const express = require("express");
const { body } = require("express-validator");
const { auth } = require("../middleware/auth"); // JWT only
const { asyncHandler } = require("../utils/asyncHandler");
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/item-controller");

const router = express.Router();

// Create Item
router.post(
  "/",
  auth,
  [body("title").isString().notEmpty(), body("price").isFloat({ min: 0 })],
  asyncHandler(createItem)
);

// List Items
router.get("/list", asyncHandler(getItems));

// Get single Item
router.get("/:id", asyncHandler(getItemById));

// Update Item
router.patch("/:id", auth, asyncHandler(updateItem));

// Delete Item
router.delete("/:id", auth, asyncHandler(deleteItem));

module.exports = router;
