const express = require("express");
const app = express();

// bring in routes
const { getPosts } = require("./routes/post");

app.get("/", getPosts);

app.listen(8080, () => {
  console.log("server connected");
});
