const express = require("express");
const morgan = require("morgan");
const app = express();

// bring in routes
const { getPosts } = require("./routes/post");

const myOwnMiddleware = (req, res, next) => {
  console.log("middleware at work!!");
  next();
};

// middleware
app.use(morgan("dev"));
// app.use(myOwnMiddleware);

app.get("/", myOwnMiddleware, getPosts);

app.listen(8080, () => {
  console.log("server connected");
});
