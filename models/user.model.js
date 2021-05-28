const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter your name.",
  },
  email: {
    type: String,
    trim: true,
    required: "Email is required",
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
    // `Date.now()` returns the current unix timestamp as a number, in js we use (), not in mongoose
  },
  updated: Date,
});

module.exports = mongoose.model("User", userSchema);
