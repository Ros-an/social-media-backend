const express = require("express");
const app = express();

// bring in routes
const postRoute = require("./routes/post");
app.get("/", postRoute.getPost);

app.listen(8080, () => {
  console.log("server connected");
});
