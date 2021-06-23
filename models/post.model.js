const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const postSchema = new mongoose.Schema(
  {
    // title: {
    //   type: String,
    //   required: "Title is required",
    //   minlength: 4,
    //   maxlength: 150,
    // },
    post: {
      type: String,
      required: "post body is required",
      maxlength: 1500,
    },
    postphoto: {
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
