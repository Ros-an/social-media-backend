const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required", //this is a message which will be shown if title not entered, it also means it is true
    minlength: 4,
    maxlength: 150,
  },
  body: {
    type: String,
    required: "Body is required",
    minlength: 4,
    maxlength: 1500,
  },
});

module.exports = mongoose.model("Post", postSchema);
