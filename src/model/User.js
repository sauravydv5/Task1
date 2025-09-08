const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const CartItemSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    qty: { type: Number, required: true, min: 1, default: 1 },
    priceSnapshot: { type: Number, required: true }, // store price when added
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },

    cart: { type: [CartItemSchema], default: [] },
  },
  { timestamps: true }
);

// Hash password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
UserSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
