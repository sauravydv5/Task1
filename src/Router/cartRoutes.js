// src/routes/cart-routes.js
const express = require("express");
const { body } = require("express-validator");
const { auth } = require("../middleware/auth");
const { asyncHandler } = require("../utils/asyncHandler");

const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cart-controller");

const router = express.Router();

// Get cart
router.get("/", auth, asyncHandler(getCart));

// Add item to cart
router.post(
  "/add",
  auth,
  [body("itemId").isMongoId(), body("qty").optional().isInt({ min: 1 })],
  asyncHandler(addToCart)
);

// Update cart qty
router.patch(
  "/update",
  auth,
  [body("itemId").isMongoId(), body("qty").isInt({ min: 1 })],
  asyncHandler(updateCart)
);

// Remove item
router.delete("/remove/:itemId", auth, asyncHandler(removeFromCart));

// Clear cart
router.delete("/clear", auth, asyncHandler(clearCart));

module.exports = router;
