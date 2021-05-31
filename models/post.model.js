const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "Title is required",
      minlength: 4,
      maxlength: 150,
    },
    body: {
      type: String,
      required: "Body is required",
      minlength: 4,
      maxlength: 1500,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    postedBy: {
      type: ObjectId,
      ref: "User", //referring to model User
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
