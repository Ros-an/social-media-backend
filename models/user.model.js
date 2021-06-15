const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Enter your name.",
      minlength: [3, "Name length atleast 3"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: "Email is required",
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    userphoto: {
      data: Buffer,
      contentType: String,
    },
    background: {
      data: Buffer,
      contentType: String,
    },
    about: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

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
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

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
