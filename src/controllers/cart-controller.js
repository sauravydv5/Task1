// src/controllers/cart-controller.js
const { validationResult } = require("express-validator");
const User = require("../model/User");
const Item = require("../model/itemModel");

// Get Cart
const getCart = async (req, res) => {
  const user = await User.findById(req.user.id).populate("cart.item");
  const items = (user.cart || []).map((ci) => ({
    item: {
      id: ci.item._id,
      title: ci.item.title,
      price: ci.item.price,
      photo: ci.item.photo,
      category: ci.item.category,
    },
    qty: ci.qty,
    priceSnapshot: ci.priceSnapshot,
    lineTotal: ci.qty * ci.priceSnapshot,
  }));
  const total = items.reduce((acc, it) => acc + it.lineTotal, 0);
  res.json({ items, total });
};

// Add to Cart
const addToCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { itemId, qty = 1 } = req.body;
  const item = await Item.findById(itemId);
  if (!item || !item.isActive)
    return res.status(404).json({ message: "Item unavailable" });

  const user = await User.findById(req.user.id);
  const idx = user.cart.findIndex((c) => c.item.toString() === itemId);

  if (idx > -1) {
    user.cart[idx].qty += Number(qty);
    user.cart[idx].priceSnapshot = item.price;
  } else {
    user.cart.push({
      item: item._id,
      qty: Number(qty),
      priceSnapshot: item.price,
    });
  }
  await user.save();
  res.status(201).json({ message: "Added to cart" });
};

// Update quantity
const updateCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { itemId, qty } = req.body;
  const user = await User.findById(req.user.id);

  const idx = user.cart.findIndex((c) => c.item.toString() === itemId);
  if (idx === -1) return res.status(404).json({ message: "Item not in cart" });

  user.cart[idx].qty = Number(qty);
  await user.save();
  res.json({ message: "Cart updated" });
};

// Remove item
const removeFromCart = async (req, res) => {
  const { itemId } = req.params;
  const user = await User.findById(req.user.id);

  const before = user.cart.length;
  user.cart = user.cart.filter((c) => c.item.toString() !== itemId);

  if (user.cart.length === before)
    return res.status(404).json({ message: "Item not in cart" });

  await user.save();
  res.json({ message: "Item removed" });
};

// Clear cart
const clearCart = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { $set: { cart: [] } });
  res.json({ message: "Cart cleared" });
};

// Export all
module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
};
