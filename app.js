const express = require("express");
const morgan = require("morgan");
const app = express();

// bring in routes
const { getPosts } = require("./routes/post");

// middleware
app.use(morgan("dev"));

app.get("/", getPosts);

app.listen(8080, () => {
  console.log("server connected");
});
