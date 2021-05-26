const express = require("express");
const morgan = require("morgan");
const app = express();

// bring in routes
const postRoutes = require("./routes/post.route");

// middleware
app.use(morgan("dev"));

app.use(postRoutes);

app.listen(8080, () => {
  console.log("server connected");
});
