const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

// bring in routes
const postRoutes = require("./routes/post.route");

// middleware
app.use(morgan("dev"));

app.use(postRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server connected");
});
