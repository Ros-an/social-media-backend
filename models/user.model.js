const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const crypto = require("crypto");

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

/**
 * Virtual fields: are additional field for a given model
 * Their values can be set manually or automatically with defined functionality
 * Keep in mind: virtual properties(password from user) don't get persisted in the database
 * They only exist logically(password) and are not written to the document's collection
 */

// virtual field
userSchema
  .virtual("password")
  .set(function (password) {
    //creating temporary var called _password
    this._password = password;
    //generate a timestamp
    this.salt = uuid();
    // encryptPassword()
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userSchema.methods = {
  // this method is for registration- when user access for the first time, so we encrypt and save it, now when user enter for 2nd time, he will use plain text, then we have to use diff method to match with our hashed password
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
