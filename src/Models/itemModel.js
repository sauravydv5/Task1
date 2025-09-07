// src/models/itemModel.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    category: {
      type: String,
      enum: ["electronics", "fashion", "grocery", "books", "others"],
      default: "others",
    },
    description: {
      type: String,
    },
    photo: {
      type: String, // URL or file path of the image
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// text index for search
itemSchema.index({ title: "text", description: "text" });

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
